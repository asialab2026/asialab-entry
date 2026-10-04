const { P, H1, H2, H3, B, NL, NOTE, TBL, LINK, LINKP, cover, toc, build, INTEGRATED } = require("./lib");
const C = []; const add = (...x) => x.forEach(i => Array.isArray(i) ? C.push(...i) : C.push(i));

if (!INTEGRATED) add(cover({
  kicker: "AURORA ABOUT",
  title: "About 기획서",
  sub: "브랜드 정의 · 슬로건 · 소개문 · 일하는 방식 · 생태계 안내 · 연락",
  meta: [
    ["문서", "Aurora About 기획서 v1.0 (검토용)"],
    ["작성일", "2026-10-04"],
    ["작성", "수석 디자인 (Claude)"],
    ["대상", "대표님, Codex 기획자, 제작자, 마케터"],
    ["상위 문서", "Aurora 오픈 통합 기획서 / Shop 생태계 통합 기획서"],
    ["기준 목업", LINK],
    ["상태", "슬로건·소개문은 대표 확정(2026-10-03). 법인 정보는 확정 필요"]
  ]
}));
if (!INTEGRATED) add(toc());

add(H1("1. 한눈에 보기"),
  P("About은 **Aurora가 누구이며 왜 존재하는지**를 한 페이지로 설명하는 곳입니다. 처음 온 고객, 파트너, 투자자, 언론이 Aurora의 세계관을 이해하고 다음 행동(탐색 · 협업 · 연락)을 고르게 합니다. 동시에 Asia Lab이 만든 브랜드라는 사실과 법인 정보를 정확히 밝히는 신뢰의 기준 페이지입니다."),
  H2("1.1 세 문장 요약"),
  NL([
    "**무엇을:** 공식 슬로건, 대표 확정 소개문, 일하는 방식(Discover · Develop · Produce), 네 세계 생태계, 탐색 입구, 연락 경로를 보여 줍니다.",
    "**어떻게:** 슬로건은 로고 바로 아래, 소개문은 About과 회사 소개에만, ‘Created by Asia Lab’ 표기는 About과 푸터에만 둡니다.",
    "**왜:** 브랜드의 정의가 흔들리지 않아야 Studio·Curators·Community·Shop이 하나의 세계로 읽히고, 고객이 안심하고 구매하기 때문입니다."
  ])
);

add(H1("2. 브랜드 정의 (고정)"),
  H2("2.1 공식 슬로건"),
  TBL(["항목", "확정 문구", "사용 위치"], [
    ["슬로건", "A World Connected by Experience", "로고 바로 아래 (Home · About · 푸터 · 브랜드 자료)"],
    ["대문자 표기", "A WORLD CONNECTED BY EXPERIENCE", "웹 헤더 하단, 굿즈, 배지"],
    ["국문", "경험으로 연결되는 하나의 세계", "한국어 자료"],
    ["예비안", "Experience Beyond Borders", "대표 승인 시에만"]
  ], [1.2, 2.8, 2.4]),
  H2("2.2 회사 정의"),
  TBL(["언어", "문장", "사용 위치"], [
    ["영문", "Aurora is a global production house and experience platform created by Asia Lab.", "About · 푸터 · 회사 소개"],
    ["국문", "Aurora는 Asia Lab이 만든 글로벌 프로덕션 하우스이자 경험 플랫폼입니다.", "한국어 자료"]
  ], [0.8, 3.8, 1.8]),
  H2("2.3 About 소개문 (대표 확정 2026-10-03)"),
  NL([
    "Connecting Asia and the world through people, ideas, products, and experiences.",
    "Aurora crosses borders and connects worlds.",
    "Built on the belief that human creativity, experience, and possibility should never be confined by geography, Aurora brings together people, products, companies, cultures, and ideas—connecting Asia with the world and the world with Asia.",
    "Through content, collaboration, commerce, and community, Aurora transforms meaningful connections into shared experiences, new opportunities, and lasting value.",
    "Our vision is to create one connected world where different identities and cultures meet, create, and grow together."
  ]),
  H2("2.4 쓰지 않는 표현"),
  B("‘Selective Production House’를 슬로건으로 사용하지 않음 (사업 형태 설명이므로)"),
  B("로고 바로 아래에 ‘Created by Asia Lab’을 두지 않음 — About과 푸터에서만"),
  B("Asia Lab의 실적을 Aurora 자체 실적으로 표기하지 않음"),
  B("가입·구매로 성공·영향력이 보장되는 듯한 표현")
);

