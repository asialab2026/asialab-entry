/* ==========================================================================
   AURORA — Shell + interactions
   - Common header/footer (§3) injected into [data-shell] placeholders
   - Content slots rendered from content/content.js (explicit empty states)
   - ?edit=1 shows slot labels for editors only
   ========================================================================== */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.remove("no-js");
  var C = window.AURORA_CONTENT || {};
  var BASE = document.body.getAttribute("data-base") || "";
  var PAGE = document.body.getAttribute("data-page") || "";

  // Official Aurora star (assets/brand/aurora-star.png), drawn as a mask so it takes the text colour.
  var STAR = '<span class="aurora-star" aria-hidden="true"></span>';

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---- Edit mode ------------------------------------------------------- */
  try {
    if (/[?&]edit=1\b/.test(location.search)) doc.setAttribute("data-edit", "true");
  } catch (e) { /* ignore */ }

  /* ---- Shell ----------------------------------------------------------- */
  var NAV = [
    { id: "studio", label: "Studio", href: "studio.html" },
    { id: "curators", label: "Curators", href: "curators.html" },
    { id: "community", label: "Community", href: "community.html" },
    { id: "shop", label: "Shop", href: "index.html" }
  ];

  function navLinks(cls) {
    return NAV.map(function (n) {
      var cur = n.id === PAGE ? ' aria-current="page"' : "";
      return '<a class="' + cls + '" href="' + BASE + n.href + '"' + cur + ">" + n.label + "</a>";
    }).join("");
  }

  function header() {
    return (
      '<a class="skip-link" href="#main">본문 바로가기</a>' +
      '<header class="site-header" role="banner"><div class="container site-header__inner">' +
        '<a class="brand" href="' + BASE + 'index.html" aria-label="Aurora — Shop home">' +
          '<img src="' + BASE + 'assets/brand/white-logo.png" alt="Aurora" width="114" height="26">' +
        "</a>" +
        '<nav class="nav" aria-label="Primary">' + navLinks("") + "</nav>" +
        '<div class="header-actions">' +
          '<a class="btn btn--primary pill-partner" href="' + BASE + 'work-with-aurora.html#partners">Partner with us</a>' +
          '<a class="icon-btn" href="/cart" aria-label="Cart">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 7h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 7Z"/><path d="M9 7V6a3 3 0 0 1 6 0v1"/></svg>' +
          "</a>" +
          '<a class="icon-btn" href="/account" aria-label="Account">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.4 3.8-5 7-5s5.8 1.6 7 5"/></svg>' +
          "</a>" +
          '<button class="icon-btn menu-toggle" type="button" aria-controls="mobile-nav" aria-expanded="false" aria-label="Open menu">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>' +
          "</button>" +
        "</div>" +
      "</div></header>" +
      '<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile" data-open="false">' +
        navLinks("mobile-nav__link") +
        '<a class="btn btn--primary" href="' + BASE + 'work-with-aurora.html#partners">Partner with us</a>' +
      "</nav>"
    );
  }

  function footer() {
    var y = new Date().getFullYear();
    return (
      '<footer class="site-footer" role="contentinfo"><div class="container">' +
        '<div class="site-footer__grid">' +
          '<div class="footer-lockup">' +
            '<img src="' + BASE + 'assets/brand/aurora_created-by-asia-lab-1.png" alt="Aurora — Created by Asia Lab" width="220" height="103" loading="lazy">' +
            "<p>A selective production house connecting stories, curators, community and objects — One Asia, One World.</p>" +
          "</div>" +
          '<div><h2>Aurora</h2><ul>' + NAV.map(function (n) {
            return '<li><a href="' + BASE + n.href + '">' + n.label + "</a></li>";
          }).join("") + "</ul></div>" +
          '<div><h2>Work with Aurora</h2><div class="work-with">' +
            '<a href="' + BASE + 'work-with-aurora.html#partners"><b>Partners</b><span>브랜드·제품 협업 제안</span></a>' +
            '<a href="' + BASE + 'work-with-aurora.html#curators"><b>Curators</b><span>큐레이터 협업 제안</span></a>' +
            '<a href="' + BASE + 'work-with-aurora.html#contributors"><b>Contributors</b><span>명예기자 지원</span></a>' +
          "</div></div>" +
          '<div><h2>Help</h2><ul>' +
            '<li><a href="/policies/shipping-policy">Shipping</a></li>' +
            '<li><a href="/policies/refund-policy">Returns &amp; refunds</a></li>' +
            '<li><a href="/policies/privacy-policy">Privacy</a></li>' +
            '<li><a href="/policies/terms-of-service">Terms</a></li>' +
            '<li><a href="mailto:' + esc((C.intake && C.intake.email) || "aurora@auroracurate.com") + '">Contact</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="site-footer__base"><span>© ' + y + " Aurora · Asia Lab</span><span>One Asia, One World</span></div>" +
      "</div></footer>" +
      '<div class="edit-banner" role="status">Edit preview — slot labels are visible only with ?edit=1</div>'
    );
  }

  var hSlot = $('[data-shell="header"]');
  var fSlot = $('[data-shell="footer"]');
  if (hSlot) hSlot.outerHTML = header();
  if (fSlot) fSlot.outerHTML = footer();

  /* ---- Mobile menu ----------------------------------------------------- */
  var toggle = $(".menu-toggle");
  var mnav = $("#mobile-nav");
  function setMenu(open) {
    if (!toggle || !mnav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mnav.setAttribute("data-open", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) { var first = $("a", mnav); if (first) first.focus(); }
  }
  if (toggle) toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle && toggle.getAttribute("aria-expanded") === "true") { setMenu(false); toggle.focus(); }
  });
  window.addEventListener("resize", function () { if (window.innerWidth > 960) setMenu(false); });

  /* ---- Media: real image or explicit empty state ----------------------- */
  function media(img, opt) {
    opt = opt || {};
    var ratio = opt.ratio ? " media--" + opt.ratio : "";
    if (img && img.src) {
      var kind = img.kind === "product" || img.kind === "cutout" ? ' data-kind="' + img.kind + '"' : "";
      var focal = img.focal ? "--focal:" + esc(img.focal) + ";" : "";
      return '<figure class="media' + ratio + '"' + kind + ' style="margin:0;' + focal + '">' +
        '<img src="' + esc(img.src) + '" alt="' + esc(img.alt || "") + '" loading="lazy" decoding="async">' +
        "</figure>";
    }
    var tex = opt.texture ? " media--texture" : "";
    var pos = opt.bgpos ? ' style="--bgpos:' + esc(opt.bgpos) + '"' : "";
    return '<div class="media media--empty' + ratio + tex + '"' + pos + ' role="img" aria-label="' + esc(opt.emptyTitle || "Image coming soon") + '">' +
      '<div class="aurora-field aurora-field--soft"></div><div class="media__frame"></div>' +
      '<div class="media__empty"><span class="star" style="color:#fff">' + STAR + "</span>" +
      "<strong>" + esc(opt.emptyTitle || "Coming soon") + "</strong>" +
      (opt.emptyText ? "<span>" + esc(opt.emptyText) + "</span>" : "") +
      "</div></div>";
  }

  function empty(title, body, cta) {
    return '<div class="empty reveal"><div class="aurora-field"></div>' +
      '<span class="empty__icon">' + STAR + "</span>" +
      '<h3 class="empty__title">' + esc(title) + "</h3>" +
      '<p class="empty__body">' + esc(body) + "</p>" +
      (cta ? '<a class="link-arrow" href="' + esc(cta.href) + '">' + esc(cta.label) + "</a>" : "") +
      "</div>";
  }

  window.Aurora = { media: media, empty: empty, STAR: STAR, esc: esc };

  /* Hero cover (Figma 1:94 slot — the original stock model is not reused) */
  var cover = $('[data-render="shop-cover"]');
  if (cover) {
    cover.innerHTML = media(C.shopCover, {
      texture: true, bgpos: "8% 78%",
      emptyTitle: "The season's cover is in production",
      emptyText: "Aurora Studio · Editorial"
    });
    if (C.shopCover && C.shopCover.credit) {
      cover.insertAdjacentHTML("beforeend", '<p style="position:absolute;right:28px;bottom:24px;margin:0;font-size:11px;color:#fff;opacity:.8">' + esc(C.shopCover.credit) + "</p>");
    }
  }

  /* Aurora Highlights — three badge cards (Figma 1:44 / 1:51 / 1:62) */
  var BADGE = { exclusive: "Only on Aurora", aurora100: "Aurora 100", curator: "Curator’s Pick" };
  var BADGE_EMPTY = {
    exclusive: ["The first Aurora exclusive", "Produced with Studio — announced when confirmed."],
    aurora100: ["From the Aurora 100", "An editorial selection, never a ranking."],
    curator: ["A curator’s pick", "Chosen by a named Aurora curator."]
  };
  var BG = ["8% 80%", "30% 40%", "95% 90%"];
  var hlRoot = $('[data-render="highlights"]');
  if (hlRoot) {
    var hl = (C.highlights || []).slice(0, 3);
    var order = ["exclusive", "aurora100", "curator"];
    var cards = hl.length ? hl : order.map(function (k) { return { badge: k, _empty: true }; });
    hlRoot.innerHTML = cards.map(function (h, i) {
      var badge = BADGE[h.badge] ? '<span class="badge">' + STAR + esc(BADGE[h.badge]) + "</span>" : "";
      if (h._empty) {
        var e = BADGE_EMPTY[h.badge];
        return '<article class="hl-card reveal">' + badge +
          media(null, { texture: true, bgpos: BG[i], emptyTitle: e[0], emptyText: "Coming soon" }) +
          '<p class="hl-card__sub">' + esc(e[1]) + "</p></article>";
      }
      var L = h.links || {};
      var chips = [
        L.studio ? '<a class="chip chip--studio" href="' + esc(L.studio) + '">Studio story</a>' : "",
        L.curators ? '<a class="chip chip--curators" href="' + esc(L.curators) + '">Curator</a>' : "",
        L.community ? '<a class="chip chip--community" href="' + esc(L.community) + '">Discussion</a>' : ""
      ].join("");
      var buy = L.product
        ? (h.purchasable
            ? '<a class="btn btn--primary btn--sm" href="' + esc(L.product) + '">View product</a>'
            : '<button class="btn btn--primary btn--sm" type="button" disabled>Available soon</button>')
        : "";
      return '<article class="hl-card reveal">' + badge +
        media(h.image, { texture: true, bgpos: BG[i], emptyTitle: h.title }) +
        '<h3 class="hl-card__title">' + esc(h.title) + "</h3>" +
        (h.sub ? '<p class="hl-card__sub">' + esc(h.sub) + "</p>" : "") +
        (chips ? '<div class="card__links">' + chips + "</div>" : "") +
        (buy ? "<div>" + buy + "</div>" : "") +
        "</article>";
    }).join("");
  }

  /* Shelves (Figma "new arrivals" 83:468) — only shelves with products render */
  var shRoot = $('[data-render="shelves"]');
  if (shRoot) {
    var shelves = (C.shelves || []);
    var filled = shelves.filter(function (s) { return s.products && s.products.length; });
    if (!filled.length) {
      shRoot.innerHTML =
        '<div class="empty reveal"><div class="aurora-field"></div>' +
        '<span class="empty__icon">' + STAR + "</span>" +
        '<h3 class="empty__title">The Shop opens with its first release</h3>' +
        '<p class="empty__body">Aurora releases a small number of pieces, each tied to a Studio story and a curator. Shelves appear here as soon as a piece is approved for sale, with prices and availability straight from checkout.</p>' +
        '<div class="shelf-preview" aria-label="Upcoming shelves">' +
          shelves.map(function (s) { return "<span>" + esc(s.title) + "</span>"; }).join("") +
        "</div>" +
        '<a class="link-arrow" href="' + BASE + 'community.html">Hear first in Community</a></div>';
    } else {
      var STATUS = { sample: "Design sample", sold_out: "Sold out", preorder: "Pre-order" };
      shRoot.innerHTML = filled.map(function (s) {
        return '<div class="shelf" id="shelf-' + esc(s.id) + '">' +
          '<div class="shelf__head"><h2>' + esc(s.title) + "</h2>" +
            (s.note ? '<p class="shelf__note">' + esc(s.note) + "</p>" : "") + "</div>" +
          '<div class="grid grid--3">' + s.products.slice(0, 3).map(function (p) {
            // Packshots sit on white (kind "product"); lifestyle photos fill the frame.
            var img = p.image ? { src: p.image.src, alt: p.image.alt, focal: p.image.focal, kind: p.image.kind } : null;
            // Without a product page the card is not a link, so it never points nowhere.
            var tag = p.href ? 'a class="product-card reveal" href="' + esc(p.href) + '"' : 'article class="product-card reveal"';
            return "<" + tag + ">" +
              media(img, { texture: true, emptyTitle: p.title, emptyText: "Photo coming soon" }) +
              (p.vendor ? '<p class="product-card__vendor">' + esc(p.vendor) + "</p>" : "") +
              '<h3 class="product-card__title">' + esc(p.title) + "</h3>" +
              '<div class="product-card__row"><span class="product-card__price">' + esc(p.price || "") + "</span>" +
              (STATUS[p.status] ? '<span class="product-card__status">' + STATUS[p.status] + "</span>" : "") + "</div>" +
              (p.href ? "</a>" : "</article>");
          }).join("") + "</div>" +
          (s.href && s.products.length > 3 ? '<div class="shelf__foot"><a class="btn btn--mist btn--sm" href="' + esc(s.href) + '">View more</a></div>' : "") +
          "</div>";
      }).join("");
    }
  }

  /* Brands strip (Figma 1:154) — hidden until partnerships are agreed */
  var brRoot = $('[data-render="brands"]');
  if (brRoot) {
    var br = C.brands || [];
    if (!br.length) {
      var brSec = brRoot.closest("section");
      if (brSec && !doc.hasAttribute("data-edit")) brSec.hidden = true;
      else brRoot.innerHTML = empty("Brands", "Shown once a production partnership is agreed.");
    } else {
      brRoot.innerHTML = br.map(function (b) {
        return '<a href="' + esc(b.href || "#") + '" style="display:inline-flex;align-items:center">' +
          (b.logo ? '<img src="' + esc(b.logo) + '" alt="' + esc(b.name) + '" style="height:28px;width:auto">' : "<b>" + esc(b.name) + "</b>") + "</a>";
      }).join("");
    }
  }

  /* Live */
  var lvRoot = $('[data-render="live"]');
  var lv = C.live || { state: "none" };
  // Nothing scheduled: the section stays hidden rather than showing an empty stage.
  if (lvRoot && lv.state === "none" && !doc.hasAttribute("data-edit")) {
    var lvSec = lvRoot.closest("section");
    if (lvSec) lvSec.hidden = true;
  } else if (lvRoot) {
    var STATE = { none: "No live now", scheduled: "Scheduled", live: "Live", replay: "Replay" };
    var body, cta;
    if (lv.state === "scheduled") {
      var when = lv.startsAt ? new Date(lv.startsAt) : null;
      body = esc(lv.title || "Next Shop Live") + (when ? " — " + when.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "");
      cta = lv.url ? '<a class="btn btn--secondary" href="' + esc(lv.url) + '">Get a reminder</a>' : "";
    } else if (lv.state === "live" || lv.state === "replay") {
      body = esc(lv.title || "Shop Live");
      cta = lv.url ? '<a class="btn btn--primary" href="' + esc(lv.url) + '">' + (lv.state === "live" ? "Watch now" : "Watch the replay") + "</a>" : "";
    } else {
      body = "There is no live session scheduled right now. Live shows will be announced here and in Community.";
      cta = '<a class="btn btn--secondary" href="#highlights">Browse the Shop</a>';
    }
    lvRoot.innerHTML =
      '<div><span class="live__state" data-state="' + esc(lv.state) + '">' + STATE[lv.state || "none"] + "</span>" +
      '<h2 class="h2" style="margin-top:24px">Shop <em>Live</em></h2>' +
      '<p class="lede">' + body + "</p>" +
      '<div class="hero__actions" style="margin-top:32px">' + cta + "</div></div>" +
      '<div class="media media--16x9 media--empty media--texture" style="--bgpos:98% 95%"><div class="aurora-field"></div><div class="media__frame"></div>' +
      '<div class="media__empty"><span class="star" style="color:#fff">' + STAR + "</span><strong>Aurora Live</strong><span>" +
      (lv.state === "none" ? "Off air" : STATE[lv.state]) + "</span></div></div>";
  }

  /* ---- Reveal on scroll ----------------------------------------------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px" }) : null;
  function observe() {
    $all(".reveal:not(.is-in)").forEach(function (el) { if (io) io.observe(el); else el.classList.add("is-in"); });
  }
  observe();
})();
