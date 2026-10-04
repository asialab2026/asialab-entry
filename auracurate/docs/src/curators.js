const { P, H1, H2, H3, B, NL, NOTE, TBL, LINK, LINKP, cover, toc, build } = require("./lib"); const { INTEGRATED } = require("./lib");
const C = []; const add = (...x) => x.forEach(i => Array.isArray(i) ? C.push(...i) : C.push(i));

if (!INTEGRATED) add(cover({
  kicker: "AURORA CURATORS",
  title: "Curators 생태계 기획서",
  sub: "사람과 관점 · 프로필 · 협업 흐름 · 권한 · Shop으로 이어지는 신뢰",
  meta: [
    ["문서", "Aurora Curators 기획서 v1.0 (검토용)"],
    ["작성일", "2026-10-04"],
    ["작성", "수석 디자인 (Claude)"],
    ["대상", "대표님, Codex 기획자, 제작자, 마케터, 편집·파트너십 팀"],
    ["상위 문서", "Shop 생태계 통합 기획서 (Curators의 신뢰가 Shop의 선택 이유가 되는 방식)"],
    ["기준 목업", LINK],
    ["상태", "디자인·구조 확정용. 인물 사진 권리·협업 계약·추천 근거는 확인 전"]
  ]
}));
if (!INTEGRATED) add(toc());

add(H1("1. 한눈에 보기"),
  P("Curators는 Aurora가 **신뢰하는 사람과 그들의 관점**을 보여 주는 곳입니다. 생태계에서 Curators의 역할은 **선택의 이유를 만드는 것** — ‘누가, 왜 골랐는가’를 보여 줌으로써 Studio의 이야기와 Shop의 상품 사이에 신뢰를 놓습니다. 그 신뢰는 Curator’s Recommendation·협업 상품·Curator Highlights를 통해 Shop의 판매로 이어집니다."),
  H2("1.1 세 문장 요약"),
  NL([
    "**무엇을:** 인물 로스터, 큐레이션 에디트, 이달의 큐레이터(숫자 없는 편집 선정), 프로필(Studio · Shop · Community · Trending 탭), 인물 디렉터리, Aurora의 접근 방식을 보여 줍니다.",
    "**어떻게:** 협업 제안은 언제나 Aurora 팀이 받고(인물에게 직접 전달하지 않음), 합의된 협업과 문서화된 추천만 Shop에 연결합니다.",
    "**왜:** ‘이 사람이 골랐다’는 진짜 관계가 광고보다 강한 구매 이유이며, 그 관계가 사실일 때만 Aurora의 권위가 쌓이기 때문입니다."
  ]),
  H2("1.2 핵심 원칙"),
  TBL(["원칙", "의미"], [
    ["등장 ≠ 큐레이터 ≠ 추천", "기사나 프로필에 등장한 것은 Curator 지위·상품 추천·협업을 뜻하지 않는다"],
    ["관계는 문서로", "Curator’s Recommendation은 서면으로 확인된 추천만. 협업 상품과 편집 소개를 구분"],
    ["같은 가짜 상품 금지", "모든 인물에게 같은 상품을 붙이지 않는다. 없으면 정직한 빈 상태"],
    ["숫자로 사람을 줄 세우지 않음", "‘Top Curators’는 이달의 편집 선정 — 순위·팔로워·영향력 점수 없음"],
    ["협업은 Aurora를 거친다", "Start Collaboration은 Aurora 팀이 접수 — 인물·소속사에 직접 전달하지 않음"],
    ["얼굴을 존중", "세로 인물은 얼굴 상단 초점, 빈 색 원으로 대체하지 않음"]
  ], [1.8, 4.6])
);

add(H1("2. 기획 의도"),
  TBL(["대표님의 의도", "Curators의 판단", "피해야 할 해석"], [
    ["인물이 매력의 중심", "인물 스트립·비대칭 스토리·원형 인물 목록을 유지", "일반 명단·텍스트 디렉터리"],
    ["Curators의 목표는 Shop 판매", "확인된 추천·협업을 Shop Curator’s Recommendation과 프로필 Shop 탭으로 연결", "유명인 이름을 판매 장치로 오인시키기"],
    ["큐레이터 협업 확대", "Start Collaboration → 접수 → 검토 → 서면 합의 → 상품·콘텐츠", "누구나 큐레이터 등록"],
    ["Aurora 100과의 연결", "Aurora 100 배지는 편집 시리즈 마크(순위 아님)", "배지 = 추천 자격"]
  ], [1.7, 2.7, 2])
);

