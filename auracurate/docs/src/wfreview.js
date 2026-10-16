// Review of the Aurora wireframe theme (AURORA WIREFRAME PREVIEW 20261015) against the three mockup versions
const fs = require("fs"), path = require("path");
const { Paragraph, ImageRun, TextRun, AlignmentType } = require("docx");
const { P, H1, H2, H3, B, NL, NOTE, TBL, LINK, cover, toc, build } = require("./lib");
const C = []; const add = (...x) => x.forEach(i => Array.isArray(i) ? C.push(...i) : C.push(i));
const DIR = path.join(__dirname, "..", "wfjpg");
function IMG(name, caption, widthIn) {
  const f = path.join(DIR, name + ".jpg"); if (!fs.existsSync(f)) return [];
  const buf = fs.readFileSync(f);
  let i = 2, w = 1200, h = 900; while (i < buf.length) { if (buf[i] !== 0xFF) { i++; continue; } const m = buf[i + 1], len = buf.readUInt16BE(i + 2); if (m >= 0xC0 && m <= 0xC3) { h = buf.readUInt16BE(i + 5); w = buf.readUInt16BE(i + 7); break; } i += 2 + len; }
  const outW = Math.round((widthIn || 6.2) * 96), outH = Math.round(outW * h / w);
  return [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 40 }, children: [new ImageRun({ type: "jpg", data: buf, transformation: { width: outW, height: outH }, altText: { title: caption, description: caption, name } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: caption, size: 17, color: "4A4D5C" })] })];
}

add(cover({
  kicker: "AURORA · WIREFRAME REVIEW",
  title: "에코시스템 초기 설계 초안 검토",
  sub: "AURORA WIREFRAME PREVIEW 20261015 — 잘된 것 · 수정할 것 · 더하면 좋은 기획",
  meta: [
    ["검토 대상", "Shopify 테마 ‘AURORA WIREFRAME PREVIEW 20261015’ (미게시, 10-16 최종 수정) = aurora-wireframe.vercel.app 와 같은 화면"],
    ["비교 기준", "Version A (10-02 파이널 이전) · Version B (10-03 파이널 v1) · 현재 파이널 (10-04)"],
    ["검토일", "2026-10-16"],
    ["검토", "수석 디자인 (Claude)"],
    ["대상", "와이어프레임 담당자, 대표님, Codex 기획·제작"],
    ["현재 파이널", LINK],
    ["이전 버전 보관함", "https://claude.ai/artifact/V6mSRv4c5n2NwSJeagTYMf"]
  ]
}));
add(toc());

/* 0 */
add(H1("0. 검토 방법과 범위"),
  P("Vercel 주소는 이 작업 환경에서 열리지 않아, **Shopify에 올라간 같은 와이어프레임 테마를 관리자 API로 직접 읽었습니다.** 화면 코드(레이아웃·스타일·스크립트)와 이미지를 내려받아 그대로 다시 띄운 뒤 화면을 보고, 코드도 함께 읽었습니다."),
  TBL(["항목", "내용"], [
    ["읽은 파일", "layout/aurora-wireframe · awf-screen 5종 · awf-style 5종 · awf-home/studio/curators/community/shop/live/bridge/native-shell 스크립트 · native-data · 상품/기사 상세"],
    ["본 화면", "5개 메인 화면(Home · Studio · Curators · Community · Shop) + 상세 21개 경로(기사, 프로필, Selection, Lounge, 글, 프로그램, 예약, 신청, Fund, Together, Made for You, Collaboration 등)"],
    ["화면 폭", "1440 · 390 — 다섯 화면 모두 스크립트 오류 0, 가로 넘침 0"],
    ["못 본 것", "큰 이미지 3장(film · portrait · workshop)과 Pretendard 글꼴은 API 크기 제한으로 받지 못해 자리표시로 대체. ‘View connected data’(실데이터 모드)는 외부 서버(Railway)를 이 환경에서 부를 수 없어 코드로만 확인"]
  ], [1.2, 5.2]),
  NOTE("이 문서의 화면 캡처는 위 방식으로 다시 띄운 것입니다. 사람 사진 자리는 실제 테마에서는 사진이 보입니다.")
);

