const { P, H1, H2, H3, B, NL, NOTE, TBL, LINK, cover, toc, build, INTEGRATED } = require("./lib");
const C = []; const add = (...x) => x.forEach(i => Array.isArray(i) ? C.push(...i) : C.push(i));

if (!INTEGRATED) add(cover({
  kicker: "AURORA FOOTER · LEGAL",
  title: "푸터 · 법적 고지 기획서",
  sub: "미국 법인 기준 · Shopify 필수 기재사항 · 정책 페이지 · 오픈 전 법무 점검",
  meta: [
    ["문서", "Aurora 푸터·법적 고지 기획서 v1.0 (검토용)"],
    ["작성일", "2026-10-04"],
    ["작성", "수석 디자인 (Claude)"],
    ["대상", "대표님, 운영, 법무 자문, Codex 제작자"],
    ["기준 목업", LINK + " (모든 페이지 하단, Help 페이지)"],
    ["중요", "이 문서는 법률 자문이 아닙니다. 공개 전 미국 변호사 검토가 필요합니다."]
  ]
}));
if (!INTEGRATED) add(toc());

add(H1("1. 한눈에 보기"),
  P("Aurora는 **미국 법인**이 Shopify로 판매합니다. 푸터는 모든 페이지에서 ‘누가 판매하고, 어떻게 연락하며, 어떤 조건으로 거래하는지’를 보여 주는 법적 기준선입니다. Shopify 이용약관은 판매자에게 **법인명 · 이메일 · 전화 · 실제 주소** 공개와 **환불 정책** 게시를 요구합니다."),
  NL([
    "**무엇을:** 법인 고지 줄, 정책 링크 줄, 개인정보 선택 링크, 저작권 줄을 갖춘 푸터와 Help 페이지의 대응 섹션.",
    "**어떻게:** 법인 정보는 content.js의 brand.legal 한 곳에서 관리합니다. 비어 있는 값은 실제 화면에서 숨기고, ?review=1 에서만 주황색 ‘확인 필요’로 보입니다.",
    "**왜:** Shopify 정책 위반, 결제 계정 보류, 소비자 분쟁을 미리 막고, 해외 고객에게 신뢰를 주기 위해서입니다."
  ]),
  NOTE("법인명·주소·전화·EIN 등은 현재 확인되지 않았습니다. 이 문서의 대괄호 [ ] 값은 모두 대표님 확정이 필요합니다.")
);

add(H1("2. Shopify 필수 기재사항 (확인 결과)"),
  P("2026-10-04 기준 Shopify Help Center와 미국 규제기관 공개 자료를 확인했습니다. 출처는 11장에 있습니다."),
  TBL(["#", "요건", "근거", "Aurora 적용"], [
    ["1", "공개 연락처: 법인명, 이메일, 전화, 실제 주소", "Shopify 이용약관 · 소비자 보호 안내", "푸터 법인 줄 + Contact information 정책"],
    ["2", "환불 정책: 반품 기한, 반품 주소, 반품 비용 부담 주체, 환불 시점, 문의처", "Shopify 소비자 보호 안내", "Refund policy (상품·프로그램·디지털 구분)"],
    ["3", "개인정보 처리방침", "Shopify 정책 설정 · 미국 주별 개인정보법", "Privacy policy"],
    ["4", "이용약관", "Shopify 정책 설정", "Terms of service"],
    ["5", "배송 정책", "Shopify 정책 설정 (체크아웃 하단 자동 링크)", "Shipping policy — 관세 포함"],
    ["6", "구독·취소 정책 (정기 결제 판매 시)", "Shopify 구독 설정: 고객이 체크아웃에서 동의해야 함", "Subscription policy — 멤버십"],
    ["7", "‘Your Privacy Choices’ 링크와 아이콘 (데이터 판매·공유 시)", "Shopify 미국 주별 개인정보법 안내", "푸터 + Help #privacy-choices"],
    ["8", "스토어 세부정보의 법인명·주소는 스토어와 정책 페이지에 공개됨", "Shopify 스토어 세부정보 안내", "Shopify 관리자 값 = 푸터 값"]
  ], [0.3, 2.4, 2, 1.7]),
  NOTE("Shopify 정책 페이지(Refund · Privacy · Terms · Shipping · Contact information · Subscription)는 체크아웃 하단에 자동으로 링크됩니다. 테마 푸터에도 같은 주소(/policies/...)로 연결합니다.")
);

