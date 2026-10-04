const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  HeadingLevel, AlignmentType, LevelFormat, BorderStyle, PageBreak, Footer, PageNumber,
  TableOfContents, ExternalHyperlink, VerticalAlign
} = require("docx");

const FONT = { ascii: "Malgun Gothic", eastAsia: "Malgun Gothic", hAnsi: "Malgun Gothic", cs: "Malgun Gothic" };
const INK = "0B0E15", MUTED = "4A4D5C", MAGENTA = "CD089C", LINE = "D9D6E6", HEAD = "F1EFF7";
const W = 9638; // A4 content width (2 cm margins)
const LINK = "https://claude.ai/artifact/9S325ZyZ1nBDtVJqVAzieu";

// ---- helpers --------------------------------------------------------------
const runs = (t, o = {}) => {
  // **bold** segments
  return String(t).split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(s =>
    s.startsWith("**") ? new TextRun({ text: s.slice(2, -2), bold: true, ...o }) : new TextRun({ text: s, ...o }));
};
const P = (t, o = {}) => new Paragraph({ children: runs(t, o.run), spacing: { after: 120, line: 300 }, ...o.p });
const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)], pageBreakBefore: true });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const H3 = t => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });
const B = (t, lvl = 0) => new Paragraph({ numbering: { reference: "b", level: lvl }, children: runs(t), spacing: { after: 60, line: 290 } });
const N = (t, ref = "n") => new Paragraph({ numbering: { reference: ref, level: 0 }, children: runs(t), spacing: { after: 60, line: 290 } });
const NOTE = t => new Paragraph({
  children: runs(t, { size: 19, color: MUTED }), spacing: { before: 60, after: 160, line: 280 },
  border: { left: { style: BorderStyle.SINGLE, size: 12, color: MAGENTA, space: 8 } }, indent: { left: 160 }
});
const SP = () => new Paragraph({ children: [], spacing: { after: 60 } });

const border = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const borders = { top: border, bottom: border, left: border, right: border };
function cell(text, w, head = false, shade = null) {
  const paras = String(text).split("\n").map(line => new Paragraph({ children: runs(line, { size: 18, bold: head ? true : undefined, color: head ? INK : undefined }), spacing: { after: 40, line: 260 } }));
  return new TableCell({
    width: { size: w, type: WidthType.DXA }, borders, verticalAlign: VerticalAlign.TOP,
    shading: head ? { fill: HEAD, type: ShadingType.CLEAR, color: "auto" } : (shade ? { fill: shade, type: ShadingType.CLEAR, color: "auto" } : undefined),
    margins: { top: 70, bottom: 70, left: 110, right: 110 }, children: paras
  });
}
function T(headers, rows, ratios) {
  const total = ratios.reduce((a, b) => a + b, 0);
  const widths = ratios.map(r => Math.floor(W * r / total));
  widths[widths.length - 1] += W - widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: widths,
    rows: [new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, widths[i], true)) })]
      .concat(rows.map(r => new TableRow({ children: r.map((c, i) => cell(c, widths[i], false, (i === 0 ? "FBFAFD" : null))) })))
  });
}
const TBL = (...a) => [T(...a), SP()];

// ---- content --------------------------------------------------------------
const cover = [
  new Paragraph({ children: [], spacing: { before: 2200 } }),
  new Paragraph({ children: [new TextRun({ text: "AURORA COMMUNITY", bold: true, size: 22, color: MAGENTA, characterSpacing: 60 })], spacing: { after: 200 } }),
  new Paragraph({ children: [new TextRun({ text: "커뮤니티 생태계 기획서", bold: true, size: 56, color: INK })], spacing: { after: 160 } }),
  new Paragraph({ children: [new TextRun({ text: "구조 · 대상별 권한 부여 방식 · 기획 의도 · 운영", size: 28, color: MUTED })], spacing: { after: 600 } }),
  new Paragraph({ children: [new TextRun({ text: "A World Connected by Experience", italics: true, size: 26, color: INK })], spacing: { after: 80 } }),
  new Paragraph({ children: [new TextRun({ text: "경험으로 연결되는 하나의 세계", size: 22, color: MUTED })], spacing: { after: 1400 } }),
  T(["항목", "내용"], [
    ["문서", "Aurora Community 기획서 v1.1 (검토용) — Codex 기획·제작 리뷰 반영"],
    ["작성일", "2026-10-04"],
    ["작성", "수석 디자인 (Claude)"],
    ["대상", "대표님(Executive Producer), Codex 기획자, 제작자, 마케터"],
    ["기준 목업", "auroracurate.com 최종 목업 — " + LINK],
    ["상태", "디자인·구조 확정을 위한 기획서. 실제 결제, Tevello 권한, 신청 접수는 운영 검증 전입니다."]
  ], [1, 4]),
];

const toc = [
  new Paragraph({ children: [new TextRun({ text: "목차", bold: true, size: 32 })], pageBreakBefore: true, spacing: { after: 200 } }),
  new TableOfContents("목차", { hyperlink: true, headingStyleRange: "1-2" }),
  NOTE("Word에서 목차가 비어 보이면 목차를 마우스 오른쪽 버튼으로 눌러 ‘필드 업데이트’를 선택하세요.")
];