/* 1 */
add(H1("1. 총평"),
  P("**구조와 정직함은 지금까지의 어떤 버전보다 깊고, 첫인상과 법적 마감은 현재 파이널보다 약합니다.** 담당자는 각 세계 안의 운영 규칙(권한, 프로그램 상태, 예약, Fund·Together 조건, 협업 기여)을 매우 꼼꼼하게 설계했습니다. 반면 처음 온 사람이 Aurora를 5초 안에 이해하는 장치, 푸터·정책, 협업 접수 같은 ‘사이트의 바깥 틀’은 비어 있습니다."),
  H2("1.1 한눈에"),
  TBL(["구분", "판단", "한 줄 이유"], [
    ["정보 구조 (세계 안)", "**우수 — 채택**", "세계마다 왼쪽 메뉴, 같은 카드 문법, 상세 → 연결 → 다음 행동이 일관됨"],
    ["정직 표기", "**우수 — 채택**", "Design sample · Not on sale · No real payment · ‘추천·임명 아님’ 문구가 모든 곳에"],
    ["Community 권한 설계", "**매우 우수 — 채택 후 단순화**", "역할 10 · 회원 등급 5 · 기자 등급 9 · 공간 접근 상태 9, 공간이 열리는 4가지 이유"],
    ["프로그램·예약", "**우수 — 채택**", "7개 상태, 시간대 선택 예약, 신청 → 승인 → 등록 흐름"],
    ["Fund · Together · Made for You", "**매우 우수 — 채택**", "보상≠지분, 목표 미달 환불, 관심≠주문 등 소비자 조건이 명확"],
    ["Home 5초 이해", "**부족 — 수정 필수**", "첫 화면이 영화 한 편 소개. Aurora와 네 세계가 무엇인지 말하지 않음"],
    ["푸터·정책·법적 고지", "**부족 — 수정 필수**", "정책 링크 없음, Help·Contact가 눌리지 않음"],
    ["협업 접수", "**혼동 — 수정 필수**", "‘Partner with us’가 고객 주문 제작(Made for You)으로 연결"],
    ["시스템 결정", "**충돌 — 결정 필요**", "Community를 자체 서버(Railway)로 설계 — 사업계획서·기획서의 Tevello와 다름"],
    ["Shopify 제작 적합성", "**보완 필요**", "화면 전체가 큰 스크립트로 그려져 편집·검색 노출·속도에 불리"]
  ], [1.7, 1.6, 3.1])
);

