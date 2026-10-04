// AuroraCurate.com 글로벌 플랫폼 통합 웹 기획서 — final IA, UX/UI and Shopify build map
const fs = require("fs"), path = require("path");
const { Paragraph, ImageRun, TextRun, AlignmentType } = require("docx");
const { P, H1, H2, H3, B, NL, NOTE, TBL, LINK, LINKP, cover, toc, build, INTEGRATED } = require("./lib");
const C = []; const add = (...x) => x.forEach(i => Array.isArray(i) ? C.push(...i) : C.push(i));
const CAP = path.join(__dirname, "..", "webcap");
function IMG(name, caption, widthIn) {
  const f = path.join(CAP, name + ".jpg"); if (!fs.existsSync(f)) return [];
  const buf = fs.readFileSync(f);
  const w = buf.readUInt16BE ? null : null; // size from file name convention
  const mobile = /-390$/.test(name);
  const pxW = mobile ? 390 : 1200;
  const pxH = (() => { // read JPEG height from SOF marker
    let i = 2; while (i < buf.length) { if (buf[i] !== 0xFF) { i++; continue; } const m = buf[i + 1]; const len = buf.readUInt16BE(i + 2);
      if (m >= 0xC0 && m <= 0xC3) return buf.readUInt16BE(i + 5); i += 2 + len; } return 750; })();
  const outW = Math.round((widthIn || (mobile ? 2.4 : 6.4)) * 96), outH = Math.round(outW * pxH / pxW);
  return [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 40 }, children: [new ImageRun({ type: "jpg", data: buf, transformation: { width: outW, height: outH }, altText: { title: caption, description: caption, name } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: caption, size: 17, color: "4A4D5C" })] })];
}

if (!INTEGRATED) add(cover({
  kicker: "AURORACURATE.COM · GLOBAL PLATFORM",
  title: "통합 웹 기획서",
  sub: "최종 정보 구조 · UX/UI 목업 · 컴포넌트 · Shopify 제작 지도",
  meta: [
    ["문서", "AuroraCurate.com 글로벌 플랫폼 통합 웹 기획서 v1.0 (제작 인계용)"],
    ["작성일", "2026-10-04"],
    ["작성", "수석 디자인 (Claude)"],
    ["대상", "대표님, Codex 기획자·제작자, 마케터, 운영"],
    ["기준 목업", LINK],
    ["기준 문서", "Aurora 오픈 통합 기획서 (About · Studio · Curators · Community · Shop · 푸터·법적 고지)"],
    ["원칙", "새 구조를 만들지 않음 — 지금까지 가장 완성도 높은 화면과 컴포넌트를 선별·통합"]
  ]
}));
if (!INTEGRATED) add(toc());

