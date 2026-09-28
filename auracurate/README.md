# auracurate.com — Aurora (dark aurora world)

Static front-end for the Aurora site, built to be ported section-by-section into the Shopify theme.

```
auracurate/
  index.html              Shop home — Aurora Experience (Stage)
  studio.html             Studio — two 100s (Aurora 100 ≠ Global Faces 100)
  curators.html           Curators — participant vs featured person
  community.html          Community — public intro (member spaces are app-side)
  work-with-aurora.html   Intake: 3 entrances → 1 submission (Read mode)
  assets/tokens.css       Brand tokens: palette, Stage gradient, CTA states, type
  assets/aurora.css       Components (Stage / Read modes)
  assets/aurora.js        Shared header/footer, content rendering, interactions
  assets/brand/           Official logo files (Drive: Aurora Logos) — trimmed, not redrawn
  content/content.js      Editable content slots (empty by default)
```

Open `index.html` directly in a browser. Add `?edit=1` to any page to see the slot labels
that editors fill in; the public never sees them.

## Content rules the code enforces

- **No grey placeholders.** A slot shows either a real, approved image (`object-position`
  focal, portrait default `50% 20%`, products `contain`) or an explicit aurora-textured
  empty state with public-safe copy.
- **No unverified numbers or urgency.** The original "stats" band is replaced by three
  principles. There are no viewer counts, countdowns, or "almost gone" labels.
- **Commerce is gated.** A highlight's buy button is active only when `purchasable: true`.
  Otherwise it renders a disabled "Available soon". Prices and stock must come from Shopify.
- **Empty sections hide** when a box would say nothing (Brands).
- **Intake:** a submission is not an approval. With no `intake.endpoint` set, the form
  opens a pre-filled email to `aurora@auroracurate.com`.

## Status

| Layer | State |
|---|---|
| Design tokens, shell, Shop home, section intros, intake | Built · checked at 1440 / 390 / 360 px, no horizontal overflow |
| Original Figma extraction (layout, imagery) | **Not done.** The Figma MCP call limit (Starter plan) blocked access |
| Real imagery | Only official logos. No approved people or product photos available yet |
| Shopify theme (Liquid), cart, Shop Pay checkout | Not started. `/cart`, `/account`, `/policies/*` are Shopify routes |
| Community member spaces / Newsroom permissions | App-side (not in this code) |
