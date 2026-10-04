const { P, H1, H2, H3, B, NL, NOTE, TBL, T, LINK, LINKP, cover, toc, build } = require("./lib");

const C = [];
const add = (...x) => x.forEach(i => Array.isArray(i) ? C.push(...i) : C.push(i));

add(cover({
  kicker: "AURORA SHOP · MASTER PLAN",
  title: "Shop 생태계 통합 기획서",
  sub: "Studio · Curators · Community가 모이는 곳 — 구조 · 상품 · 구매 · 권한 · 운영",
  meta: [
    ["문서", "Aurora Shop 생태계 통합 기획서 v1.0 (검토용)"],
    ["작성일", "2026-10-04"],
    ["작성", "수석 디자인 (Claude)"],
    ["대상", "대표님(Executive Producer), Codex 기획자, 제작자, 마케터"],
    ["관계 문서", "Studio 기획서 · Curators 기획서 · Community 기획서 v1.1 (이 문서는 세 문서를 품는 상위 문서)"],
    ["기준 목업", "auroracurate.com 최종 목업 — " + LINK],
    ["상태", "디자인·구조 확정용 기획서. 실제 결제·배송·국가·Tevello 권한·신청 접수는 운영 검증 전"]
  ]
}));
add(toc());

/* 1 ------------------------------------------------------------------ */
add(H1("1. 한눈에 보기"),
  P("Aurora의 네 세계 — **Studio · Curators · Community · Shop** — 는 하나의 생태계입니다. 대표님의 방향에 따라 이 기획서는 **Shop을 생태계의 수렴점**으로 정의합니다. Studio는 이야기로 욕구를 만들고, Curators는 신뢰할 수 있는 관점으로 선택의 이유를 만들며, Community는 대화와 배움으로 관계를 만듭니다. 이 모든 가치가 최종적으로 모이는 곳이 Shop의 **상품과 프로그램**입니다."),
  H2("1.1 세 문장 요약"),
  NL([
    "**무엇을:** Shop은 실물 상품(Ready now), 프로그램·경험(Programs), 함께 만드는 프로젝트(Fund · Together · Made for You), 편집 진열(Ranking · Curator’s Recommendation · Curation · Experience · Collaboration)을 한 곳에서 판매합니다.",
    "**어떻게:** Studio·Curators·Community의 모든 화면에는 ‘관계가 확인된’ Shop 입구가 설계되어 있고, 구매는 Shopify Checkout, 프로그램 이용은 Tevello, 주문 이후는 Shopify 주문 상태와 이메일로 이어집니다.",
    "**왜:** 신뢰로 만든 수요가 끊김 없이 구매로 이어질 때 Aurora는 콘텐츠·사람·커뮤니티를 지속 가능한 사업으로 만들 수 있기 때문입니다 — A World Connected by Experience."
  ]),
  H2("1.2 핵심 설계 원칙"),
  TBL(["원칙", "의미", "화면에서의 구현"], [
    ["모든 세계는 Shop으로 수렴", "각 세계는 고객이 구매할 준비가 되었을 때 바로 닿을 수 있는 Shop 입구를 가진다", "기사 끝 관련 상품, 프로필 Shop 탭, 프로그램 마켓, 분야 페이지의 상품, Highlights"],
    ["신뢰가 전환을 만든다", "가짜 수치·긴급성·거짓 관계로 전환을 만들지 않는다", "조회수·후기 수·‘거의 품절’·순위 번호 없음. 관계 없는 상품은 ‘Keep exploring’으로 구분"],
    ["관계는 사실만", "인물 옆 상품이 추천처럼 보이지 않게 한다", "Curator’s Recommendation은 문서화된 추천이 있을 때만. 없으면 정직한 빈 상태"],
    ["세 개의 축을 섞지 않음", "분야(9 Fields) · 편집 진열 · 거래 방식(Buy · Fund · Together · Made for You)은 서로 다른 축", "Shop 상단 4가지 거래 방식, 진열 컬렉션, 분야 탭을 분리"],
    ["좁고 완전한 첫 흐름", "많이 여는 것보다 끝까지 작동하는 흐름 하나가 먼저", "출시 권장: 검증된 실물 1개 + K-Career Entry Session + 무료 Lounge"],
    ["판매 가능 = Shopify가 판단", "가격·재고·옵션·판매 상태는 Shopify에서만 온다", "테마에 가격을 직접 쓰지 않음. 판매 불가 상품은 버튼 비활성 + 이유"],
    ["세계 최고의 쉬운 구매", "옵션·수량·국가·통화·배송·지원 안내가 분명해야 한다", "장바구니 국가 선택, 결제 전 안내, 주문 후 상태·도움 화면"]
  ], [1.3, 2.2, 2.9]),
  NOTE("‘모든 세계가 Shop으로 수렴’은 모든 방문을 구매로 몰아가라는 뜻이 아닙니다. 읽기·대화·발견도 완성된 경험이며, 구매할 준비가 된 순간에 막힘없이 Shop에 닿게 하는 것이 설계 목표입니다. 이 균형이 Aurora의 신뢰이자 장기 매출입니다.")
);