/* 1 */
add(H1("1. 5초 안에 이해되는 Aurora"),
  P("처음 온 사람이 첫 화면에서 5초 안에 세 가지를 알아야 합니다: **Aurora가 무엇인지, 네 곳이 무엇인지, 그 네 곳이 어떻게 이어지는지.**"),
  H2("1.1 한 문장"),
  TBL(["언어", "문장"], [
    ["쉬운 말", "Aurora는 아시아와 세계의 멋진 사람·아이디어·브랜드를 찾아서, 그 이야기를 읽고, 그 사람을 만나고, 함께 참여하고, 마음에 드는 것을 가져갈 수 있게 해 주는 곳입니다."],
    ["첫 화면 제목", "Read the story. Meet the people. Join in. Take it home."],
    ["회사 정의", "Aurora is a global production house and experience platform created by Asia Lab."],
    ["슬로건", "A World Connected by Experience — 경험으로 연결되는 하나의 세계"]
  ], [1.2, 5.2]),
  H2("1.2 네 개의 문 — 한 단어 동사로"),
  P("네 곳마다 **동사 하나**를 정했습니다. 이 동사와 색은 첫 화면, 메뉴 아래 길잡이 막대, 카드, 라벨 어디서나 똑같이 씁니다. 같은 말을 반복해야 기억됩니다."),
  TBL(["#", "곳", "동사", "초등학생에게 설명하면", "여기서 하는 일", "색"], [
    ["1", "Studio", "Read the story", "멋진 사람들의 이야기를 읽고 보는 곳", "인터뷰·영상·에디토리얼, Aurora 100 · Global Faces 100", "Deep Cosmos 남색"],
    ["2", "Curators", "Meet the people", "Aurora가 고른 사람들을 만나는 곳", "아티스트·크리에이터·전문가 프로필과 추천", "Aurora Magenta 자홍"],
    ["3", "Community", "Join in", "같은 관심을 가진 사람들과 이야기하고 배우는 곳", "무료 Lounge, 코호트·코스·워크숍·디지털·경험", "Solar Ember 주황"],
    ["4", "Shop", "Take it home", "이야기 속 물건과 프로그램을 사는 곳", "실물 상품, 프로그램, Fund·Together·Made for You", "Velvet Eclipse 와인"]
  ], [0.3, 0.9, 1.1, 1.8, 1.8, 1.0]),
  ...IMG("home-1440", "최종 Home 첫 화면 (1440) — 로고·슬로건, 네 동사 제목, 네 개의 문이 한 화면 안에"),
  H2("1.3 5초 테스트 (오픈 전 필수)"),
  NL([
    "Aurora를 모르는 사람 5명에게 Home 첫 화면을 5초 보여 주고 화면을 닫습니다.",
    "질문 1: “이 사이트는 무엇을 하는 곳인가요?”",
    "질문 2: “네 곳의 이름을 말할 수 있나요? 각각 무엇을 하나요?”",
    "질문 3: “여기서 무언가를 살 수 있나요?”",
    "통과 기준: 5명 중 4명이 세 질문에 맞게 답함. 미달 시 제목과 문 라벨만 고쳐 다시 테스트."
  ])
);

/* 2 */
add(H1("2. 연결 원리 — 하나의 이야기, 네 개의 문"),
  P("Aurora의 모든 것은 **하나의 이야기(사람·브랜드·제품)**를 중심으로 네 곳이 이어지는 구조입니다. 고객은 어느 문으로 들어와도 나머지 세 곳으로 갈 수 있습니다."),
  TBL(["단계", "곳", "고객 행동", "다음 문으로 넘기는 장치"], [
    ["발견", "Studio", "이야기를 읽는다", "기사 끝 ‘이 사람 / 이 프로그램 / 이 상품’ 연결 (실제 관계가 있을 때만)"],
    ["협업", "Curators", "사람을 만난다", "프로필의 Studio·Community·Shop 탭, ‘Start Collaboration’ (제안은 Aurora로)"],
    ["참여", "Community", "함께한다", "무료 Lounge → 프로그램 상세 → Shop 결제"],
    ["구매", "Shop", "가져간다", "상품 상세 하단 ‘Connected to this product’ — 큐레이터·이야기·대화로 되돌아감"]
  ], [0.8, 1, 1.2, 3.4]),
  H2("2.1 실제 예시 — 첫 판매 흐름 그대로"),
  P("Home의 ‘How Aurora connects’ 섹션은 지어낸 예가 아니라 **오픈 첫 판매 흐름**(대표 결정 권장안 02)을 그대로 보여 줍니다."),
  NL([
    "**Studio · Read the story** — 한국·아시아에서 커리어를 만드는 이야기를 읽는다 (Hustle 분야).",
    "**Curators · Meet the people** — 그 일을 하는 전문가들이 누구이고 어떻게 일하는지 본다.",
    "**Community · Join in** — 무료 Aurora Lounge에서 같은 길을 가는 사람들과 질문한다.",
    "**Shop · Take it home** — 60분 K-Career Entry Session을 예약하고 다음 단계를 받는다 (Shopify 결제)."
  ]),
  ...IMG("connect-1440", "Home ‘One story. Four doors.’ — 네 단계 흐름 (1440)"),
  H2("2.2 연결 규칙"),
  B("**실제 관계가 있을 때만 연결**합니다. 협업 계약, 실제 사용, 편집 선정이 문서로 있어야 합니다."),
  B("관계가 없으면 ‘Keep exploring’ 같은 일반 안내로 바꾸고, 추천이나 보증처럼 보이지 않게 합니다."),
  B("돈·무상 제공·수수료 관계가 있으면 추천 가까이에 공개합니다 (FTC 지침)."),
  B("어느 길도 강요하지 않습니다 — 구매 없이 읽고 참여할 수 있습니다.")
);