add(H1("3. About 화면 구조"),
  TBL(["순서", "구성", "목적"], [
    ["1", "Hero — 공식 워드마크, 슬로건, 제목 ‘Connecting Asia and the world through people, ideas, products, and experiences.’, ‘Aurora crosses borders and connects worlds.’, 회사 정의, Aurora 100 에디토리얼 사진", "첫 화면에서 Aurora가 무엇인지"],
    ["2", "About Aurora 성명 — 믿음 · 일하는 방식 · Our vision 인용", "세계관을 읽는 문장"],
    ["3", "Our practice — Discover(독립적인 시선) · Develop(편집의 정성) · Produce(오리지널 작업)", "Production House로서 일하는 방식"],
    ["4", "One ecosystem — 원본 생태계 이미지 + 네 개의 접점(Studio · Curators · Community · Shop)", "네 세계가 하나로 연결됨 (Live는 다섯 번째 세계가 아님)"],
    ["5", "Explore — Nine Tails · Our projects", "탐색 입구"],
    ["6", "Contact — 알려 줄 사람 · 함께 만들 프로젝트 · Asia Lab 채널", "연락 경로 (Partner with us · 이메일)"]
  ], [0.5, 3.6, 2.3]),
  NOTE("생태계 이미지는 대표님이 지정한 원본 ‘오로라 에코시스템’ 이미지를 사용합니다. 새 다이어그램으로 대체하지 않습니다.")
);

add(H1("4. 브랜드 시스템 요약"),
  TBL(["요소", "규칙"], [
    ["로고", "Stage(어두운 배경): 흰 로고 + 빛 · Read(밝은 배경): 검정 로고"],
    ["Aurora 별", "로고의 o 자리. 배지·빈 상태·메뉴 표식에 사용. 공식 파일만"],
    ["두 IP 마크", "Aurora 100 · Global Faces 100 공식 로고 (Gl✦bal Faces — 별이 o 자리)"],
    ["색", "Cosmic Midnight #0B0E15 · Aurora Magenta #CD089C · Deep Cosmos #0B2F89 · Solar Ember #E6733A · Velvet Eclipse #992138 · Starlight Mist #E1E0F6"],
    ["서체", "제목 Bodoni Moda · 본문 Manrope · 한국어 Pretendard · IP 이름 Poppins Light"],
    ["두 모드", "Stage = 발견·에디토리얼 · Read = 구매·학습·폼"]
  ], [1.2, 5.2]),
  P("전체 규칙은 목업의 Design guide 페이지에 있습니다.")
);

add(H1("5. 신뢰 정보 — 누가 운영하는가"),
  P("About은 고객이 ‘누구와 거래하는지’ 확인하는 페이지이기도 합니다. 미국 법인으로 판매하므로 아래 정보가 About 하단 또는 푸터·Contact information 정책에서 정확히 일치해야 합니다."),
  TBL(["항목", "값", "상태"], [
    ["운영 법인명", "[미국 법인 정식 명칭 — 예: ○○ Inc. / ○○ LLC]", "확정 필요"],
    ["사업장 주소", "[미국 주소 — 고객 문의·반품 안내와 일치]", "확정 필요"],
    ["고객 문의 이메일", "aurora@auroracurate.com", "운영 수신 확인 필요"],
    ["고객 문의 전화", "[번호]", "확정 필요"],
    ["브랜드와 법인의 관계", "Aurora는 Asia Lab이 만든 브랜드이며 [법인]이 운영", "문구 승인 필요"],
    ["상표", "Aurora · Aurora 100 · Global Faces 100", "등록 여부 확인"]
  ], [1.6, 3.4, 1.4]),
  NOTE("법인 정보의 정확한 표기와 위치는 ‘푸터와 법적 고지’ 기획(통합본 VI부)을 따릅니다.")
);

add(H1("6. 다른 세계와의 연결"),
  TBL(["연결", "About에서의 역할"], [
    ["Studio", "Aurora 100 · Global Faces 100의 의미 소개, 편집 원칙"],
    ["Curators", "Selected voices, real practice — 누구와 일하는가"],
    ["Community", "모두에게 열린 대화와 선별된 참여"],
    ["Shop", "Stories into objects — 이야기가 상품과 경험이 되는 방식"],
    ["Partner with us", "협업 제안의 단일 입구"]
  ], [1.4, 5])
);

add(H1("7. 상태와 결정 사항"),
  B("목업 완료: 슬로건·소개문·일하는 방식·생태계·탐색·연락"),
  TBL(["#", "결정할 것", "권장안"], [
    ["1", "미국 법인 표기", "법인명·주소·전화 확정 후 About 하단과 푸터에 동일 표기"],
    ["2", "Asia Lab 채널 노출", "Follow Asia Lab — 공식 URL 확정 후"],
    ["3", "공식 소셜 링크", "Instagram · YouTube 공식 URL 확정 후 헤더·푸터에 같은 방식으로"],
    ["4", "상표 표기", "등록 상태에 맞게 ™/® 사용"]
  ], [0.4, 2, 4])
);

module.exports = C;
if (require.main === module) build(process.argv[2] || "Aurora_About_기획서.docx", "Aurora About 기획서", "Aurora About 기획서", C);