const s1 = [
  H1("1. 한눈에 보기"),
  P("Aurora Community는 **사람이 모여 대화하고, 배우고, 경험을 사고파는 공간**입니다. Studio에서 읽은 이야기가 대화로 이어지고, 대화가 배움과 경험으로 이어지며, 그 경험이 다시 새로운 이야기와 상품이 되는 Aurora 생태계의 ‘순환 장치’ 역할을 합니다."),
  H2("1.1 세 문장 요약"),
  N("**무엇을:** 무료 공간(Aurora Lounge), 신청·승인 공간(명예기자 데스크), 유료 프로그램(커뮤니티 멤버십 · 코호트 · 코스 · 워크숍 · 디지털 상품 · 경험)을 하나의 Community로 묶습니다."),
  N("**어떻게:** 공개 소개는 Aurora 테마(Shopify)에서, 결제는 Shopify Checkout에서, 회원 공간과 수강은 Tevello 앱에서 운영합니다. 세 시스템은 ‘같은 이메일 계정’으로 연결됩니다."),
  N("**왜:** 아시아와 세계를 사람·아이디어·제품·경험으로 잇는다는 Aurora의 비전을, 방문자가 ‘읽기 → 참여 → 배움 → 경험’으로 직접 체험하게 하기 위해서입니다."),
  H2("1.2 핵심 설계 원칙"),
  ...TBL(["원칙", "의미", "화면에서의 구현"], [
    ["읽기·무료 참여·구매를 구분", "고객이 ‘무엇을 읽고, 무엇에 무료로 참여하고, 무엇을 사는지’ 한눈에 안다", "Community 상단 3단 구분: Read(로그인 불필요) / Join(무료) / Learn & experience(유료)"],
    ["참여 ≠ 선정 ≠ 보증", "가입·구매·수강은 Curator 지위, Aurora 100 선정, 추천을 의미하지 않는다", "프로그램 상세 FAQ, 하단 안내문, 신청 결과 화면에 일관되게 명시"],
    ["자동 승급 없음", "어떤 활동도 자동으로 상위 권한(기자·호스트·큐레이터)을 주지 않는다", "모든 상위 권한은 ‘신청 → 검토 → 승인’으로만 부여"],
    ["최소 권한", "각 사람은 필요한 공간에만 들어간다", "공간·강좌별 개별 권한, 비공개 공간은 존재 자체를 노출하지 않음"],
    ["가짜 수치 금지", "회원 수·수강생 수·평점·마감 임박 표시를 하지 않는다", "카드·상세·회원 화면 어디에도 인원 수를 표시하지 않음"],
    ["같은 프로그램, 두 입구", "Shop과 Community는 같은 프로그램을 가리킨다", "content/offers.js 한 목록을 두 페이지가 함께 사용"],
    ["네 가지를 섞지 않음", "계정(누구인가) · 이용 권한(무엇에 접근하나) · 역할(무엇을 맡도록 승인됐나) · 편집 권위(누가 결정하나)를 하나의 유료 등급으로 묶지 않는다", "강좌 A 구매자는 강좌 B를 못 보고, 기자 승인은 Curator·Aurora 100 선정이 아니며, 호스트는 다른 프로그램 회원·매출을 보지 못한다"]
  ], [1.2, 2, 2.4]),
  NOTE("무료 Lounge는 ACC, Collective 또는 큐레이터 선발 체계와 같은 것이 아닙니다. ACC는 초청 기반 권위 체계이므로 Lounge의 상위 유료 등급이나 활동 보상으로 노출하지 않습니다."),
];

const s2 = [
  H1("2. 기획 의도"),
  H2("2.1 Aurora 세계관에서 Community의 자리"),
  P("Aurora의 공식 슬로건은 **A World Connected by Experience**입니다. Aurora는 사람·제품·기업·문화·아이디어를 연결해 공유된 경험, 새로운 기회, 지속되는 가치를 만듭니다. 네 개의 세계(Studio · Curators · Community · Shop) 가운데 Community는 **사람과 사람이 직접 만나는 곳**이며, 다른 세 세계를 서로 이어 주는 접점입니다."),
  ...TBL(["세계", "역할", "Community와의 연결"], [
    ["Studio", "이야기를 읽고 보는 곳 (인터뷰·에디토리얼·Aurora 100·Global Faces 100)", "기사 → 주제 대화(Lounge 9개 토픽) / 명예기자의 기사가 Studio에 실릴 수 있음(선정은 편집 결정)"],
    ["Curators", "신뢰할 수 있는 관점을 가진 사람들", "멘토·호스트로서 워크숍·코스 진행 가능(계약 기반) / 협업 제안은 항상 Aurora 팀이 접수"],
    ["Community", "대화·배움·경험의 공간", "—"],
    ["Shop", "선택할 이유가 있는 상품과 프로그램", "Community의 유료 프로그램이 Shop ‘Programs & experiences’에도 같은 카드로 노출"]
  ], [1, 2.2, 3.2]),
  H2("2.2 대표님 의도의 해석"),
  ...TBL(["대표님의 의도", "Community에서의 판단", "피해야 할 해석"], [
    ["누구나 글로벌로 나아갈 수 있는 공간", "무료 Lounge로 문턱을 낮추고, 9개 분야 토픽으로 관심사별 대화를 연다", "‘가입하면 글로벌 성공’ 같은 약속"],
    ["경험을 사고파는 세계", "코호트·코스·워크숍·디지털·경험을 하나의 마켓으로, 호스트는 선별적으로 제안·제작", "누구나 입점하는 오픈 마켓"],
    ["Tevello로 판매·운영", "판매는 Shopify, 수강·입장은 Tevello로 역할 분리", "테마 화면에서 Tevello 기능을 흉내 내 약속"],
    ["명예기자·인재 발굴", "신청과 편집 검토를 거친 명예기자 데스크", "참여만으로 기자·큐레이터 지위 부여"],
    ["권위(Aurora 100)와 발견(Global Faces 100)", "Community는 ‘추천(Suggest)’만 받고 선정은 편집부 결정", "후원·결제·가입으로 등재 가능해 보이는 문구"]
  ], [1.6, 2.6, 2]),
  H2("2.3 성공의 정의"),
  P("Community의 성공은 매출만으로 판단하지 않습니다. 다음 행동 각각을 ‘완성된 경험’으로 봅니다."),
  B("이야기를 읽고 관련 주제의 대화로 이동한다."),
  B("무료로 Lounge에 들어와 자기소개를 하거나 질문을 남긴다."),
  B("샘플 수업을 읽고 프로그램의 가치를 이해한다."),
  B("프로그램을 구매하고 첫 수업까지 막힘없이 도착한다."),
  B("명예기자·호스트로 신청하고, 결과를 정직하게 안내받는다."),
  NOTE("측정 항목(가입 전환, 첫 수업 도달, 신청 처리 시간 등)은 출시 후 실제 데이터로만 보고합니다. 목업과 공개 화면에는 수치를 표시하지 않습니다."),
];

