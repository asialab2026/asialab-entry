/* ==========================================================================
   AURORA — Community market (Tevello) · 편집 슬롯
   커뮤니티 · 코호트 · 코스 · 워크숍 · 디지털 상품 · 경험을 한 목록으로 관리합니다.
   - 판매는 Shopify 상품(Checkout), 수강·입장은 Tevello 회원 공간(/a/members)입니다.
   - status
       "open"        판매·참여 중 (실제 Shopify 상품 또는 실제 Tevello 공간이 있을 때만)
       "free"        무료 회원 공간 (로그인 필요)
       "application" 신청 → 검토 → 안내 (신청은 승인이 아님)
       "preview"     Tevello 테스트 강좌 · 판매 전
       "soon"        준비 중 · 알림 신청만
       "sample"      디자인 샘플 (구성 확인용, 판매·운영 아님)
   - price: Shopify 실제 가격만. 모르면 null → "가격은 공개 시 확정"으로 표시.
   - product: content/products.js의 key (실제 Shopify 변형 ID로 장바구니 연결)
   - 인원·수강생 수·평점·후기·마감 임박 같은 수치는 넣지 않습니다 (§4).
   - 이미지: 특정 인물이 진행·추천하는 것처럼 보이는 사진은 실제 호스트가 확정될 때만.
     cover: "Workbook" → 오로라 텍스처 위 타이포그래피 표지(디지털 상품용).
   ========================================================================== */
window.AURORA_OFFER_TYPES = [
  { id: "community",  label: "Communities", one: "Community",  line: "Spaces to belong to — free or by membership." },
  { id: "cohort",     label: "Cohorts",     one: "Cohort",     line: "Learn together on a set schedule, with a group." },
  { id: "course",     label: "Courses",     one: "Course",     line: "Self-paced lessons you can start any time." },
  { id: "workshop",   label: "Workshops",   one: "Workshop",   line: "One focused, live session with a host." },
  { id: "digital",    label: "Digital",     one: "Digital product", line: "Workbooks, guides and editions to keep." },
  { id: "experience", label: "Experiences", one: "Experience", line: "Private sessions and real-world access, hosted." }
];

