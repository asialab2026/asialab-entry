const { P, H1, H2, H3, B, NL, NOTE, TBL, LINK, LINKP, cover, toc, build } = require("./lib"); const { INTEGRATED } = require("./lib");
const C = []; const add = (...x) => x.forEach(i => Array.isArray(i) ? C.push(...i) : C.push(i));

if (!INTEGRATED) add(cover({
  kicker: "AURORA STUDIO",
  title: "Studio 생태계 기획서",
  sub: "이야기 · 편집 IP · 기사 · 게시 운영 · Shop으로 이어지는 구조",
  meta: [
    ["문서", "Aurora Studio 기획서 v1.0 (검토용)"],
    ["작성일", "2026-10-04"],
    ["작성", "수석 디자인 (Claude)"],
    ["대상", "대표님, Codex 기획자, 제작자, 마케터, 편집팀"],
    ["상위 문서", "Shop 생태계 통합 기획서 (Studio의 이야기가 Shop의 상품·프로그램으로 이어지는 방식)"],
    ["기준 목업", LINK],
    ["상태", "디자인·구조 확정용. 실제 블로그 필드·게시 자동화는 운영 검증 전"]
  ]
}));
if (!INTEGRATED) add(toc());

add(H1("1. 한눈에 보기"),
  P("Studio는 Aurora가 **발견한 사람과 문화의 이야기**를 인터뷰·영상·에디토리얼·오리지널 프로젝트로 보여 주는 곳입니다. 생태계에서 Studio의 역할은 **욕구를 만드는 것** — 읽고, 알고, 갖고 싶고, 경험하고 싶은 이유를 만드는 것입니다. 이 욕구는 Curators의 관점, Community의 대화, 그리고 최종적으로 Shop의 상품과 프로그램으로 이어집니다."),
  H2("1.1 세 문장 요약"),
  NL([
    "**무엇을:** Trending · Exclusive · Experience · Ranking(Editorial selection) · Community Highlights 다섯 코너와 두 편집 IP(Aurora 100 · Global Faces 100), 9개 분야, 현장 기록을 발행합니다.",
    "**어떻게:** 기사는 Shopify 블로그(aurora-journal) 한 곳에서 관리하고, 표시 영역(aurora.display_areas)으로 Studio·분야·검색·Curators·Community에 동시에 노출합니다.",
    "**왜:** 좋은 이야기가 사람(Curators)·대화(Community)·선택(Shop)으로 자연스럽게 이어질 때 Aurora의 세계관이 사업이 되기 때문입니다."
  ]),
  H2("1.2 핵심 원칙"),
  TBL(["원칙", "의미"], [
    ["내용이 먼저", "코너 제목보다 이야기 자체가 매력적이어야 한다 — 인물 사진·제목·요약이 첫 인상"],
    ["한 기사, 한 원천", "기사 본문은 블로그 한 곳. 여러 영역에 노출해도 복제하지 않는다"],
    ["판매는 자연스러운 한 지점에서", "기사 본문에 구매 버튼을 반복하지 않는다. 관계가 있을 때 기사 끝 한 곳에서 연결"],
    ["두 100은 다른 프로젝트", "Aurora 100 = 확립된 영향력(권위) · Global Faces 100 = 발견과 가능성. 둘 다 순위·투표·유료 등재가 아님"],
    ["샘플은 표시", "구성 확인용 샘플 기사는 ‘Design sample’"],
    ["인물 = 보증 아님", "기사에 등장한 인물은 Curator 지위·상품 추천·협업을 뜻하지 않는다"]
  ], [1.6, 4.8])
);