const s3 = [
  H1("3. 커뮤니티 구조"),
  H2("3.1 세 개의 층"),
  P("Community는 하나의 화면처럼 보이지만 실제로는 세 개의 시스템이 맡은 층으로 나뉩니다. 고객에게는 끊김 없이, 운영에서는 책임이 분명하게 설계했습니다."),
  ...TBL(["층", "화면", "운영 시스템", "역할"], [
    ["① 공개 소개", "Community 페이지, 프로그램 상세, Host on Aurora", "Aurora 테마 (Shopify)", "누구나 보는 소개·탐색·선택. 로그인 없이 읽기 가능"],
    ["② 결제", "장바구니 → Checkout → 주문 확인", "Shopify (네이티브)", "유료 프로그램 구매, 영수증, 주문 상태"],
    ["③ 회원 공간", "회원 홈, 내 강좌, 수업, 커뮤니티 공간, 라이브러리", "Tevello 앱 (/a/members)", "권한이 있는 사람만 들어가는 대화·학습 공간"],
    ["④ 신청 접수", "Partner with us, 명예기자·호스트 신청, 결과 안내", "Aurora 테마 + 접수 도구(미연결)", "상위 권한 요청과 검토 결과 안내"]
  ], [1, 2.2, 1.6, 2.6]),
  H2("3.2 공간(스페이스) 구성"),
  ...TBL(["공간", "성격", "들어갈 수 있는 사람", "현재 상태"], [
    ["Aurora Lounge", "Aurora의 열린 대화방. Start Here, Introductions, 9개 분야 토픽(Entertainment · Icons · Beauty · Fashion · Hustle · Taste · Lifestyle · Travel · Wellness)", "Aurora 로그인 회원 누구나 (무료)", "Tevello에 실제 공간 존재(링크 연결됨)"],
    ["Honorary Reporters’ Desk", "승인된 명예기자의 기사 제안·편집 피드백 공간", "신청 후 승인된 명예기자", "신청 흐름 목업 완료, 운영 공간 미개설"],
    ["Newsroom (비공개)", "편집부와 기자의 내부 작업 공간", "편집부가 지정한 사람만", "공개 화면에 이름·존재를 노출하지 않음. 직접 URL 접근 차단 검증 필요"],
    ["멤버십 서클 (예: K-Beauty Circle)", "관심 분야별 유료 멤버십 공간", "멤버십 구매자", "디자인 샘플"],
    ["코호트 공간 (예: K-Career Training)", "정해진 일정에 함께 배우는 그룹 공간", "등록·결제한 코호트 참가자", "신청 흐름 정의, 운영 미개설"],
    ["코스 / 라이브러리", "자기 주도 수업, 디지털 자료 보관", "해당 상품 구매자", "Entertainment Builder 테스트 강좌 1개(읽기 수업 1개) 존재, 판매 전"]
  ], [1.4, 2.4, 1.6, 1.8]),
  NOTE("운영 제안(Codex 리뷰 반영): 9개 분야 토픽을 처음부터 모두 빈 게시판으로 열기보다, 실제 진행자와 대화 소재가 있는 주제부터 운영합니다. 탐색 구조(9개 분야)는 유지하되 활동 여부를 정확히 표시합니다."),
  H2("3.3 프로그램 마켓 — 여섯 가지 유형"),
  P("‘경험을 사고파는 Aurora 세계관’을 고객이 이해하기 쉬운 여섯 유형으로 나눴습니다. 모든 유형은 같은 카드·상세 템플릿을 씁니다."),
  ...TBL(["유형", "정의", "구매·입장 방식", "목업 예시 (상태)"], [
    ["Communities", "소속되는 공간 (무료 또는 멤버십)", "무료: 로그인 / 유료: Shopify 결제 → Tevello 멤버십", "Aurora Lounge (무료·운영 중), Reporters’ Desk (신청제), K-Beauty Circle (샘플)"],
    ["Cohorts", "일정에 맞춰 그룹으로 배우는 과정", "신청·적합성 검토 → 결제 → 코호트 공간", "K-Career Training (신청제), Entertainment Builder Cohort (샘플)"],
    ["Courses", "언제든 시작하는 자기 주도 수업", "결제 → Tevello 자동 등록 → 내 강좌", "Entertainment Builder 미리보기 (판매 전), Korean Language & Culture (샘플)"],
    ["Workshops", "호스트와 함께하는 1회성 라이브 세션", "결제 → 참여 안내 이메일 → 라이브", "From Idea to Creative Brief, Meet the Maker (샘플)"],
    ["Digital", "소장하는 워크북·가이드·에디션", "결제 → 라이브러리 다운로드", "Entertainment Builder Workbook, Aurora 100 디지털 에디션 (샘플)"],
    ["Experiences", "비공개 세션·현장 경험", "결제 → Asia Lab 일정 조율 → 진행", "K-Career Entry Session (판매 중, US$99), Seoul Beauty Route (준비 중, US$50)"]
  ], [1, 1.8, 2.2, 2.6]),
  H3("프로그램 상태 표시"),
  ...TBL(["상태", "의미", "버튼"], [
    ["Open", "지금 구매·참여 가능 (실제 Shopify 상품이 있을 때만)", "Book this session / Join now"],
    ["Free to join", "무료, 로그인 필요", "Join free"],
    ["By application", "신청 → 검토 → 안내. 신청은 승인이 아님", "Apply"],
    ["Preview · not on sale", "테스트 강좌, 판매 전", "샘플 수업 읽기"],
    ["Not yet open", "준비 중", "알림 신청"],
    ["Design sample", "구성 확인용 견본, 판매·운영 아님", "비활성 + 관심 표시"]
  ], [1.4, 3, 2]),
  H3("상품별로 확정해야 하는 정책 필드"),
  P("문구 완성도를 위해 미확정 조건을 임의로 채우지 않습니다. 아래 항목은 프로그램마다 확정 필드로 관리하고, 확정 전에는 상세 페이지에 ‘판매 전에 공개’로 표시합니다."),
  ...TBL(["필드", "예시 질문"], [
    ["이용 기간", "구매 후 언제까지 볼 수 있나? 코호트 종료 후 열람은?"],
    ["일정 변경·재수강", "일정 변경, 다음 기수 이월, 재수강이 가능한가?"],
    ["자료·녹화", "다운로드, 녹화본 제공 여부와 범위"],
    ["피드백 범위", "과제 피드백, 1:1 시간의 범위"],
    ["환불", "언제까지, 얼마나, 이미 받은 자료는 어떻게"],
    ["수행·계약·지원 주체", "Aurora / Asia Lab / 호스트 중 누가 제공·계약·결제·고객지원을 맡는가 (Aurora와 Asia Lab을 같은 사업명으로 합치지 않음)"]
  ], [1.4, 5]),
  H2("3.4 Host on Aurora — 경험을 파는 쪽"),
  P("Aurora는 누구나 입점하는 오픈 마켓이 아니라 **선별형 프로덕션 하우스**입니다. 경험을 파는 쪽(호스트)도 같은 원칙으로 받습니다."),
  N("**제안:** 호스트가 아이디어·대상·작업을 제안 (Partner with us → Curators/hosts)", "n2"),
  N("**편집 검토:** 제안은 승인이 아니며, 결과는 이메일로 안내", "n2"),
  N("**공동 제작:** 형식·일정·가격·권리를 서면으로 합의", "n2"),
  N("**Aurora에서 오픈:** Shopify Checkout으로 판매, 회원은 Tevello에서 학습", "n2"),
  N("**정산:** 계약에 따른 수익 배분 (Shopify는 호스트별 자동 분배를 기본 지원하지 않으므로 Aurora가 정산)", "n2"),
];