/* 3 */
add(H1("3. 사이트 구조 (정보 구조)"),
  H2("3.1 전역 탐색"),
  TBL(["위치", "구성"], [
    ["헤더", "Aurora 로고 · Studio · Curators · Community · Shop · Partner with us · 검색 · 장바구니 · 계정"],
    ["길잡이 막대 (신규)", "네 세계 페이지와 그 하위 페이지(기사·프로필·프로그램·상품) 상단에 ‘1 Studio · 2 Curators · 3 Community · 4 Shop’과 현재 위치 표시"],
    ["푸터", "브랜드 · Aurora · Work with Aurora · Help · 정책 줄 · 법인 고지 · 저작권"]
  ], [1.6, 4.8]),
  ...IMG("pdp-1440", "길잡이 막대 — 상품 상세에서 ‘4 Shop · Take it home’이 현재 위치 (1440)"),
  H2("3.2 페이지 지도"),
  TBL(["영역", "페이지", "목적", "주 행동"], [
    ["공통", "Home", "5초 이해 → 원하는 문으로", "See how it works / Shop now"],
    ["Studio", "Studio · Article · Nine Tails(분야)", "이야기 발견", "Read → 연결된 사람·프로그램·상품"],
    ["Curators", "Curators · Curator profile", "사람 발견과 협업", "Meet → Start Collaboration"],
    ["Community", "Community · Program(offer) · Member area(learn)", "참여와 배움", "Join the Lounge — free / Book"],
    ["Shop", "Shop · Collection · Product · Cart · Order · Projects · Project", "구매", "Add to cart / Book this session"],
    ["협업", "Work with Aurora · Application result", "브랜드·큐레이터·명예기자 제안", "Send proposal"],
    ["신뢰", "About · Help · Policies(6) · Aurora Entities", "누구와 거래하는지, 도움", "Contact"],
    ["운영", "Review hub · Staff board · Design guide", "내부 검토 (공개 안 함)", "—"]
  ], [0.9, 2.2, 1.6, 1.7])
);