add(H1("2. 기획 의도"),
  TBL(["대표님의 의도", "Studio의 판단", "피해야 할 해석"], [
    ["인물과 문화가 매력의 중심", "인물 풀블리드 사진, 비대칭 배열, 어두운 카드와 오로라 배경 유지", "텍스트 목록형 블로그"],
    ["Studio의 목표는 Shop 판매", "이야기 → 관련 상품·프로그램으로 가는 입구를 설계하고 성과를 측정", "기사마다 구매 버튼 반복"],
    ["권위 있는 편집 IP", "Aurora 100과 Global Faces 100을 독립 로고·독립 섹션으로", "순위·투표·스폰서 등재"],
    ["팀이 계속 운영", "기사 하나 추가 시 코너·분야·검색에 자동 노출", "디자인 파일에 기사 내용 고정"]
  ], [1.7, 2.7, 2])
);

add(H1("3. Studio 구조"),
  H2("3.1 Discover 화면 (위에서 아래로)"),
  TBL(["순서", "구성", "역할"], [
    ["1", "사이드 메뉴 (Discover · Trending · Exclusive · Experience · Ranking · Community · Aurora 100 · Global Faces · Field records)", "코너 이동, 모바일은 가로 스크롤"],
    ["2", "검색 + Browse by field (9개 분야 필터)", "관심 분야로 좁혀 보기 — studio.html?field="],
    ["3", "Feature duo — Aurora Power 100 · Bong Joon Ho × Anurag Kashyap", "대표 이야기 두 편"],
    ["4", "Trending", "지금 읽을 이야기 4편"],
    ["5", "Exclusive Content — Aurora Originals · Articles · Collaborations", "Aurora만의 콘텐츠"],
    ["6", "Aurora Experience", "배우고·연결되고·성장하는 프로그램 이야기 → Community·Shop 프로그램"],
    ["7", "Ranking — Editorial selection", "순위 숫자 없는 편집 선정"],
    ["8", "Community Highlights", "명예기자·커뮤니티의 이야기 → Community"],
    ["9", "Aurora 100", "배너, 에디토리얼 이슈(커버 3), Entertainment 100 라인업, 편집 방향"],
    ["10", "Global Faces 100", "인터뷰, 편집 관점(Truth before polish · Culture in motion · The next chapter)"],
    ["11", "From the field — Asia Lab records", "현장 기록 (Asia Lab 기록임을 표시)"],
    ["12", "Honorary contributors", "명예기자 참여 안내 → 신청"]
  ], [0.5, 3.3, 2.6]),
  H2("3.2 콘텐츠 유형"),
  TBL(["유형", "예", "형식"], [
    ["Interview", "Meet Asia’s Official Crush: Rashmika", "장문 인터뷰 · 인용 · 복수 이미지"],
    ["Editorial", "K-beauty editorial selection", "사진 중심 에디토리얼"],
    ["Video", "BTS of Aurora 100 Editorial Shoot", "영상 + 설명"],
    ["Aurora Original", "Creating a HERA product (샘플)", "제작 과정 기록"],
    ["Reporter story", "Travel diaries from Mongolia (샘플)", "명예기자 기사 — 편집 선정 후 게재"],
    ["Field record", "Agnez Mo in Korea (Asia Lab TV)", "현장 기록 — 출처 명시"]
  ], [1.3, 2.7, 2.4]),
  H2("3.3 9개 분야 (Nine Tails)"),
  P("Entertainment · Icons · Beauty · Fashion · Hustle · Taste · Lifestyle · Travel · Wellness. 분야는 매출 카테고리가 아니라 문화를 읽는 기준이며, 분야 페이지(field.html?f=)가 그 분야의 **이야기 · 상품과 프로그램 · 콘셉트 · Lounge 토픽**을 한 곳에 모읍니다. 분야 페이지가 Studio와 Shop을 가장 자연스럽게 잇는 다리입니다.")
);