const s4 = [
  H1("4. 대상(역할) 정의와 권한"),
  H2("4.1 대상 정의"),
  ...TBL(["대상", "누구인가", "되는 방법"], [
    ["방문자", "로그인하지 않은 모든 사람", "—"],
    ["회원", "Aurora 계정으로 로그인한 사람 (무료)", "로그인(이메일 일회용 코드). 처음 로그인하면 계정 생성"],
    ["수강생·구매자", "코스·디지털·워크숍·경험을 구매한 회원", "Shopify에서 구매 → 같은 이메일 계정에 권한 추가"],
    ["멤버십 회원", "유료 서클에 가입한 회원", "멤버십 상품 구매(기간제). 만료 시 권한 종료"],
    ["코호트 참가자", "정해진 일정의 그룹 과정에 등록한 회원", "신청 → 적합성 검토 → 결제 → 코호트 공간 등록"],
    ["명예기자", "편집부가 승인한 기고자", "신청 → 편집 검토 → 승인 시 Reporters’ Desk 권한"],
    ["호스트", "Aurora와 계약해 프로그램을 운영하는 사람", "제안 → 검토 → 서면 합의 → 담당 공간에 한정된 진행 권한"],
    ["큐레이터", "Aurora와 협업이 확정된 인물", "Aurora 팀 경유 협업 제안 → 확정. 커뮤니티 권한은 별도 부여"],
    ["모더레이터", "Aurora 팀의 커뮤니티 관리 담당", "내부 지정"],
    ["관리자", "Shopify·Tevello 관리 권한을 가진 운영진", "내부 지정 (최소 인원)"]
  ], [1.1, 2.4, 3]),
  H2("4.2 권한 매트릭스"),
  P("● 가능 · ◐ 일부/조건부 · — 불가"),
  ...TBL(["권한", "방문자", "회원", "수강생·구매자", "코호트", "명예기자", "호스트", "모더레이터"], [
    ["공개 소개·프로그램 상세 읽기", "●", "●", "●", "●", "●", "●", "●"],
    ["Reporter 기사·하이라이트 읽기", "●", "●", "●", "●", "●", "●", "●"],
    ["Lounge 글 읽기", "◐ 미리보기", "●", "●", "●", "●", "●", "●"],
    ["Lounge 글쓰기·댓글", "—", "●", "●", "●", "●", "●", "●"],
    ["샘플 수업 읽기", "●", "●", "●", "●", "●", "●", "●"],
    ["구매한 코스·라이브러리", "—", "—", "● 구매한 것만", "◐", "—", "◐ 담당분", "—"],
    ["코호트 공간·일정 수업", "—", "—", "—", "● 일정대로", "—", "◐ 담당분", "◐"],
    ["Reporters’ Desk", "—", "—", "—", "—", "●", "—", "●"],
    ["Newsroom (비공개)", "—", "—", "—", "—", "◐ 지정 시", "—", "●"],
    ["신고하기", "—", "●", "●", "●", "●", "●", "●"],
    ["게시물 숨김·회원 제재", "—", "—", "—", "—", "—", "—", "●"]
  ], [1.9, 0.95, 0.95, 1.05, 0.95, 0.95, 0.95, 1.05]),
  NOTE("Tevello가 실제로 지원하는 권한 단위(공간별·강좌별·기간별)와 역할 종류는 출시 전 Tevello 관리자 화면에서 확인해야 합니다. 지원하지 않는 항목은 수동 운영(태그·수동 등록)이나 대체 방식으로 정합니다."),
  H2("4.3 자격은 겹칠 수 있지만, 자동으로 생기지 않는다"),
  ...TBL(["대상", "볼 수 있는 범위", "자동으로 얻지 않는 것"], [
    ["무료 Lounge 회원", "공개 콘텐츠와 Lounge", "다른 강좌 · 기자 Desk · 큐레이터 자격"],
    ["강좌 A 구매자", "강좌 A와 제공 자료", "강좌 B · 별도 코호트 · 모든 커뮤니티"],
    ["코호트 참가자", "배정된 기수와 공개된 수업", "다른 기수 · 미공개 수업"],
    ["워크숍 참가자", "구매한 회차", "다른 행사 · 무기한 자료 이용"],
    ["디지털 구매자", "구입한 자료", "전체 라이브러리 · 재배포 권리"],
    ["Experience 고객", "주문과 이메일 안내", "Tevello 전체 강좌 · 성과 보장"],
    ["명예기자", "허용된 기자 작업 공간", "자동 기사 게재 · Curator · ACC"],
    ["호스트", "계약한 프로그램의 운영 범위", "전체 회원 정보 · 전체 매출 · 관리자 권한"]
  ], [1.4, 2.4, 2.6]),
];

