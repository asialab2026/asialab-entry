# auracurate.com — Aurora (dark aurora world)

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
  shop.html               Shop — hero, badge highlights, five shelves incl. Ranking (editorial selection)
  work-with-aurora.html   Partner with us — three doors, ecosystem, one intake form (Partners / Curators / Contributors)
  assets/tokens.css       Brand tokens: palette, Stage gradient, CTA states, type
  assets/aurora.css       Shell + shared components (Stage / Read modes), Shop components
  assets/pages.css        Home / Studio / Curators / Community / Partner components
  assets/aurora.js        Header/footer, content rendering, field filter, profile tabs, section spy
  assets/brand/           Official logo files and the Aurora star — trimmed, not redrawn
  assets/img/             Page images (see sources below)
  assets/texture/         "Final Aurora BG 1" texture from the original Figma (em4c3H… node 1:8)
  content/content.js      Editable Shop slots (highlights, shelves, live, intake)
```

Open `index.html` in a browser (serve the folder so the star mask loads over http). Add `?edit=1`
to any page to see the slot labels editors fill in. `studio.html?field=beauty` opens Studio filtered.

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
| Six pages (Home, Studio, Curators, Community, Shop, Partner) | Built · checked at 1440 / 390 px, no horizontal overflow, no broken images or JS errors |
| Figma files not yet readable | Starter-team files (`q75c81…`, `dd62tL…`, `VUnymK…`, `cmFZst…`, `taKmQN…`, `LRFDoq…`) — MCP limit exhausted |
| Image rights | Person and brand photos come from the original design; confirm usage rights before public launch |
| Shopify theme (Liquid), cart, checkout | `/cart`, `/account`, `/policies/*`, `/a/members` are Shopify routes |