/* 2 */
add(H1("2. 세 버전 목업과 나란히 비교"),
  TBL(["영역", "Version A · 10-02", "Version B · 10-03", "현재 파이널 · 10-04", "와이어프레임 · 10-15"], [
    ["Home 첫 화면", "로고·로크업·‘Culture, seen differently.’", "슬로건 확정, 같은 제목", "**네 동사 제목 + 네 개의 문 + 연결 예시**", "영화 한 편 대형 소개 + 보조 2개"],
    ["세계 간 길찾기", "상단 메뉴", "상단 메뉴", "상단 메뉴 + **길잡이 막대**", "상단 메뉴 + **세계별 왼쪽 메뉴**"],
    ["연결 보여주기", "생태계 이미지", "같음", "‘One story. Four doors.’ (K-Career)", "**‘The making edit’** (이야기·키트·코스·대화)"],
    ["Studio", "원본 화면 재구성", "같음", "같음 + 길잡이", "**왼쪽 7개 메뉴**, 기사 끝 ‘다음 이야기·관련 컬렉션’"],
    ["Curators", "로스터·프로필", "+ NMIXX 데이터 세트, 제안 경로 문구", "같음", "**활동 기록 타임라인, 외부 출처(IMDb) 표기, 관련 인물**"],
    ["Community", "원래 Figma 구성", "읽기·참여·배움 3갈래, 프로그램 시장, 회원 공간 16상태(Tevello)", "같음", "**권한 미리보기(역할·등급·접근상태), 참여 가이드, 내 공간**(자체 서버)"],
    ["Shop", "진열·PDP", "+ 장바구니 7상태·주문 6상태·컬렉션", "+ **상품별 반품 조건**", "**왼쪽 7개 메뉴, Collaboration, Fund·Together·MFY 상세 조건**"],
    ["예약", "—", "결제 후 ‘시간 미예약’ 상태", "같음", "**시간대 선택 예약 3단계 (Cowlendar)**"],
    ["협업 접수", "한 번에 보내는 폼", "확인 단계 + 결과 8상태", "같음", "없음 (Made for You로 대체)"],
    ["푸터·정책", "기본 링크", "Help·리뷰 허브", "**정책 줄·법인 고지·정책 6종·Entities**", "법인 저작권 줄만"],
    ["모바일", "점검", "점검", "점검 (360까지)", "390 넘침 없음, 상단 메뉴 잘림"],
    ["실데이터 연결", "Shopify 상품", "같음", "같음", "**Shopify 블로그·상품 + 메타필드 + 외부 서버**"]
  ], [1.1, 1.2, 1.3, 1.4, 1.5])
);