const s5 = [
  H1("5. 권한 부여 방식"),
  H2("5.1 부여 경로별 정의"),
  ...TBL(["권한", "부여 계기", "부여 주체·시스템", "확인 방법", "종료·회수", "문제 시 화면"], [
    ["회원 (무료)", "첫 로그인", "Shopify 고객 계정 → Tevello가 같은 계정 사용", "로그인 상태", "계정 삭제 요청 시", "로그인 안내 (learn: Sign-in)"],
    ["Lounge 참여", "로그인 회원", "Tevello 무료 공간 설정", "Lounge 입장 가능", "운영 원칙 위반 시 모더레이터 제재", "가입 전 미리보기 (Before joining)"],
    ["코스·디지털", "Shopify 구매 완료", "Tevello 상품 연동 자동 등록", "회원 홈 ‘내 강좌’에 표시", "환불 시 회수(정책 확정 필요)", "Access pending / 다른 이메일"],
    ["워크숍·경험", "Shopify 구매 완료", "Aurora/Asia Lab이 이메일로 일정·참여 안내", "주문 확인 + 안내 메일", "일정 종료", "Session to schedule"],
    ["멤버십 서클", "멤버십 구매", "Tevello 멤버십 (기간제)", "공간 입장", "만료·해지 시 자동 종료", "만료 안내 (설계 예정)"],
    ["코호트", "검토 통과 후 결제", "Tevello 코호트 등록 + 일정 공개(드립)", "‘Opens with your cohort’ 표시", "과정 종료 후 열람 기간 결정 필요", "잠긴 수업 안내"],
    ["명예기자", "신청 승인", "편집부가 Tevello에서 수동 부여", "Desk 입장", "활동 기준 미충족·원칙 위반 시", "신청 결과 (received / not this time)"],
    ["호스트", "서면 합의", "Aurora 운영진이 담당 공간에 한정 부여", "담당 공간 관리 가능", "계약 종료 시", "—"],
    ["모더레이터·관리자", "내부 지정", "Shopify/Tevello 관리자", "관리 화면", "역할 변경 시 즉시", "—"]
  ], [1, 1, 1.4, 1.1, 1.2, 1.3]),
  H2("5.2 권한 운영 원칙"),
  B("**이메일이 열쇠입니다.** 모든 권한은 ‘결제·신청에 쓴 이메일’ 계정에 붙습니다. 다른 이메일로 로그인한 경우 안내 화면에서 해결 방법을 보여 줍니다."),
  B("**권한 이동은 팀이 합니다.** 이메일 변경, 선물, 계정 통합 요청은 Aurora 팀이 확인 후 처리합니다."),
  B("**자동 승급은 없습니다.** 활동량·구매액으로 상위 권한이 열리지 않습니다."),
  B("**비공개는 끝까지 비공개입니다.** 권한 없는 사람이 비공개 공간 주소로 들어오면 ‘존재하지 않는 페이지’와 같은 화면을 보여 줍니다(이름·존재 노출 금지)."),
  B("**회수도 설계합니다.** 환불·만료·위반 시 권한이 어떻게 끝나는지 상품 공개 전에 정합니다."),
  B("**확정된 주문만 권한을 만듭니다.** 결제 대기·실패, 완료 화면 도착만으로는 부여하지 않습니다. 같은 주문을 다시 처리해도 권한이 중복 생성되지 않게 합니다."),
  B("**지연 시 재구매를 유도하지 않습니다.** 권한 반영이 늦으면 ‘다시 살 필요 없음’을 안내하고 주문 번호로 확인합니다."),
  B("**이메일 불일치는 소유 확인으로 해결합니다.** 이메일 문자열만 바꿔 다른 사람에게 권한을 옮기지 않습니다."),
  B("**역할 종료는 역할 권한만 정리합니다.** 기자·호스트 역할이 끝나도 개인이 구매한 이용권은 그대로 둡니다."),
  B("**메뉴 숨김은 보호가 아닙니다.** 비공개 경계는 URL 직접 입력, 뒤로 가기, 검색, 추천 카드에서도 유지되어야 합니다."),
  H2("5.3 최소 관리 기록"),
  P("운영 제안: 권한마다 아래 항목을 연결해 기록합니다. 이메일은 안내와 확인에 쓰고, 내부 연결은 플랫폼의 고객 식별자까지 확인합니다."),
  B("고객 식별자 · 주문·상품 식별자 · 프로그램·기수·자료 식별자"),
  B("부여 근거(구매·승인·지정) · 현재 상태 · 시작일·종료일"),
  B("승인자 · 변경 이력 · 관련 지원 티켓"),
  H2("5.4 운영자 권한의 범위"),
  ...TBL(["담당", "하는 일", "주지 않는 것"], [
    ["편집자", "기사·기자 제안 검토, 기자 승인", "주문·환불 처리"],
    ["커뮤니티 담당", "신고·참여 관리, 게시물 조치", "Shopify 전체 관리자"],
    ["교육 담당", "배정된 과정·기수 운영", "다른 과정 회원 정보"],
    ["커머스 담당", "주문·환불 확인", "편집 결정"],
    ["기술 담당", "연동 장애 대응", "콘텐츠·선정 결정"]
  ], [1.4, 2.6, 2.4]),
  H2("5.5 접근이 막혔을 때 (예외 화면)"),
  ...TBL(["상황", "고객이 보는 안내", "다음 행동"], [
    ["로그인하지 않음", "이 수업은 회원 전용입니다", "로그인 / 샘플 수업 읽기"],
    ["구매 직후 권한이 아직 없음", "프로그램을 추가하는 중입니다 (보통 몇 분)", "새로 고침 / 도움말"],
    ["다른 강좌만 구매함", "이 강좌는 현재 계정의 프로그램이 아닙니다", "해당 강좌 보기 / 내 프로그램으로"],
    ["다른 이메일로 구매함", "이 계정에서 구매를 찾을 수 없습니다", "다른 이메일로 로그인 / 이전 요청"],
    ["코호트 일정 전", "코호트 일정에 맞춰 열립니다", "코호트 안내 보기"],
    ["비공개 공간", "이 페이지는 이용할 수 없습니다 (공간 이름 비공개)", "회원 홈 / Community"],
    ["글 등록 실패", "게시되지 않았습니다. 작성한 내용은 그대로 있습니다", "수정 후 다시 시도 / 이메일 문의"]
  ], [1.6, 2.8, 2]),
];