add(H1("3. 푸터 구조 (목업 반영 완료)"),
  TBL(["줄", "구성", "비고"], [
    ["1. 브랜드", "Aurora — Created by Asia Lab 로크업 · 슬로건 · 회사 정의", "‘Created by Asia Lab’이 허용되는 두 곳 중 하나"],
    ["2. 탐색", "Aurora (Studio · Curators · Community · Shop · Fund·Together·Made for You · Nine Tails · About) / Work with Aurora (Partners · Curators · Contributors) / Help (Help centre · Track an order · Shipping & duties · Returns & refunds · Contact us)", "기존 4열 유지"],
    ["3. 정책 링크", "Privacy Policy · Terms of Service · Refund Policy · Shipping Policy · Contact Information · Subscription Policy* · Accessibility · Your Privacy Choices*", "*조건부 표시 (설정값)"],
    ["4. 법인 고지", "Operated by [미국 법인명] · [사업장 주소] · aurora@auroracurate.com · [전화]", "값이 없으면 숨김, ?review=1에서 ‘확인 필요’"],
    ["5. 저작권", "© 2026 [미국 법인명]. All rights reserved. Aurora is a brand created by Asia Lab.", "법인명 미정 시 ‘Aurora’"]
  ], [1.2, 3.6, 1.6]),
  H2("3.1 관리 위치"),
  P("content/content.js → brand.legal { entity, address, email, phone, sellsOrSharesData, subscriptions }. Shopify 테마로 옮길 때는 테마 설정(Theme settings)의 같은 이름 필드로 바꾸고, 가능하면 Shopify의 shop 객체(법인명·주소)를 그대로 읽어 이중 입력을 없앱니다."),
  H2("3.2 표시 규칙"),
  B("법인명·주소는 Shopify 관리자 ‘스토어 세부정보’ 값과 글자 하나까지 같아야 합니다."),
  B("‘Your Privacy Choices’는 맞춤 광고 픽셀(Meta, Google, TikTok 등)을 쓰는 동안 항상 표시합니다. 아이콘은 공식 토글 형태를 사용합니다."),
  B("Subscription Policy는 멤버십·정기 결제를 판매하는 동안 표시합니다."),
  B("Accessibility는 Help 페이지 #accessibility 성명으로 연결합니다."),
  B("모바일에서 정책 링크는 줄바꿈으로 모두 보이게 하고, 접거나 숨기지 않습니다.")
);

add(H1("4. 정책 페이지별 필수 내용"),
  H2("4.1 Refund policy"),
  TBL(["구분", "반드시 적을 것"], [
    ["실물 상품", "반품 기한 · 상태 조건(개봉 화장품·위생용품) · 반품 주소 · 반품 배송비 부담 · 환불 시점과 방법 · 문의처"],
    ["프로그램·코호트·워크숍", "시작 전 취소 기한 · 시작 후 환불 여부 · 일정 변경 시 처리"],
    ["1:1 세션", "예약 전·후 취소 · 노쇼 처리"],
    ["디지털 상품", "다운로드 후 환불 불가 여부와 예외(파일 손상 등)"],
    ["멤버십", "취소 방법과 환불 여부 → Subscription policy와 일치"]
  ], [1.6, 4.8]),
  H2("4.2 Shipping policy"),
  B("배송 국가는 Shopify Markets 설정에서 나온 목록만 게시"),
  B("출고지, 지역별 예상 배송 기간"),
  B("관세·세금 부담 주체와 표시 시점 (DDP: 결제 시 포함 / DAP: 수령 시 고객 부담)"),
  B("배송 실패·주소 오류 처리"),
  NOTE("미국 수입품의 소액 면세(de minimis, $800 이하)는 2025-08-29부터 모든 국가에 대해 중단되었습니다. 한국에서 미국 고객에게 직접 발송하면 관세가 부과될 수 있으므로, Shopify Markets의 관세 계산과 DDP 여부를 오픈 전에 결정해야 합니다."),
  H2("4.3 Privacy policy"),
  B("수집 항목, 이용 목적, 공유 대상(Shopify, Tevello, 결제, 광고 픽셀)"),
  B("미국 주별 개인정보법(예: 캘리포니아 CCPA/CPRA) 권리 안내 · 판매·공유 거부 방법 · Global Privacy Control 신호 존중"),
  B("이메일 마케팅 동의와 철회"),
  B("아동 정보 미수집 원칙"),
  H2("4.4 Terms of service"),
  B("판매자(미국 법인), 준거법과 분쟁 해결, 커뮤니티 이용 규칙, 지식재산(Aurora 100 · Global Faces 100), 사용자 게시물 권리"),
  H2("4.5 Subscription policy (멤버십)"),
  B("자동 갱신 조건, 금액, 주기, 첫 청구일을 결제 전 명확히 표시"),
  B("체크아웃에서 고객의 적극적 동의(체크 또는 명시 버튼)"),
  B("가입한 방식과 같은 방식으로 온라인에서 바로 해지 가능 (캘리포니아 자동갱신법, 2025-07-01 개정)"),
  B("갱신 전 안내 이메일, 연 1회 갱신 알림, 가격·조건 변경 시 명확한 사전 고지"),
  B("무료 체험 후 유료 전환도 자동갱신에 포함"),
  H2("4.6 Contact information"),
  B("법인명 · 실제 주소 · 이메일 · 전화 — 푸터와 동일")
);

