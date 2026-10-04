// Aurora 오픈 통합 기획서 — About · Studio · Curators · Community · Shop · Footer & Legal in one document
process.env.AURORA_INTEGRATED = "1";
const L = require("./lib");
const { P, H1, H2, B, NL, NOTE, TBL, LINK, LINKP, cover, toc, build, setPrefix, PART } = L;
const C = []; const add = (...x) => x.forEach(i => Array.isArray(i) ? C.push(...i) : C.push(i));

add(cover({
  kicker: "AURORA · AURORACURATE.COM",
  title: "Aurora 오픈 통합 기획서",
  sub: "About · Studio · Curators · Community · Shop · 푸터와 법적 고지 — 오픈을 위한 하나의 기준 문서",
  meta: [
    ["문서", "Aurora 오픈 통합 기획서 v1.0 (대표 검토용)"],
    ["작성일", "2026-10-04"],
    ["작성", "수석 디자인 (Claude) — 공동 대표 관점"],
    ["대상", "대표님, Codex 기획자, 제작자, 마케터, 운영, 법무 자문"],
    ["기준 목업", LINK],
    ["구성", "0부 개요 · I About · II Studio · III Curators · IV Community · V Shop · VI 푸터·법적 고지 · VII 오픈 체크리스트 · 부록"],
    ["원칙", "숫자·긴급 문구·할인 비교가 꾸미지 않음 · 샘플은 표기 · 결제는 Shopify · MAIN 테마 직접 수정 금지"]
  ]
}));
add(toc());

/* ---------------- 0부 ---------------- */
setPrefix("0");
add(PART("0부 · 오픈 개요", "한 장으로 보는 Aurora — 무엇을, 누구에게, 어떤 순서로 여는가"));
add(H1("1. 한 줄 정의와 슬로건"),
  TBL(["항목", "확정 문구"], [
    ["슬로건", "A World Connected by Experience — 경험으로 연결되는 하나의 세계"],
    ["회사 정의", "Aurora is a global production house and experience platform created by Asia Lab."],
    ["비전", "Our vision is to create one connected world where different identities and cultures meet, create, and grow together."],
    ["두 공식 IP", "Aurora 100 · Global Faces 100"]
  ], [1.3, 5.1]),
  P("Aurora는 아시아와 세계를 사람 · 아이디어 · 상품 · 경험으로 잇습니다. 네 세계는 각자 다른 입구지만 **모두 Shop의 상품과 프로그램으로 이어지도록** 설계되어 있고, Shop은 이 생태계 전체를 품는 판매의 장입니다.")
);
add(H1("2. 생태계 지도"),
  TBL(["세계", "역할", "고객이 하는 일", "Shop으로 이어지는 방식"], [
    ["Studio", "편집 · 콘텐츠 (Aurora 100 · Global Faces 100)", "읽고 발견한다", "기사 끝 관계가 문서화된 상품·프로그램"],
    ["Curators", "선별된 사람들", "누구와 일하는지 본다, 협업을 제안한다", "Curator’s Recommendation · 협업 상품"],
    ["Community", "대화와 배움 (Tevello)", "참여하고 배운다", "코호트 · 코스 · 워크숍 · 디지털 · 경험 판매"],
    ["Shop", "판매 (Shopify)", "산다", "실물 · 프로그램 · Fund · Together · Made for You"],
    ["About · 푸터", "신뢰의 기준", "누구와 거래하는지 확인한다", "법인 고지 · 정책"]
  ], [1, 1.8, 1.7, 1.9]),
  NOTE("Live는 다섯 번째 세계가 아니라 각 세계에서 쓰는 형식입니다.")
);
add(H1("3. 오픈 단계"),
  P("날짜는 대표님 결정 후 채웁니다. 각 단계는 앞 단계의 완료 조건을 만족해야 넘어갑니다."),
  TBL(["단계", "내용", "완료 조건"], [
    ["1. 결정", "미국 법인 정보, 출시 국가, 첫 판매 상품, 가격, 관세 방식, 정책 문구", "VII부 결정표 전 항목 확정"],
    ["2. 설정", "Shopify 스토어 세부정보·정책·Markets·세금·결제·개인정보, Tevello 상품 연결", "VI부 6장 체크리스트 완료"],
    ["3. 제작", "목업을 Shopify 미리보기 테마로 이식 (MAIN 테마 직접 수정 금지)", "모든 화면 1440·390·360 검수"],
    ["4. 검증", "실제 테스트 주문·환불·프로그램 접근·구독 해지·개인정보 거부", "VII부 시나리오 전 통과"],
    ["5. 소프트 오픈", "첫 판매 흐름: 검증된 실물 1개 + K-Career Entry Session + 무료 Lounge", "첫 실주문 배송 완료"],
    ["6. 확장", "추가 국가·상품·큐레이터·Fund·Together·Live", "실제 데이터 기준으로 판단"]
  ], [1.1, 3.4, 1.9])
);
add(H1("4. 역할"),
  TBL(["역할", "책임"], [
    ["대표님", "최종 결정 (브랜드·법인·가격·출시 국가·사람과 권리)"],
    ["수석 디자인 (Claude)", "목업·디자인 시스템·기획서·화면 검수"],
    ["Codex 기획자", "구조 검토, 운영 규칙, 리뷰"],
    ["Codex 제작자", "Shopify 테마·앱 연결, 미리보기 테마 제작"],
    ["마케터", "출시 메시지, 채널, 광고 픽셀(개인정보 선택과 연동)"],
    ["운영", "주문·배송·환불·모더레이션·문의 응답"],
    ["법무·세무 자문 (미국)", "정책 6종, FTC 공개 문구, 판매세, 관세, 화장품 규제"]
  ], [1.8, 4.6])
);

