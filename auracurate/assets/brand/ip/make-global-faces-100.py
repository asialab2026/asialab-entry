"""Global Faces 100 — standalone mark (no Aurora wordmark), sister of Aurora 100.
Name 'Gl✦bal Faces' in Poppins, the Aurora star in place of the lowercase o
(star height = x-height, as in the Aurora wordmark), above the 100 from the Aurora 100 master."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np, cv2, re, sys
B='/home/user/asialab-entry/auracurate/assets/brand/'
S='/tmp/claude-0/-home-user-asialab-entry/550141bf-fe84-5003-aab0-fb35c71ad1e9/scratchpad/'
SS=4
hdr,d=open(S+'gf/star-path.txt').read().split('\n',1)
sw,sh=map(float,hdr.split()); PTS=np.array([[float(a) for a in p.split(',')] for p in re.findall(r'[\d.]+,[\d.]+',d)])
def star_mask(w,h):
    W,H=int(round(w*SS)),int(round(h*SS)); m=np.zeros((H,W),np.uint8)
    cv2.fillPoly(m,[(PTS*[W/sw,H/sh]).astype(np.int32)],255,lineType=cv2.LINE_AA)
    return Image.fromarray(m).resize((max(1,int(round(w))),max(1,int(round(h)))),Image.LANCZOS)

def name_line(font, size, track=-0.01, text="Gl*bal Faces", star_scale=1.0):
    f=ImageFont.truetype(font,size*SS)
    xb=f.getbbox('x'); xh=xb[3]-xb[1]; xtop=xb[1]
    ob=f.getbbox('o'); o_adv=f.getlength('o'); o_ink=ob[2]-ob[0]
    x=0; items=[]
    for i,ch in enumerate(text):
        items.append((ch,x)); x+= o_adv if ch=='*' else f.getlength(ch)
        if i<len(text)-1: x+=track*size*SS
    asc,desc=f.getmetrics(); Wt=int(x+20*SS); Ht=asc+desc+40*SS
    img=Image.new('L',(Wt,Ht),0); dr=ImageDraw.Draw(img); stars=[]
    for ch,px in items:
        if ch=='*': stars.append(px+ob[0]+o_ink/2)
        elif ch!=' ': dr.text((px,20*SS),ch,font=f,fill=255)
    base_y=20*SS+xtop+xh  # baseline-ish (x bottom)
    cap=f.getbbox('G'); top=20*SS+cap[1]
    return img,stars,dict(xh=xh,xtop=20*SS+xtop,top=top,base=base_y,o_ink=o_ink)

def build(dark, font, out, width_ratio=0.82, gap_ratio=0.62):
    base=Image.open(B+'aurora100_white.png').convert('RGBA'); W=base.size[0]
    a=np.array(base)[:,:,3]
    y100=next(y for y in range(300,a.shape[0]) if (a[y]>200).sum()>20)
    hundred=base.crop((0,y100,W,base.size[1]))
    if not dark:
        h=np.array(hundred); h[:,:,:3]=0; hundred=Image.fromarray(h)
    target=W*width_ratio
    size=100
    for _ in range(4):
        img,stars,m=name_line(font,size)
        cols=np.where(np.array(img).max(0)>0)[0]; inkw=(cols.max()-cols.min())/SS
        size*=target/inkw
    img,stars,m=name_line(font,size)
    arr=np.array(img); cols=np.where(arr.max(0)>0)[0]; rows=np.where(arr.max(1)>0)[0]
    l,r,t,b=cols.min(),cols.max(),rows.min(),rows.max()
    pad=int(m['xh']*1.2)
    crop=img.crop((l-pad,t-pad,r+pad,b+pad))
    small=crop.resize((crop.size[0]//SS,crop.size[1]//SS),Image.LANCZOS)
    col=(255,255,255) if dark else (0,0,0)
    L=Image.new('RGBA',small.size,col+(0,)); L.putalpha(small)
    xh=m['xh']/SS; star_h=xh*0.96; star_w=star_h*sw/sh
    for sx in stars:
        cx=(sx-(l-pad))/SS; cy=(m['xtop']-(t-pad))/SS+xh/2
        if dark:
            st=Image.open(B+'aurora-star.png').convert('RGBA'); sa=np.array(st)[:,:,3]
            ys,xs=np.where(sa>235); sc=star_w/(xs.max()-xs.min())
            st=st.resize((int(st.size[0]*sc),int(st.size[1]*sc)),Image.LANCZOS)
            s2=np.array(st).astype(float); s2[:,:,3]*=0.7; st=Image.fromarray(s2.astype(np.uint8))
            bcx=(xs.min()+xs.max())/2*sc; bcy=(ys.min()+ys.max())/2*sc
            L.alpha_composite(st,(int(cx-bcx),int(cy-bcy)))
        mk=star_mask(star_w,star_h); body=Image.new('RGBA',mk.size,col+(0,)); body.putalpha(mk)
        L.alpha_composite(body,(int(round(cx-star_w/2)),int(round(cy-star_h/2))))
    if dark:  # soft glow like the Aurora 100 wordmark
        g=L.copy().filter(ImageFilter.GaussianBlur(xh*0.18)); ga=np.array(g).astype(float); ga[:,:,3]*=0.55
        G=Image.fromarray(ga.astype(np.uint8)); G.alpha_composite(L); L=G
    # stack
    la=np.array(L)[:,:,3]; lr=np.where((la>200).any(1))[0]; ink_bottom=lr.max()
    gap=int(xh*gap_ratio*2.2)
    hh=np.array(hundred)[:,:,3]; ht=np.where((hh>200).any(1))[0].min()
    H=ink_bottom+gap+hundred.size[1]
    c=Image.new('RGBA',(W+L.size[0],H+L.size[1]),(0,0,0,0))
    ox=(L.size[0])//2  # canvas wider to hold glow, crop later
    c.alpha_composite(L,(int(ox+(W-L.size[0])/2),0))
    c.alpha_composite(hundred,(ox,ink_bottom+gap-ht))
    c=c.crop(c.getbbox()); c.save(out); print(out,c.size,'size',round(size),'xh',round(xh))
if __name__=='__main__':
    font=sys.argv[1] if len(sys.argv)>1 else S+'fonts/pxiEyp8kv8JHgFVrFJA.ttf'
    tag=sys.argv[2] if len(sys.argv)>2 else 'x'
    build(True,font,S+f'gf/gf2_white_{tag}.png'); build(False,font,S+f'gf/gf2_black_{tag}.png')