const s6 = [
  H1("6. 사용자 여정"),
  H2("6.1 처음 온 방문자 → 무료 회원"),
  N("Community 페이지에서 Read / Join / Learn 세 갈래를 봅니다.", "n3"),
  N("Reporter 하이라이트를 읽거나, Lounge 대화를 미리 봅니다(가입 전 안내).", "n3"),
  N("‘Join the Lounge — free’ → 이메일 일회용 코드로 로그인합니다.", "n3"),
  N("Lounge로 돌아와 자기소개를 남기거나 관심 토픽에 질문합니다.", "n3"),
  H2("6.2 프로그램 수강 (J04)"),
  N("Community 또는 Shop의 Programs에서 프로그램을 고릅니다.", "n4"),
  N("상세에서 대상·커리큘럼·구매 후 과정을 확인하고, 샘플 수업을 읽습니다.", "n4"),
  N("구매 → Shopify Checkout → 주문 확인 화면에서 ‘My learning으로 가기’.", "n4"),
  N("같은 이메일로 로그인 → 회원 홈 → 첫 수업.", "n4"),
  N("예외: 접근 대기, 다른 강좌만 보유, 다른 이메일 — 각각 안내 화면으로 회복.", "n4"),
  NOTE("경험·워크숍은 ‘결제 완료’를 ‘시간 예약 확정’으로 표시하지 않습니다. 최종 안내에는 날짜, 시간대, 회의 링크, 변경 방법이 반드시 들어갑니다. 목업 주문 화면도 ‘Paid · time not yet booked’로 고쳤습니다."),
  H2("6.3 명예기자·호스트 신청 (J05)"),
  N("Partner with us에서 유형을 고르고, 유형에 맞는 질문에만 답합니다.", "n5"),
  N("제출 전 답변을 확인하는 화면을 거칩니다.", "n5"),
  N("결과: 접수 완료 / 이메일 미발송 / 실패 / 중복 / 추가 정보 요청 / 함께하기 / 이번에는 어려움.", "n5"),
  N("승인 시에만 해당 공간 권한이 부여됩니다.", "n5"),
  H2("6.4 목업에서 확인하기"),
  P("아래 링크의 검토 허브(Review hub)에서 각 여정을 버튼 하나로 시작할 수 있습니다."),
  new Paragraph({ children: [new ExternalHyperlink({ link: LINK, children: [new TextRun({ text: LINK, style: "Hyperlink" })] })], spacing: { after: 160 } }),
];

const s7 = [
  H1("7. 운영과 안전"),
  H2("7.1 참여 원칙 (공개 화면 문구)"),
  ...TBL(["원칙", "내용"], [
    ["RESPECT · 홍보보다 사람", "배려하기. 괴롭힘·스팸·원치 않는 판매 메시지·타인을 대신한 주장 금지"],
    ["PRIVACY · 비공개는 비공개로", "허락 없이 회원의 작업·사진·대화를 다시 게시하지 않기. 기고가 자동으로 Studio에 실리지 않음"],
    ["HELP · 우려 알리기", "지원·신고는 aurora@auroracurate.com 또는 게시물의 ‘신고’"]
  ], [1.6, 4.8]),
  H2("7.2 신고와 모더레이션"),
  B("신고 사유: 스팸·판매 / 괴롭힘·혐오 / 개인정보 노출 / 저작권 / 기타"),
  B("신고는 Aurora 팀에 전달되며, 신고당한 회원에게 신고자가 알려지지 않습니다."),
  B("모더레이터는 게시물 숨김, 경고, 참여 제한, 권한 회수를 할 수 있습니다(Tevello 지원 범위 확인 필요)."),
  B("응답 시간은 운영팀이 확정한 뒤에만 공개합니다."),
  B("처리 순서(제안): 접수 → 위험도 판단 → 필요 시 임시 제한 → 검토와 근거 기록 → 조치 통지 → 이의 제기 처리"),
  B("신고 기능은 긴급 상황 대응 기관을 대신하지 않는다고 안내합니다."),
  B("뷰티·웰니스 대화가 개인의 치료·효능 보장으로 바뀌지 않도록 운영 안내를 둡니다."),
  B("이메일로 보내온 글은 자동 게시 승인으로 취급하지 않습니다."),
  H2("7.3 콘텐츠와 권리"),
  B("회원 글은 회원의 것입니다. Studio 게재는 편집부 선정과 본인 동의가 있을 때만 합니다."),
  B("인물·브랜드 사진은 사용 권리가 확인된 것만 사용합니다."),
  B("**대표 확정(2026-10-04):** ‘Help shape Aurora 100’은 일반 회원의 **의견 수집**으로만 사용합니다. 공식 추천·심사 권한은 ACC에 유지하며, 의견 제출은 선정권이나 선정 우대가 아닙니다. Community 카드 문구도 이에 맞게 고쳤습니다."),
  B("Global Faces 100도 같은 원칙입니다. 선정은 편집부의 독립적 결정입니다."),
];

const s8 = [
  H1("8. 데이터와 시스템 구성"),
  H2("8.1 시스템별 책임"),
  ...TBL(["시스템", "맡는 일", "Aurora가 디자인할 수 있는 범위"], [
    ["Aurora 테마 (Shopify)", "Community 소개, 마켓 카드, 프로그램 상세, Host 소개, 신청 폼", "전체 (빌드 대상)"],
    ["Shopify Checkout·주문 상태", "결제, 영수증, 주문 상태", "브랜드 설정 + 요금제가 지원하는 확장 블록만"],
    ["Shopify 고객 계정", "로그인(이메일 코드)", "브랜드 설정 수준"],
    ["Tevello", "회원 홈, 강좌, 수업, 커뮤니티 공간, 라이브러리, 권한", "앱 설정이 허용하는 범위. 목업은 제안 디자인"],
    ["접수 도구 (미정)", "신청 저장·담당 배정·회신", "결과 화면 문구"],
    ["이메일", "주문 알림, 접근 안내, 신청 회신", "문구 (대표 승인 필요)"]
  ], [1.6, 2.6, 2.2]),
  H2("8.2 프로그램 데이터 (한 곳에서 관리)"),
  P("프로그램은 content/offers.js 한 목록에서 관리하며, 운영 단계에서는 Shopify 상품 + Tevello 강좌/공간으로 옮깁니다. 같은 정보를 두 곳에 손으로 복사하지 않습니다."),
  ...TBL(["필드", "의미", "운영 시 원천"], [
    ["type", "community · cohort · course · workshop · digital · experience", "Shopify 상품 유형/메타필드"],
    ["status", "open · free · application · preview · soon · sample", "Shopify 판매 상태 + 메타필드"],
    ["title · by · field", "이름 · 제공자 · 9개 분야", "Shopify 상품 정보·메타필드"],
    ["summary · outcomes · structure · forWho", "소개 · 얻는 것 · 커리큘럼 · 대상", "상품 설명 또는 메타오브젝트"],
    ["price", "가격 (Shopify 실제 가격만)", "Shopify 변형 가격"],
    ["product", "연결된 Shopify 상품", "상품 핸들"],
    ["access", "입장 공간 (Tevello 강좌·공간)", "Tevello 상품 연동"],
    ["links", "실제로 관련된 Studio·Curators·Shop·분야", "상품 메타필드 (거짓 관계 금지)"]
  ], [1.6, 2.6, 2.2]),
];

