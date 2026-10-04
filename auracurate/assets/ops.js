/* ==========================================================================
   AURORA — Staff board (J06): one input → every place it shows
   Not an admin. It mirrors the fields staff fill in Shopify (product, metafields,
   blog article, Tevello) and shows what the same templates render, including
   draft, sold-out and missing-image states.
   ========================================================================== */
(function () {
  "use strict";
  var A = window.AURORA_PROTO;
  var root = A && A.$('[data-render="ops"]');
  if (!root) return;
  var esc = A.esc, $ = A.$, $all = A.$all, FIELD = A.FIELD;

  A.bar({ states: [], current: "", system: "theme", note: "Staff board for the review. Inputs mirror Shopify admin fields and metafields; nothing here is saved or published." });

  var IMAGES = [
    ["assets/img/studio/kbeauty-selection.jpg", "K-beauty selection"],
    ["assets/img/studio/hera-objects.jpg", "Objects of beauty"],
    ["assets/img/studio/behind-the-shoot.jpg", "Behind the shoot"],
    ["", "No image yet"]
  ];
  var st = { kind: "product", title: "Glow Keeper Hair Essence 100 ml — travel edition", brand: "BIBLIAN", field: "beauty", price: "45.00", status: "active", stock: "in", img: IMAGES[0][0], areas: { ready: true, field: true, search: true, highlight: false, market: false, studio: false } };

  function areasFor(kind) {
    return kind === "product" ? [["ready", "Shop · Ready now"], ["field", "Field page"], ["search", "Search"], ["highlight", "Aurora Highlights (needs approval)"]]
      : kind === "program" ? [["market", "Community market + Shop programs"], ["field", "Field page"], ["search", "Search"]]
      : [["studio", "Studio corner"], ["field", "Field page"], ["search", "Search"]];
  }

  function card() {
    var draft = st.status === "draft", sold = st.stock === "out";
    if (st.kind === "article") {
      return '<article class="story" style="max-width:300px"><div class="story__img">' + (st.img ? '<img src="' + esc(st.img) + '" alt="" style="--focal:50% 40%">' : '<div class="pmedia is-missing" style="aspect-ratio:16/10;border-radius:0"><span>' + esc(st.title) + "</span></div>") + '</div><div class="story__body"><p class="story__label">' + esc(FIELD[st.field] || "") + " · Studio</p><h3 class=\"story__title\">" + esc(st.title) + "</h3></div></article>";
    }
    if (st.kind === "program") {
      return '<div class="ogrid" style="grid-template-columns:minmax(0,320px)"><a class="ocard" href="#"><div class="ocard__img">' + (st.img ? '<img src="' + esc(st.img) + '" alt="">' : "") + '<span class="ocard__type">Course</span></div><div class="ocard__body"><p class="ocard__by">' + esc(st.brand) + " · <span>" + esc(FIELD[st.field] || "") + "</span></p><h3>" + esc(st.title) + '</h3><div class="ocard__meta"><span class="pill ' + (sold ? "pill--soon\">Not yet open" : "pill--open\">Open") + "</span>" + (st.price ? '<span class="ocard__price">$' + esc(st.price) + "</span>" : '<span class="ocard__price is-tbd">Price set at launch</span>') + "</div></div></a></div>";
    }
    return '<div class="pgrid"><a class="pcard" href="#">' + A.photo(st.img, st.brand + " " + st.title) +
      '<div class="pcard__body"><p class="pcard__brand">' + esc(st.brand) + " · <span>" + esc(FIELD[st.field] || "") + '</span></p><h3 class="pcard__title">' + esc(st.title) + "</h3>" +
      '<div class="pcard__row"><span class="pcard__price">$' + esc(st.price || "—") + '</span><span class="pcard__state' + (sold ? " is-soon" : "") + '">' + (sold ? "Sold out" : "View") + "</span></div></div></a></div>" + (draft ? "" : "");
  }

  function draw() {
    var draft = st.status === "draft";
    var areas = areasFor(st.kind);
    var shownIn = areas.filter(function (a) { return st.areas[a[0]]; });
    var where = {
      ready: ["shop.html#ready", "Shop · Ready now grid, with field tabs"],
      field: ["field.html?f=" + st.field, "The " + (FIELD[st.field] || "") + " field page"],
      search: ["search.html?q=" + encodeURIComponent(st.brand), "Search results for “" + st.brand + "”"],
      highlight: ["shop.html#highlights", "Aurora Highlights — only after editorial approval"],
      market: ["community.html#market", "Community market and Shop · Programs (one list)"],
      studio: ["studio.html", "Studio corner chosen in the article’s display areas"]
    };
    $("[data-ops-out]", root).innerHTML =
      '<div class="ops__slot"><small>Card · as the template renders it</small>' + (draft ? '<div class="empty"><span class="empty__icon"><span class="aurora-star" aria-hidden="true"></span></span><h3 class="empty__title">Hidden — status is Draft</h3><p class="empty__body">Drafts never appear on cards, field pages or search. Switch to Active to publish.</p></div>' : card()) + "</div>" +
      '<div class="ops__slot"><small>Where it appears</small>' + (draft ? '<p class="note" style="margin:0">Nowhere while in Draft.</p>' :
        shownIn.length ? '<ul style="margin:0;padding-left:1.1em;display:grid;gap:6px">' + shownIn.map(function (a) { var w = where[a[0]]; return '<li><a href="' + w[0] + '" style="color:#fff">' + esc(w[1]) + "</a></li>"; }).join("") + "</ul>" : '<p class="note" style="margin:0">No display area chosen — the item exists but is not placed. Pick at least one area.</p>') + "</div>" +
      '<div class="ops__slot"><small>Detail page states</small><ul style="margin:0;padding-left:1.1em;display:grid;gap:6px;color:var(--stage-text-2);font-size:var(--fs-small)">' +
        (st.kind === "article" ? "<li>Article page uses the blog body as written — long and short articles share one template.</li><li>No buy button inside the article; a related product shows once at the end, only if linked.</li>"
          : "<li>" + (st.stock === "out" ? '<b style="color:#fff">Sold out:</b> buy button disabled, other options stay selectable — <a style="color:#fff" href="product.html?p=ohui-geniture-lipstick&amp;sim=soldout">see it</a>.' : "<b style=\"color:#fff\">Available:</b> Add to cart and Buy it now active.") + "</li>" +
            "<li>" + (st.img ? "Photo shown as uploaded; product photos keep the whole pack in frame." : '<b style="color:#fff">No image:</b> the aurora frame with the product name — never a grey box.') + "</li>" +
            "<li>Price comes from Shopify only — never typed into the theme.</li>") +
      "</ul></div>";
  }

  root.innerHTML =
    '<div class="jr__crumbs"><a href="review.html">Review hub</a><span aria-hidden="true">/</span><span>Staff board</span></div>' +
    '<p class="eyebrow">J06 · Operations</p><h1 class="jr__title">Add one item. <em>See every place it shows.</em></h1>' +
    '<p class="jr__lede">Fill the same fields staff fill in Shopify. The cards, field page, search and states below are what the templates produce — including draft, sold out and no photo.</p>' +
    '<div class="ops" style="margin-top:32px">' +
      '<form class="sheet ops__form" data-ops-form onsubmit="return false">' +
        '<div class="seg" role="group" aria-label="Item type"><button type="button" data-kind="product" aria-pressed="true">Product</button><button type="button" data-kind="program" aria-pressed="false">Program</button><button type="button" data-kind="article" aria-pressed="false">Article</button></div>' +
        '<div class="field"><label for="o-title">Title <span class="hint">Shopify: product title / blog title</span></label><input id="o-title" data-k="title"></div>' +
        '<div class="field-row"><div class="field"><label for="o-brand">Brand / by <span class="hint">vendor</span></label><input id="o-brand" data-k="brand"></div>' +
          '<div class="field"><label for="o-field">Field <span class="hint">metafield aurora.field</span></label><select id="o-field" data-k="field">' + Object.keys(FIELD).map(function (k) { return '<option value="' + k + '">' + FIELD[k] + "</option>"; }).join("") + "</select></div></div>" +
        '<div class="field-row"><div class="field" data-hide-article><label for="o-price">Price (USD) <span class="hint">variant price</span></label><input id="o-price" data-k="price" inputmode="decimal"></div>' +
          '<div class="field"><label for="o-status">Status</label><select id="o-status" data-k="status"><option value="active">Active</option><option value="draft">Draft</option></select></div></div>' +
        '<div class="field" data-hide-article><label for="o-stock">Availability <span class="hint">inventory</span></label><select id="o-stock" data-k="stock"><option value="in">Available</option><option value="out">Sold out</option></select></div>' +
        '<div class="field"><label for="o-img">Image <span class="hint">approved media only</span></label><select id="o-img" data-k="img">' + IMAGES.map(function (i) { return '<option value="' + i[0] + '">' + i[1] + "</option>"; }).join("") + "</select></div>" +
        '<fieldset class="field" style="border:0;padding:0;margin:0"><legend style="font-weight:600;font-size:var(--fs-small);margin-bottom:8px">Display areas <span class="hint">metafield aurora.display_areas</span></legend><div data-areas style="display:grid;gap:8px"></div></fieldset>' +
      "</form>" +
      '<div class="ops__out" data-ops-out aria-live="polite"></div>' +
    "</div>" +
    '<section class="sheet" style="margin-top:32px"><h2 class="h-disp" style="font-size:1.75rem;margin:0 0 16px">Data contract · what each component needs</h2><div class="rtable-wrap"><table class="rtable"><thead><tr><th>Component</th><th>Must have</th><th>Can live without</th><th>Source</th><th>Never</th></tr></thead><tbody>' +
      [["Article card", "Title · real URL · format / field", "Image · summary · related person", "Shopify blog aurora-journal · display areas metafield", "Internal writing notes on screen"],
       ["Person card", "Name · profile destination · approved image", "Title · country · related objects", "Curator page data / metaobject", "Unverified recommendation lines"],
       ["Product card", "Product · options · currency/price · status", "Reviews · related person · discount", "Shopify product + variants", "Price or stock typed in the theme"],
       ["Program card", "Name · who it’s for · status · detail page", "Price · start date", "offers.js now → Shopify product + Tevello course", "A date or price that isn’t set"],
       ["Connection module", "A real relation and why", "Some of the four worlds", "Product metafields (studio, curator, community)", "Fake relations to fill four boxes"]].map(function (r) {
        return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>";
      }).join("") +
    "</tbody></table></div></section>";

  var form = $("[data-ops-form]", root);
  function fill() {
    $all("[data-k]", form).forEach(function (el) { el.value = st[el.getAttribute("data-k")]; });
    $("[data-areas]", form).innerHTML = areasFor(st.kind).map(function (a) {
      return '<label class="field--check" style="display:grid;grid-template-columns:auto 1fr;gap:10px;font-weight:400;font-size:var(--fs-small)"><input type="checkbox" data-area="' + a[0] + '"' + (st.areas[a[0]] ? " checked" : "") + " style=\"width:18px;height:18px;accent-color:var(--aurora-magenta)\"><span>" + esc(a[1]) + "</span></label>";
    }).join("");
    $all("[data-hide-article]", form).forEach(function (el) { el.hidden = st.kind === "article"; });
    $all("[data-area]", form).forEach(function (cb) { cb.addEventListener("change", function () { st.areas[cb.getAttribute("data-area")] = cb.checked; draw(); }); });
  }
  $all("[data-k]", form).forEach(function (el) {
    el.addEventListener("input", function () { st[el.getAttribute("data-k")] = el.value; draw(); });
    el.addEventListener("change", function () { st[el.getAttribute("data-k")] = el.value; draw(); });
  });
  $all("[data-kind]", form).forEach(function (b) {
    b.addEventListener("click", function () {
      st.kind = b.getAttribute("data-kind");
      $all("[data-kind]", form).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      if (st.kind === "program") { st.title = "Korean for K-content lovers — a self-paced course"; st.brand = "Asia Lab"; st.field = "lifestyle"; st.price = ""; st.img = IMAGES[2][0]; st.areas = { market: true, field: true, search: true }; }
      else if (st.kind === "article") { st.title = "Inside a Seoul beauty lab: how a serum is tested before it reaches you"; st.brand = "Aurora Studio"; st.field = "beauty"; st.img = IMAGES[1][0]; st.areas = { studio: true, field: true, search: true }; }
      else { st.title = "Glow Keeper Hair Essence 100 ml — travel edition"; st.brand = "BIBLIAN"; st.field = "beauty"; st.price = "45.00"; st.img = IMAGES[0][0]; st.areas = { ready: true, field: true, search: true }; }
      fill(); draw();
    });
  });
  fill(); draw();
})();