/* 4 */
add(H1("4. 화면별 최종안"),
  P("아래 순서가 최종입니다. 각 화면은 목업 링크에서 그대로 볼 수 있습니다."),
  H2("4.1 Home"),
  TBL(["순서", "섹션", "쉬운 설명", "Shopify 섹션"], [
    ["1", "Brand hero", "로고·슬로건·네 동사 제목·한 줄 설명·두 버튼·대표 사진", "index.json › brand"],
    ["2", "Four doors", "1 Studio · 2 Curators · 3 Community · 4 Shop (동사 한 단어)", "index.json › brand (블록 4개)"],
    ["3", "Four places", "네 곳의 사진 카드와 한 문장 설명", "index.json › four"],
    ["4", "How Aurora connects", "하나의 이야기가 네 단계로 이어지는 실제 예", "index.json › connect (신규)"],
    ["5", "Two projects", "Aurora 100 · Global Faces 100 (두 공식 IP)", "index.json › projects"],
    ["6", "Nine Tails", "아홉 분야 아이콘", "index.json › nine"],
    ["7", "Trending now", "Studio 최신 이야기", "index.json › trending"],
    ["8", "The whole picture", "원본 생태계 이미지 + 네 동사 칩", "index.json › ecosystem"],
    ["9", "Shop edit", "상품과 Fund·Together·Made for You", "index.json › shop_edit"],
    ["10", "Community", "대화로 이어지기", "index.json › community"],
    ["11", "Collaboration", "Partner with us", "index.json › collaboration"]
  ], [0.5, 1.4, 2.8, 1.7]),
  ...IMG("home-390", "Home 모바일 (390) — 제목과 버튼, 그 아래 네 개의 문", 2.2),
  H2("4.2 Studio — Read the story"),
  B("큰 커버, 비대칭 이미지, 다섯 코너, Aurora 100 · Global Faces 100, Trending, 분야 필터."),
  B("기사 끝: 실제 관계가 있는 사람·프로그램·상품 1개씩."),
  ...IMG("studio-1440", "Studio (1440)"),
  H2("4.3 Curators — Meet the people"),
  B("인물 띠 → 비대칭 이야기 → 원형 인물 → 편집 선정. 프로필: 배너·아바타·소개·탭(Studio/Community/Shop)·협업 버튼."),
  B("두 데이터 세트(내용 많은 인물 / 연결 없는 인물) 모두 빈 곳 없이 정직하게."),
  ...IMG("curators-1440", "Curators (1440)"),
  ...IMG("curator-1440", "Curator profile (1440)"),
  H2("4.4 Community — Join in"),
  B("세 갈래: Read(로그인 없이) · Join(무료 Lounge) · Learn & experience(유료 프로그램)."),
  B("프로그램 시장: 코호트·코스·워크숍·디지털·경험 — 상태(Open · Free · Apply · Preview · Soon · Sample) 표기."),
  B("회원 공간(Tevello) 16개 상태: 로그인·권한 오류·잠긴 수업·글쓰기·신고까지."),
  NOTE("결정 대기: 히어로 문구 ‘Where Global Voices Meet Influence’ → 권장 ‘…Meet Culture’. 대표 승인 시 바로 교체."),
  ...IMG("community-1440", "Community (1440)"),
  ...IMG("offer-1440", "Program detail — K-Career Entry Session (1440)"),
  ...IMG("learn-1440", "Member area — Tevello 화면 기준 (1440)"),
  H2("4.5 Shop — Take it home"),
  B("Hero → Highlights → 네 가지 쇼핑 길(Ready now · Programs · Fund·Together · Made for You) → 이미지 진열 → Ranking(Editorial selection) · Curator’s Recommendation · Curation."),
  B("상품 상세: 사진·옵션·가격·결제 버튼 → ‘Ships from · Returns for this item’(상품별) → Aurora의 한마디 → 연결된 세계."),
  B("장바구니 7개 상태, 주문 6개 상태 — 품절·국가 미지원·결제 실패까지."),
  ...IMG("shop-1440", "Shop (1440)"),
  ...IMG("cart-1440", "Cart (1440)"),
  ...IMG("order-1440", "Order — 세션 결제 후 ‘시간 미예약’ 상태 (1440)"),
  H2("4.6 About · 협업 · 신뢰"),
  ...IMG("about-1440", "About (1440)"),
  ...IMG("partner-1440", "Work with Aurora (1440)"),
  ...IMG("policy-1440", "Policies — 정책 6종, 상품별 조건 우선 (1440)")
);