/* 3 */
add(H1("3. 잘된 것 — 그대로 가져갈 것"),
  H2("3.1 세계마다 왼쪽 메뉴 — 세계 안의 길찾기"),
  TBL(["세계", "메뉴"], [
    ["Studio", "Discover · Trending · Exclusive · Aurora Experience · Ranking · Aurora Pick · Nine Tails"],
    ["Curators", "Discover · Curated edits · Selections · People & perspectives · (Studio로)"],
    ["Community", "Discover · Lounge · Programs · My spaces"],
    ["Shop", "Aurora Pick · Products · Programs · Collaboration · Create with Aurora · Ranking · Aurora Edit · (Studio · Curators로)"]
  ], [1.2, 5.2]),
  P("세계가 커져도 길을 잃지 않는 구조입니다. 모바일에서는 가로 탭으로 바뀝니다. 현재 파이널의 ‘길잡이 막대’(네 세계 사이)와 함께 쓰면 **세계 사이 + 세계 안** 두 층의 길찾기가 완성됩니다."),
  ...IMG("wf-studio", "Studio — 왼쪽 메뉴와 ‘Hot right now’"),
  H2("3.2 ‘The making edit’ — 연결을 한 블록에"),
  P("하나의 이야기(‘A day of making’) 옆에 **도구(키트) · 배움(Entertainment Builder 코스) · 대화(Lounge 글)**를 나란히 붙였습니다. 그리고 “키트는 선택이며 코스에 포함되지 않는다”고 밝혔습니다. 우리의 ‘하나의 이야기, 네 개의 문’과 같은 생각을 편집 블록으로 잘 풀었습니다."),
  H2("3.3 정직 표기와 신뢰 문구"),
  B("모든 카드에 Design sample · Sample · Not on sale · Illustrative product, 상세 화면마다 ‘No real payment, order, contract’."),
  B("“Field membership is discovery, not endorsement.” (분야 소속은 추천이 아님)"),
  B("Aurora 100: “순위 숫자 없이 보여 준다. 포함은 임명·보증·협업이 아니다.”"),
  B("상품: “Editorial connection sample · No personal recommendation or collaboration is implied.”"),
  B("Ranking마다 비교 기준(Criteria)을 적음."),
  NOTE("지금까지 우리가 세운 신뢰 원칙(근거 없는 숫자 금지, 샘플 표기, 관계 공개)과 정확히 일치합니다."),
  H2("3.4 Community 권한 설계 — 가장 큰 기여"),
  TBL(["축", "값"], [
    ["역할 (View as)", "Visitor · Member · Reporter · Invited participant · Collaborating curator · Brand/business · Program host · Space moderator · APD · Admin"],
    ["회원 등급", "Newbie · Regular · Insider · Star · Legend (활동일 + 인정 점수 두 조건)"],
    ["기자 등급", "Rookie → Explorer → Builder → Innovator → Connector → Leader → Visionary → Luminary → Aurora"],
    ["공간 접근 상태", "Access ready · Applying · Setup failed · Unable to check · Read-only · Posting restricted · Comments closed · Expired · Revoked"],
    ["공간이 열리는 이유", "Common(누구나 읽기) · Purchase(구매 권한) · Level(등급) · Invitation(이름·역할·기간이 정해진 초대)"]
  ], [1.6, 4.8]),
  P("‘누가, 왜, 어디까지’를 한 화면에서 바꿔 볼 수 있습니다. 우리 Community 기획서의 ‘대상별 권한 부여 방식’을 화면으로 검증할 수 있는 도구입니다."),
  ...IMG("wf-benefits", "Community — 참여 가이드 (회원 등급표, 공간이 열리는 4가지 이유)"),
  H2("3.5 프로그램 상태와 예약"),
  B("프로그램 상태 7개: Not registered · Access being prepared · Registered (starts soon) · In progress · Ended (materials available) · Access expired · Booking canceled."),
  B("예약 3단계: 날짜·정보 → 확인·결제 미리보기 → 완료. **고객 시간대 선택**(UTC · London · New York · Sydney · Toronto) — 전 세계 고객 기준."),
  B("코호트는 신청 → 승인 → 등록 → Community 순서. 신청과 승인을 분리한 것이 정확합니다."),
  B("‘My spaces’에서 주문·예약은 Shopify 계정(주문 → Manage Booking)으로 보냄 — 결제·주문 정보를 테마가 따로 들고 있지 않음."),
  ...IMG("wf-book", "Shop — 세션 예약 (시간대 선택, 날짜, 참가자 정보)"),
  H2("3.6 Fund · Together · Made for You — 소비자 조건이 명확"),
  TBL(["항목", "와이어프레임이 밝힌 조건"], [
    ["Fund", "보상이지 지분이 아님 · 목표 미달 시 환불 · 목표 달성 후에도 자금·실현 가능성 확인 뒤 제작 · 배송비·세금은 결제 전 표시 · 지연·취소 시 업데이트로 안내 · 예산 배분 예시"],
    ["Together", "관심 표시는 주문이 아님 · 자동 결제 없음 · 목표 달성이 제작 보장이 아님 · 최종 가격·이행·취소 조건은 별도 단계"],
    ["Made for You", "개인·브랜드·단체·팬 커뮤니티별 요청 · 형식·예산·시기·자료와 권리 · ‘주문·계약·섭외 확정이 아니다’ 동의"],
    ["상태 미리보기", "Fund: 준비 → 모집 → 제작 → 배송 / Together: 관심 수집 → 목표 도달 → 조건 확정 → 제작"]
  ], [1.3, 5.1]),
  ...IMG("wf-fund", "Shop — Fund 상세 (상태 미리보기, 목표, 조건)"),
  H2("3.7 Collaboration — 누가 무엇을 만드는가"),
  P("Creative curator(방향) · Making partner(재료·샘플·품질) · Aurora(콘셉트·이야기·출시·고객 경험)의 기여를 나누고, 결과물마다 **구매 경로를 따로**(상품 / Fund / Together) 둡니다. 협업 상품과 편집 추천을 구분해야 한다는 우리 원칙과 맞습니다."),
  H2("3.8 Curators 프로필"),
  B("Aurora 이야기를 먼저, 외부 자료는 출처(IMDb 등)와 함께."),
  B("활동 기록을 최신순 타임라인으로 — 미확인 항목은 ‘to be confirmed’."),
  B("관련 인물을 ‘같은 분야’ 또는 ‘같은 Selection’이라는 이유와 함께 표시."),
  ...IMG("wf-person", "Curators — 프로필 (분야, Aurora 이야기, 외부 출처, 관련 컬렉션)"),
  H2("3.9 Shopify 실데이터 연결 준비"),
  B("Shopify 블로그 ‘aurora-journal’과 전체 상품을 읽고, 메타필드 **aurora.nine_tails · aurora.primary_area**로 분야·영역을 연결."),
  B("상품 상세는 진짜 Shopify 장바구니 폼(옵션·수량·품절)을 사용."),
  B("로그인 후 돌아올 주소를 같은 사이트 안으로만 제한 — 안전한 설계."),
  B("“샘플 상태로는 실제 작업을 허용하지 않는다”는 원칙을 코드에 적음."),
  H2("3.10 기타"),
  B("Home Nine Tails 필터가 이야기·사람·대화·상품·프로그램을 한 번에 거르고, 주소(?field=)로 공유 가능."),
  B("푸터 저작권 줄이 미국 법인(Asia Lab Global Incorporated)으로 맞춰져 있음."),
  B("390 폭에서 다섯 화면 모두 가로 넘침 없음.")
);

