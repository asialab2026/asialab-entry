/* ==========================================================================
   AURORA — One world: field pages (field.html?f=) and site search (search.html)
   Stories and people are read from studio.html and curators.html so each card
   lives in one place; products come from content/products.js.
   ========================================================================== */
(function () {
  "use strict";

  var FIELDS = window.AURORA_FIELDS || [];
  var PRODUCTS = window.AURORA_PRODUCTS || [];
  var LOUNGE = window.AURORA_LOUNGE || "community.html";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function text(el) { return el ? el.textContent.replace(/\s+/g, " ").trim() : ""; }

  // Same fallback as shop.js: a product photo that cannot load becomes the aurora
  // texture with its name; a search thumbnail keeps the texture tile.
  document.addEventListener("error", function (e) {
    var img = e.target, box = img && img.parentNode;
    if (!img || img.tagName !== "IMG" || !box || !box.classList) return;
    if (box.classList.contains("pmedia") && !box.classList.contains("is-missing")) {
      var label = document.createElement("span");
      label.textContent = img.alt;
      box.classList.add("is-missing");
      box.replaceChild(label, img);
    } else if (box.classList.contains("result__img")) {
      box.removeChild(img);
    }
  }, true);
  function param(name) { var m = location.search.match(new RegExp("[?&]" + name + "=([^&#]*)")); return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : ""; }
  function money(n) { return "$" + Number(n).toFixed(2); }

  function load(url) {
    return fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) { return new DOMParser().parseFromString(html, "text/html"); });
  }

  // Stories from Studio: story cards and the feature duo
  function readStories(doc) {
    return $all(".story[data-fields], .feature[data-fields]", doc).map(function (el) {
      var img = $("img", el);
      var href = el.tagName === "A" ? el.getAttribute("href") : "studio.html#" + ((el.closest("[id]") || {}).id || "top");
      return {
        type: "Story",
        title: text($(".story__title, h3", el)),
        label: text($(".story__label, .feature__label", el)),
        fields: (el.getAttribute("data-fields") || "").split(/\s+/),
        image: img ? img.getAttribute("src") : "",
        focal: img ? (img.style.getPropertyValue("--focal") || "") : "",
        href: href,
        sample: !!$(".sample", el)
      };
    }).filter(function (s) { return s.title; });
  }
  // People from Curators
  function readPeople(doc) {
    var seen = {};
    return $all(".people .person, .roster__card", doc).map(function (el) {
      var name = text($(".person__name", el)) || text($("span", el));
      var img = $("img", el);
      return { type: "Person", title: name, label: text($(".person__field", el)) || "Curators", image: img ? img.getAttribute("src") : "", href: el.getAttribute("href") || "curators.html#people" };
    }).filter(function (p) { if (!p.title || seen[p.title]) return false; seen[p.title] = 1; return true; });
  }

  function storyCard(s) {
    return '<a class="story reveal is-in" href="' + esc(s.href) + '">' +
      '<div class="story__img"><img src="' + esc(s.image) + '" alt="" loading="lazy"' + (s.focal ? ' style="--focal:' + esc(s.focal) + '"' : "") + "></div>" +
      '<div class="story__body"><p class="story__label">' + esc(s.label) + '</p><h3 class="story__title">' + esc(s.title) + "</h3>" +
      (s.sample ? '<span class="sample">Design sample</span>' : "") + "</div></a>";
  }
  function productCard(p) {
    var img = (p.variants && p.variants[0] && p.variants[0].image) || (p.images && p.images[0]) || p.fallbackImage || "";
    var lo = p.matrix ? p.matrix.price : Math.min.apply(null, (p.variants || []).map(function (v) { return v.price; }));
    return '<a class="pcard is-in" href="product.html?p=' + encodeURIComponent(p.key) + '">' +
      '<div class="pmedia"><img src="' + esc(img) + '" alt="' + esc(p.brand + " " + p.title) + '" loading="lazy"></div>' +
      '<div class="pcard__body"><p class="pcard__brand">' + esc(p.brand) + '</p><h3 class="pcard__title">' + esc(p.title) + "</h3>" +
      '<div class="pcard__row"><span class="pcard__price">' + money(lo) + "</span>" +
      '<span class="pcard__state' + (p.status !== "ready" ? " is-soon" : "") + '">' + (p.status !== "ready" ? "Not yet open" : "View") + "</span></div></div></a>";
  }

  /* ---- Field page ------------------------------------------------------ */
  var fieldRoot = $('[data-render="field"]');
  if (fieldRoot) {
    var id = param("f");
    var f = FIELDS.filter(function (x) { return x.id === id; })[0] || FIELDS[0];
    document.title = f.name + " — Aurora Nine Tails";
    var others = FIELDS.map(function (x) {
      return '<li><a class="nine__item" href="field.html?f=' + x.id + '"' + (x.id === f.id ? ' aria-current="page" aria-pressed="true"' : "") + '><span class="nine__icon"><img src="assets/img/nine/' + x.id + '.webp" alt=""></span>' + esc(x.name) + "</a></li>";
    }).join("");
    var products = PRODUCTS.filter(function (p) { return p.field === f.id; });

    fieldRoot.innerHTML =
      '<section class="photo-hero field-hero" aria-labelledby="f-title">' +
        '<img class="photo-hero__img" src="' + esc(f.image) + '" alt="" style="--focal:' + esc(f.focal) + '">' +
        '<div class="container photo-hero__inner">' +
          '<ol class="crumbs" aria-label="Breadcrumb"><li><a href="index.html">Aurora</a></li><li><a href="field.html">Nine Tails</a></li><li>' + esc(f.name) + "</li></ol>" +
          '<span class="field-hero__icon"><img src="assets/img/nine/' + f.id + '.webp" alt=""></span>' +
          '<h1 class="display" id="f-title">' + esc(f.name) + "</h1>" +
          '<p class="lede">' + esc(f.line) + "</p>" +
        "</div>" +
      "</section>" +
      '<nav class="section section--tight" aria-label="All nine fields" style="border-top:0"><div class="container"><ul class="nine nine--nav">' + others + "</ul></div></nav>" +
      '<section class="section" aria-labelledby="q-title"><div class="container"><div class="paper reveal is-in">' +
        '<p class="eyebrow">A question to explore</p><h2 class="h1" id="q-title"><em>' + esc(f.question) + "</em></h2>" +
        '<p class="lede">Each Aurora field begins with a question. Stories, objects and conversations are three ways of answering it.</p>' +
      "</div></div></section>" +
      '<section class="section" aria-labelledby="st-title"><div class="container">' +
        '<div class="row__head"><div><p class="eyebrow">Studio</p><h2 class="h1" id="st-title">Stories in <em>' + esc(f.name) + "</em></h2></div>" +
        '<a class="link-arrow" href="studio.html?field=' + f.id + '#stories">Open in Studio</a></div>' +
        '<div class="stories" data-field-stories><p class="muted">Loading stories…</p></div>' +
      "</div></section>" +
      '<section class="section" aria-labelledby="sh-title"><div class="container">' +
        '<div class="row__head"><div><p class="eyebrow">Shop</p><h2 class="h1" id="sh-title">Objects &amp; <em>programs</em></h2></div><a class="link-arrow" href="shop.html#ready">All of the Shop</a></div>' +
        (products.length ? '<div class="pgrid">' + products.map(productCard).join("") + "</div>"
          : '<p class="muted" style="margin:0 0 24px">Nothing is on sale in ' + esc(f.name) + " yet. The first piece is in development below.</p>") +
        '<article class="concept field-concept"><div class="concept__top"><img src="assets/img/nine/' + f.id + '.webp" alt=""><span class="concept__kind">' + esc(f.name) + " · " + esc(f.concept.kind) + "</span></div>" +
          "<h3>" + esc(f.concept.title) + "</h3><p>" + esc(f.concept.text) + "</p>" +
          '<a class="concept__route link-arrow" href="' + esc(f.concept.href) + '">Route: ' + esc(f.concept.route) + "</a></article>" +
      "</div></section>" +
      '<section class="section" aria-labelledby="cm-title"><div class="container"><div class="band"><div class="aurora-field aurora-field--ember"></div><div class="band__grid">' +
        '<div><p class="eyebrow" style="color:var(--starlight-mist)">Community · ' + esc(f.name) + '</p><h2 class="h1" id="cm-title">Bring your <em>perspective.</em></h2>' +
        '<p class="band__note">Share a discovery or ask a thoughtful question in the ' + esc(f.name) + " topic of Aurora Lounge. Some topics do not have contributions yet — be the first.</p></div>" +
        '<div><a class="btn btn--primary" href="' + esc(LOUNGE) + "#topic-" + esc(f.name) + '">Open the ' + esc(f.name) + " topic</a></div>" +
      "</div></div></div></section>";

    load("studio.html").then(function (doc) {
      var list = readStories(doc).filter(function (s) { return s.fields.indexOf(f.id) > -1; });
      var box = $("[data-field-stories]", fieldRoot);
      box.innerHTML = list.length ? list.map(storyCard).join("")
        : '<p class="muted">Stories, in the making. New articles and films in ' + esc(f.name) + " will appear here when ready.</p>";
    }).catch(function () {
      $("[data-field-stories]", fieldRoot).innerHTML = '<p class="muted"><a href="studio.html?field=' + f.id + '#stories">See ' + esc(f.name) + " stories in Studio</a></p>";
    });
  }

  /* ---- Field index (field.html with no f) -------------------------------- */
  var indexRoot = $('[data-render="field-index"]');
  if (indexRoot && !param("f")) {
    var fr = $('[data-render="field"]'); if (fr) fr.hidden = true;
    indexRoot.hidden = false;
    $(".field-grid", indexRoot).innerHTML = FIELDS.map(function (x) {
      return '<a class="field-card reveal" href="field.html?f=' + x.id + '"><img src="' + esc(x.image) + '" alt="" style="--focal:' + esc(x.focal) + '">' +
        '<span class="field-card__icon"><img src="assets/img/nine/' + x.id + '.webp" alt=""></span>' +
        '<span class="field-card__body"><b>' + esc(x.name) + "</b><span>" + esc(x.line) + "</span></span></a>";
    }).join("");
  } else if (indexRoot) { indexRoot.hidden = true; }

  /* ---- Site search ------------------------------------------------------- */
  var searchRoot = $('[data-render="search"]');
  if (searchRoot) {
    var input = $("input[type=search]", searchRoot);
    var out = $("[data-results]", searchRoot);
    var status = $("[data-search-status]", searchRoot);
    var PAGES = [
      { type: "Page", title: "Studio", label: "Stories, interviews, Aurora 100", href: "studio.html" },
      { type: "Page", title: "Curators", label: "People & perspectives", href: "curators.html" },
      { type: "Page", title: "Community", label: "Aurora Lounge, learning, honorary reporters", href: "community.html" },
      { type: "Page", title: "Shop", label: "Ready now, programs, the Aurora edit", href: "shop.html" },
      { type: "Page", title: "Fund · Together · Made for You", label: "Aurora Projects", href: "projects.html" },
      { type: "Page", title: "Aurora 100", label: "Established cultural influence", href: "studio.html#aurora-100" },
      { type: "Page", title: "Global Faces 100", label: "Discovery · Growth · Possibility", href: "studio.html#global-faces" },
      { type: "Story", title: "Meet Asia’s Official Crush: Rashmika Mandanna", label: "Aurora Exclusive · Interview", href: "article.html", image: "assets/img/studio/rashmika-editorial.jpg" },
      { type: "Person", title: "Rashmika Mandanna — curator profile", label: "Aurora 100 · Icons", href: "curator.html", image: "assets/img/people/rashmika-portrait.jpg" },
      { type: "Story", title: "JENNIE × HERA — More Than Beauty, It’s An Attitude", label: "Honorary Reporter · India · Beauty", href: "community.html#jennie-hera", image: "assets/img/community/jennie-hera-1.jpg" },
      { type: "Page", title: "Design guide & structure map", label: "Brand, colour, type, components, rules", href: "guide.html" },
      { type: "Page", title: "About Aurora", label: "A selective production house", href: "about.html" },
      { type: "Page", title: "Partner with us", label: "Partners, curators, contributors", href: "work-with-aurora.html" }
    ];
    var index = PAGES.concat(
      FIELDS.map(function (x) { return { type: "Field", title: x.name, label: x.line, href: "field.html?f=" + x.id, image: "assets/img/nine/" + x.id + ".webp", icon: true }; }),
      PRODUCTS.map(function (p) {
        return { type: p.kind === "session" ? "Program" : "Product", title: p.brand + " " + p.title, label: (p.status === "ready" ? "On sale" : "Not yet open") + " · " + p.field, href: "product.html?p=" + encodeURIComponent(p.key), image: (p.variants && p.variants[0] && p.variants[0].image) || (p.images && p.images[0]) || p.fallbackImage || "", extra: p.summary };
      })
    );
    var ready = Promise.all([load("studio.html").then(readStories).catch(function () { return []; }), load("curators.html").then(readPeople).catch(function () { return []; })])
      .then(function (r) { index = index.concat(r[0], r[1]); });

    var run = function () {
      var q = input.value.trim().toLowerCase();
      try { history.replaceState(null, "", q ? "?q=" + encodeURIComponent(input.value.trim()) : location.pathname); } catch (e) {}
      if (!q) { out.innerHTML = ""; status.textContent = "Try a person, a field or an object — for example Rashmika, Beauty, lipstick."; return; }
      var words = q.split(/\s+/);
      var hits = index.filter(function (it) {
        var hay = (it.title + " " + (it.label || "") + " " + (it.extra || "") + " " + it.type + " " + (it.fields || []).join(" ")).toLowerCase();
        return words.every(function (w) { return hay.indexOf(w) > -1; });
      });
      var groups = ["Field", "Page", "Story", "Person", "Product", "Program"];
      status.textContent = hits.length ? hits.length + " result" + (hits.length === 1 ? "" : "s") + " for “" + input.value.trim() + "”" : "No results for “" + input.value.trim() + "”. Try another word, or browse the nine fields.";
      out.innerHTML = groups.map(function (g) {
        var items = hits.filter(function (h) { return h.type === g; });
        if (!items.length) return "";
        var plural = { Story: "Stories", Person: "People" }[g] || g + "s";
        return '<section class="results__group"><h2>' + (items.length > 1 ? plural : g) + " <span>" + items.length + "</span></h2><ul>" + items.map(function (h) {
          return '<li><a class="result" href="' + esc(h.href) + '">' +
            (h.image ? '<span class="result__img' + (h.icon ? " is-icon" : "") + '"><img src="' + esc(h.image) + '" alt="" loading="lazy"></span>' : '<span class="result__img is-star"><span class="aurora-star" aria-hidden="true"></span></span>') +
            '<span class="result__body"><b>' + esc(h.title) + "</b><span>" + esc(h.label || "") + "</span></span></a></li>";
        }).join("") + "</ul></section>";
      }).join("");
    };
    var t;
    input.addEventListener("input", function () { clearTimeout(t); t = setTimeout(run, 120); });
    $("form", searchRoot).addEventListener("submit", function (e) { e.preventDefault(); run(); });
    input.value = param("q");
    ready.then(run);
    run();
  }
})();