add(H1("3. 사람의 분류"),
  P("Curators 화면에는 여러 종류의 사람이 등장합니다. 이들을 같은 것으로 다루면 신뢰가 깨집니다."),
  TBL(["분류", "정의", "되는 방법", "Shop 연결"], [
    ["편집 인물 (Featured)", "Studio·Curators 콘텐츠에 소개된 사람", "편집 섭외·소개", "없음 (Keep exploring)"],
    ["Aurora 100 · Global Faces 100", "편집 IP에 선정·기록된 사람", "편집부 독립 결정 (공식 추천·심사는 ACC)", "없음 — 선정은 판매가 아님"],
    ["승인 큐레이터 (Curator)", "Aurora와 큐레이션 협업에 합의한 사람", "제안 → 검토 → 서면 합의", "Curator’s Recommendation·Curator’s Pick (확인된 항목만)"],
    ["협업 파트너", "공동 상품·콘텐츠를 만든 사람·브랜드", "계약", "Collaboration 컬렉션"],
    ["호스트", "프로그램을 운영하는 사람", "Community 기획서 3.4", "Programs"],
    ["명예기자", "기사를 제안·기고하는 사람", "Community 기획서", "없음"]
  ], [1.6, 2, 1.6, 1.6]),
  NOTE("한 사람이 여러 분류에 동시에 속할 수 있지만, 하나가 다른 하나를 자동으로 만들지 않습니다.")
);

add(H1("4. Curators 화면 구조"),
  H2("4.1 Curators 메인"),
  TBL(["순서", "구성", "역할"], [
    ["1", "로스터 — 인물 카드 가로 스트립 (화살표·스크롤)", "첫 화면에서 사람을 만남"],
    ["2", "Curated edits — 비대칭 주요 스토리", "인물의 관점이 담긴 이야기 (샘플 표시)"],
    ["3", "Our Top Curators of The Month", "이달의 편집 선정 — 번호 없음"],
    ["4", "Featured profile (NMIXX) — 프로필 미리보기", "프로필 형식 소개 → 전체 프로필"],
    ["5", "Explore more perspectives — 원형 인물 디렉터리", "더 많은 사람 탐색"],
    ["6", "Our approach — Selected voices, real practice", "A distinct way of seeing · Ideas made tangible · Stories into objects"]
  ], [0.5, 3.2, 2.7]),
  H2("4.2 프로필 템플릿"),
  TBL(["구성", "원칙"], [
    ["좌측 탐색 (Recent · Find Curators · Shop by Curator · More Curators)", "모바일에서는 본문 뒤로 이동해 본문을 가리지 않음"],
    ["배너 · 아바타 · 배지", "배지는 편집 시리즈 마크(예: Aurora 100) — 순위 아님"],
    ["이름 · 소개 · Start Collaboration", "아래에 ‘제안은 Aurora 팀이 받으며 본인에게 직접 전달되지 않음’"],
    ["탭: Studio · Shop · Community · (Trending)", "각 탭은 실제 관계만. 없으면 빈 상태 + 다음 탐색"],
    ["하단 안내", "등장이 Curator 지정·추천·협업을 뜻하지 않음"]
  ], [2.6, 3.8]),
  H2("4.3 두 가지 자료 구성으로 검증"),
  TBL(["", "Rashmika Mandanna", "NMIXX"], [
    ["Studio 탭", "인터뷰·Aurora 100·더 많은 이야기 (샘플 포함)", "외부 콘텐츠 3건 (출처 표시: JYP · Billboard · GUESS 캠페인)"],
    ["Shop 탭", "빈 상태: 첫 릴리스와 함께 등장", "빈 상태: 협업 합의 전에는 상품 없음 → Curator’s Recommendation"],
    ["Community 탭", "Lounge의 Icons·Entertainment 토픽", "빈 상태: NMIXX 공간 없음 → Lounge"],
    ["의미", "콘텐츠가 풍부한 인물", "상품·커뮤니티가 없는 인물 — 그래도 정직하고 완성된 화면"]
  ], [1.2, 2.6, 2.6])
);

add(H1("5. 협업 흐름 — Start Collaboration"),
  NL([
    "**제안:** 프로필의 Start Collaboration 또는 Partner with us(Curators 유형)에서 제안 — 인물 이름이 자동으로 채워짐",
    "**제출 전 확인:** 답변을 확인하고 보냄 (이메일 앱만 열린 경우 ‘아직 보내지 않음’ 안내)",
    "**접수:** Aurora 팀이 받음. 접수는 승인·선정·계약이 아님",
    "**검토:** 편집·파트너십 팀이 적합성 판단, 이메일로 회신 (추가 정보 · 함께하기 · 이번에는 어려움)",
    "**서면 합의:** 형식·일정·권리·정산 확정",
    "**공개:** 협업 상품은 Collaboration, 확인된 추천은 Curator’s Recommendation, 프로필 Shop 탭에 연결"
  ]),
  NOTE("인물·소속사와의 실제 연락은 Aurora 팀이 관리합니다. 고객 화면이 인물에게 직접 연결된다고 약속하지 않습니다.")
);