/* 4 */
add(H1("4. 수정할 것 — 우선순위별"),
  P("**P0** 오픈 전 반드시 · **P1** 제작 인계 전 · **P2** 다듬기."),
  H2("4.1 P0 — 반드시"),
  TBL(["#", "문제 (근거)", "고칠 방향"], [
    ["1", "**Home이 5초 안에 Aurora를 설명하지 못함.** 첫 화면이 ‘Bong Joon Ho × Anurag Kashyap’ 영화 소개. Aurora가 무엇인지, 네 세계가 무엇인지 문장이 없음.", "현재 파이널의 **네 동사 제목 + 네 개의 문**을 맨 위에, 그 아래에 와이어프레임의 대형 편집 피처를 둠. ‘The making edit’는 ‘One story. Four doors.’와 합쳐 하나의 연결 섹션으로."],
    ["2", "**슬로건 표기 오류.** 푸터 ‘A world connected by experience’(소문자), 로고 아래 슬로건 없음.", "확정 표기 **‘A World Connected by Experience’**, 로고 바로 아래와 푸터에 같은 형태로."],
    ["3", "**푸터에 정책·법적 고지 없음.** Privacy · Terms · Refund · Shipping · Contact · Subscription · Entities · Accessibility · Your Privacy Choices 링크 없음. Help centre · Contact us · Curators · Contributors는 눌리지 않는 글자.", "현재 파이널의 **정책 줄 + 법인 고지(주소·contact@auroracurate.com)**를 그대로 이식. 모든 항목을 실제 링크로."],
    ["4", "**‘Partner with us’가 Made for You(고객 주문 제작)로 연결.** 브랜드·큐레이터·명예기자의 협업 제안 창구가 없음.", "Version B·현재의 **Work with Aurora 접수(유형 → 답변 → 확인 → 결과 8상태)** 복원. Made for You는 Shop 안의 고객 서비스로 분리."],
    ["5", "**Community 시스템 충돌.** 와이어프레임은 자체 서버(Railway, /api/community)로 회원·초대·접근을 관리. 사업계획서·기획서·회원 공간 목업은 Tevello 기준이고 Tevello에 테스트 강좌 2개가 이미 있음.", "**대표 결정 필요** — 아래 5장 결정표. 권장: 오픈은 **결제·수강 권한은 Shopify+Tevello**, 초대·등급·기자 같은 Aurora 고유 규칙만 자체 서버. 권한의 ‘원본’은 한 곳."],
    ["6", "**고객 화면에 내부 용어 노출.** ‘Cowlendar-style booking mock’, ‘Railway’, ‘Permissions preview · CM01–CM08’, ‘Screen specification · V07’, ‘Local wireframe · V10’, ‘View connected data’.", "검토용 표시는 **?review=1에서만** 보이게(현재 파이널의 방식). 고객에게는 ‘예약’, ‘회원 공간’처럼 쉬운 말만."]
  ], [0.3, 3, 3.1]),
  ...IMG("wf-home", "Home 첫 화면 — Aurora와 네 세계를 설명하는 문장이 없음"),
  H2("4.2 P1 — 제작 인계 전"),
  TBL(["#", "문제 (근거)", "고칠 방향"], [
    ["7", "**권한 미리보기 패널이 Community 맨 위에 항상 보임.** 모바일에서 첫 화면 대부분을 차지.", "검토 모드에서만 표시. 고객에게는 자기 상태 한 줄(‘Member · Regular’)만."],
    ["8", "**운영 숫자가 확정처럼 보임.** 회원 등급 기준(활동일 5·21·60·180, 인정 점수 20·100·500·2,000), 기자 9등급.", "‘제안값’ 표시 후 대표 확정. 오픈은 기자 **3단계**(Rookie · Builder · Leader)로 시작 권장 — 운영 가능한 만큼만."],
    ["9", "**역할 ‘APD’ 정의 없음.**", "이름 풀어쓰기 또는 내부 역할로 숨김."],
    ["10", "**실존 인물 이름·초상과 샘플 관계.** Rashmika 프로필에 ‘ALSO IN AURORA 100: Jackson Wang, Alia Bhatt’ — 샘플이어도 선정·관계로 읽힘.", "공유용 미리보기는 가상의 인물로, 실존 인물은 권리·동의 확인 후. ‘Design sample’ 표기만으로는 부족."],
    ["11", "**공식 IP 마크 미사용.** Home·Curators의 Global Faces 100이 공식 마크가 아니라 글자로만 표시.", "확정된 **Aurora 100 / Gl✦bal Faces 100 공식 로고** 파일로 통일."],
    ["12", "**상품 상세에 상품별 배송·반품 조건 없음.** ‘Shipping and taxes are calculated at checkout.’만.", "현재 파이널의 **Ships from · Returns for this item**(메타필드) + 정책 링크."],
    ["13", "**Home 상품이 첫 판매와 무관.** 샘플 상품($56·$48) 위주.", "오픈 첫 판매 흐름(K-Career Entry Session $99 · 무료 Lounge · 검증 실물 1개)을 Home ‘Objects & Experiences’ 맨 앞에."],
    ["14", "**모바일 상단 메뉴가 잘림.** ‘ators’, ‘Communit’처럼 잘리고 스크롤 단서 없음.", "모바일은 메뉴 버튼 + 네 개의 문, 또는 끝 그라데이션 단서."],
    ["15", "**Shopify 제작 구조.** 화면 내용이 큰 스크립트(Community 194KB, Shop 113KB)와 페이지마다 75–130KB 스타일로 그려짐. 테마 편집기 설정은 ‘화면 선택’ 하나. 머리글·바닥글이 5개 파일에 복제.", "제작본은 **섹션·블록 + 메타오브젝트**로 바꾸고 스크립트는 상호작용만. 머리글·바닥글은 하나로. 지금 구조는 검색 노출(내용이 HTML에 없음)·속도·편집에 불리."],
    ["16", "**Studio에 두 IP의 고정 입구 없음.** 버튼(‘Explore the series’)으로만.", "왼쪽 메뉴에 **Aurora 100 · Global Faces 100** 항목 추가."],
    ["17", "**양방향 문장 부재.** 프로그램 문구는 ‘Korea and Asia’, 사이트 소개에 Asia ↔ World 방향 설명 없음.", "Home·About에 ‘아시아를 세계로, 세계를 아시아로’ 원칙 문장, World → Asia 이야기·브랜드도 편성."]
  ], [0.3, 3, 3.1]),
  ...IMG("wf-m-community-390", "Community 모바일(390) — 권한 미리보기 패널이 첫 화면을 차지, 상단 메뉴 잘림", 2.3),
  H2("4.3 P2 — 다듬기"),
  B("철자 통일: programme / program 혼용 → 미국 법인·USD 기준이므로 **program**."),
  B("‘Sponsored story’ 표기를 미국 기준 문구(‘Paid partnership with …’)로, 위치는 제목 가까이."),
  B("Pretendard 글꼴 2MB 전체 → 쓰는 글자만 담은 경량 파일로."),
  B("‘View all’ 앞뒤 단어 붙음(‘Trending View all’) — 접근성 이름 정리."),
  B("빈 상태 문구(‘Published stories will appear here…’)는 고객용으로 다시 쓰기.")
);