window.AURORA_OFFERS = [
  /* ---- Communities ------------------------------------------------------ */
  { key: "aurora-lounge", type: "community", status: "free", field: "entertainment",
    title: "Aurora Lounge", by: "Aurora", image: "assets/img/community/highlight-hero.jpg", focal: "50% 40%",
    summary: "The open room of Aurora: share a cultural discovery, ask a thoughtful question and meet people across the nine fields.",
    format: "Online community · nine topics", length: "Ongoing", where: "Aurora member area",
    href: "https://auroracurate.com/a/members/community/2323d8b4-0cff-4f82-8859-4bd8eea506b9",
    outcomes: ["A home for conversations across Entertainment, Icons, Beauty, Fashion, Hustle, Taste, Lifestyle, Travel and Wellness", "Start Here guidance and an Introductions topic", "Studio stories you can discuss with members"],
    forWho: "Anyone with an Aurora sign-in who wants to follow and talk about Asian culture going global.",
    links: { studio: "studio.html", field: "field.html" } },

  { key: "reporters-desk", type: "community", status: "application", field: "icons",
    title: "Honorary Reporters’ Desk", by: "Aurora Studio", image: "assets/img/studio/mongolia.jpg", focal: "50% 45%",
    summary: "A members-only desk for approved honorary reporters: pitch stories, receive editorial notes and prepare features for Aurora Studio.",
    format: "Members-only community", length: "Ongoing, by approval", where: "Aurora member area",
    apply: "work-with-aurora.html#contributors", applyType: "contributor",
    outcomes: ["Story pitches reviewed by Aurora editors", "Format guides and editorial notes", "A path for selected stories to appear in Studio"],
    forWho: "Writers, creators and culture lovers who want to report on their city for a global audience.",
    fine: "Applying does not guarantee approval or publication. Access opens only after approval.",
    links: { studio: "article.html", curators: "curators.html" } },

  { key: "beauty-circle", type: "community", status: "sample", field: "beauty",
    title: "K-Beauty Circle", by: "Aurora · host to be confirmed", image: "assets/img/studio/beauty-india.jpg", focal: "50% 50%",
    summary: "A membership circle for people who follow Korean beauty closely: monthly topics, product study notes and member questions.",
    format: "Membership community", length: "Monthly", where: "Aurora member area",
    outcomes: ["A monthly beauty topic with a short editorial guide", "Member Q&A threads", "Early notes on new Aurora Shop beauty objects"],
    forWho: "Beauty lovers who want depth rather than a product feed.",
    links: { field: "field.html?f=beauty", shop: "shop.html#ready" } },

  /* ---- Cohorts ---------------------------------------------------------- */
  { key: "k-career-training", type: "cohort", status: "application", field: "hustle",
    title: "K-Career Training", by: "Asia Lab", image: "assets/img/aurora100/group.jpg", focal: "50% 30%",
    summary: "A guided cohort for people preparing for a career with Korea and Asia, from direction and portfolio to applications.",
    format: "Online cohort", length: "Cohort dates announced at enrolment", where: "Online · Aurora member area",
    apply: "offer.html?o=k-career-entry", applyLabel: "Start with the Entry Session",
    outcomes: ["A clear direction for your Korea–Asia career", "Portfolio and application practice", "Peer review in a small cohort space"],
    structure: ["Direction & fit", "Market and role research", "Portfolio and story", "Applications and interviews", "Your 90-day plan"],
    forWho: "Students and early-career professionals who completed the K-Career Entry Session.",
    fine: "Enrolment follows the Entry Session and a fit review by Asia Lab. The session fee is credited toward the programme fee if you are accepted.",
    links: { field: "field.html?f=hustle", shop: "product.html?p=k-career-entry-session" } },

  { key: "entertainment-builder-cohort", type: "cohort", status: "sample", field: "entertainment",
    title: "Entertainment Builder · Cohort", by: "Asia Lab", image: "assets/img/studio/power-100.jpg", focal: "50% 40%",
    summary: "The online companion to Asia Lab’s offline Entertainment Builder programme: six topics, weekly assignments and a cohort space.",
    format: "Online cohort · weekly", length: "Six topics", where: "Online · Aurora member area",
    structure: ["Identity", "Brand", "Market Path", "Content & IP", "Network & Opportunity", "90-Day Roadmap"],
    outcomes: ["A one-page creative self-introduction", "A positioning statement and content concept", "A provisional 90-day roadmap"],
    forWho: "Artists, creators and producers planning their next step in entertainment.",
    links: { field: "field.html?f=entertainment", studio: "studio.html#aurora-100" } },

  /* ---- Courses ---------------------------------------------------------- */
  { key: "entertainment-builder", type: "course", status: "preview", field: "entertainment",
    title: "Entertainment Builder · Online Learning Preview", by: "Asia Lab", image: "assets/img/studio/behind-the-shoot.jpg", focal: "50% 40%",
    summary: "A self-study preview of the six Entertainment Builder topics, with a reading lesson and sample exercises.",
    format: "Self-paced course", length: "1 reading lesson · six topics", where: "Aurora member area",
    structure: ["Identity", "Brand", "Market Path", "Content & IP", "Network & Opportunity", "90-Day Roadmap"],
    outcomes: ["Write a one-page creative self-introduction", "Outline a positioning statement", "Draft a provisional 90-day plan"],
    forWho: "Anyone curious about building a creative career across Asia.",
    fine: "A limited test course exists in Tevello. It is not on sale, and purchase-to-access has not been tested yet.",
    links: { field: "field.html?f=entertainment" } },

  { key: "korean-culture", type: "course", status: "sample", field: "lifestyle",
    title: "Korean Language & Culture", by: "Asia Lab", image: "assets/img/studio/hanbok-india.jpg", focal: "50% 40%",
    summary: "Practical Korean for culture lovers — phrases, context and etiquette taught through K-culture moments.",
    format: "Self-paced course", length: "Lessons released in order", where: "Aurora member area",
    structure: ["Hangul in a day", "Phrases from K-content", "Food, places and manners", "Talking about what you love"],
    outcomes: ["Read Hangul", "Use everyday phrases with confidence", "Understand the context behind the content you watch"],
    forWho: "Beginners who already love Korean culture.",
    links: { field: "field.html?f=lifestyle", community: "community.html#fields" } },

  /* ---- Workshops -------------------------------------------------------- */
  { key: "creative-brief", type: "workshop", status: "sample", field: "hustle",
    title: "From Idea to Creative Brief", by: "Aurora Projects", image: "assets/img/studio/exclusive-hero.jpg", focal: "50% 50%",
    summary: "A live working session that turns an early creative idea into a clear one-page brief you can share with collaborators.",
    format: "Live online workshop", length: "One session", where: "Online",
    structure: ["Your idea in one sentence", "Audience and format", "What you need from collaborators", "The one-page brief"],
    outcomes: ["A finished one-page creative brief", "Feedback from the host"],
    forWho: "Creators with an idea who need a clear starting document.",
    links: { field: "field.html?f=hustle", shop: "projects.html#made-for-you" } },

  { key: "tasting-stories", type: "workshop", status: "sample", field: "taste",
    title: "Meet the Maker: Tasting Stories", by: "Aurora · host to be confirmed", image: "assets/img/studio/taste-april.jpg", focal: "50% 50%",
    summary: "An online conversation exploring a maker’s craft and the culture behind one ingredient.",
    format: "Live online conversation", length: "One session", where: "Online",
    outcomes: ["The story behind one ingredient", "Questions answered by the maker"],
    forWho: "Food lovers and curious cooks.",
    links: { field: "field.html?f=taste", studio: "studio.html" } },

  /* ---- Digital products ------------------------------------------------- */
  { key: "builder-workbook", type: "digital", status: "sample", field: "entertainment",
    title: "Entertainment Builder Workbook", by: "Asia Lab", cover: "Workbook", image: "assets/texture/aurora-bg-1.jpg", focal: "30% 60%",
    summary: "Reflection sheets, a positioning template and a 90-day planner from the Entertainment Builder programme.",
    format: "Digital workbook", length: "Download", where: "Aurora member area library",
    outcomes: ["Six reflection sheets", "Positioning and content templates", "A 90-day planner"],
    forWho: "Self-starters who prefer to work on their own.",
    links: { field: "field.html?f=entertainment" } },

  { key: "aurora-100-edition", type: "digital", status: "sample", field: "icons",
    title: "Aurora 100 · Digital Edition", by: "Aurora Studio", image: "assets/img/aurora100/cover-entertainment.jpg", focal: "50% 20%",
    summary: "The Aurora 100 editorial selection as a collected digital edition, with portraits and the stories behind each field.",
    format: "Digital edition", length: "Download", where: "Aurora member area library",
    outcomes: ["The full editorial selection", "Field essays", "Cover portraits"],
    forWho: "Readers and collectors of Aurora Studio.",
    fine: "Aurora 100 is an editorial selection, not a ranking.",
    links: { studio: "studio.html#aurora-100" } },

  /* ---- Experiences ------------------------------------------------------ */
  { key: "k-career-entry", type: "experience", status: "open", field: "hustle", product: "k-career-entry-session",
    title: "K-Career Entry Session™", by: "Asia Lab", image: "assets/img/studio/believing.jpg", focal: "50% 35%",
    summary: "A private 60-minute session with Asia Lab to clarify your Korea–Asia career direction, programme fit and next step.",
    format: "Private online session", length: "60 minutes", where: "Online · scheduled after purchase",
    outcomes: ["Korea Career Entry Guide™", "A review of your direction and preparation", "Your fit for K-Career Training"],
    forWho: "Anyone considering a career with Korea and Asia.",
    /* Layout test only (offer.html?o=k-career-entry&copy=ko) — not a language option. */
    ko: { title: "K-커리어 엔트리 세션™ — 한국과 아시아에서 일하고 싶은 분을 위한 60분 1:1 온라인 방향 설정 세션",
          summary: "Asia Lab 담당자와 60분 동안 1:1로 만나 지금까지의 경험과 관심 분야를 정리하고, 한국·아시아 시장에서 현실적으로 시작할 수 있는 직무 방향, 준비 우선순위, K-Career Training 프로그램과의 적합성, 그리고 다음 단계를 함께 확인합니다." },
    links: { field: "field.html?f=hustle", community: "offer.html?o=k-career-training" } },

  { key: "seoul-beauty-route", type: "experience", status: "soon", field: "beauty", product: "seoul-beauty-route-session",
    title: "Seoul Beauty Route Session™", by: "Asia Lab", image: "assets/img/studio/kbeauty-selection.jpg", focal: "50% 50%",
    summary: "Plan your private Seoul beauty and wellness route — priorities, timing and privacy — before choosing providers.",
    format: "Private online session", length: "60 minutes", where: "Online",
    outcomes: ["A route shaped around your priorities", "Timing and privacy guidance", "Korea-side preparation"],
    forWho: "Visitors planning beauty and wellness time in Seoul.",
    fine: "Not a medical consultation or treatment deposit.",
    links: { field: "field.html?f=beauty", shop: "shop.html#programs" } },

  { key: "red-carpet-masterclass", type: "experience", status: "sample", field: "beauty",
    title: "Red Carpet Makeup Masterclass", by: "Host to be confirmed", image: "assets/img/studio/hera-tutorials.jpg", focal: "50% 50%",
    summary: "A small-group masterclass on red-carpet makeup with a working artist, from skin preparation to camera-ready finish.",
    format: "In person · Seoul", length: "Half day", where: "Seoul",
    outcomes: ["Hands-on technique with a working artist", "A take-home routine card"],
    forWho: "Makeup lovers and early-career artists.",
    links: { field: "field.html?f=beauty", studio: "studio.html" } }
];

/* Statuses: label shown on cards + the primary action on the detail page. */
window.AURORA_OFFER_STATUS = {
  open:        { label: "Open",            tone: "open" },
  free:        { label: "Free to join",    tone: "open" },
  application: { label: "By application",  tone: "apply" },
  preview:     { label: "Preview · not on sale", tone: "soon" },
  soon:        { label: "Not yet open",    tone: "soon" },
  sample:      { label: "Design sample",   tone: "sample" }
};
