/* ==========================================================================
   AURORA — Shop catalogue (live Shopify data)
   Source: Shopify Admin, store aurora-475311, read 2026-10-01.
   Only ACTIVE products published to the online store are listed as "ready".
   Prices and variant IDs come from Shopify; the cart and checkout are Shopify's.
   Do not add stock counts, viewer counts, countdowns or compare-at "sale" prices.

   Fields
   - key       short id used in product.html?p=<key>
   - handle    Shopify product handle (links to /products/<handle>)
   - kind      "physical" | "session"
   - status    "ready" (on sale) | "soon" (not yet open — no buy button)
   - field     one of the nine fields (beauty, fashion, lifestyle, travel, hustle …)
   - variants  [{ id: Shopify variant id, label, price }]
   ========================================================================== */

window.AURORA_STORE = {
  origin: "https://auroracurate.com",
  currency: "USD"
};

window.AURORA_PRODUCTS = [
  {
    key: "ohui-geniture-lipstick", status: "ready", kind: "physical", field: "beauty",
    handle: "ohui-the-first-geniture-lipstick-3-8g",
    brand: "OHUI", title: "The First Geniture Lipstick", size: "3.8 g",
    optionName: "Shade",
    variants: [
      { id: "50344064450663", label: "#01 Red", price: 93.35, image: "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/O-HUI-The-First-Geniture-Lipstick-38g-01-Red-Title.jpg?v=1790611746" },
      { id: "50344064548967", label: "#02 Coral", price: 93.35, image: "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/O-HUI-The-First-Geniture-Lipstick-38g-02-Coral-Title.jpg?v=1790611746" },
      { id: "50344064516199", label: "#03 Pink", price: 93.35, image: "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/O-HUI-The-First-Geniture-Lipstick-38g-03-Pink-Title.jpg?v=1790611746" },
      { id: "50344064483431", label: "#04 Rosy Pink", price: 93.35, image: "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/O-HUI-The-First-Geniture-Lipstick-38g-04-Rosy-Pink-Title.jpg?v=1790611746" },
      { id: "50344064581735", label: "#05 Mood Rose", price: 93.35, image: "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/O-HUI-The-First-Geniture-Lipstick-38g-05-Mood-Rose-Title.jpg?v=1790611746" }
    ],
    images: [
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/2104604294110556160.jpg?v=1790611747",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/2104604298078367744.jpg?v=1790611747",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/2104604300326514688.jpg?v=1790611747",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/2104604302419472384.jpg?v=1790611747"
    ],
    summary: "A luxury lipstick that makes lips vivid and clear, like jewellery, in one touch.",
    details: [
      ["About", "Rich, long-lasting colour with a moisturising formula that keeps lips comfortable through wear."],
      ["How to use", "Apply over the whole lip, following the lip line."]
    ],
    note: "A Korean prestige classic. Chosen for the Beauty field: colour as personal expression."
  },
  {
    key: "ohui-eyebrow-pencil", status: "ready", kind: "physical", field: "beauty",
    handle: "ohui-real-color-eyebrow-pencil-리얼컬러-아이브로우-펜슬",
    brand: "OHUI", title: "Real Color Eyebrow Pencil", size: "0.36 g",
    optionName: "Shade",
    variants: [
      { id: "50357947695207", label: "#01 Natural Brown", price: 55.80, image: "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/timely_product_bn_templet_1800_RETUNE_o_hui_eye_brow_1_natural_brown.jpg?v=1790830984" },
      { id: "50357947727975", label: "#02 Walnut Brown", price: 55.80, image: "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/timely_product_bn_templet_1800_RETUNE_o_hui_eye_brow_2_walnut_brown.jpg?v=1790830984" }
    ],
    images: [
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/2105523853268422656.jpg?v=1790830984",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/2105523854413467648.jpg?v=1790830984"
    ],
    summary: "A fine-tip pencil for precise, natural-looking brow definition.",
    details: [["About", "Long-lasting, water-resistant formula."]],
    note: "A quiet everyday essential from the same OHUI line."
  },
  {
    key: "amorepacific-cushion-refill", status: "ready", kind: "physical", field: "beauty",
    handle: "amorepacific-time-response-complete-cushion-refill-spf50-pa-타임-레스폰스-컴플릿-쿠션-리필-포슬린-핑크",
    brand: "AMOREPACIFIC", title: "Time Response Complete Cushion Refill SPF50+/PA+++", size: "15 g refill",
    optionName: "Shade",
    variants: [
      { id: "50358586114151", label: "No. 17C2 Porcelain Pink", price: 166.60 },
      { id: "50358586146919", label: "No. 21C1 Rose Pink", price: 166.60 },
      { id: "50358586179687", label: "No. 21W1 Linen Beige", price: 166.60 }
    ],
    images: [
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/2105572049986326528.jpg?v=1790842477",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/2105572051546607616.jpg?v=1790842477",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/2_5a320ce5-c148-4595-9456-4f16c7554ebb.png?v=1790842476"
    ],
    summary: "A moisturising cushion refill with weightless, buildable coverage and broad-spectrum SPF 50+.",
    details: [
      ["Key ingredients", "Green tea (AbsoluTea™), Dia-reflecting Complex™, bamboo sap, green tea extract."],
      ["How to use", "After your morning skincare, press the puff into the sponge and pat evenly over the face. Reapply for touch-ups."],
      ["Suitable for", "All skin types."]
    ],
    note: "The cushion compact is a Korean invention; this refill is from the brand's top line."
  },
  {
    key: "biblian-hair-mask", status: "ready", kind: "physical", field: "beauty",
    handle: "biblian-olisilk-deep-care-intensive-hair-mask-200ml",
    brand: "BIBLIAN", title: "Olisilk Deep Care Intensive Hair Mask", size: "200 ml",
    optionName: "Size",
    variants: [{ id: "50354044731495", label: "200 ml", price: 39.00 }],
    images: [
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/1789976172306_13aad43dbb6c46b58f7344cf67b4735b.png?v=1790767528",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/1790048797751_1d0089b23e6f410a974f6fa7468a842e.png?v=1790767523",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/1789976407221_369aae0b81404aac95bd16fa0af9230a.jpg?v=1790767523"
    ],
    summary: "A nourishing daily mask for damaged hair — protein care and silky smoothness.",
    details: [
      ["How to use", "After shampooing, squeeze out excess water. Apply evenly, massage for 2–3 minutes and rinse."],
      ["Ingredients", "Includes silk, olive fruit oil, olive leaf extract, hydrolysed wheat, soy and rice proteins and peptides. Full list on the packaging."]
    ],
    note: "K-haircare for everyday routines."
  },
  {
    key: "biblian-hair-essence", status: "ready", kind: "physical", field: "beauty",
    handle: "biblian-olisilk-glow-keeper-hair-essence-100ml",
    brand: "BIBLIAN", title: "Olisilk Glow Keeper Hair Essence", size: "100 ml",
    optionName: "Size",
    variants: [{ id: "50358045573223", label: "100 ml", price: 45.00 }],
    images: [
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/1789975743680_4e823dee2bad48b69f192d8ee66ed189.png?v=1790831766",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/1790048766608_f96fc46c2c9845b6be01f6962588906f.png?v=1790831761"
    ],
    summary: "A milk-type hair essence for shine, smoothness and heat protection.",
    details: [["How to use", "Spray evenly onto damp or dry hair whenever it feels dry."]],
    note: "Pairs with the Olisilk hair mask."
  },
  {
    key: "peptide-eye-cream", status: "ready", kind: "physical", field: "wellness",
    handle: "peptide-eye-cream-for-mature-eyes",
    brand: "EpiLynx", title: "Peptide Eye Cream", size: "15 ml",
    optionName: "",
    variants: [{ id: "50358585131111", label: "15 ml", price: 46.00 }],
    images: [
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/Epilynx-BrighteningUnderEyeCream-closed.jpg?v=1790842182",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/20231230132439_IMG_4487.jpg?v=1790842182"
    ],
    summary: "A lightweight, hydrating eye cream with peptides, hyaluronic acid and aloe vera.",
    details: [
      ["About", "Gluten-free, hypoallergenic and vegan. Quickly absorbed for a smooth, hydrated under-eye area."],
      ["How to use", "Morning and night, tap a pea-sized amount from the inner corner along the under-eye towards the brow bone. Avoid the eyelids."],
      ["Before use", "Do a patch test behind the ear or on the inner elbow."]
    ],
    note: "A gentle routine step for the Wellness field."
  },
  {
    key: "elf-power-grip-primer", status: "ready", kind: "physical", field: "beauty",
    handle: "e-l-f-power-grip-primer-gel-based-hydrating-face-primer-for-smoothing-skin-gripping-makeup-moisturizing-priming-vegan-cruelty-free-0-811-fl-oz",
    brand: "e.l.f.", title: "Power Grip Primer", size: "",
    optionName: "Size",
    variants: [
      { id: "50358702899303", label: "0.5 fl oz", price: 9.45 },
      { id: "50358702833767", label: "0.81 fl oz", price: 14.85 },
      { id: "50358702866535", label: "2.5 fl oz", price: 33.75 }
    ],
    images: [
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/61FfGNgMGsL.jpg?v=1790845445",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/61dAjP6YsxL.jpg?v=1790845445",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/61NzSiYxxCL.jpg?v=1790845446"
    ],
    summary: "A gel-based, hydrating face primer that smooths skin and grips makeup.",
    details: [
      ["Suitable for", "Dry, combination and oily skin. Goes on clear; non-comedogenic."],
      ["How to use", "Pat evenly onto the face with your fingertips and let it set for 30 seconds before makeup."],
      ["Values", "Vegan and cruelty-free (Leaping Bunny and PETA certified)."]
    ],
    note: "An accessible base for any routine."
  },
  {
    key: "embroidered-cosmetic-pouch", status: "ready", kind: "physical", field: "travel",
    handle: "embroidery-large-capacity-cosmetic-bag-waterproof-portable-storage-bag-travel-makeup-pouch",
    brand: "Blushimmer", title: "Embroidered Travel Cosmetic Pouch", size: "",
    optionName: "Colour",
    variants: [
      { id: "50358509043815", label: "White", price: 25.58 },
      { id: "50358508945511", label: "Light blue", price: 26.98 },
      { id: "50358508978279", label: "Yellow", price: 27.17 },
      { id: "50358509076583", label: "Green", price: 27.17 },
      { id: "50358509011047", label: "Pink", price: 27.36 }
    ],
    images: [
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/S80b73387d54040b59e07a80d1d163fd6T.webp?v=1790839703",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/S32f07ef8a85e4811af6c715ab415a2b8J.webp?v=1790839703",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/S18a5c7d91df74b65a06f82f9d3b66a90n.webp?v=1790839703"
    ],
    summary: "A large-capacity, water-resistant embroidered pouch for travel and everyday makeup.",
    details: [
      ["Material", "Polyester."],
      ["Ships from", "China mainland. Delivery estimate shown at checkout."]
    ],
    note: "For the Travel field: keep a routine with you."
  },
  {
    key: "essential-tee", status: "ready", kind: "physical", field: "fashion",
    handle: "essential-tee",
    brand: "Downeast", title: "Essential Tee", size: "",
    optionName: "Size", option2Name: "Colour",
    matrix: {
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colours: ["White", "Black", "Cream", "Nude"],
      ids: {
        "XS/White": "50356267221095", "XS/Black": "50356267253863", "XS/Cream": "50356267286631", "XS/Nude": "50356267319399",
        "S/White": "50356267352167", "S/Black": "50356267384935", "S/Cream": "50356267417703", "S/Nude": "50356267450471",
        "M/White": "50356267483239", "M/Black": "50356267516007", "M/Cream": "50356267548775", "M/Nude": "50356267581543",
        "L/White": "50356267614311", "L/Black": "50356267647079", "L/Cream": "50356267679847", "L/Nude": "50356267712615",
        "XL/White": "50356267745383", "XL/Black": "50356267778151", "XL/Cream": "50356267810919", "XL/Nude": "50356267843687",
        "XXL/White": "50356267876455", "XXL/Black": "50356267909223", "XXL/Cream": "50356267941991", "XXL/Nude": "50356267974759"
      },
      price: 20.00
    },
    images: [
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/EssentialTee1.png?v=1790800922",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/EssentialTee2.png?v=1790800922",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/EssentialTee3.png?v=1790800922",
      "https://cdn.shopify.com/s/files/1/0660/3984/0871/files/EssentialTee4.png?v=1790800922"
    ],
    summary: "A smooth tri-blend layering tee with a scoop neckline and cap sleeves.",
    details: [
      ["Fabric", "55% cotton, 40% modal, 5% spandex. Fitted."],
      ["Care", "Gentle wash cold."],
      ["Size guide (flat lay)", "XS bust 26\" · S 28\" · M 30\" · L 33\" · XL 34.5\" · XXL 37.5\""]
    ],
    note: "A base layer for the Fashion field."
  },

  /* ---- Programs & sessions (Asia Lab) --------------------------------- */
  {
    key: "k-career-entry-session", status: "ready", kind: "session", field: "hustle",
    handle: "k-career-entry-session",
    brand: "Asia Lab", title: "K-Career Entry Session™", size: "Private online session · 60 minutes",
    optionName: "",
    variants: [{ id: "44613302354023", label: "60-minute session", price: 99.00 }],
    images: ["https://cdn.shopify.com/s/files/1/0660/3984/0871/files/kcareer-recruitment-ad-v4-1-1080x1350_819e8d3b-1e11-4dae-9ada-ee9ce84c1d6e.jpg?v=1790704895"],
    fallbackImage: "assets/img/studio/believing.jpg",
    summary: "A private 60-minute session with Asia Lab to clarify your Korea–Asia career direction, program fit, preparation priorities and next step.",
    includes: ["Private online session · 60 minutes", "Korea Career Entry Guide™", "Review of your direction, preparation and fit for K-Career Training"],
    details: [
      ["Program credit", "If you are accepted and enrol in K-Career Training, the full US$99 session fee is credited toward your program fee."],
      ["Operator", "Delivered by Asia Lab. This session is separate from Aurora editorial selection and community membership."]
    ],
    note: "For the Hustle field: from interest in Korea to a concrete next step."
  },
  {
    key: "seoul-beauty-route-session", status: "soon", kind: "session", field: "beauty",
    handle: "seoul-beauty-route-session",
    brand: "Asia Lab", title: "Seoul Beauty Route Session™", size: "Private online session · 60 minutes",
    optionName: "",
    variants: [{ id: "", label: "60-minute session", price: 50.00 }],
    images: [],
    fallbackImage: "assets/img/studio/kbeauty-selection.jpg",
    summary: "Plan your private Seoul beauty and wellness route before choosing providers.",
    includes: ["Private online session · 60 minutes", "Priorities, timing and privacy needs", "Korea-side preparation and next support"],
    details: [
      ["Session fee", "US$50. May be applied toward an eligible, confirmed One-Stop Korea Fixer engagement."],
      ["Scope", "Not a medical consultation or treatment deposit. Provider selection and treatment decisions remain separate."],
      ["Operator", "Delivered by Asia Lab. Aurora community membership is not required."]
    ],
    note: "Not yet open for booking."
  }
];