/* 5 */
add(H1("5. 대표님 결정이 필요한 것"),
  TBL(["#", "결정", "선택지", "권장"], [
    ["1", "Community 권한의 원본", "A. Tevello만 · B. 자체 서버(Railway)만 · C. 결제·수강=Shopify+Tevello, Aurora 고유 규칙=자체 서버", "**C** — 이미 있는 Tevello 강좌를 살리고, 등급·초대·기자는 Aurora 서버. 원본은 항목별로 하나"],
    ["2", "세션 예약 도구", "Cowlendar(와이어프레임) / Tevello 예약 / 수동", "Cowlendar로 확정 시: Shopify 상품 ↔ 예약 연결표 작성, 주문 메일의 ‘Manage Booking’ 확인"],
    ["3", "회원 등급·기자 등급 수", "5등급 + 9단계(와이어프레임)", "오픈: 등급 3 + 기자 3, 운영 데이터 쌓인 뒤 확장"],
    ["4", "Home 첫 화면", "와이어프레임 편집 피처 / 현재 파이널 네 개의 문", "**둘 다** — 네 개의 문 위, 편집 피처 아래"],
    ["5", "실존 인물 샘플", "실명 유지 / 가상 인물", "외부 공유본은 가상 인물"]
  ], [0.3, 1.4, 2.6, 2.1])
);

