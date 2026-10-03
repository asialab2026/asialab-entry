from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np, cv2, re
B='/home/user/asialab-entry/auracurate/assets/brand/'
FONT='fonts/poppins300.ttf'
SS=4  # supersample
sw,sh,d=open('gf/star-path.txt').read().split('\n',1)[0].split()+[open('gf/star-path.txt').read().split('\n',1)[1]]
sw,sh=float(sw),float(sh)
PTS=np.array([[float(a) for a in p.split(',')] for p in re.findall(r'[\d.]+,[\d.]+',d)])

def star_mask(w,h):
    """official star (traced from the black logo) as an antialiased mask"""
    W,H=int(w*SS),int(h*SS)
    m=np.zeros((H,W),np.uint8)
    pts=(PTS*[W/sw,H/sh]).astype(np.int32)
    cv2.fillPoly(m,[pts],255,lineType=cv2.LINE_AA)
    return Image.fromarray(m).resize((int(w),int(h)),Image.LANCZOS)

def text_line(word_parts, size, track, color, star_mode):
    """word_parts: list of strings; '*' = Aurora star in place of O. Returns RGBA image (tight to cap height)."""
    f=ImageFont.truetype(FONT,size*SS)
    asc,desc=f.getmetrics()
    capH=f.getbbox('H')[3]-f.getbbox('H')[1]; capTop=f.getbbox('H')[1]
    o_bb=f.getbbox('O'); o_adv=f.getlength('O'); o_ink=o_bb[2]-o_bb[0]
    # layout
    x=0; items=[]
    s=''.join(word_parts)
    for i,ch in enumerate(s):
        if ch=='*':
            items.append(('*',x)); x+=o_adv
        else:
            items.append((ch,x)); x+=f.getlength(ch)
        if i<len(s)-1: x+=track*size*SS
    Wt=int(x+10*SS); Ht=int(asc+desc+40*SS)
    img=Image.new('L',(Wt,Ht),0); dr=ImageDraw.Draw(img)
    stars=[]
    for ch,px in items:
        if ch=='*': stars.append(px)
        elif ch!=' ': dr.text((px,20*SS),ch,font=f,fill=255)
    # crop to ink of letters for cap band
    top=20*SS+capTop; bottom=top+capH
    return img, stars, (top,bottom,capH,o_adv,o_ink,o_bb), Wt

def compose(variant, out, line_text="GL*BAL FACES"):
    dark = variant=='white'
    base=Image.open(B+'aurora100_white.png').convert('RGBA')  # 1200x1005 official
    W=base.size[0]
    a=np.array(base)[:,:,3]
    rows=np.where(a.max(1)>40)[0]
    # split wordmark block and 100 block using the empty band between them
    ink=(a>200).any(1)
    # 100 starts at the first strong row after y=300
    y100=next(y for y in range(300,a.shape[0]) if (a[y]>200).sum()>20)
    word=base.crop((0,0,W,y100-10)); hundred=base.crop((0,y100,W,base.size[1]))
    if not dark:
        # light version: same master, glow removed (alpha 200→255 remapped), recoloured black
        w=np.array(word).astype(float); al=np.clip((w[:,:,3]-205)/50,0,1)*255
        w[:,:,:3]=0; w[:,:,3]=al; word=Image.fromarray(w.astype(np.uint8))
        h=np.array(hundred); h[:,:,:3]=0; hundred=Image.fromarray(h)
    # wordmark text baseline (strong ink bottom) in the word block
    wa=np.array(word)[:,:,3]; strong=np.where((wa>200).sum(1)>8)[0]; word_bottom=strong.max()
    # type line: fit width to the 100
    ha=np.array(hundred)[:,:,3]; hx=np.where(ha.max(0)>128)[0]; x0,x1=hx.min(),hx.max(); target=x1-x0
    size=100
    for _ in range(3):
        img,stars,(top,bottom,capH,o_adv,o_ink,o_bb),Wt=text_line(line_text,size,-0.02,None,dark)
        arr=np.array(img); cols=np.where(arr.max(0)>0)[0]
        inkw=(cols.max()-cols.min())/SS
        # stars add width: include the star advance boxes
        left=min(cols.min(),min(stars)+o_bb[0]) ; right=max(cols.max(),max(stars)+o_bb[2])
        inkw=(right-left)/SS
        size=size*target/inkw
    # final render
    img,stars,(top,bottom,capH,o_adv,o_ink,o_bb),Wt=text_line(line_text,size,-0.02,None,dark)
    arr=np.array(img); cols=np.where(arr.max(0)>0)[0]
    left=min(cols.min(),min(stars)+o_bb[0])
    line=img.crop((left, top-int(capH*0.25), left+int(target*SS)+SS, bottom+int(capH*0.25)))
    line=line.resize((line.size[0]//SS, line.size[1]//SS),Image.LANCZOS)
    capHpx=capH/SS; pad=int(capH*0.25)//SS
    color=(255,255,255) if dark else (0,0,0)
    L=Image.new('RGBA',line.size,color+(0,)); L.putalpha(line)
    # stars
    star_h=capHpx*0.94; star_w=star_h*sw/sh
    for px in stars:
        cx=(px-left+o_bb[0]+o_ink/2)/SS; cy=pad+capHpx/2
        if dark:
            st=Image.open(B+'aurora-star.png').convert('RGBA')
            sa=np.array(st)[:,:,3]; # body = strong alpha
            ys,xs=np.where(sa>235); bw=xs.max()-xs.min()
            sc=star_w/bw
            st=st.resize((int(st.size[0]*sc),int(st.size[1]*sc)),Image.LANCZOS)
            sa2=np.array(st).astype(float); sa2[:,:,3]*=0.55; st=Image.fromarray(sa2.astype(np.uint8))
            bcx=(xs.min()+xs.max())/2*sc; bcy=(ys.min()+ys.max())/2*sc
            L2=Image.new('RGBA',(L.size[0],L.size[1]+st.size[1]*2),(0,0,0,0)); off=st.size[1]
            L2.alpha_composite(L,(0,off))
            L2.alpha_composite(st,(int(cx-bcx),int(cy+off-bcy)))
            # crisp body on top
            m=star_mask(star_w,star_h); body=Image.new('RGBA',m.size,(255,255,255,0)); body.putalpha(m)
            L2.alpha_composite(body,(int(cx-star_w/2),int(cy+off-star_h/2)))
            L=L2; pad+=off
        else:
            m=star_mask(star_w,star_h); body=Image.new('RGBA',m.size,(0,0,0,0)); body.putalpha(m)
            L.alpha_composite(body,(int(cx-star_w/2),int(cy-star_h/2)))
    # stack: word block, gap, line, gap, hundred
    gap1=int(capHpx*1.05); gap2=int(capHpx*0.85)
    line_top_y = word_bottom + gap1          # cap top of line
    line_paste_y = line_top_y - pad
    hundred_y = line_top_y + int(capHpx) + gap2
    H=hundred_y+hundred.size[1]
    canvas=Image.new('RGBA',(W,max(H,word.size[0]//2)),(0,0,0,0))
    canvas.alpha_composite(word,(0,0))
    canvas.alpha_composite(L,(int(x0),int(line_paste_y)) if L.size[0]+x0<=W else (int(x0),int(line_paste_y)))
    canvas.alpha_composite(hundred,(0,hundred_y))
    bb=canvas.getbbox(); canvas=canvas.crop(bb)
    canvas.save(out); print(out,canvas.size,'font',round(size),'capH',round(capHpx))
    return canvas

if __name__=='__main__':
    compose('white','gf/global-faces-100_white.png')
    compose('black','gf/global-faces-100_black.png')