const s9 = [
  H1("9. 현재 상태와 검증 항목"),
  H2("9.1 목업 완료"),
  B("Community 페이지 재구성: Read / Join / Learn 구분, 프로그램 마켓(6유형·14개 항목), Host on Aurora"),
  B("프로그램 상세 템플릿(유형별 구매 후 단계·FAQ·관련 세계), 한국어 긴 문장 레이아웃 시험"),
  B("회원 공간 참고 디자인 16개 상태: 로그인, 회원 홈, 내 강좌, 수업, 샘플 수업, 접근 대기·거부(3종), 비공개 공간, 가입 전 미리보기, 게시물, 글쓰기, 오류, 신고"),
  B("신청 결과 8개 상태와 회신 메일 문구 3종"),
  H2("9.2 출시 전 반드시 검증할 것"),
  ...TBL(["항목", "검증 방법", "담당"], [
    ["구매 → Tevello 자동 등록", "테스트 상품 1건 구매 후 내 강좌·접근 메일 확인", "Codex · 제작자"],
    ["Shopify 계정 ↔ Tevello 로그인 연결", "새 이메일로 가입·로그인·재방문", "제작자"],
    ["비공개 공간 직접 URL 차단", "권한 없는 계정으로 주소 직접 접근", "Codex"],
    ["글쓰기·댓글·신고 기능 범위", "Tevello 관리자 화면에서 지원 여부 확인", "제작자"],
    ["멤버십 기간·만료·환불 시 회수", "테스트 멤버십 생성·만료·환불", "Codex"],
    ["신청 접수 도구 연결", "엔드포인트·담당 메일함·자동 회신", "Codex · 운영"],
    ["다운로드(디지털 상품)", "Tevello 파일 제공 방식 확인", "제작자"]
  ], [2.4, 2.8, 1.2]),
  H2("9.3 오픈 전 필수 검수 시나리오 (Codex 제안 채택)"),
  N("비회원은 공개 대화와 샘플만 읽고, 제한 수업과 비공개 공간의 내용은 열리지 않는다.", "n6"),
  N("무료 회원은 Lounge 글·답글을 쓸 수 있으나 기자 Desk와 별도 강좌는 열리지 않는다.", "n6"),
  N("A 강좌 구매자는 A만 이용하며, B의 URL을 직접 입력해도 막힌다.", "n6"),
  N("실패·대기 결제는 권한을 만들지 않고, 성공 주문은 정확한 계정에 한 번만 연결된다.", "n6"),
  N("이메일 불일치는 소유 확인으로 해결하고, 다른 고객의 주문·권한이 노출되지 않는다.", "n6"),
  N("기수·일정 잠금과 구매 권한을 구분하고, 취소·환불 후 처리도 정책대로 확인한다.", "n6"),
  N("글쓰기 오류는 내용을 보존하고, 신고는 담당자가 실제로 받는다.", "n6"),
  N("신청서 접수와 이메일 앱 열기를 구분하고, 승인 전에는 역할을 부여하지 않는다.", "n6"),
  N("Shop과 Community의 같은 프로그램은 상태·가격·목적지가 일치한다.", "n6"),
  N("모바일 390·360에서 버튼·폼 오류·긴 제목·키보드 탐색이 정상이다.", "n6"),
  NOTE("테스트는 승인된 테스트 환경과 계정으로 진행합니다. 화면 준비 완료와 실제 운영 통과는 다른 완료 상태로 기록합니다."),
];

const s10 = [
  H1("10. 대표님 결정 사항"),
  ...TBL(["#", "결정할 것", "권장안 (수석 디자인)"], [
    ["1", "커뮤니티 운영 모델", "출시: 무료 Lounge + 유료 프로그램. 유료 멤버십 서클은 매달 지킬 약속(주제·자료)이 정해질 때 추가"],
    ["2", "첫 프로그램", "K-Career Entry Session(판매 중) + Entertainment Builder 코스 정식 판매 준비 + Lounge"],
    ["3", "호스트 정산 방식", "선별형·계약 기반 수익 배분, Aurora가 정산. 초기 2–3명으로 시작"],
    ["4", "명예기자 기준", "신청 질문, 승인 기준, 활동 기준, 해제 기준 확정"],
    ["5", "가격·환불·열람 기간", "프로그램별로 공개 전 확정 (확정 전에는 ‘Price set at launch’ 표시)"],
    ["6", "모더레이션 담당·응답 시간", "담당자 지정 후 공개 (그 전에는 시간 약속 문구 없음)"],
    ["7", "문구 교체", "‘Where Global Voices Meet Influence’ → ‘…Meet Culture’, ‘Launchpad to Global Success’ → ‘…to a Global Audience’, ‘Growth Engine’ → ‘Nine topics. One conversation.’ (‘Help shape Aurora 100’은 2026-10-04 확정: 의견 수집으로 유지)"],
    ["8", "Lounge 공개 열람", "Tevello가 로그인 없는 읽기를 지원하지 않으면, 공개 예시 대화와 실제 회원 대화를 구분해 보여 주는 대안을 승인"],
    ["9", "Entertainment Builder 수업 단위", "현재 테스트 강좌(읽기 수업 1개·6개 주제)와 목업의 6개 수업 진도 표시 중 출시 단위를 확정. 확정 전 목업은 ‘Planned structure’로 표시"]
  ], [0.4, 1.8, 4.2]),
];