/* 6 */
add(H1("6. 더하면 좋은 기획"),
  H2("6.1 세 버전에서 가져올 것"),
  TBL(["가져올 것", "출처", "이유"], [
    ["네 동사 제목 · 네 개의 문 · 길잡이 막대", "현재 파이널", "5초 이해와 세계 사이 길찾기"],
    ["‘One story. Four doors.’ 실제 흐름(K-Career)", "현재 파이널", "첫 판매와 연결 원리를 한 번에"],
    ["푸터 정책 줄 · 법인 고지 · 정책 6종 · Aurora Entities · Help", "현재 파이널", "Shopify·미국 요건, 신뢰"],
    ["상품별 Ships from · Returns", "현재 파이널", "파트너 출고(드롭쉬핑) 대응"],
    ["장바구니 7상태 · 주문 6상태 · 국가 미지원 안내", "Version B", "와이어프레임엔 장바구니·주문 후 화면이 거의 없음"],
    ["Work with Aurora 접수 + 결과 8상태", "Version B", "협업 창구 복원"],
    ["About (확정 소개문 · 생태계 이미지)", "현재 파이널", "테마에 템플릿만 있고 화면 없음"],
    ["검색 · 404 · 이미지 실패 대체", "Version A·B", "빈 결과와 오류의 다음 행동"],
    ["운영 보드 (한 번 입력 → 여러 자리)", "Version B", "와이어프레임 메타필드와 결합하면 편집 운영 완성"]
  ], [2.6, 1.2, 2.6]),
  H2("6.2 새로 제안"),
  NL([
    "**메타필드·메타오브젝트 사전** — aurora.nine_tails · primary_area(와이어프레임) + ships_from · return_days · final_sale · relations(현재) + curator · offer · project 메타오브젝트를 한 표로 확정.",
    "**권한 매트릭스 문서화** — 역할 × 공간 × 행동(읽기·쓰기·댓글·자료)을 표 하나로. 와이어프레임 미리보기 패널이 그 표를 그대로 읽게.",
    "**양방향 편성** — Studio·Shop에 ‘Asia → World’, ‘World → Asia’ 이야기·상품 표시(예: 아시아 진출을 원하는 세계 브랜드, 세계로 나가는 아시아 크리에이터).",
    "**국가·통화 선택기** — Shopify Markets와 연결, 가격·배송 가능 국가를 첫 방문에 확인.",
    "**모더레이션 큐** — ‘Report post’ 이후 운영자 화면과 처리 기한.",
    "**알림·메일 문구** — 예약 확정, 신청 결과, 초대, 접근 만료, Fund·Together 상태 변경.",
    "**성과 측정 이벤트** — 문과 문 사이 이동(이야기 → 사람 → 참여 → 구매)을 이벤트로 기록 (사업계획서 성과 지표와 같은 이름)."
  ])
);

