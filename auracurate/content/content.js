/* ==========================================================================
   AURORA — Editable content (편집 슬롯)
   CEO / 마케터가 승인한 자료만 여기에 넣습니다. 비어 있으면 화면은
   "명시적 빈 상태"를 보여 줍니다 (회색 자리표시자 없음).

   바인딩 규칙 (CLAUDE.md §4) — 넣기 전에 확인:
   - 팔로워·인게이지먼트·순위 번호·수상 등 지표: 출처+측정 기간이 있을 때만
   - "N명 시청 중", 카운트다운, "거의 품절" 같은 긴급성 문구 금지
   - 콜라보·셀럽·가격: 승인된 것만. 가격/재고는 Shopify 데이터에서만
   - 이미지: 사용권 승인된 것만. 세로 인물은 focal을 얼굴 쪽으로 (예: "50% 15%")
   ========================================================================== */

window.AURORA_CONTENT = {
  /* Shop 히어로 커버. null이면 오로라 텍스처 빈 상태.
     예: { src: "assets/img/cover.jpg", alt: "…", focal: "50% 18%", credit: "Photo: …" } */
  shopCover: null,

  /* Aurora Highlights — 원본 Figma 1:44/1:51/1:62의 배지 카드 3장.
     badge: "exclusive"(Only on Aurora) | "aurora100"(Aurora 100 — 순위 번호 금지) | "curator"(Curator's Pick)
     links 중 없는 항목은 칩이 숨겨집니다. product가 없거나 purchasable=false면 구매 버튼 비활성.
     sub: 사실만 (예: "Pre-order opens 2026-11-01"). "Only 5 remaining" 같은 문구 금지.
     예:
     {
       badge: "curator",
       title: "…",
       sub: "…",
       image: { src: "assets/img/…jpg", alt: "…", focal: "50% 20%" },
       links: { studio: "studio.html#…", curators: "curators.html#…", community: "community.html#…", product: "/products/handle" },
       purchasable: false
     }
     비어 있으면 세 배지 자리가 각각 명시적 빈 상태로 보입니다. */
  highlights: [],

  /* Shop 선반 — 원본 "Aurora Experience / Collaboration / Curator's Recommendation / Curation".
     원본의 "Ranking" 선반은 순위 번호 문제로 제외(Aurora 100은 Studio에서 편집 선정으로 소개).
     product: { title, vendor, href: "/products/handle", image: { src, alt },
                price: "Shopify 데이터에서", status: null | "sold_out" | "preorder" }
     status는 Shopify 재고/설정과 일치할 때만. 리뷰 수·별점은 실제 리뷰 앱 데이터가 있을 때만. */
  shelves: [
    { id: "experience", title: "Aurora Experience", href: "/collections/aurora-experience", products: [] },
    { id: "collaboration", title: "Collaboration", href: "/collections/collaboration", products: [] },
    { id: "curators-recommendation", title: "Curator's Recommendation", href: "/collections/curators-recommendation", products: [] },
    { id: "curation", title: "Curation", href: "/collections/curation", products: [] }
  ],

  /* 입점 브랜드 (승인·계약 완료분만). 예: { name, logo: "assets/brands/x.svg", href } */
  brands: [],

  /* Shop Live (LiveMeUp). state: "none" | "scheduled" | "live" | "replay"
     scheduled → startsAt(ISO), title / live·replay → url, title */
  live: { state: "none" },

  /* 협업 접수 엔드포인트. null이면 이메일 제출로 대체(접수 ≠ 승인). */
  intake: {
    endpoint: null,
    email: "aurora@auroracurate.com"
  }
};