/* 5 */
add(H1("5. 컴포넌트 라이브러리 (선별 통합본)"),
  P("새로 만든 것은 세 개(Four doors · Connect flow · World bar)뿐이고, 나머지는 이미 검수한 목업 컴포넌트를 그대로 씁니다."),
  TBL(["컴포넌트", "쓰는 곳", "핵심 규칙", "상태"], [
    ["Header", "모든 페이지", "4개 메뉴 + Partner with us, 모바일 메뉴", "기존"],
    ["World bar (신규)", "네 세계와 하위 페이지", "현재 위치 강조, 모바일은 이름만", "신규"],
    ["Four doors (신규)", "Home 첫 화면", "번호·이름·동사, 세계 색 상단선", "신규"],
    ["Connect flow (신규)", "Home", "4단계 사진·라벨·한 문장·링크, 모바일은 세로선", "신규"],
    ["Way card", "Home four", "사진 + 동사 라벨 + 한 문장", "기존 (문구 정리)"],
    ["Story card", "Studio · Home", "샘플은 ‘Design sample’ 표기", "기존"],
    ["Person card / Profile", "Curators", "검증 안 된 순위·조회수 표시 금지", "기존"],
    ["Product card · PDP", "Shop", "가격은 Shopify 값, 할인 비교가 없음", "기존 + 상품별 조건"],
    ["Program card · Offer", "Community · Shop", "상태 배지, ‘Price set at launch’", "기존"],
    ["State panels", "Cart · Order · Learn · Application", "막다른 길 없이 다음 행동 제시", "기존"],
    ["Chips · Tabs · Buttons", "전체", "주 행동은 Magenta, 보조는 테두리", "기존"],
    ["Policy document", "Policies", "Read 모드, 표는 모바일 가로 스크롤", "기존"],
    ["Footer + legal row", "전체", "정책 링크·법인 고지·Your Privacy Choices", "기존"]
  ], [1.6, 1.5, 2.4, 0.9])
);

/* 6 */
add(H1("6. 디자인 시스템 요약"),
  TBL(["요소", "규칙"], [
    ["두 모드", "Stage(어두운 배경) = 발견·에디토리얼 · Read(밝은 면) = 구매·학습·폼·정책"],
    ["세계 색", "Studio 남색 #0B2F89 · Curators 자홍 #CD089C · Community 주황 #E6733A · Shop 와인 #992138"],
    ["주 행동", "Aurora Magenta 버튼 한 개 — 한 화면에 주 버튼은 하나"],
    ["서체", "제목 Bodoni Moda · 본문 Manrope · 한국어 Pretendard · IP 이름 Poppins Light"],
    ["로고", "어두운 배경 흰 로고+빛, 밝은 배경 검정 로고"],
    ["IP 마크", "Aurora 100 · Global Faces 100 공식 파일만"],
    ["접근성", "포커스 링, 대비, 비활성 버튼엔 이유 표기, 이미지 대체 텍스트"],
    ["반응형", "1440 · 1024 · 390 · 360 — 가로 스크롤 없음"]
  ], [1.2, 5.2]),
  P("전체 규칙은 목업의 Design guide 페이지에 있습니다.")
);

/* 7 */
add(H1("7. 쉬운 말 원칙"),
  NL([
    "**동사로 말한다** — Read the story · Meet the people · Join in · Take it home.",
    "**한 문장에 한 가지** — 초등학생이 소리 내어 읽어도 이해되게.",
    "**약속하지 않는다** — ‘성공’, ‘영향력 보장’, 근거 없는 숫자·순위·긴급 문구 금지.",
    "**표시하고 숨기지 않는다** — 샘플은 Sample, 준비 중은 Soon, 가격 미정은 ‘Price set at launch’.",
    "**다음 행동을 준다** — 오류·빈 화면·품절에도 갈 곳을 하나 안내."
  ])
);

