# auroracurate.com — Aurora (dark aurora world)

**Official slogan (fixed):** A World Connected by Experience · 경험으로 연결되는 하나의 세계 — always directly under the logo.
Company description: *Aurora is a global production house and experience platform created by Asia Lab.* “Created by Asia Lab”
appears only on About and in the footer; “Selective Production House” is not used as a slogan.

Static front-end for the Aurora site, built to be ported section-by-section into the Shopify theme.

```
auracurate/
  index.html              Aurora home — brand spread, four ways in, Aurora 100 / Global Faces 100, nine fields
  studio.html             Studio Discover — sidebar menu, search + nine-field filter, feature duo, Trending ·
                          Exclusive · Experience · Ranking · Community rows, Aurora 100, Global Faces 100, field records
  curators.html           Curators — roster of 9, curated edits, Top Curators (no numbers), NMIXX profile, people directory
  curator.html            Curator profile — Rashmika Mandanna (sidebar, Aurora 100 mark, Start Collaboration, 4 tabs)
  article.html            Studio article — "Meet Asia's Official Crush" (portrait left, story right, share, prev/next)
  community.html          Community launchpad — hero collage, 3 launchpad cards, 2 audiences, plans slot (empty until
                          approved), nine topics, video, Lounge actions, highlights, JENNIE × HERA, learning, principles
  shop.html               Shop — hero, four ways to shop (Ready now · Fund · Together · Made for You), Ready now
                          (live Shopify products, field tabs), Programs & experiences, highlights, the Aurora edit shelves
  product.html            Product detail (?p=<key>) — gallery, options, quantity, Add to cart / Buy it now (Shopify cart
                          permalinks), delivery/returns, details, Aurora's note, Studio·Curators·Community links, related
  projects.html           Aurora Projects — Fund, Together, Made for You (process, design studies, request forms) and
                          nine-field concept collection
  work-with-aurora.html   Partner with us — three doors, ecosystem, one intake form (Partners / Curators / Contributors)
  field.html              Nine Tails — index of nine fields; field.html?f=<id> gathers that field's question, Studio
                          stories, Shop items and programs, a Projects concept and the Community (Lounge) topic
  search.html             Site search (?q=) — fields, stories, people, products, programs, pages
  about.html              About Aurora — practice (Discover · Develop · Produce), ecosystem, explore, contact
  guide.html              Design guide & structure map — page map, brand, colour, type, components, content rules,
                          where each thing is edited
  404.html                Not-found page with ways back in
  review.html             Review hub — J01–J06 start buttons, site map, founder review map, decisions, Codex handoff
  cart.html               Prototype cart (?s=items|added|empty|soldout|error|country|handoff) → Shopify checkout handoff
  order.html              After purchase, Shopify order-status reference (?s=confirmed|shipped|program|session|failed|unsupported)
  help.html               Help centre: orders, shipping, returns, program access, community safety; policy templates
  collection.html         Collections (?c=ready|ranking|curators-recommendation|curation|experience|collaboration) + filters
  offer.html              Program detail (?o=<key>) — communities, cohorts, courses, workshops, digital, experiences
  learn.html              Member area, Tevello reference (?s=signin|home|empty|course|lesson|sample|pending|denied-*|restricted|
                          guest-thread|thread|compose|compose-error|report)
  application.html        Proposal results (?t=partners|curators|contributors|host|fund|together|made&s=review|received|
                          not-sent|error|duplicate|info|accepted|declined)
  project.html            Fund / Together / Made for You detail (?p=fund|together|made&s=preparing|open|confirm|closed)
  ops.html                Staff board (J06): one input → card, field page, search, draft/sold-out/no-image states
  assets/tokens.css       Brand tokens: palette, Stage gradient, CTA states, type
  assets/aurora.css       Shell + shared components (Stage / Read modes), Shop components
  assets/pages.css        Home / Studio / Curators / Community / Partner components
  assets/aurora.js        Header/footer, content rendering, field filter, profile tabs, section spy
  assets/brand/           Official logo files and the Aurora star — trimmed, not redrawn
  assets/img/             Page images (see sources below)
  assets/texture/         "Final Aurora BG 1" texture from the original Figma (em4c3H… node 1:8)
  content/content.js      Editable slots (highlights, shelves, live, communityPlans, fundProjects, intake)
  content/products.js     Live catalogue from Shopify (handles, variant IDs, prices, images) + programs
  assets/shop.js|css      Catalogue, product page, request forms (shop.css also holds field/search/guide styles)
  assets/world.js         Field pages, field index and site search (reads stories/people from studio/curators.html)
  content/fields.js       Nine fields: name, line, question, image, concept + route, Aurora Lounge link
  content/offers.js       Community market (Tevello): communities, cohorts, courses, workshops, digital, experiences
  assets/proto.js         Prototype layer: state bar, system labels (theme / Shopify native / Tevello / intake),
                          simulated cart, ?review=1 annotations
  assets/commerce.js      Cart, order status, help, collections
  assets/learn.js         Community market cards, program detail, member area
  assets/apply.js         Partner intake (check before sending), proposal results, project details
  assets/people.js        Curator profile second data set (curator.html?c=nmixx)
  assets/ops.js           Staff board
  assets/journey.css      Styles for all of the above
```