/* 2 ------------------------------------------------------------------ */
add(H1("2. 기획 의도"),
  H2("2.1 대표님 방향의 해석"),
  TBL(["대표님의 방향", "Shop 기획의 판단", "피해야 할 해석"], [
    ["Studio·Curators·Community의 목표는 Shop 판매", "각 세계에 ‘관계가 있는’ 판매 입구를 설계하고, 그 성과를 Shop에서 측정", "모든 기사·프로필에 구매 버튼을 반복 삽입"],
    ["Shop이 모든 생태계를 품는다", "Shop은 실물·프로그램·프로젝트·편집 진열을 한 구조 안에 담는 허브", "Shop을 일반 쇼핑몰로 축소"],
    ["경험을 사고파는 세계", "프로그램·경험을 실물과 같은 상품 체계로 판매 (Community 마켓과 같은 목록)", "누구나 입점하는 오픈 마켓"],
    ["글로벌 고객의 쉽고 안전한 구매", "Shopify Checkout·Shop Pay·국가별 안내, 확인된 범위만 약속", "모든 국가 배송·결제를 약속"],
    ["선별형 Production House", "Collaboration·Ranking·Curation은 Aurora의 편집 판단으로 운영", "판매량 순위·광고형 입점"]
  ], [1.7, 2.6, 2]),
  H2("2.2 Shop이 파는 것"),
  TBL(["판매 대상", "예", "왜 Aurora에서 사는가"], [
    ["Ready now 실물", "OHUI, AMOREPACIFIC, BIBLIAN, EpiLynx, e.l.f., Blushimmer, Downeast", "분야와 이야기로 선택된 물건 — Aurora의 관점이 담긴 선별"],
    ["Programs & experiences", "K-Career Entry Session, Seoul Beauty Route, 코스·코호트·워크숍·디지털", "한국·아시아로 가는 실질적인 다음 걸음"],
    ["Fund", "오리지널 영상·에디션 제작 후원", "만들어지는 과정에 참여"],
    ["Together", "그룹 주문(최소 인원 달성 시 진행)", "함께 고르는 릴리스"],
    ["Made for You", "맞춤 제작 의뢰", "나만의 버전을 Aurora 팀과 제작"],
    ["Editorial shelves", "Experience · Collaboration · Ranking · Curator’s Recommendation · Curation", "편집부가 고른 이유가 있는 진열"]
  ], [1.4, 2.6, 2.4]),
  H2("2.3 성공의 정의"),
  B("Studio·Curators·Community에서 들어온 고객이 관련 상품·프로그램을 막힘없이 찾는다."),
  B("상품 상세에서 옵션을 잘못 고르지 않고, 결제 전에 국가·배송·세금 안내를 이해한다."),
  B("구매 후 주문 상태·배송·프로그램 접근·지원을 스스로 찾는다."),
  B("같은 상품이 어느 입구에서 보이든 가격·상태·목적지가 같다."),
  NOTE("성과 수치는 출시 후 실제 데이터로만 보고합니다. 측정 설계는 14장에 정리했습니다.")
);