const s105 = [
  H1("11. Codex 리뷰 반영 내역"),
  P("Codex 기획·제작 리뷰(Aurora_Community_Ecosystem_Plan_KO, 2026-10-04)에서 타당한 지적을 채택해 목업과 이 기획서에 반영했습니다."),
  ...TBL(["리뷰 지적", "반영"], [
    ["‘Help shape Aurora 100’은 의견 수집으로만 (대표 확정)", "Community 카드 문구 수정, 검토 허브 결정 사항을 ‘확정’으로 변경, 7.3에 기록"],
    ["신청형 기자 Desk 카드에 ‘Price set at launch’ 잔재", "신청형은 ‘No fee to apply’, 상세는 ‘By application’으로 수정"],
    ["무료·신청형 상세에도 결제 FAQ 반복", "FAQ를 무료 / 신청 / 구매 세 종류로 분리"],
    ["판매 전 강좌에 ‘구매 후’ 안내", "제목을 ‘How it will work once it opens’로 바꾸고 ‘지금은 구매 불가’를 명시, 커리큘럼은 ‘Planned’ 표시"],
    ["읽기 수업 1개 vs 진도 ‘Lesson 3 of 6’ 불일치", "회원 화면에 ‘Planned structure’ 표기와 현재 테스트 강좌 설명 추가, 결정 사항 9번으로 등록"],
    ["결제 완료 ≠ 예약 확정", "주문 화면 ‘Paid · time not yet booked’, FAQ ‘Is my time booked when I pay?’ 추가"],
    ["권한 지연 시 재구매 위험", "대기 화면과 FAQ에 ‘다시 살 필요 없음’ 안내 추가"],
    ["계정·권한·역할·권위 구분, 비자동 자격, 회수·관리 기록·운영자 범위", "1.2, 4.3, 5.2–5.4에 반영"],
    ["상품별 정책 필드, 수행 주체 구분", "3.3 정책 필드 표 추가, 상세 FAQ에 ‘판매 전에 공개’ 안내"],
    ["신고 처리 단계·뷰티 효능 주장·긴급 대응", "7.2에 반영"],
    ["필수 검수 시나리오 10개", "9.3에 채택"],
    ["실제 진행자가 있는 주제부터 운영", "3.2 운영 제안으로 반영 (분야 구조는 유지)"]
  ], [2.6, 3.8]),
  NOTE("리뷰는 목업 캡처를 근거로 작성되어 공유 링크의 클릭 동작은 확인되지 않았다고 밝혔습니다. 목업은 공유 링크에서 모든 상태를 직접 눌러 볼 수 있습니다: " + LINK),
];

const s11 = [
  H1("부록. 목업 화면 대응표와 용어"),
  H2("A. 목업 화면 대응표"),
  P("아래 화면은 목업 첫 화면(" + LINK + ")에서 검토 허브 또는 ‘All pages’로 열 수 있습니다."),
  ...TBL(["화면", "내용"], [
    ["Community", "3단 구분, 9개 토픽, Reporter 하이라이트, 프로그램 마켓, Host on Aurora, 참여 원칙"],
    ["Program detail (offer)", "유형별 상세: 대상·커리큘럼·구매 후 단계·FAQ·관련 세계 / 예: K-Career Entry Session, Aurora Lounge, Entertainment Builder"],
    ["Member area (learn)", "Tevello 참고 디자인 16개 상태 (상단 상태 막대로 전환)"],
    ["Cart · Order status", "프로그램 구매 → ‘Program access’ 주문 확인 화면"],
    ["Proposal results (application)", "명예기자·호스트 신청 결과 8개 상태"],
    ["Shop · Programs", "Community와 같은 프로그램 카드"],
    ["Review hub", "J01–J06 여정 시작, 대표 검토 대응표, 결정 사항"]
  ], [1.8, 4.6]),
  H2("B. 용어"),
  ...TBL(["용어", "뜻"], [
    ["Tevello", "Shopify용 강좌·커뮤니티 앱. 회원 공간(/a/members)을 렌더링"],
    ["코호트", "같은 일정으로 함께 배우는 그룹 과정"],
    ["드립(일정 공개)", "수업이 정해진 날짜에 순서대로 열리는 방식"],
    ["Stage / Read", "Aurora 디자인의 두 모드: 어두운 에디토리얼(Stage), 밝은 구매·학습 화면(Read)"],
    ["Design sample", "구성 확인용 견본. 판매·운영 아님"],
    ["Aurora 100 / Global Faces 100", "Aurora의 두 편집 IP. 권위(Aurora 100)와 발견(Global Faces 100). 순위·투표·유료 등재가 아님"]
  ], [1.8, 4.6]),
];

// ---- document ---------------------------------------------------------------
const doc = new Document({
  creator: "Aurora", title: "Aurora Community 기획서", description: "커뮤니티 구조·대상별 권한 부여·기획 의도",
  styles: {
    default: { document: { run: { font: FONT, size: 21, color: INK } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 34, bold: true, font: FONT, color: INK }, paragraph: { spacing: { before: 120, after: 240 }, outlineLevel: 0,
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: MAGENTA, space: 6 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: FONT, color: INK }, paragraph: { spacing: { before: 300, after: 140 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: FONT, color: MAGENTA }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "b", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 500, hanging: 280 } } } },
                                   { level: 1, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 900, hanging: 280 } } } }] },
      ...["n", "n2", "n3", "n4", "n5", "n6"].map(r => ({ reference: r, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 500, hanging: 320 } } } }] }))
    ]
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [
      new TextRun({ text: "Aurora Community 기획서 · ", size: 16, color: MUTED }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: MUTED })] })] }) },
    children: [...cover, ...toc, ...s1, ...s2, ...s3, ...s4, ...s5, ...s6, ...s7, ...s8, ...s9, ...s10, ...s105, ...s11]
  }]
});

Packer.toBuffer(doc).then(buf => { fs.writeFileSync(process.argv[2] || "Aurora_Community_Plan.docx", buf); console.log("written"); });
