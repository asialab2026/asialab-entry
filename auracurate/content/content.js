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
  shopCover: { src: "assets/img/shop/hero-cover.png", alt: "Model in a pink faux-fur coat, mid-dance", kind: "cutout" },

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
  /* 원본 Figma em4c3H 1:44/1:51/1:62 이미지·제목. 가격·잔여 수량·공동구매·예약 문구는
     실제 판매 설정이 생기기 전까지 넣지 않는다(§4). "Only 5 Remaining!" 문구는 이미지에서 잘라 냄. */
  highlights: [
    { badge: "exclusive", title: "Felix x Aurora", sub: "Design sample",
      image: { src: "assets/img/shop/hl-exclusive.jpg", alt: "Felix x Aurora", focal: "50% 30%" } },
    { badge: "aurora100", title: "Best K-Beauty 2025 Serum", sub: "Design sample",
      image: { src: "assets/img/shop/hl-aurora100.jpg", alt: "K-beauty serums and skincare on a glass stand", focal: "50% 50%" } },
    { badge: "curator", title: "Felix’s Favorite Off-Duty Sunglasses", sub: "Design sample",
      image: { src: "assets/img/shop/hl-curator.jpg", alt: "Felix in black sunglasses and a black suit", focal: "50% 15%" } }
  ],

  /* Shop 선반 — 원본 Figma em4c3H "new arrivals"의 5개 선반, 이미지·제목·브랜드는 원본 그대로.
     Ranking은 순위 번호 없이 "Editorial selection"으로 표시.
     price·리뷰 수·잔여 수량은 Shopify 실데이터가 연결될 때만 넣는다(원본의 $가격·(4.1k) 리뷰·
     "Only 5 Remaining" 등은 가상 수치라 제외). status: null | "sample" | "sold_out" | "preorder"
     href를 넣으면 카드가 상품 페이지로 연결된다. */
  shelves: [
    { id: "experience", title: "Aurora Experience", href: "/collections/aurora-experience", products: [
      { title: "Red Carpet Makeup Masterclass", vendor: "Felix", status: "sample", image: { src: "assets/img/shop/exp-masterclass.jpg", alt: "Two friends posing close to the camera" } },
      { title: "Felix’s Aurora India Concert", vendor: "Felix x Louis Vuitton", status: "sample", image: { src: "assets/img/shop/exp-concert.jpg", alt: "Felix singing on stage with red smoke" } },
      { title: "Felix Edition: K-style to Global Brand", vendor: "Felix · Stray Kids", status: "sample", image: { src: "assets/img/shop/exp-felix-edition.jpg", alt: "Felix on a city street with a phone and bubble tea" } }
    ] },
    { id: "collaboration", title: "Collaboration", href: "/collections/collaboration", products: [
      { title: "Felix x Louis Vuitton", vendor: "Louis Vuitton", status: "sample", image: { src: "assets/img/shop/col-louis-vuitton.jpg", alt: "Felix in front of the Louis Vuitton logo", focal: "50% 15%" } },
      { title: "Felix x CLIO", vendor: "CLIO", status: "sample", image: { src: "assets/img/shop/col-clio.jpg", alt: "Felix holding a CLIO eyeshadow palette" } },
      { title: "Felix x ATiiSSU", vendor: "ATiiSSU", status: "sample", image: { src: "assets/img/shop/col-atiissu.jpg", alt: "Felix photo card boxes" } }
    ] },
    { id: "ranking", title: "Ranking", note: "Editorial selection", href: "/collections/ranking", products: [
      { title: "Best K-Beauty 2025 Foundation", vendor: "HERA", status: "sample", image: { src: "assets/img/shop/rank-foundation.jpg", alt: "Model holding a HERA cushion compact" } },
      { title: "Aurora Top 10 Handbag", vendor: "Prada", status: "sample", image: { src: "assets/img/shop/rank-handbag.jpg", alt: "Black-and-white portrait with a Prada shoulder bag" } },
      { title: "Aurora Top Ranking Makeup", vendor: "Rare Beauty", status: "sample", image: { src: "assets/img/shop/rank-makeup.jpg", alt: "Smiling model holding a Rare Beauty lip product" } }
    ] },
    { id: "curators-recommendation", title: "Curator’s Recommendation", href: "/collections/curators-recommendation", products: [
      { title: "Felix’s sunglasses", vendor: "Gentle Monster", status: "sample", image: { src: "assets/img/shop/rec-sunglasses.jpg", alt: "Felix wearing black sunglasses", focal: "50% 15%" } },
      { title: "Zendaya x Valentino", vendor: "Valentino", status: "sample", image: { src: "assets/img/shop/rec-valentino.jpg", alt: "Zendaya in a pink Valentino outfit on a pink backdrop" } },
      { title: "Shakira’s Summer Essential", vendor: "Shakira Beauty", status: "sample", image: { src: "assets/img/shop/rec-summer.jpg", alt: "Shakira in red for the Rojo fragrance" } }
    ] },
    { id: "curation", title: "Curation", href: "/collections/curation", products: [
      { title: "K-POP Star Edit – Felix Picks", vendor: "Multiple Brands (Global)", status: "sample", image: { src: "assets/img/shop/cur-kpop-edit.jpg", alt: "Felix surrounded by picks from partner brands" } },
      { title: "Aurora’s K-Beauty Essentials", vendor: "Curated (Korea)", status: "sample", image: { src: "assets/img/shop/cur-kbeauty.jpg", alt: "K-beauty skincare products on a glass stand" } },
      { title: "Aurora Holiday Collab Box (2025)", vendor: "Multiple Brands (Global)", status: "sample", image: { src: "assets/img/shop/cur-holiday-box.jpg", alt: "Pink holiday makeup collection with a heart compact" } }
    ] }
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