/* 3 ------------------------------------------------------------------ */
add(H1("3. 생태계 전체 구조 — 네 세계가 Shop으로 모이는 방식"),
  H2("3.1 생태계 순환"),
  P("**이야기(Studio) → 관점(Curators) → 관계(Community) → 선택(Shop) → 새로운 이야기.** 구매 경험과 고객의 이야기는 다시 Studio의 콘텐츠와 Community의 대화가 되어 순환합니다."),
  TBL(["세계", "만드는 가치", "Shop으로 가는 입구", "관계 문서"], [
    ["Studio", "욕구 — 읽고 싶고 갖고 싶은 이유", "기사 끝 관련 상품(한 곳), Highlights, 분야 페이지의 Objects & programs, Aurora Experience 코너", "Studio 기획서"],
    ["Curators", "신뢰 — 누가 왜 골랐는가", "프로필 Shop 탭, Curator’s Recommendation 컬렉션, Curator Highlights", "Curators 기획서"],
    ["Community", "관계 — 함께 배우고 경험", "프로그램 마켓(Shop Programs와 같은 목록), Host on Aurora, 프로그램 구매", "Community 기획서 v1.1"],
    ["Shop", "선택 — 실제로 사고 경험", "—", "이 문서"]
  ], [1, 1.8, 3, 1.2]),
  H2("3.2 세계별 판매 연결 장치"),
  TBL(["장치", "위치", "보여 주는 조건", "보이지 않을 때"], [
    ["Related object (기사 끝)", "Studio 기사 하단 한 곳", "기사와 상품의 관계가 메타필드로 연결되어 있을 때", "다음 읽기·대화만 표시"],
    ["Objects & programs", "분야 페이지 (field.html?f=)", "같은 분야의 판매 중·준비 중 항목", "‘아직 판매 중인 것이 없음’ + 개발 중 콘셉트"],
    ["Aurora Highlights", "Shop · Home", "Only on Aurora / Aurora 100 / Curator’s Pick 3장, 편집 승인 시", "명시적 빈 상태 (회색 박스 없음)"],
    ["Profile Shop 탭", "Curator 프로필", "협업이 합의되고 상품이 판매 승인된 경우", "정직한 빈 상태 + Curator’s Recommendation 링크"],
    ["Programs (한 목록 두 입구)", "Community 마켓 · Shop Programs", "content/offers.js → Shopify 상품", "상태별 버튼 (Open / Free / By application / Preview / Not yet open / Design sample)"],
    ["PDP의 네 세계 링크", "상품 상세 하단", "관계가 있으면 ‘Connected to this product’", "‘Keep exploring · 연결된 큐레이터·스토리 없음’"]
  ], [1.5, 1.4, 2.2, 1.9]),
  H2("3.3 시스템 구조"),
  TBL(["층", "화면", "시스템", "Aurora가 디자인 가능한 범위"], [
    ["탐색·선택", "Shop, 컬렉션, 상품 상세, 프로그램 상세, 분야, 검색", "Aurora 테마 (Shopify)", "전체"],
    ["장바구니", "cart — 옵션 변경, 수량, 배송 국가", "Aurora 테마", "전체"],
    ["결제", "Checkout", "Shopify 네이티브", "브랜드 설정 + 요금제가 허용하는 확장"],
    ["주문 이후", "Thank-you / 주문 상태 / 고객 계정", "Shopify 네이티브", "브랜드 설정 + 확장 블록(요금제 확인)"],
    ["프로그램 이용", "회원 홈, 강좌, 라이브러리, 커뮤니티", "Tevello", "앱 설정 범위 (목업은 제안)"],
    ["프로젝트·의뢰 접수", "Fund · Together · Made for You 요청, 파트너 제안", "Aurora 테마 + 접수 도구(미연결)", "폼·결과 화면"],
    ["라이브 커머스", "Shop Live", "LiveMeUp (지원 범위 확인 필요)", "상태별 표시(없음·예정·라이브·다시보기)"]
  ], [1.1, 2.3, 1.6, 2]),
);

/* 4 ------------------------------------------------------------------ */
add(H1("4. Shop 화면 구조"),
  H2("4.1 Shop 홈 구성 (위에서 아래로)"),
  TBL(["순서", "구성", "목적"], [
    ["1", "Hero — Shop the Aurora Experience, 검색, 커버 이미지", "Aurora의 관점과 실제로 살 수 있는 것을 첫 화면에서 함께 보여 줌"],
    ["2", "Four ways — Ready now · Fund · Together · Made for You", "거래 방식의 차이를 먼저 이해 (상품 카테고리와 분리)"],
    ["3", "Ready now — On sale today (분야 탭) + 전체 필터 링크", "Shopify에서 실제 판매 중인 실물"],
    ["4", "Programs & experiences — Community와 같은 카드", "프로그램·경험을 실물과 같은 무게로"],
    ["5", "Aurora Highlights — 배지 카드 3장", "Only on Aurora / Aurora 100 / Curator’s Pick — 각 이야기·인물·대화로 연결"],
    ["6", "Brand strip (계약된 브랜드만)", "승인 전에는 숨김"],
    ["7", "Stories becoming objects — 편집 진열 5개", "Experience · Collaboration · Ranking(Editorial selection) · Curator’s Recommendation · Curation"],
    ["8", "How Aurora connects — 네 세계 순환", "Shop이 생태계의 일부임을 이해"],
    ["9", "Shop Live", "라이브 커머스 상태 (현재 없음)"],
    ["10", "Partners — Bring your brand into the story", "브랜드 협업 제안 입구"]
  ], [0.5, 2.8, 3.2]),
  H2("4.2 세 개의 축"),
  TBL(["축", "값", "어디서 쓰나"], [
    ["분야 (Nine Fields)", "Entertainment · Icons · Beauty · Fashion · Hustle · Taste · Lifestyle · Travel · Wellness", "Ready now 탭, 컬렉션 필터, 분야 페이지, 검색"],
    ["편집 진열", "Experience · Collaboration · Ranking · Curator’s Recommendation · Curation", "Shop 선반, collection.html?c="],
    ["거래 방식", "Ready now(즉시 구매) · Fund(후원) · Together(그룹) · Made for You(맞춤)", "Shop ‘Four ways’, Projects"]
  ], [1.3, 3, 2.2]),
  H2("4.3 컬렉션 화면"),
  B("컬렉션 탭: Ready now(라이브 카탈로그) · Ranking · Curator’s Recommendation · Curation · Aurora Experience · Collaboration"),
  B("필터: 분야 · 유형(Objects/Programs) · 판매 상태(Available now / Not yet open), 적용된 필터 칩과 ‘Clear all’"),
  B("결과 없음: ‘이 조건의 항목이 아직 없음’ + 필터 해제 + 해당 분야 페이지로 이동"),
  B("편집 컬렉션의 샘플 항목은 ‘Design sample · Not for sale’로 표시"),
  NOTE("Ranking은 판매 순위가 아니라 ‘Editorial selection’입니다. 판매 데이터 기반 순위를 주장하지 않습니다.")
);