add(H1("5. 미국 법 점검 항목"),
  TBL(["영역", "요구 사항", "Aurora 적용", "상태"], [
    ["FTC 추천·보증 지침 (2023 개정)", "큐레이터·인플루언서와의 금전·무상 제공 관계를 명확히 공개", "큐레이터 픽, 커미션 상품에 ‘Paid partnership / Gifted / Affiliate’ 표기", "기획 반영 필요"],
    ["FTC 리뷰 규정", "가짜·조작 리뷰 금지", "샘플 리뷰는 ‘Sample’ 표기, 실제 리뷰만 게시", "목업 준수"],
    ["캘리포니아 자동갱신법", "명확한 고지 · 적극적 동의 · 같은 방식 해지", "멤버십 체크아웃·계정 해지 버튼", "앱 설정 확인"],
    ["CAN-SPAM", "마케팅 메일에 실제 우편 주소와 수신 거부, 10영업일 내 처리", "Shopify Email 푸터에 법인 주소", "주소 확정 후"],
    ["미국 주별 개인정보법", "판매·공유 거부 링크, GPC 존중", "Your Privacy Choices + Shopify 설정", "목업 반영"],
    ["웹 접근성 (ADA)", "법 기준은 확정 표준 없음 — WCAG 2.2 AA 권장", "접근성 성명 + QA", "성명 문구 필요"],
    ["화장품 규제 (MoCRA)", "수입 화장품의 시설 등록·제품 목록·라벨 책임자", "브랜드사·수입자 책임 범위 확인", "확인 필요"],
    ["판매세 (Sales tax)", "주별 경제적 연고(nexus) 기준", "Shopify Tax 설정", "세무 확인"],
    ["관세", "de minimis 중단", "DDP/DAP 결정", "결정 필요"]
  ], [1.4, 1.9, 2, 1.1]),
  NOTE("위 항목은 공개 자료를 바탕으로 한 점검표입니다. 적용 여부와 문구는 반드시 미국 변호사·세무사가 확정합니다.")
);

add(H1("6. Shopify 관리자 설정 체크리스트"),
  TBL(["#", "위치", "설정할 것"], [
    ["1", "설정 → 스토어 세부정보", "미국 법인 정식 명칭, 사업장 주소, 고객 연락 이메일, 전화"],
    ["2", "설정 → 정책", "Refund · Privacy · Terms · Shipping · Contact information · (Subscription) 작성·게시"],
    ["3", "설정 → 고객 개인정보", "쿠키 배너, 미국 주별 개인정보법 판매·공유 거부 페이지 활성화"],
    ["4", "설정 → 체크아웃", "정책 링크 확인, 마케팅 동의 체크박스, 구독 동의"],
    ["5", "설정 → 마켓", "판매 국가, 통화, 관세·수입세 (DDP 여부)"],
    ["6", "설정 → 세금 및 관세", "미국 판매세 등록 주, 관세 계산"],
    ["7", "설정 → 알림", "이메일 발신 주소, 푸터 법인 주소"],
    ["8", "설정 → 결제", "Shopify Payments 미국 법인 정보, EIN, 정산 계좌"],
    ["9", "온라인 스토어 → 테마", "푸터 법인 줄·정책 링크 (MAIN 테마에 직접 쓰지 않고 미리보기 테마에서 검수 후 게시)"],
    ["10", "앱 (Tevello · 리뷰 · 구독)", "각 앱의 개인정보·구독 설정이 정책 문구와 일치"]
  ], [0.3, 2, 4.1])
);

add(H1("7. Help 페이지 연결"),
  TBL(["섹션", "역할"], [
    ["#orders", "주문 조회 (Shopify 계정)"],
    ["#shipping", "배송·관세 — 승인 문구 대기"],
    ["#returns", "반품·환불 — 승인 문구 대기"],
    ["#access", "프로그램 접근"],
    ["#community", "커뮤니티 안전·신고"],
    ["#contact", "연락"],
    ["#privacy-choices (신규)", "판매·공유 거부 — Shopify 거부 페이지로 연결"],
    ["#accessibility (신규)", "접근성 성명 — 승인 문구 대기"]
  ], [2, 4.4])
);