/* 8 */
add(H1("8. Shopify 제작 지도"),
  P("목업의 각 화면을 Shopify 테마에 어떻게 옮기는지입니다. **MAIN 테마에 직접 쓰지 않고**, 미리보기 테마에서 만들고 검수한 뒤 게시합니다."),
  H2("8.1 템플릿"),
  TBL(["목업", "Shopify 템플릿", "비고"], [
    ["Home", "templates/index.json", "섹션 11개 (4.1 표)"],
    ["Studio", "templates/page.aurora-studio.json (현 index.aurora-studio)", "기사 = 블로그 article"],
    ["Article", "templates/article.json", "관계 메타필드로 끝 연결"],
    ["Curators / Profile", "templates/page.curators.json · metaobject 페이지 curator", "인물 = 메타오브젝트"],
    ["Community / Program", "templates/page.community.json · product.program.json", "학습 공간은 Tevello"],
    ["Shop / Collection", "templates/page.aurora-shop.json · collection.json", "필터 = Search & Discovery"],
    ["Product (실물)", "templates/product.json", "상품별 조건 메타필드"],
    ["Product (세션·프로그램)", "templates/product.session.json", "예약 안내, 배송 없음"],
    ["Projects", "templates/page.projects.json", "Fund·Together는 관심 명단"],
    ["Work with Aurora", "templates/page.aurora-partners.json", "폼 = Shopify Forms 또는 외부 접수"],
    ["About · Help", "templates/page.about.json · page.help.json", "—"],
    ["Policies", "Shopify 기본 정책 페이지 /policies/…", "테마는 링크만"],
    ["Aurora Entities", "pages/aurora-entities (게시 완료)", "법인 추가 시 표 갱신"],
    ["Cart · Order", "Shopify 기본 장바구니 + 주문 상태 페이지", "목업 상태는 안내 문구 기준"]
  ], [1.6, 2.8, 2]),
  H2("8.2 공통 조각 (snippets)"),
  TBL(["조각", "내용"], [
    ["world-bar.liquid", "네 세계 길잡이 막대 — template 이름으로 현재 위치 판단"],
    ["four-doors (brand 섹션 블록)", "번호·이름·동사·링크 4블록"],
    ["connect (섹션)", "4블록: 세계, 동사, 이미지, 문장, 링크 — 편집자가 예시를 바꿀 수 있음"],
    ["item-terms.liquid", "상품 상세 출고지·반품 조건 — 메타필드 없으면 기본값"],
    ["legal-row.liquid", "정책 링크·법인 고지 — shop 객체와 테마 설정에서 읽음"]
  ], [2, 4.4]),
  H2("8.3 데이터 (메타필드·메타오브젝트)"),
  TBL(["대상", "필드", "용도"], [
    ["Product", "aurora.ships_from · return_days · final_sale · return_note", "상품별 배송·반품 고지"],
    ["Product", "aurora.field · aurora.note · aurora.relations(curator, article, offer)", "분야, 편집 한마디, 연결된 세계"],
    ["Metaobject curator", "name · role · bio · avatar · banner · links · relations", "Curators 프로필"],
    ["Metaobject offer", "type · status · format · length · outcomes · structure · refund", "프로그램 상세"],
    ["Article", "aurora.relations · aurora.ip(Aurora 100 / Global Faces 100)", "기사 끝 연결"],
    ["Theme settings", "legal entity · address · email · phone(선택) · privacy choices", "푸터 법인 줄"]
  ], [1.4, 3, 2]),
  H2("8.4 앱과 외부 서비스"),
  TBL(["기능", "도구", "상태"], [
    ["결제", "Shopify Checkout · Payments", "설정 완료 (대표 확인)"],
    ["커뮤니티·학습", "Tevello", "테스트 강좌 2개 — 실제 구매→접근 테스트 필요"],
    ["멤버십 구독", "Shopify 구독 앱", "구독 정책 게시 후"],
    ["리뷰", "구매 인증 리뷰 앱", "실구매 후기만"],
    ["개인정보", "Shopify Customer Privacy · 판매·공유 거부 페이지", "켜짐"],
    ["라이브", "LiveMeUp", "기능 확인 후"]
  ], [1.6, 2.6, 2.2])
);