/* 5 ------------------------------------------------------------------ */
add(H1("5. 상품 체계"),
  H2("5.1 현재 연결된 실물 상품 (Shopify에서 읽은 데이터)"),
  TBL(["브랜드", "상품", "분야", "옵션", "가격(USD)"], [
    ["OHUI", "The First Geniture Lipstick", "Beauty", "Shade 5", "93.35"],
    ["OHUI", "Real Color Eyebrow Pencil", "Beauty", "Shade 2", "55.80"],
    ["AMOREPACIFIC", "Time Response Complete Cushion Refill SPF50+/PA+++", "Beauty", "Shade 3", "166.60"],
    ["BIBLIAN", "Olisilk Deep Care Intensive Hair Mask", "Beauty", "200 ml", "39.00"],
    ["BIBLIAN", "Olisilk Glow Keeper Hair Essence", "Beauty", "100 ml", "45.00"],
    ["EpiLynx", "Peptide Eye Cream", "Wellness", "15 ml", "46.00"],
    ["e.l.f.", "Power Grip Primer", "Beauty", "Size 3", "9.45–33.75"],
    ["Blushimmer", "Embroidered Travel Cosmetic Pouch", "Travel", "Colour 5", "25.58–27.36"],
    ["Downeast", "Essential Tee", "Fashion", "Size × Colour", "20.00"]
  ], [1.2, 2.8, 0.9, 1.1, 1]),
  NOTE("가격은 목업 제작 시 Shopify에서 읽은 값이며 출시 가격 확정이 아닙니다(특히 OHUI US$93.35). 공급·재고·배송 검증 후 대표 승인으로 확정합니다."),
  H3("확인된 Shopify 데이터 이슈"),
  B("e.l.f. Power Grip Primer: 정가(compare-at)가 판매가보다 낮게 입력됨 → 정가 제거 또는 수정"),
  B("BIBLIAN 상품의 브랜드명(vendor)이 ‘pwygyh-mg’로 입력됨 → ‘BIBLIAN’으로 수정"),
  B("Lip Serum: 활성 상태이나 스토어 미게시 → 판매 의도 확인"),
  H2("5.2 프로그램·경험 상품"),
  TBL(["프로그램", "유형", "상태", "가격"], [
    ["K-Career Entry Session™ (Asia Lab)", "Experience · 60분 1:1 온라인", "Open (Shopify 판매 상품)", "US$99"],
    ["Seoul Beauty Route Session™ (Asia Lab)", "Experience · 60분 온라인", "Not yet open", "US$50 (표시값)"],
    ["Aurora Lounge", "Community", "Free to join", "무료"],
    ["Honorary Reporters’ Desk", "Community", "By application", "신청 무료"],
    ["K-Career Training", "Cohort", "By application", "합격 시 안내"],
    ["Entertainment Builder Preview", "Course", "Preview · not on sale", "출시 시 확정"],
    ["그 외 8개", "Community·Cohort·Course·Workshop·Digital·Experience", "Design sample", "출시 시 확정"]
  ], [2.4, 2, 1.6, 1.2]),
  P("프로그램의 정의·권한·여정은 **Community 기획서 v1.1**을 따릅니다. Shop에서는 같은 카드와 같은 상세 페이지로 판매합니다."),
  H2("5.3 상품 상태"),
  TBL(["상태", "Shop 표시", "구매 버튼"], [
    ["판매 중", "가격 + View/Book", "Add to cart · Buy it now"],
    ["옵션 품절", "해당 옵션 취소선, 다른 옵션 선택 가능", "Sold out (비활성) + 이유"],
    ["준비 중", "Not yet open", "비활성 + 알림 신청"],
    ["디자인 샘플", "Design sample · Not for sale", "없음"],
    ["초안(Draft)", "어디에도 표시하지 않음", "—"]
  ], [1.4, 2.6, 2.4])
);