/* 7 */
add(H1("7. 하나로 합치는 계획"),
  TBL(["층", "기준이 되는 것", "와이어프레임에서 합칠 것"], [
    ["사이트 바깥 틀", "현재 파이널 (Home 위쪽, 길잡이 막대, 푸터·정책, Help, About, Work with Aurora)", "Home 아래쪽 편집 피처·Originals·Nine Tails 필터"],
    ["세계 안 구조", "와이어프레임 (왼쪽 메뉴, 카드 문법)", "—"],
    ["Studio", "와이어프레임", "+ 두 IP 고정 입구, 기사 끝 연결 규칙(실제 관계만)"],
    ["Curators", "와이어프레임 프로필·타임라인", "+ 현재의 ‘제안은 Aurora로’ 문구, 두 데이터 세트"],
    ["Community", "와이어프레임 권한·가이드·My spaces", "+ Version B 회원 공간 16상태 중 Tevello 화면, 결정 1번 반영"],
    ["Shop", "와이어프레임 메뉴·Collaboration·Fund·Together·MFY·예약", "+ 현재 상품별 조건, Version B 장바구니·주문 상태"],
    ["제작", "Shopify 섹션·블록 + 메타오브젝트", "와이어프레임 실데이터 연결 코드를 섹션 렌더링으로 이전"]
  ], [1.2, 2.6, 2.6]),
  H2("7.1 담당자 다음 할 일"),
  NL([
    "P0 6개 수정 (Home 위쪽, 슬로건, 푸터·정책, 협업 접수, 내부 용어 숨김, 시스템 결정 반영).",
    "권한 매트릭스와 메타필드 사전을 표로 작성해 대표 확인.",
    "Home·Shop·Community 세 화면부터 섹션·블록 구조로 옮기기 (미리보기 테마에서, MAIN 직접 수정 금지).",
    "1440 · 390 · 360 화면 검수, 5초 테스트 5명."
  ])
);

add(H1("부록. 와이어프레임 화면"),
  ...IMG("wf-curators", "Curators — 인물 띠, Curated edits, Selections"),
  ...IMG("wf-community", "Community — 권한 미리보기, Lounge, Programs"),
  ...IMG("wf-lounge", "Lounge — 주제·Nine Tails 필터, 글 목록"),
  ...IMG("wf-shop", "Shop — Aurora Pick, Shop products"),
  ...IMG("wf-program", "Shop — 프로그램 상세 (상태 미리보기, 참여 조건)"),
  ...IMG("wf-together", "Shop — Together 상세 (관심 표시, 조건, 여정)"),
  ...IMG("wf-m-home-390", "Home 모바일(390)", 2.3)
);

module.exports = C;
if (require.main === module) build(process.argv[2] || "Aurora_와이어프레임_검토.docx", "Aurora 와이어프레임 검토", "Aurora 와이어프레임 검토", C);