Open `index.html` in a browser (serve the folder so the star mask loads over http). Add `?edit=1`
to any page to see the slot labels editors fill in. `studio.html?field=beauty` opens Studio filtered;
`field.html?f=beauty` opens the Beauty field page; `search.html?q=beauty` searches the site.
Page scripts that render cards (shop.js, world.js) load before aurora.js so the reveal animation sees them.

## Prototype rules

- Every new screen has a **state bar** naming the simulated state and the system that owns the real screen:
  Aurora theme (build target), Shopify native (reference: checkout, order status, account), Tevello (reference:
  member area), intake (simulated results). Add `?review=1` to see review annotations.
- No real transaction happens: the cart lives in this browser, checkout buttons open reference screens.
- Simulated numbers (Fund progress, group sizes) carry a “Simulated” tag; sample programs carry “Design sample”.
- A program appears once in `content/offers.js` and is shown in Community and Shop from that one list.

## Image and copy sources

| Where | Source |
|---|---|
| Shop | Figma Shop Final `em4c3Hr6C5aD388XpLGFRZ` 1:6 (hero, highlights, 15 product images) |
| Studio cards, Aurora 100 covers/lineup, Community hero, JENNIE × HERA | Figma Studio `GXaW3vjM0Qa0KUTBecyX8i` (card photo layers 1:919 … 1:1276, 1:1849–1:1882, 1:1491, 67:222–226) |
| Curator list, Rashmika profile, article, Community launchpad | CEO PNG exports of the 5 original screens (Discover, Curator, Profile, Article_1, Frame_1) |
| NMIXX profile | Figma Curator `BV7HwR3WZXufJbIKVQno1U` 1:2 (1:16, 1:63, 1:95, 1:135) |
| People portraits, nine field icons, ecosystem diagram, wordmark | Published theme 166458622055 assets (`aurora-source-*`, `aurora-nine-*`, `aurora-ecosystem-ceo-original.jpg`) |
| Page copy | Published theme templates (`index.json`, `index.aurora-studio/-curators/-community/-partners/-100.json`) and Figma text |

Figma images were exported at 1× because the environment cannot download originals; replace
them with the source files for high-density screens.

## Content rules the code enforces

- **Real images or explicit states.** No grey slots. Portrait crops use a face-top focal point.
- **No invented numbers or urgency.** Views, read times, review counts, prices, "Only 5 remaining",
  "#1" ranks and follower counts from the mocks are left out. Ranking reads "Editorial selection".
- **Samples are labelled.** Figma sample stories and products carry a "Design sample" tag; cards
  without a real destination are not links.
- **Commerce is gated.** Buy buttons appear only with a product link and `purchasable: true`.
- **Intake:** a submission is not an approval. With no `intake.endpoint`, the form opens a
  pre-filled email to `aurora@auroracurate.com`.

## Status

| Layer | State |
|---|---|
| 27 pages (Home, Studio, Article, Curators, Profile, Community, Shop, Product, Projects, Partner, Nine Tails index + fields, Search, About, Guide, 404) | Built · checked at 1440 / 390 px, no horizontal overflow, no JS errors |
| Shopify product photos | Served from cdn.shopify.com; when it is unreachable the frame shows the aurora texture with the product name. Blocked in the design environment, so normal-state photos are not yet verified |
| Journeys J01–J06 | Mockup connected end to end (review.html). Payment, Tevello enrolment, intake and markets are not verified |
| Figma files not yet readable | Starter-team files (`q75c81…`, `dd62tL…`, `VUnymK…`, `cmFZst…`, `taKmQN…`, `LRFDoq…`) — MCP limit exhausted |
| Image rights | Person and brand photos come from the original design; confirm usage rights before public launch |
| Shopify theme (Liquid), cart, checkout | `/cart`, `/account`, `/policies/*`, `/a/members` are Shopify routes |