/* 6 ------------------------------------------------------------------ */
add(H1("6. 상품 상세(PDP) 구성"),
  P("구매에 필요한 정보가 먼저, 선정 이유와 관계는 그다음입니다."),
  TBL(["순서", "구성", "원칙"], [
    ["1", "갤러리 (썸네일 + 대표 이미지)", "실제 상품 사진. 사진을 못 불러오면 오로라 텍스처 + 상품명 (회색 박스 금지)"],
    ["2", "브랜드 · 분야 · 상품명 · 용량", "분야 링크로 해당 분야 페이지 이동"],
    ["3", "가격 (USD)", "Shopify 가격만. 정가·할인 표시는 실제 데이터가 있을 때만"],
    ["4", "옵션 선택 · 수량", "선택한 옵션이 이미지·가격에 반영. 품절 옵션은 취소선"],
    ["5", "Add to cart · Buy it now", "판매 불가 시 비활성 + 이유"],
    ["6", "배송·세금 안내", "‘Ships from Korea; 목적지·세금·관세는 결제 전 확정’ / 프로그램은 ‘온라인, 배송 없음’"],
    ["7", "Trust: Secure checkout · Shipping · Returns", "정책 링크"],
    ["8", "Details (접이식)", "성분·사용법·사이즈 등"],
    ["9", "Why it’s in Aurora (편집자 노트)", "‘셀럽·큐레이터 보증이 아님’ 명시"],
    ["10", "네 세계 링크", "관계 있으면 ‘Connected’, 없으면 ‘Keep exploring’"],
    ["11", "Community reviews", "구매 확인된 후기만. 없으면 ‘아직 없음’"],
    ["12", "You may also like", "같은 분야·유형의 판매 중 상품"]
  ], [0.5, 2.4, 3.6]),
  NOTE("프로그램 상품(PDP)에는 ‘Community에서도 보기 — 같은 프로그램, 구매 후 과정 안내’ 링크를 둡니다. 모바일 하단 고정 구매 바는 옵션·오류를 가리지 않는 범위에서 출시 후 검토합니다.")
);

/* 7 ------------------------------------------------------------------ */
add(H1("7. 구매 여정과 예외 상태"),
  H2("7.1 정상 흐름 (J02)"),
  NL([
    "Shop · 검색 · 분야 · 기사 · 프로필에서 상품 발견",
    "상품 상세에서 옵션·수량 선택 → Add to cart (방금 담은 상품 확인 패널)",
    "장바구니에서 옵션 변경·수량·삭제, **배송 국가 선택**, 소계·배송/세금은 결제 시 안내",
    "Check out → Shopify Checkout 안내(연락처·배송 → 배송비·세금·관세 → 결제수단 → 확인)",
    "주문 확인(Thank-you) → 주문 상태 → 배송 추적",
    "도움말: 주문 찾기, 반품, 프로그램 접근, 문의"
  ]),
  H2("7.2 예외 상태"),
  TBL(["상황", "고객 안내", "복구 행동"], [
    ["옵션 품절 (PDP)", "이 옵션은 품절, 다른 옵션은 구매 가능", "다른 옵션 선택"],
    ["담은 뒤 품절 (장바구니)", "담은 뒤 품절됨, 합계에서 제외", "다른 옵션 선택 또는 삭제"],
    ["수량 변경 실패", "그 수량을 지금 담을 수 없음, 마지막 정상 수량 유지", "더 적은 수량 / 문의"],
    ["배송 미확인 국가", "이 국가의 배송은 아직 확인되지 않음", "장바구니 유지 · 배송 문의 · 다른 국가"],
    ["결제 거절", "주문이 생성되지 않음, 장바구니 저장", "다른 결제수단 · 카드사 확인"],
    ["배송 불가 주소", "이 주소로는 아직 배송 불가, 청구 없음", "온라인 프로그램 보기 · 배송 문의"],
    ["빈 장바구니", "아직 담은 것이 없음", "Ready now · 프로그램"],
    ["컬렉션 결과 없음", "이 조건의 항목 없음", "필터 해제 · 분야 페이지"]
  ], [1.6, 2.6, 2.2]),
  H2("7.3 구매 이후"),
  TBL(["구매 유형", "주문 확인 화면", "다음 단계"], [
    ["실물", "Confirmed → Preparing → Shipped → Delivered", "배송 추적, 반품·문의"],
    ["코스·디지털", "Program access: Shopify 결제 → Tevello 권한 추가 → 시작", "My learning (같은 이메일로 로그인)"],
    ["경험·세션", "Paid · time not yet booked", "Asia Lab 이메일로 시간 선택 (날짜·시간대·링크·변경 방법 안내)"]
  ], [1.2, 2.8, 2.4]),
  NOTE("결제·주문 상태 화면은 Shopify 네이티브입니다. 목업은 참고 디자인이며, 실제로는 브랜드 설정과 요금제가 허용하는 확장 블록만 바꿀 수 있습니다.")
);