add(H1("8. 결정 사항"),
  TBL(["#", "결정할 것", "권장안"], [
    ["1", "미국 법인 정식 명칭과 주소", "스토어 세부정보·푸터·정책·이메일에 동일 표기"],
    ["2", "고객 전화번호 공개", "Shopify 요건 — 전용 고객 번호 권장"],
    ["3", "관세 방식", "미국 고객은 DDP(결제 시 관세 포함) 권장 — 수령 시 추가 비용 분쟁 예방"],
    ["4", "맞춤 광고 픽셀 사용", "사용 시 Your Privacy Choices 유지"],
    ["5", "멤버십 정기 결제 시점", "구독 정책과 해지 흐름 확정 후 판매"],
    ["6", "법무 검토", "미국 변호사가 정책 6종과 FTC 공개 문구 검토"]
  ], [0.3, 2.2, 3.9])
);

add(H1("9. 오픈 전 검증"),
  NL([
    "모든 페이지 하단에 정책 링크 7~8개가 보이고 링크가 열린다 (1440 · 390 · 360).",
    "법인명·주소·이메일·전화가 푸터, Contact information, 스토어 세부정보, 주문 이메일에서 같다.",
    "체크아웃 하단에 Refund · Shipping · Privacy · Terms가 보인다.",
    "멤버십 체크아웃에서 구독 동의 없이 결제가 안 된다.",
    "Your Privacy Choices에서 거부 후 광고 픽셀이 중지된다 (GPC 신호 포함).",
    "마케팅 이메일에 주소와 수신 거부가 있다.",
    "큐레이터 추천 상품에 관계 공개 표기가 보인다."
  ])
);

add(H1("10. 문구 초안 (영문 · 법무 검토용)"),
  TBL(["위치", "초안"], [
    ["저작권 줄", "© 2026 [Legal entity name]. All rights reserved. Aurora is a brand created by Asia Lab."],
    ["법인 줄", "Operated by [Legal entity name] · [Street, City, State ZIP, USA] · aurora@auroracurate.com · [+1 phone]"],
    ["관계 공개 (큐레이터)", "Paid partnership with Aurora. / Aurora may earn a commission from purchases."],
    ["멤버십 고지", "Renews automatically every [period] at [price] until you cancel. Cancel anytime in your account."],
    ["개인정보 선택", "You can opt out of the sale or sharing of your personal information for targeted advertising."]
  ], [1.6, 4.8])
);

add(H1("11. 출처"),
  TBL(["주제", "URL"], [
    ["Shopify 정책 설정 (환불·개인정보·이용약관)", "https://help.shopify.com/en/manual/checkout-settings/refund-privacy-tos"],
    ["Shopify 소비자 보호 (공개 연락처·환불 정책 요건)", "https://help.shopify.com/en/manual/compliance/legal/consumer-protection"],
    ["Shopify 구독 설정 (구독 정책·동의)", "https://help.shopify.com/en/manual/products/purchase-options/subscriptions/setup"],
    ["Shopify 미국 주별 개인정보법", "https://help.shopify.com/en/manual/privacy-and-security/privacy/us-state-privacy-laws"],
    ["Shopify 스토어 세부정보", "https://help.shopify.com/en/manual/your-account/manage-orgs-and-stores/manage-store-details"],
    ["FTC 추천·보증 지침 개정 (2023-06)", "https://www.ftc.gov/news-events/news/press-releases/2023/06/federal-trade-commission-announces-updated-advertising-guides-combat-deceptive-reviews-endorsements"],
    ["FTC CAN-SPAM 안내", "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business"],
    ["캘리포니아 자동갱신법 개정 AB 2863 (2025-07-01 시행) — 법률사무소 해설", "https://natlawreview.com/article/californias-auto-renewal-law-takes-effect-july-1"],
    ["CBP de minimis 중단 팩트시트 (2025-08-18 갱신)", "https://www.cbp.gov/sites/default/files/2025-08/factsheet_suspension_of_duty-free_de_minimis_treatment.pdf"],
    ["백악관 행정명령: 모든 국가 de minimis 중단", "https://www.whitehouse.gov/presidential-actions/2025/07/suspending-duty-free-de-minimis-treatment-for-all-countries/"]
  ], [2.4, 4]),
  NOTE("일부 URL은 이 환경에서 직접 열람이 차단되어 검색 결과 요약으로 확인했습니다. 법무 검토 시 원문을 다시 확인해 주세요.")
);

module.exports = C;
if (require.main === module) build(process.argv[2] || "Aurora_푸터_법적고지_기획서.docx", "Aurora 푸터·법적 고지 기획서", "Aurora 푸터·법적 고지", C);
