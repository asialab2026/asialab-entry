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
    { id: "shop", label: "Shop", href: "shop.html" }
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
        '<a class="brand" href="' + BASE + 'index.html" aria-label="Aurora — home">' +
          '<img src="' + BASE + 'assets/brand/white-logo.png" alt="Aurora" width="114" height="26">' +
        "</a>" +
        '<nav class="nav" aria-label="Primary">' + navLinks("") + "</nav>" +
        '<div class="header-actions">' +
          '<a class="btn btn--primary pill-partner" href="' + BASE + 'work-with-aurora.html"' + (PAGE === "partner" ? ' aria-current="page"' : "") + ">Partner with us</a>" +
          '<a class="icon-btn" href="' + BASE + 'search.html" aria-label="Search"' + (PAGE === "search" ? ' aria-current="page"' : "") + ">" +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>' +
          "</a>" +
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
        '<a class="mobile-nav__link" href="' + BASE + 'search.html">Search</a>' +
        '<a class="btn btn--primary" href="' + BASE + 'work-with-aurora.html">Partner with us</a>' +
      "</nav>"
    );
  }

  /* Legal row — US entity (Shopify public contact + policy pages). Missing values show only in ?review=1. */
  var L = (C.brand && C.brand.legal) || {};
  var REVIEW = /[?&]review=1\b/.test(location.search);
  function need(v, label) {
    return v ? esc(v) : (REVIEW ? '<span class="legal-todo">[' + label + " · 확인 필요]</span>" : "");
  }
  function part(html) { return html ? "<span>" + html + "</span>" : ""; }
  function legalRow() {
    var links = [
      ["/policies/privacy-policy", "Privacy Policy"],
      ["/policies/terms-of-service", "Terms of Service"],
      ["/policies/refund-policy", "Refund Policy"],
      ["/policies/shipping-policy", "Shipping Policy"],
      ["/policies/contact-information", "Contact Information"]
    ];
    if (L.subscriptions) links.push(["/policies/subscription-policy", "Subscription Policy"]);
    links.push([BASE + "help.html#accessibility", "Accessibility"]);
    var items = links.map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + "</a></li>"; }).join("");
    if (L.sellsOrSharesData) items += '<li><a href="' + BASE + 'help.html#privacy-choices" class="privacy-choices">' +
      '<svg width="26" height="12" viewBox="0 0 30 14" aria-hidden="true"><rect x=".5" y=".5" width="29" height="13" rx="6.5" fill="none" stroke="currentColor"/><path d="M15 .5h8a6.5 6.5 0 010 13h-8z" fill="currentColor"/><path d="M6 7l2 2 4-4" stroke="currentColor" fill="none" stroke-width="1.4"/><path d="M19 5l4 4m0-4l-4 4" stroke="#0B0E15" stroke-width="1.4"/></svg>' +
      "Your Privacy Choices</a></li>";
    var mail = L.email || (C.intake && C.intake.email) || "aurora@auroracurate.com";
    return '<div class="site-footer__legal">' +
      '<ul class="legal-links" aria-label="Legal">' + items + "</ul>" +
      '<address class="legal-entity">' +
        part(need(L.entity, "US legal entity") && "Operated by " + need(L.entity, "US legal entity")) +
        part(need(L.address, "Business address")) +
        part('<a href="mailto:' + esc(mail) + '">' + esc(mail) + "</a>") +
        part(L.phone ? '<a href="tel:' + esc(L.phone.replace(/[^+\d]/g, "")) + '">' + esc(L.phone) + "</a>" : need(null, "Phone")) +
      "</address></div>";
  }

  function footer() {
    var y = new Date().getFullYear();
    return (
      '<footer class="site-footer" role="contentinfo"><div class="container">' +
        '<div class="site-footer__grid">' +
          '<div class="footer-lockup">' +
            '<img src="' + BASE + 'assets/brand/aurora_created-by-asia-lab-1.png" alt="Aurora — Created by Asia Lab" width="220" height="103" loading="lazy">' +
            "<p class=\"footer-slogan\">A World Connected by Experience</p><p>Aurora is a global production house and experience platform created by Asia Lab.</p>" +
          "</div>" +
          '<div><h2>Aurora</h2><ul>' + NAV.map(function (n) {
            return '<li><a href="' + BASE + n.href + '">' + n.label + "</a></li>";
          }).join("") +
          '<li><a href="' + BASE + 'projects.html">Fund · Together · Made for You</a></li>' +
          '<li><a href="' + BASE + 'field.html">Nine Tails</a></li>' +
          '<li><a href="' + BASE + 'about.html">About Aurora</a></li>' +
          "</ul></div>" +
          '<div><h2>Work with Aurora</h2><div class="work-with">' +
            '<a href="' + BASE + 'work-with-aurora.html#partners"><b>Partners</b><span>브랜드·제품 협업 제안</span></a>' +
            '<a href="' + BASE + 'work-with-aurora.html#curators"><b>Curators</b><span>큐레이터 협업 제안</span></a>' +
            '<a href="' + BASE + 'work-with-aurora.html#contributors"><b>Contributors</b><span>명예기자 지원</span></a>' +
          "</div></div>" +
          '<div><h2>Help</h2><ul>' +
            '<li><a href="' + BASE + 'help.html">Help centre</a></li>' +
            '<li><a href="' + BASE + 'order.html">Track an order</a></li>' +
            '<li><a href="/policies/shipping-policy">Shipping &amp; duties</a></li>' +
            '<li><a href="/policies/refund-policy">Returns &amp; refunds</a></li>' +
            '<li><a href="/policies/contact-information">Contact us</a></li>' +
          "</ul></div>" +
        "</div>" +
        legalRow() +
        '<div class="site-footer__base"><span>© ' + y + " " + esc(L.entity || "Aurora") + ". All rights reserved. Aurora is a brand created by Asia Lab.</span>" +
          "<span><a href=\"" + BASE + "guide.html\">Design guide</a> · <a href=\"" + BASE + "review.html\">Review hub</a> · One Asia, One World</span></div>" +
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

  /* ---- Community plans (only when approved in content.js) ------------- */
  var plRoot = $('[data-render="community-plans"]');
  if (plRoot) {
    var plans = C.communityPlans || [];
    if (plans.length) {
      plRoot.className = "plans";
      plRoot.innerHTML = plans.map(function (p) {
        return '<article class="plan">' + (p.tag ? '<span class="plan__tag">' + esc(p.tag) + "</span>" : "") +
          "<h3>" + esc(p.name) + '</h3><p class="plan__price">' + esc(p.price) + "<small>" + esc(p.period || "") + "</small></p>" +
          (p.note ? "<p>" + esc(p.note) + "</p>" : "") +
          "<ul>" + (p.perks || []).map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + "</ul>" +
          (p.cta && p.cta.href ? '<a class="btn btn--primary btn--sm" href="' + esc(p.cta.href) + '">' + esc(p.cta.label || "Join") + "</a>" : "") +
          "</article>";
      }).join("");
    } else if (doc.hasAttribute("data-edit")) {
      plRoot.setAttribute("data-slot", "communityPlans");
      plRoot.innerHTML = empty("Membership plans", "Shown only after the plans and prices are approved.");
    }
  }

  /* ---- Studio filter: nine fields + text search ---------------------------
     Cards carry data-fields="beauty travel"; rows with no match are hidden. */
  var filter = $("[data-filter]");
  var search = $("[data-search]");
  if (filter || search) {
    var fButtons = filter ? $all("button[data-field]", filter) : [];
    var fStatus = $("[data-filter-status]");
    var qInput = search ? $("input", search) : null;
    var state = { field: "", q: "" };
    var apply = function () {
      var field = state.field, q = state.q.toLowerCase();
      fButtons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-field") === field)); });
      var shown = 0;
      $all("[data-filter-row]").forEach(function (row) {
        var visible = 0;
        $all("[data-fields]", row).forEach(function (card) {
          var okField = !field || (" " + card.getAttribute("data-fields") + " ").indexOf(" " + field + " ") > -1;
          var okText = !q || card.textContent.toLowerCase().indexOf(q) > -1;
          card.hidden = !(okField && okText);
          if (!card.hidden) { visible++; card.classList.add("is-in"); }
        });
        row.hidden = visible === 0;
        shown += visible;
      });
      if (!fStatus) return;
      if (!field && !q) { fStatus.textContent = ""; return; }
      var label = fButtons.filter(function (b) { return b.getAttribute("data-field") === field; })[0];
      var what = [label ? label.textContent.trim() : "", q ? "“" + state.q + "”" : ""].filter(Boolean).join(" · ");
      fStatus.innerHTML = esc((shown ? shown + (shown === 1 ? " story" : " stories") : "No stories yet") + " for " + what + ".") +
        ' <button type="button" class="filter-clear">Show all</button>';
      $(".filter-clear", fStatus).addEventListener("click", function () {
        state.field = ""; state.q = ""; if (qInput) qInput.value = ""; apply();
      });
    };
    fButtons.forEach(function (b) {
      b.addEventListener("click", function () {
        state.field = b.getAttribute("aria-pressed") === "true" ? "" : b.getAttribute("data-field");
        apply();
      });
    });
    if (qInput) {
      qInput.addEventListener("input", function () { state.q = qInput.value.trim(); apply(); });
      search.addEventListener("submit", function (e) { e.preventDefault(); state.q = qInput.value.trim(); apply(); });
    }
    var qf = (location.search.match(/[?&]field=([a-z]+)/) || [])[1];
    if (qf && fButtons.some(function (b) { return b.getAttribute("data-field") === qf; })) { state.field = qf; apply(); }
  }

  /* ---- Curator roster arrow -------------------------------------------- */
  $all("[data-roster-next]").forEach(function (btn) {
    var track = btn.parentNode.querySelector("[data-roster]");
    if (!track) return;
    btn.addEventListener("click", function () {
      var end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      track.scrollTo({ left: end ? 0 : track.scrollLeft + track.clientWidth * 0.8, behavior: "smooth" });
    });
  });

  /* ---- Tabs (curator profile) ------------------------------------------ */
  $all("[role=tablist]").forEach(function (list) {
    var tabs = $all("[role=tab]", list);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) { panel.hidden = !on; if (on) $all(".reveal", panel).forEach(function (el) { el.classList.add("is-in"); }); }
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
        if (n === null) return;
        e.preventDefault();
        select(tabs[(n + tabs.length) % tabs.length], true);
      });
    });
  });

  /* ---- Sub-navigation: mark the section in view ------------------------- */
  var subLinks = $all(".subnav a[href^='#']");
  if (subLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    subLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        subLinks.forEach(function (a) { a.removeAttribute("aria-current"); });
        var a = byId[en.target.id];
        if (a) a.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(byId).forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
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