/* 8 ------------------------------------------------------------------ */
add(H1("8. Fund · Together · Made for You"),
  TBL(["방식", "고객이 하는 일", "고객이 지불·약속하는 범위", "상태"], [
    ["Fund", "오리지널 프로젝트를 후원하고 리워드를 받음", "후원 시 결제, 목표 미달 시 전액 환불(제안)", "준비 중 · 참여 가능 · 결제 전 확인 · 종료"],
    ["Together", "그룹 주문에 참여", "최소 인원 달성 시에만 청구(제안)", "준비 중 · 참여 가능 · 종료(달성/미달)"],
    ["Made for You", "맞춤 제작 요청 → 검토 → 견적 → 제작", "요청은 무료·주문 아님, 서면 견적 수락 후 시작", "요청 가능 · 준비 중 · 일시 중지"]
  ], [1.2, 2, 2.4, 1.8]),
  B("목표 금액·참여 수·마감은 실제 결제 데이터일 때만 표시합니다. 목업의 수치는 ‘Simulated’로 표시했습니다."),
  B("후원은 편집 영향력이나 제작 참여권을 사지 않습니다."),
  B("결제 방식(사전 청구+환불 / 조건부 청구)은 Shopify의 선주문·조건부 결제 옵션 확인 후 대표가 결정합니다."),
  NOTE("권장: 출시 때는 Fund·Together를 관심 신청 명단으로 운영하고, 실물 상품 배송이 안정된 뒤 첫 프로젝트를 엽니다.")
);

/* 9 ------------------------------------------------------------------ */
add(H1("9. 대상과 권한"),
  H2("9.1 Shop의 대상"),
  TBL(["대상", "할 수 있는 것", "자동으로 얻지 않는 것"], [
    ["방문자", "탐색, 검색, 장바구니, 게스트 결제(설정 확인)", "회원 공간, 프로그램 접근"],
    ["회원(로그인)", "주문 내역, 주문 상태, 프로그램 접근(구매한 것만)", "구매하지 않은 프로그램"],
    ["구매자", "구매한 상품의 배송·반품·후기(구매 확인 후)", "Curator 지위, Aurora 100 선정, 할인 등급"],
    ["프로그램 구매자", "해당 프로그램의 Tevello 공간", "다른 프로그램·코호트"],
    ["브랜드·파트너", "협업 제안 (Partner with us)", "자동 입점, 광고 노출, 순위"],
    ["큐레이터", "합의된 Curator’s Recommendation·협업 상품", "모든 상품 추천 권한, 매출 전체 열람"],
    ["호스트", "계약한 프로그램 운영", "다른 프로그램·전체 회원 정보"]
  ], [1.3, 2.7, 2.4]),
  H2("9.2 운영자 권한 범위"),
  TBL(["담당", "하는 일", "주지 않는 것"], [
    ["머천다이저", "상품 등록·옵션·진열·컬렉션·표시 영역", "편집 선정, 가격 승인"],
    ["커머스 운영", "주문·배송·반품·환불", "콘텐츠·선정"],
    ["편집자", "Highlights·관계 연결·편집 노트", "가격·재고"],
    ["교육·커뮤니티", "프로그램 운영·Tevello 권한", "주문 환불"],
    ["대표", "가격·브랜드·권리·공개 승인", "—"]
  ], [1.3, 2.7, 2.4]),
  NOTE("프로그램 권한의 부여·회수 원칙(확정 주문만 권한 생성, 중복 방지, 이메일 소유 확인, 역할 종료 시 개인 구매 유지)은 Community 기획서 v1.1의 5장을 그대로 적용합니다.")
);

/* 10 ----------------------------------------------------------------- */
add(H1("10. 운영 데이터와 노출 구조"),
  H2("10.1 한 번 입력하면 모든 곳에"),
  P("직원이 상품 하나를 등록하면 카드·분야 페이지·검색·상세·Highlights에 같은 데이터가 쓰입니다. 같은 정보를 화면마다 손으로 복사하지 않습니다(목업 Staff board로 시연)."),
  TBL(["필드", "원천", "사용처"], [
    ["상품명·브랜드·설명·이미지", "Shopify 상품", "카드, 상세, 검색"],
    ["옵션·가격·재고·판매 상태", "Shopify 변형·재고", "상세, 장바구니, 품절 표시"],
    ["분야 (aurora.field, 제안)", "상품 메타필드", "분야 탭·페이지·필터"],
    ["표시 영역 (aurora.display_areas)", "메타필드 (블로그와 같은 방식)", "Ready now, Highlights, 분야, 검색"],
    ["관계 (studio·curator·community)", "상품 메타필드", "PDP 네 세계 링크, 기사 끝 관련 상품"],
    ["편집자 노트", "메타필드", "Why it’s in Aurora"],
    ["프로그램 정보", "content/offers.js → Shopify 상품 + Tevello", "Community 마켓·Shop Programs·상세"]
  ], [2, 2, 2.4]),
  H2("10.2 상태별 노출 규칙"),
  B("Draft: 어디에도 표시하지 않음"),
  B("품절: 카드 ‘Sold out’, 상세 버튼 비활성, 다른 옵션 유지"),
  B("사진 없음: 오로라 프레임 + 상품명"),
  B("표시 영역 미지정: 상품은 있으나 진열되지 않음 → 운영 점검 목록에 표시")
);