add(H1("4. 편집 IP — Aurora 100 · Global Faces 100"),
  TBL(["", "Aurora 100", "Global Faces 100"], [
    ["의미", "확립된 문화적 영향력 — 권위", "발견 · 성장 · 가능성 — 기록"],
    ["로고", "Aurora 워드마크 + 100", "Gl✦bal Faces + 100 (Aurora 별이 o 자리), Poppins Light"],
    ["형식", "배너, 에디토리얼 이슈(분야별 커버), 라인업, 편집 방향", "인터뷰 중심, 다음 장(Next chapter)에 주목"],
    ["선정", "편집부 독립 결정. 공식 추천·심사는 ACC", "편집부 독립 결정"],
    ["Community와의 관계", "‘Help shape Aurora 100’ = 의견 수집만 (2026-10-04 대표 확정)", "Nominate a face → 제안 접수 (선정 아님)"],
    ["Shop과의 관계", "Aurora 100 디지털 에디션(샘플), Highlights 배지", "인터뷰 → 관련 인물·프로그램"],
    ["금지", "순위 번호, 투표, 유료 등재, 후원으로 선정", "같음"]
  ], [1.2, 2.6, 2.6]),
  NOTE("두 로고는 공식 마스터 파일만 사용합니다(assets/brand). Stage에서는 흰색+빛, Read에서는 검정.")
);

add(H1("5. 기사(Article) 템플릿"),
  TBL(["구성", "원칙"], [
    ["킥커 · 제목 · 부제", "긴 제목도 줄바꿈이 자연스러워야 함"],
    ["대표 인물 사진 (좌) + 본문 (우)", "세로 인물은 얼굴 상단 초점"],
    ["본문 · 소제목 · 인용", "600–1,200단어 기준으로 시험, 짧은 글도 같은 품질"],
    ["복수 이미지 · 캡션", "사용 권리 확인된 사진만, 출처 표기"],
    ["공유 · 이전/다음", "다음 읽기로 자연스럽게"],
    ["끝: 관련 인물 · 관련 상품/프로그램(한 곳) · 대화", "관계가 있을 때만. 없으면 다음 읽기와 대화만"]
  ], [2.4, 4]),
  NOTE("기사 본문 중간에 구매 버튼을 반복 삽입하지 않습니다. 이것이 Studio의 신뢰를 지키며 장기적으로 Shop 전환을 높입니다.")
);

add(H1("6. 대상과 권한"),
  TBL(["대상", "할 수 있는 것", "되는 방법", "자동으로 얻지 않는 것"], [
    ["독자(누구나)", "모든 공개 기사·영상 읽기, 공유", "—", "—"],
    ["회원", "관련 Lounge 토픽에서 대화", "로그인", "기자 자격"],
    ["명예기자", "기사 제안·편집 피드백 (Reporters’ Desk)", "신청 → 편집 검토 → 승인", "자동 게재, Curator·ACC"],
    ["기고 인물", "인터뷰·프로필 대상", "편집 섭외·동의", "상품 추천·협업"],
    ["편집자", "기사 작성·선정·표시 영역 지정", "내부 지정", "가격·재고 관리"],
    ["대표", "IP 선정 방향·공개 승인", "—", "—"]
  ], [1.2, 2.2, 1.5, 1.5])
);

add(H1("7. 게시 운영 — 한 기사, 여러 자리"),
  H2("7.1 원천과 노출"),
  TBL(["필드", "원천", "노출"], [
    ["제목·본문·이미지·요약", "Shopify 블로그 aurora-journal (aurora-editorial 템플릿)", "기사 페이지, 카드"],
    ["표시 영역", "aurora.display_areas (예: Studio / Trending)", "Studio 코너, Curators, Community, Shop"],
    ["분야", "태그 또는 메타필드", "분야 필터·분야 페이지·검색"],
    ["관련 인물", "메타필드", "기사 끝, 인물 프로필 Studio 탭"],
    ["관련 상품·프로그램", "메타필드", "기사 끝 한 곳, 상품 상세 ‘Connected’"],
    ["대표 이미지", "현재 본문 첫 이미지 → 대표 이미지 필드 권장", "카드"]
  ], [1.8, 2.6, 2]),
  H2("7.2 기사 하나를 추가하면"),
  NL([
    "편집자가 블로그에 기사를 작성하고 분야·표시 영역·관계를 지정",
    "Studio 해당 코너와 분야 페이지, 검색에 자동으로 나타남",
    "관련 인물 프로필의 Studio 탭과 관련 상품 상세에 연결",
    "비공개로 돌리면 모든 자리에서 동시에 사라짐"
  ]),
  NOTE("현재 블로그 40개 기사는 대표 이미지(image) 필드가 비어 본문 첫 이미지를 카드에 사용합니다. 대표 이미지 필드 입력을 권장합니다.")
);