add(H1("6. 대상과 권한"),
  TBL(["대상", "할 수 있는 것", "되는 방법", "자동으로 얻지 않는 것"], [
    ["방문자", "모든 공개 프로필·이야기 탐색", "—", "—"],
    ["제안자 (브랜드·매니저·본인)", "협업 제안, 결과 안내 받기", "Partner with us", "협업 확정, 프로필 등록"],
    ["승인 큐레이터", "합의된 범위의 추천·큐레이션, 프로필 노출", "서면 합의", "모든 상품 추천권, 매출 전체 열람, Aurora 100 선정"],
    ["편집자", "인물 소개·프로필 편집·관계 연결", "내부 지정", "계약 체결"],
    ["파트너십 담당", "협업 검토·계약 진행", "내부 지정", "편집 선정"],
    ["대표", "인물 공개·권리·협업 최종 승인", "—", "—"]
  ], [1.4, 2.2, 1.3, 1.9])
);

add(H1("7. Shop으로 이어지는 방식"),
  TBL(["입구", "보여 주는 조건", "없을 때"], [
    ["프로필 Shop 탭", "협업 합의 + 판매 승인 상품", "정직한 빈 상태 + Curator’s Recommendation 링크"],
    ["Curator’s Recommendation 컬렉션", "서면으로 확인된 추천", "편집 소개는 Curation으로"],
    ["Curator’s Pick (Highlights 배지)", "편집 승인", "명시적 빈 상태"],
    ["Collaboration 컬렉션", "계약된 공동 상품", "샘플 표시"],
    ["상품 상세 ‘Connected’", "상품 메타필드에 인물 관계", "‘Keep exploring’"]
  ], [2, 2.4, 2]),
  P("측정: 프로필·Curator 컬렉션에서 상품 상세 도착 → 구매 (Shop 통합 기획서 14장).")
);

add(H1("8. 운영 데이터"),
  TBL(["필드", "원천", "사용처"], [
    ["이름 · 국가 · 분야 · 소개", "인물 데이터 (메타오브젝트 권장)", "로스터, 디렉터리, 프로필"],
    ["승인 이미지 · 초점 · 출처", "인물 데이터 + 권리 기록", "카드·프로필"],
    ["분류 (편집 인물·Aurora 100·큐레이터·협업)", "인물 데이터", "배지, Shop 연결 여부"],
    ["관련 기사", "블로그 메타필드", "Studio 탭"],
    ["추천·협업 상품", "상품 메타필드 + 근거 문서", "Shop 탭, 컬렉션"],
    ["추천 근거 기록", "내부 기록 (공개 안 함)", "운영 검수"]
  ], [2.2, 2.2, 2])
);

add(H1("9. 현재 상태와 검증"),
  B("목업 완료: Curators 메인, 프로필 두 구성(Rashmika · NMIXX), 협업 CTA 경로 안내, 제안 결과 화면"),
  B("샘플 표시: Curated edits·Trending의 일부 이야기"),
  TBL(["검증 항목", "방법", "담당"], [
    ["인물 사진 사용 권리", "인물·출처별 권리 확인표", "대표 · 편집"],
    ["승인 큐레이터 목록", "현재 합의된 큐레이터 확인 — 없으면 ‘Featured’로만 표시", "파트너십"],
    ["추천 근거", "Curator’s Recommendation 항목별 서면 확인", "파트너십"],
    ["협업 제안 접수", "접수 도구 연결·담당 배정·회신", "Codex · 운영"],
    ["모바일 프로필", "390·360에서 탭·탐색·얼굴 크롭", "디자인"]
  ], [2, 3, 1.4])
);

add(H1("10. 대표님 결정 사항"),
  TBL(["#", "결정할 것", "권장안"], [
    ["1", "첫 승인 큐레이터", "서면 합의가 가능한 1–2명부터, 나머지는 Featured로 유지"],
    ["2", "Top Curators of the Month 기준", "편집 선정 기준을 내부 문서로 정하고 숫자 없이 운영"],
    ["3", "Curator’s Recommendation 근거", "서면 추천만 인정, 협업 상품과 구분 표기"],
    ["4", "인물 사진 권리", "원 Figma·소셜 사진 승인 범위를 인물별로 기록"],
    ["5", "큐레이터 정산", "추천 수수료·협업 수익 배분을 계약서 기준으로"]
  ], [0.4, 2, 4])
);

add(H1("부록. 목업 화면"),
  LINKP(LINK),
  TBL(["화면", "내용"], [
    ["Curators", "로스터 · 에디트 · Top Curators · NMIXX 미리보기 · 디렉터리 · 접근 방식"],
    ["Curator profile", "Rashmika (콘텐츠 풍부) · curator.html?c=nmixx (상품·커뮤니티 없음)"],
    ["Partner with us", "Curators 유형 제안, 제출 전 확인"],
    ["Proposal results", "접수·미발송·실패·중복·회신 메일"]
  ], [2, 4.4])
);

module.exports = C;
if (require.main === module) build(process.argv[2] || "Aurora_Curators_기획서.docx", "Aurora Curators 기획서", "Aurora Curators 기획서", C);