/* 11 ----------------------------------------------------------------- */
add(H1("11. 글로벌 커머스"),
  TBL(["항목", "현재 상태", "출시 전 할 일"], [
    ["판매 국가", "직원 테스트에서 한국 결제 화면만 확인", "Shopify Markets에서 출시 국가 확정, 국가별 테스트 주문 1건"],
    ["통화", "USD 표시", "현지 통화 표시 여부 결정 (Markets)"],
    ["결제수단", "Shopify Checkout · Shop Pay 노출 확인", "국가별 표시 수단 확인, 전 세계 동일 약속 금지"],
    ["배송·관세", "한국 출고", "지역별 배송 기간·관세 부담 정책 문구 승인"],
    ["언어", "영어 기본, 한국어 긴 문장 레이아웃 시험", "번역 완료 전 언어 선택지로 노출 금지"],
    ["디지털·프로그램", "배송 불필요", "국가별 결제 가능 여부만 확인 → 첫날부터 글로벌 판매 권장"]
  ], [1.2, 2.4, 2.8]),
  NOTE("권장: 실물은 한국 + 오디언스가 이미 있는 2–3개 시장(인도·싱가포르·미국)부터, 각 테스트 주문 후 개방. 온라인 프로그램·디지털은 첫날부터 전 세계.")
);

/* 12 ----------------------------------------------------------------- */
add(H1("12. 신뢰 원칙"),
  TBL(["금지", "대신"], [
    ["조회수·판매량·후기 수·평점 꾸미기", "구매 확인 후기만, 없으면 ‘아직 없음’"],
    ["‘거의 품절’, 카운트다운, ‘N명이 보는 중’", "실제 상태(품절·예약)만"],
    ["순위 번호", "Ranking · Editorial selection"],
    ["인물 옆 상품 = 추천처럼 보이기", "문서화된 추천만 Curator’s Recommendation, 그 외 ‘Keep exploring’"],
    ["미확정 가격·조건을 문구로 채우기", "‘판매 전에 공개’ / ‘Price set at launch’"],
    ["샘플을 실제 판매처럼", "‘Design sample · Not for sale’"],
    ["Asia Lab 실적을 Aurora 실적처럼", "수행 주체를 상품마다 표시"]
  ], [3, 3.4])
);

/* 13 ----------------------------------------------------------------- */
add(H1("13. 현재 상태와 검증 항목"),
  H2("13.1 목업 완료"),
  B("Shop 홈, 컬렉션(필터·결과 없음), 상품 상세(품절 시연), 장바구니 7개 상태, 결제 안내, 주문 상태 6개, 도움말"),
  B("Fund · Together · Made for You 상세 (상태별), 프로그램 상세·Community 마켓 공유"),
  B("Staff board — 상품·프로그램·기사 입력 → 노출 결과"),
  H2("13.2 출시 전 검증"),
  TBL(["항목", "방법", "담당"], [
    ["실제 결제·환불", "국가별 테스트 주문 1건, 환불 1건", "Codex · 제작자"],
    ["배송·관세 안내", "지역별 실제 견적 확인", "운영"],
    ["상품 사진", "Shopify CDN 이미지로 정상 화면 캡처 (작업 환경 허용 필요)", "디자인"],
    ["메타필드", "aurora.field · display_areas · 관계 필드 생성과 입력", "제작자"],
    ["Tevello 자동 등록", "프로그램 구매 후 접근 확인", "Codex"],
    ["Shopify 데이터 정리", "e.l.f. 정가, BIBLIAN vendor, Lip Serum 게시", "머천다이저"],
    ["주문 이후 확장 블록", "요금제에서 Thank-you 확장 가능 여부", "제작자"]
  ], [2, 3, 1.4])
);