/* ---------------- Parts ---------------- */
const parts = [
  ["I", "I부 · About", "Aurora가 누구이며 왜 존재하는가 — 브랜드 정의와 신뢰", "./about"],
  ["II", "II부 · Studio", "편집과 콘텐츠 — Aurora 100 · Global Faces 100", "./studio"],
  ["III", "III부 · Curators", "선별된 사람들과 협업", "./curators"],
  ["IV", "IV부 · Community", "Tevello 위의 대화 · 배움 · 경험 시장", "./community"],
  ["V", "V부 · Shop", "생태계 전체를 품는 판매의 장", "./shop"],
  ["VI", "VI부 · 푸터와 법적 고지", "미국 법인 기준 · Shopify 필수 기재사항", "./legal"]
];
for (const [px, title, sub, mod] of parts) {
  setPrefix(px);
  add(PART(title, sub));
  L.newList();
  add(require(mod));
}

/* ---------------- VII ---------------- */
setPrefix("VII");
add(PART("VII부 · 오픈 체크리스트", "모든 결정 · 설정 · 검증을 한곳에"));
add(H1("1. 대표님 결정 통합표"),
  P("각 부의 결정 사항을 모았습니다. 권장안은 각 부 본문에 있습니다."),
  TBL(["#", "영역", "결정할 것", "막히는 것"], [
    ["1", "정책", "정책 기본형 6종 초안 완료(docs/policies) → 대표 확인·법무 검토 후 Shopify에 게시 (현재 스토어에는 Privacy만 있음)", "Shopify 이용약관 요건, 체크아웃"],
    ["2", "연락처", "Shopify 스토어 연락 이메일을 contact@auroracurate.com으로 변경 (현재 global@asialab.world), 개인정보 처리방침의 빈 전화 문구 정리", "개인정보 처리방침, 주문 메일"],
    ["3", "Shop", "출시 국가 (실물 / 디지털·프로그램)", "Markets, 배송 정책"],
    ["4", "Shop", "관세 방식 (미국 DDP 권장)", "배송 정책, 체크아웃"],
    ["5", "Shop", "첫 판매 흐름과 출시 가격", "소프트 오픈"],
    ["6", "Shop", "Fund · Together 결제 규칙, Shop Live 시점", "확장 단계"],
    ["7", "정책", "Refund · Shipping · Privacy · Terms · Contact · Subscription 원문", "Help, 체크아웃"],
    ["8", "정책", "맞춤 광고 픽셀 사용 여부", "Your Privacy Choices"],
    ["9", "Community", "운영 모델, 첫 프로그램, 호스트 정산, 가격·환불·열람 기간", "프로그램 판매"],
    ["10", "Community", "모더레이션 담당·응답 시간, Lounge 공개 열람 대안", "커뮤니티 공개"],
    ["11", "Community", "Entertainment Builder 출시 수업 단위", "코스 판매"],
    ["12", "Studio", "샘플 기사 교체 순서, Global Faces 100 첫 인터뷰 권리", "Studio 공개"],
    ["13", "Studio", "기사 끝 판매 연결 기준, 명예기자 게재 기준", "기사 → Shop"],
    ["14", "Curators", "첫 승인 큐레이터, 사진 권리, 정산", "Curators 공개"],
    ["15", "Curators", "Curator’s Recommendation 근거, FTC 관계 공개 문구", "추천 상품"],
    ["16", "About", "Asia Lab·소셜 공식 URL, 상표 표기(™/®)", "About, 푸터"]
  ], [0.3, 0.9, 3, 2.2]),
  NOTE("확인 완료(2026-10-04): 판매 법인 Asia Lab Global Incorporated(Delaware C Corporation), 주소 254 Chapman Rd, Ste 208 #23693, Newark, DE 19702 — Shopify 스토어 주소와 일치, EIN·정산 계좌·결제 등록 완료(대표님 확인). 이미 확정: 슬로건·회사 정의·About 소개문(2026-10-03), Global Faces 100 단독 마크, ‘Help shape Aurora 100’은 의견 수집으로 유지하고 공식 추천·심사는 ACC가 담당(2026-10-04).")
);
add(H1("2. 오픈 전 필수 검증 시나리오"),
  TBL(["#", "시나리오", "통과 기준"], [
    ["1", "실물 상품 구매 → 주문 확인 → 배송 → 추적", "주문 이메일에 법인 주소, 추적 링크 동작"],
    ["2", "품절·국가 미지원·결제 실패", "목업 상태와 같은 안내, 막다른 길 없음"],
    ["3", "프로그램 구매 → Tevello 접근", "같은 이메일로 로그인 시 즉시 열림"],
    ["4", "다른 이메일로 로그인", "접근 오류 화면이 해결 방법을 안내"],
    ["5", "1:1 세션 구매 → 예약", "‘결제 완료 · 시간 미예약’ 상태가 보임"],
    ["6", "멤버십 구독 → 해지", "체크아웃 동의 필수, 계정에서 바로 해지"],
    ["7", "환불 요청 (실물·프로그램·디지털)", "정책 문구대로 처리"],
    ["8", "협업 신청 (Partners · Curators · Contributors)", "접수·중복·추가 정보·결과 상태"],
    ["9", "커뮤니티 게시·신고", "신고가 운영팀으로, 신고 대상에게 알리지 않음"],
    ["10", "개인정보 판매·공유 거부 (GPC 포함)", "광고 픽셀 중지"],
    ["11", "마케팅 이메일", "주소와 수신 거부, 10영업일 내 처리"],
    ["12", "모든 페이지 1440 · 390 · 360", "가로 스크롤 없음, 깨진 이미지 없음, JS 오류 없음"]
  ], [0.3, 3, 3.1])
);
add(H1("3. 목업 현재 상태"),
  B("화면 25개, 상태 전환 포함 122개 화면 캡처 검수: JS 오류 0 · 가로 넘침 0 · 깨진 로컬 이미지 0"),
  B("푸터: 미국 법인 고지 줄, 정책 링크 7~8개, Your Privacy Choices 반영 (법인 값은 확정 대기, ?review=1에서 ‘확인 필요’ 표시)"),
  B("Help: 개인정보 선택 · 접근성 섹션 추가"),
  B("샘플 콘텐츠는 모두 ‘Sample’ 표기, 결제는 Shopify로만 연결"),
  NOTE("목업의 숫자·가격·인물은 실제 승인 전까지 공개 화면에 쓰지 않습니다.")
);

/* ---------------- Appendix ---------------- */
setPrefix("");
add(H1("부록. 목업 화면 지도"),
  TBL(["영역", "화면"], [
    ["공통", "index (Home) · about · guide (디자인 가이드) · review (리뷰 허브) · help · search · 404"],
    ["Studio", "studio · article · field (Nine Tails)"],
    ["Curators", "curators · curator (?c=nmixx)"],
    ["Community", "community · offer (?o=) · learn (16개 상태)"],
    ["Shop", "shop · collection · product · cart (7개 상태) · order (6개 상태) · projects · project (?p=fund|together|made)"],
    ["협업", "work-with-aurora · application (8개 상태)"],
    ["운영", "ops (운영 보드)"]
  ], [1.3, 5.1]),
  P("주소에 ?review=1을 붙이면 각 화면의 검토 메모와 법인 정보 ‘확인 필요’ 표시가 보입니다."),
  LINKP(LINK)
);

build(process.argv[2] || "Aurora_오픈_통합기획서.docx", "Aurora 오픈 통합 기획서", "Aurora 오픈 통합 기획서", C);