/* 9 */
add(H1("9. 제작 순서와 완료 기준"),
  TBL(["단계", "만드는 것", "완료 기준"], [
    ["1", "공통: 헤더 · World bar · 푸터·법적 줄 · 디자인 토큰", "모든 템플릿에 동일 적용, 360px 가로 스크롤 없음"],
    ["2", "Home 11개 섹션", "5초 테스트 5명 중 4명 통과"],
    ["3", "Shop · Product(실물/세션) · Cart 안내", "테스트 주문 1건 결제→주문 메일→추적"],
    ["4", "Community · Program · Tevello 연결", "구매→같은 이메일 로그인→첫 수업 열림"],
    ["5", "Studio · Article · 연결 메타필드", "기사 끝 연결이 실제 관계에만 표시"],
    ["6", "Curators · Profile 메타오브젝트", "두 데이터 세트 모두 빈칸 없이"],
    ["7", "About · Help · Work with Aurora · Projects", "모든 폼 접수 확인 메일"],
    ["8", "정책 게시 · 스토어 이메일 · 최종 QA", "정책 6종 링크 동작, 오픈 체크리스트 통과"]
  ], [0.5, 3, 2.9])
);

/* 10 */
add(H1("10. 품질 기준"),
  B("화면: 1440 · 1024 · 390 · 360에서 가로 스크롤 0, JS 오류 0, 깨진 이미지 0 (현재 목업 26페이지 통과)."),
  B("속도: 첫 화면 이미지는 적정 크기(WebP), 아래 이미지는 지연 로딩."),
  B("접근성: 키보드로 네 개의 문·길잡이 막대·주 버튼에 도달, 포커스 링 표시, 대비 기준."),
  B("정직: 샘플·준비 중·가격 미정 표시, 관계 공개, 근거 없는 숫자 없음."),
  B("법적: 푸터 정책 링크, 법인 고지, Your Privacy Choices, 상품별 반품 조건.")
);

/* 11 */
add(H1("11. 남은 결정"),
  TBL(["#", "결정할 것", "권장안"], [
    ["1", "Community 히어로 문구", "‘Where Global Voices Meet Culture’로 교체"],
    ["2", "출시 국가 (실물)", "테스트 주문 후 2–3개 시장, 디지털·프로그램은 전 세계"],
    ["3", "첫 판매 흐름", "K-Career Entry Session + 검증된 실물 1개 + 무료 Lounge (Home 예시와 동일)"],
    ["4", "정책 게시", "정책 5종 Shopify 관리자에 붙여넣기 (원고 완료) + 스토어 이메일 contact@"],
    ["5", "공식 소셜 URL", "Instagram · YouTube 확정 후 헤더·푸터 동일 표시"],
    ["6", "인물 사진 권리", "인물별 승인 범위 기록 후 공개"]
  ], [0.3, 2, 4.1])
);

add(H1("부록. 목업 바로가기"),
  TBL(["화면", "목업 주소 (공유 링크 안)"], [
    ["Home · 연결 예시", "home.html · home.html#connect"],
    ["Studio · Article", "studio.html · article.html"],
    ["Curators · Profile", "curators.html · curator.html · curator.html?c=nmixx"],
    ["Community · Program · Member", "community.html · offer.html?o=k-career-entry · learn.html?s=home"],
    ["Shop · Product · Cart · Order", "shop.html · product.html?p=k-career-entry-session · cart.html · order.html"],
    ["Projects", "projects.html · project.html?p=fund"],
    ["About · Help · Policies", "about.html · help.html · policy.html?p=refund"],
    ["검토", "review.html · guide.html (?review=1로 검토 메모 보기)"]
  ], [2, 4.4]),
  LINKP(LINK)
);

module.exports = C;
if (require.main === module) build(process.argv[2] || "AuroraCurate_통합웹기획서.docx", "AuroraCurate.com 통합 웹 기획서", "AuroraCurate.com 통합 웹 기획서", C);
