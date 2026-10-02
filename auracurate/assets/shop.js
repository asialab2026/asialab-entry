/* ==========================================================================
   AURORA — Shop engine
   - Ready-now catalogue and Programs (content/products.js)
   - Product detail page (product.html?p=<key>)
   - Fund / Together / Made for You request forms ([data-request-form])
   Cart and checkout are Shopify's: /cart/add and /cart/<variant>:<qty>.
   ========================================================================== */
(function () {
  "use strict";

  var P = window.AURORA_PRODUCTS || [];
  var STORE = window.AURORA_STORE || { origin: "", currency: "USD" };
  var C = window.AURORA_CONTENT || {};
  var FIELD = {
    beauty: "Beauty", fashion: "Fashion", taste: "Taste", entertainment: "Entertainment", travel: "Travel",
    wellness: "Wellness", hustle: "Hustle", lifestyle: "Lifestyle", icons: "Icons"
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function money(n) {
    try { return new Intl.NumberFormat("en-US", { style: "currency", currency: STORE.currency || "USD" }).format(n); }
    catch (e) { return "$" + Number(n).toFixed(2); }
  }
  function priceRange(p) {
    var prices = p.matrix ? [p.matrix.price] : p.variants.map(function (v) { return v.price; });
    var lo = Math.min.apply(null, prices), hi = Math.max.apply(null, prices);
    return lo === hi ? money(lo) : "From " + money(lo);
  }
  function firstImage(p) {
    return (p.variants && p.variants[0] && p.variants[0].image) || (p.images && p.images[0]) || p.fallbackImage || "";
  }
  function pdpURL(p) { return "product.html?p=" + encodeURIComponent(p.key); }

  // Product photos are served by Shopify's CDN. If one cannot load, the frame
  // falls back to the aurora texture with the product name instead of a broken icon.
  function photo(src, alt, extra) {
    if (!src) return '<div class="pmedia is-missing"' + (extra || "") + "><span>" + esc(alt) + "</span></div>";
    return '<div class="pmedia"' + (extra || "") + '><img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async"></div>';
  }
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (!img || img.tagName !== "IMG" || !img.parentNode || !img.parentNode.classList.contains("pmedia")) return;
    var box = img.parentNode, label = document.createElement("span");
    label.textContent = img.alt;
    box.classList.add("is-missing");
    box.replaceChild(label, img);
  }, true);

  /* ---- Catalogue cards -------------------------------------------------- */
  function card(p) {
    var soon = p.status !== "ready";
    return '<a class="pcard reveal" href="' + pdpURL(p) + '" data-field="' + esc(p.field) + '">' +
      photo(firstImage(p), p.brand + " " + p.title) +
      '<div class="pcard__body">' +
        '<p class="pcard__brand">' + esc(p.brand) + (FIELD[p.field] ? ' · <span>' + FIELD[p.field] + "</span>" : "") + "</p>" +
        '<h3 class="pcard__title">' + esc(p.title) + "</h3>" +
        (p.size ? '<p class="pcard__size">' + esc(p.size) + "</p>" : "") +
        '<div class="pcard__row"><span class="pcard__price">' + priceRange(p) + "</span>" +
          '<span class="pcard__state' + (soon ? " is-soon" : "") + '">' + (soon ? "Not yet open" : (p.kind === "session" ? "Book" : "View")) + "</span></div>" +
      "</div></a>";
  }

  var readyRoot = $('[data-render="ready"]');
  if (readyRoot) {
    var goods = P.filter(function (p) { return p.kind === "physical" && p.status === "ready"; });
    var fields = [];
    goods.forEach(function (p) { if (fields.indexOf(p.field) < 0) fields.push(p.field); });
    var tabs = $('[data-render="ready-tabs"]');
    if (tabs) {
      tabs.innerHTML = ['<button type="button" class="tab" aria-pressed="true" data-f="">All</button>']
        .concat(fields.map(function (f) { return '<button type="button" class="tab" aria-pressed="false" data-f="' + f + '">' + FIELD[f] + "</button>"; })).join("");
      tabs.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-f]"); if (!b) return;
        var f = b.getAttribute("data-f");
        $all("button", tabs).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        $all(".pcard", readyRoot).forEach(function (c) { c.hidden = !!f && c.getAttribute("data-field") !== f; c.classList.add("is-in"); });
      });
    }
    readyRoot.innerHTML = goods.map(card).join("");
  }

  var progRoot = $('[data-render="programs"]');
  if (progRoot) {
    progRoot.innerHTML = P.filter(function (p) { return p.kind === "session"; }).map(function (p) {
      var soon = p.status !== "ready";
      return '<a class="program-card reveal" href="' + pdpURL(p) + '">' +
        photo(p.images && p.images[0] ? p.images[0] : p.fallbackImage, p.title) +
        '<div class="program-card__body">' +
          '<p class="pcard__brand">' + esc(p.brand) + " · Program</p>" +
          "<h3>" + esc(p.title) + "</h3>" +
          "<p>" + esc(p.summary) + "</p>" +
          '<div class="pcard__row"><span class="pcard__price">' + priceRange(p) + "</span>" +
            '<span class="pcard__state' + (soon ? " is-soon" : "") + '">' + (soon ? "Not yet open" : "Book a session") + "</span></div>" +
        "</div></a>";
    }).join("");
  }

  /* ---- Product detail page --------------------------------------------- */
  var pdp = $('[data-render="pdp"]');
  if (pdp) {
    var key = (location.search.match(/[?&]p=([^&#]+)/) || [])[1];
    key = key ? decodeURIComponent(key) : "";
    var p = P.filter(function (x) { return x.key === key; })[0] || P[0];
    renderPDP(p);
  }

  function renderPDP(p) {
    document.title = p.brand + " " + p.title + " — Aurora Shop";
    var soon = p.status !== "ready";
    var gallery = (p.images && p.images.length ? p.images : [p.fallbackImage]).filter(Boolean);
    var state = { variant: null, size: null, colour: null, qty: 1 };

    // Options
    var optsHTML = "";
    if (p.matrix) {
      state.size = "M"; state.colour = p.matrix.colours[0];
      optsHTML =
        '<fieldset class="opt"><legend>' + esc(p.optionName) + ': <b data-opt-label="size">' + state.size + "</b></legend><div class=\"opt__list\">" +
          p.matrix.sizes.map(function (s) { return '<button type="button" data-size="' + s + '" aria-pressed="' + (s === state.size) + '">' + s + "</button>"; }).join("") +
        "</div></fieldset>" +
        '<fieldset class="opt"><legend>' + esc(p.option2Name) + ': <b data-opt-label="colour">' + state.colour + "</b></legend><div class=\"opt__list\">" +
          p.matrix.colours.map(function (c) { return '<button type="button" data-colour="' + c + '" aria-pressed="' + (c === state.colour) + '">' + c + "</button>"; }).join("") +
        "</div></fieldset>";
    } else {
      state.variant = p.variants[0];
      if (p.variants.length > 1) {
        optsHTML = '<fieldset class="opt"><legend>' + esc(p.optionName || "Option") + ': <b data-opt-label="variant">' + esc(state.variant.label) + "</b></legend><div class=\"opt__list\">" +
          p.variants.map(function (v, i) { return '<button type="button" data-v="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(v.label) + "</button>"; }).join("") +
          "</div></fieldset>";
      }
    }

    var related = P.filter(function (x) { return x.key !== p.key && x.status === "ready" && (x.field === p.field || x.kind === p.kind); }).slice(0, 4);
    if (related.length < 4) related = related.concat(P.filter(function (x) { return x.key !== p.key && x.status === "ready" && related.indexOf(x) < 0; })).slice(0, 4);

    var buyBlock = soon
      ? '<div class="buy"><button class="btn btn--primary" type="button" disabled>Not yet open</button>' +
        '<a class="btn btn--secondary" href="mailto:aurora@auroracurate.com?subject=' + encodeURIComponent("Notify me — " + p.title) + '">Ask to be notified</a></div>'
      : '<div class="qty" role="group" aria-label="Quantity">' +
          '<button type="button" data-q="-1" aria-label="Decrease quantity">−</button><output data-qty aria-live="polite">1</output><button type="button" data-q="1" aria-label="Increase quantity">+</button>' +
        "</div>" +
        '<div class="buy">' +
          '<a class="btn btn--primary" data-add href="#">' + (p.kind === "session" ? "Book this session" : "Add to cart") + "</a>" +
          '<a class="btn btn--secondary" data-buynow href="#">Buy it now</a>' +
        "</div>";

    pdp.innerHTML =
      '<nav class="pdp__crumbs" aria-label="Breadcrumb"><a href="shop.html">Shop</a><span aria-hidden="true">/</span>' +
        '<a href="shop.html#' + (p.kind === "session" ? "programs" : "ready") + '">' + (p.kind === "session" ? "Programs" : (FIELD[p.field] || "Ready now")) + "</a><span aria-hidden=\"true\">/</span><span>" + esc(p.title) + "</span></nav>" +
      '<div class="pdp">' +
        '<div class="pdp__gallery">' +
          '<div class="pdp__thumbs" role="list">' + gallery.map(function (g, i) {
            return '<button type="button" role="listitem" data-g="' + i + '" aria-label="Show image ' + (i + 1) + '" aria-pressed="' + (i === 0) + '">' + photo(g, "") + "</button>";
          }).join("") + "</div>" +
          '<div class="pdp__main" data-main>' + photo(gallery[0], p.brand + " " + p.title) + "</div>" +
        "</div>" +
        '<div class="pdp__info">' +
          '<p class="pdp__brand">' + esc(p.brand) + (FIELD[p.field] ? ' · <a href="field.html?f=' + p.field + '">' + FIELD[p.field] + "</a>" : "") + "</p>" +
          '<h1 class="pdp__title">' + esc(p.title) + "</h1>" +
          (p.size ? '<p class="pdp__size">' + esc(p.size) + "</p>" : "") +
          '<p class="pdp__price" data-price>' + (state.variant ? money(state.variant.price) : money(p.matrix ? p.matrix.price : 0)) + "</p>" +
          '<p class="pdp__summary">' + esc(p.summary) + "</p>" +
          (p.includes ? '<ul class="pdp__includes">' + p.includes.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>" : "") +
          optsHTML + buyBlock +
          '<p class="pdp__fine">Taxes, shipping and delivery estimate are shown at Shopify checkout before you pay.</p>' +
          '<div class="pdp__links">' +
            '<a href="mailto:aurora@auroracurate.com?subject=' + encodeURIComponent("Question — " + p.title) + '">Ask a question</a>' +
            '<button type="button" data-share>Share</button>' +
            '<a href="' + esc(STORE.origin) + "/products/" + encodeURIComponent(p.handle) + '">View on the Shopify store</a>' +
          "</div>" +
          '<div class="trust">' +
            '<div><b>Secure checkout</b><span>Payment is handled by Shopify Checkout.</span></div>' +
            '<div><b>Shipping</b><span><a href="/policies/shipping-policy">Shipping policy</a> · estimate at checkout</span></div>' +
            '<div><b>Returns</b><span><a href="/policies/refund-policy">Returns &amp; refunds</a></span></div>' +
          "</div>" +
          '<div class="pdp__details">' + (p.details || []).map(function (d, i) {
            return "<details" + (i === 0 ? " open" : "") + "><summary>" + esc(d[0]) + "</summary><p>" + esc(d[1]) + "</p></details>";
          }).join("") + "</div>" +
        "</div>" +
      "</div>" +

      // Aurora's note + the four worlds around the product
      '<section class="pdp-world" aria-labelledby="world-title">' +
        '<div class="pdp-world__note"><span class="aurora-star" aria-hidden="true"></span>' +
          '<div><p class="eyebrow" style="margin-bottom:8px">Why it’s in Aurora</p><h2 id="world-title">' + esc(p.note || "") + "</h2>" +
          '<p class="muted">An editor’s note. No celebrity or curator endorsement is implied.</p></div></div>' +
        '<div class="pdp-world__links">' +
          '<a href="field.html?f=' + p.field + '"><small>' + (FIELD[p.field] || "Field") + '</small><b>The whole ' + (FIELD[p.field] || "field") + " world</b></a>" +
          '<a href="curators.html"><small>Curators</small><b>Meet the perspectives</b></a>' +
          '<a href="community.html#fields"><small>Community</small><b>Talk about it in the Lounge</b></a>' +
          '<a href="projects.html#made-for-you"><small>Made for You</small><b>Want your own version?</b></a>' +
        "</div>" +
      "</section>" +

      '<section class="pdp-reviews" aria-labelledby="rev-title">' +
        '<h2 id="rev-title">Community reviews</h2>' +
        '<p class="muted">Reviews appear here only from verified buyers. There are none for this item yet.</p>' +
      "</section>" +

      (related.length ? '<section class="pdp-related" aria-labelledby="rel-title"><h2 id="rel-title">You may also like</h2><div class="pgrid">' + related.map(card).join("") + "</div></section>" : "");

    // Behaviour
    var priceEl = $("[data-price]", pdp);
    var mainEl = $("[data-main]", pdp);
    function currentId() {
      if (p.matrix) return p.matrix.ids[state.size + "/" + state.colour] || "";
      return state.variant ? state.variant.id : "";
    }
    function sync() {
      var id = currentId();
      var add = $("[data-add]", pdp), now = $("[data-buynow]", pdp);
      if (add) add.href = STORE.origin + "/cart/add?id=" + id + "&quantity=" + state.qty;
      if (now) now.href = STORE.origin + "/cart/" + id + ":" + state.qty;
      var q = $("[data-qty]", pdp); if (q) q.textContent = state.qty;
    }
    $all("[data-v]", pdp).forEach(function (b) {
      b.addEventListener("click", function () {
        state.variant = p.variants[+b.getAttribute("data-v")];
        $all("[data-v]", pdp).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        $('[data-opt-label="variant"]', pdp).textContent = state.variant.label;
        priceEl.textContent = money(state.variant.price);
        if (state.variant.image) mainEl.innerHTML = photo(state.variant.image, p.brand + " " + p.title + " — " + state.variant.label);
        sync();
      });
    });
    $all("[data-size],[data-colour]", pdp).forEach(function (b) {
      b.addEventListener("click", function () {
        var isSize = b.hasAttribute("data-size");
        var val = b.getAttribute(isSize ? "data-size" : "data-colour");
        if (isSize) state.size = val; else state.colour = val;
        $all(isSize ? "[data-size]" : "[data-colour]", pdp).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        $('[data-opt-label="' + (isSize ? "size" : "colour") + '"]', pdp).textContent = val;
        sync();
      });
    });
    $all("[data-q]", pdp).forEach(function (b) {
      b.addEventListener("click", function () { state.qty = Math.max(1, Math.min(10, state.qty + +b.getAttribute("data-q"))); sync(); });
    });
    $all("[data-g]", pdp).forEach(function (b) {
      b.addEventListener("click", function () {
        $all("[data-g]", pdp).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        mainEl.innerHTML = photo(gallery[+b.getAttribute("data-g")], p.brand + " " + p.title);
      });
    });
    var share = $("[data-share]", pdp);
    if (share) share.addEventListener("click", function () {
      var data = { title: document.title, url: location.href };
      if (navigator.share) navigator.share(data).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () { share.textContent = "Link copied"; });
    });
    sync();
  }

  /* ---- Fund / Together / Made for You requests -------------------------- */
  $all("[data-request-form]").forEach(function (form) {
    var kind = form.getAttribute("data-request-form");
    var status = $(".status", form);
    var cfg = C.intake || {};
    var email = cfg.email || "aurora@auroracurate.com";
    function show(msg, tone) { if (!status) return; status.hidden = false; status.textContent = msg; status.setAttribute("data-tone", tone); }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var req = $all("[required]", form);
      var bad = req.filter(function (el) { return el.type === "checkbox" ? !el.checked : !el.value.trim() || !el.checkValidity(); });
      req.forEach(function (el) { el.setAttribute("aria-invalid", String(bad.indexOf(el) > -1)); });
      if (bad.length) { show("Please complete the highlighted fields.", "error"); bad[0].focus(); return; }
      var data = new FormData(form);
      data.append("type", kind);
      if (cfg.endpoint) {
        fetch(cfg.endpoint, { method: "POST", body: data })
          .then(function (r) { if (!r.ok) throw new Error(r.status); show("Thank you — received. This is not an order or an approval; the team will reply by email.", "ok"); form.reset(); })
          .catch(function () { show("Something went wrong. Please try again, or email " + email + ".", "error"); });
        return;
      }
      var lines = [];
      data.forEach(function (v, k) { if (String(v).trim()) lines.push(k + ": " + v); });
      location.href = "mailto:" + email + "?subject=" + encodeURIComponent("[Aurora " + kind + "] " + (data.get("name") || "")) + "&body=" + encodeURIComponent(lines.join("\n"));
      show("Your email app should open with your request filled in. Send it from there to complete it.", "ok");
    });
  });

  /* ---- Fund projects with real progress (only when published in content.js) */
  var fundRoot = $('[data-render="fund-projects"]');
  if (fundRoot) {
    var fp = C.fundProjects || [];
    if (fp.length) {
      fundRoot.innerHTML = fp.map(function (f) {
        var pct = f.goal ? Math.min(100, Math.round((f.raised / f.goal) * 100)) : 0;
        return '<article class="fund-card">' + photo(f.image, f.title) +
          '<div class="fund-card__body"><p class="pcard__brand">' + esc(f.field || "Aurora original") + "</p><h3>" + esc(f.title) + "</h3><p>" + esc(f.summary || "") + "</p>" +
          '<div class="meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><span style="width:' + pct + '%"></span></div>' +
          '<p class="fund-card__nums"><b>' + money(f.raised) + "</b> of " + money(f.goal) + (f.ends ? " · closes " + esc(f.ends) : "") + "</p>" +
          (f.href ? '<a class="btn btn--primary btn--sm" href="' + esc(f.href) + '">Back this project</a>' : "") + "</div></article>";
      }).join("");
    }
  }
})();