/* 14 ----------------------------------------------------------------- */
add(H1("14. 측정 설계 (출시 후 실제 데이터로만)"),
  TBL(["질문", "측정 항목"], [
    ["어느 세계가 Shop으로 고객을 데려오나", "입구별(기사·프로필·마켓·분야·Highlights) 상품 상세 도착"],
    ["상세에서 구매로 이어지나", "상세 → 장바구니 → 결제 시작 → 주문"],
    ["어디서 막히나", "품절·국가 미확인·결제 거절 화면 도달"],
    ["프로그램은 끝까지 도착하나", "구매 → 첫 수업 도달"],
    ["구매 후 스스로 해결하나", "도움말·주문 상태 사용, 문의 유형"]
  ], [2.6, 3.8]),
  NOTE("이 항목은 Shopify 분석·이벤트로 측정합니다. 공개 화면에는 수치를 표시하지 않습니다.")
);

/* 15 ----------------------------------------------------------------- */
add(H1("15. 대표님 결정 사항"),
  TBL(["#", "결정할 것", "권장안 (수석 디자인)"], [
    ["1", "출시 국가", "실물: 한국 + 2–3개 시장(테스트 주문 후). 디지털·프로그램: 전 세계"],
    ["2", "첫 판매 흐름", "검증된 실물 1개(OHUI 후보) + K-Career Entry Session + 무료 Lounge"],
    ["3", "출시 가격", "Shopify 값과 공급가 확인 후 상품별 승인 (OHUI US$93.35 포함)"],
    ["4", "Fund · Together 결제 규칙", "출시 시 관심 명단, 첫 실물 배송 안정 후 개시"],
    ["5", "편집 진열 이름", "Ranking(Editorial selection) · Curator’s Recommendation · Curation 유지"],
    ["6", "Curator’s Recommendation 기준", "서면으로 확인된 추천만. 협업 상품과 편집 소개 구분"],
    ["7", "반품·환불·배송 정책 문구", "승인된 원문으로 도움말 템플릿 채우기"],
    ["8", "Shop Live", "LiveMeUp 기능 확인 후 개시 시점 결정"],
    ["9", "브랜드 스트립", "계약 완료 브랜드만 노출"]
  ], [0.4, 1.8, 4.2])
);

/* 16 ----------------------------------------------------------------- */
add(H1("16. 출시 전 필수 검수 시나리오"),
  NL([
    "Studio 기사 → 관련 상품 → 상세 → 장바구니가 끊김 없이 이어진다 (관계가 없으면 상품이 나오지 않는다).",
    "Curator 프로필 Shop 탭은 합의된 상품만 보이고, 없으면 정직한 빈 상태가 보인다.",
    "Community와 Shop의 같은 프로그램은 상태·가격·목적지가 일치한다.",
    "옵션을 바꾸면 이미지·가격·장바구니 변형이 정확히 바뀐다.",
    "품절 옵션은 구매 불가, 다른 옵션은 구매 가능하다.",
    "배송 미확인 국가에서는 결제가 진행되지 않고 이유가 보인다.",
    "결제 실패는 주문을 만들지 않고 장바구니를 유지한다.",
    "프로그램 구매 후 같은 이메일 계정에 권한이 한 번만 추가된다.",
    "Draft·사진 없음·표시 영역 미지정이 규칙대로 처리된다.",
    "390·360 모바일에서 옵션·수량·버튼·오류가 정상이다."
  ])
);

/* 부록 --------------------------------------------------------------- */
add(H1("부록. 목업 화면 대응표와 관계 문서"),
  P("모든 화면은 목업 첫 화면의 검토 허브(Review hub)에서 열 수 있습니다."),
  LINKP(LINK),
  TBL(["화면", "내용"], [
    ["Shop", "Hero·Four ways·Ready now·Programs·Highlights·편집 진열·Live·Partners"],
    ["Collections", "편집 컬렉션 + 필터 + 결과 없음"],
    ["Product", "상세, ?sim=soldout 품절 시연"],
    ["Cart", "7개 상태: 담김·빈·품절·수정 실패·국가 미확인·결제 안내"],
    ["Order status", "6개 상태: 확인·배송·프로그램·세션·결제 거절·배송 불가"],
    ["Help", "주문·배송·반품·프로그램 접근·커뮤니티 안전·문의"],
    ["Projects · Project detail", "Fund · Together · Made for You"],
    ["Program detail · Member area", "Community 기획서 참조"],
    ["Staff board", "입력 → 노출 결과, 데이터 계약"]
  ], [2, 4.4]),
  TBL(["관계 문서", "다루는 것"], [
    ["Studio 기획서", "이야기·편집 IP(Aurora 100·Global Faces 100)·기사 템플릿·Shop 연결 규칙"],
    ["Curators 기획서", "인물·큐레이터 정의, 프로필, 협업 흐름, Curator’s Recommendation"],
    ["Community 기획서 v1.1", "공간·프로그램 마켓·대상별 권한·부여 방식·운영"]
  ], [2, 4.4])
);

build(process.argv[2] || "Aurora_Shop_기획서.docx", "Aurora Shop 생태계 통합 기획서", "Aurora Shop 통합 기획서", C);