add(H1("8. Shop으로 이어지는 방식"),
  TBL(["입구", "조건", "관계가 없을 때"], [
    ["기사 끝 관련 상품·프로그램", "메타필드로 연결된 실제 관계", "다음 읽기·Lounge 대화"],
    ["Aurora Experience 코너", "프로그램 이야기", "Community 프로그램 마켓으로"],
    ["분야 페이지 Objects & programs", "같은 분야 판매·준비 항목", "개발 중 콘셉트 + Lounge"],
    ["Aurora 100 · Highlights", "편집 승인된 Highlights", "명시적 빈 상태"],
    ["Ranking · Editorial selection", "Shop Ranking 컬렉션과 같은 기준", "샘플 표시"]
  ], [2, 2.4, 2]),
  P("측정: 입구별 상품 상세 도착 → 구매. 자세한 설계는 Shop 통합 기획서 14장.")
);

add(H1("9. 현재 상태와 검증"),
  B("목업 완료: Discover 전체, 기사 템플릿, Aurora 100·Global Faces 100 섹션과 공식 로고, 분야 페이지·검색, 명예기자 안내"),
  B("샘플 표시: Trending·Exclusive·Experience·Ranking 일부 카드는 Design sample"),
  TBL(["검증 항목", "방법", "담당"], [
    ["블로그 → 코너 자동 노출", "기사 1건 추가·비공개 전환 테스트", "Codex · 제작자"],
    ["관계 메타필드", "기사 ↔ 인물 ↔ 상품 연결 필드 생성", "제작자"],
    ["대표 이미지 필드", "40개 기사 입력", "편집"],
    ["이미지 권리", "인물·브랜드 사진 사용권 확인", "대표 · 편집"],
    ["긴 기사·짧은 기사", "같은 템플릿 품질 확인 (1440·390·360)", "디자인"]
  ], [2, 3, 1.4])
);

add(H1("10. 대표님 결정 사항"),
  TBL(["#", "결정할 것", "권장안"], [
    ["1", "샘플 카드 교체 순서", "Trending과 Aurora 100부터 실제 승인 기사로"],
    ["2", "Global Faces 100 첫 인터뷰 공개", "Harshaali Malhotra 인터뷰 원문·사진 권리 확정 후"],
    ["3", "기사 끝 판매 연결 기준", "관계가 문서화된 경우만 (협업·실제 사용·편집 선정)"],
    ["4", "명예기자 게재 기준", "편집 검토·사실 확인·이미지 권리·본인 동의"],
    ["5", "Field records 표기", "Asia Lab 기록임을 명시하고 Aurora 실적과 구분"]
  ], [0.4, 2, 4])
);

add(H1("부록. 목업 화면"),
  LINKP(LINK),
  TBL(["화면", "내용"], [
    ["Studio", "Discover 전체 구성"],
    ["Article", "인터뷰 템플릿"],
    ["Nine Tails · Field", "분야 목록과 분야 상세"],
    ["Search", "분야·이야기·인물·상품·프로그램 검색, 결과 없음"],
    ["Design guide", "공식 로고·두 100 마크·슬로건 규칙"]
  ], [2, 4.4])
);

module.exports = C;
if (require.main === module) build(process.argv[2] || "Aurora_Studio_기획서.docx", "Aurora Studio 기획서", "Aurora Studio 기획서", C);
