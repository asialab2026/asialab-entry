/* ==========================================================================
   AURORA — Program journey (J04)
   [data-render="market"]  Community market cards (Community + Shop: one list)
   offer.html?o=<key>      Program / community / experience detail
   learn.html?s=<state>    Member area reference (Tevello): sign-in, home,
                           course, lesson, sample, access denied, community
                           thread, compose, report
   Needs proto.js, content/offers.js, content/products.js.
   ========================================================================== */
(function () {
  "use strict";
  var A = window.AURORA_PROTO;
  if (!A) return;
  var esc = A.esc, $ = A.$, $all = A.$all, money = A.money, FIELD = A.FIELD;
  var OFFERS = window.AURORA_OFFERS || [];
  var TYPES = window.AURORA_OFFER_TYPES || [];
  var STATUS = window.AURORA_OFFER_STATUS || {};
  var C = window.AURORA_CONTENT || {};
  var EMAIL = (C.intake && C.intake.email) || "contact@auroracurate.com";
  var LOUNGE = window.AURORA_LOUNGE || "https://auroracurate.com/a/members/community/2323d8b4-0cff-4f82-8859-4bd8eea506b9";

  function typeOf(id) { return TYPES.filter(function (t) { return t.id === id; })[0] || { id: id, label: id, one: id }; }
  function offer(key) { return OFFERS.filter(function (o) { return o.key === key; })[0]; }
  function productFor(o) { return o && o.product ? A.product(o.product) : null; }
  function priceOf(o) {
    var p = productFor(o);
    if (p && p.variants && p.variants[0] && p.variants[0].price != null) return { amount: p.variants[0].price, text: money(p.variants[0].price) };
    if (o.status === "free") return { amount: 0, text: "Free" };
    return null;
  }
  function pill(o) {
    var st = STATUS[o.status] || { label: o.status, tone: "sample" };
    return '<span class="pill pill--' + st.tone + '">' + esc(st.label) + "</span>";
  }

  // Typographic cover for digital products (no product photo to fake)
  function coverText(o) {
    return o.cover ? '<span class="cover-t"><small>' + esc(o.by) + " · " + esc(o.cover) + "</small><b>" + esc(o.title) + "</b></span>" : "";
  }

  /* ======================================================================
     MARKET CARDS
     ====================================================================== */
  function ocard(o) {
    var pr = priceOf(o);
    return '<a class="ocard reveal" href="offer.html?o=' + esc(o.key) + '" data-type="' + esc(o.type) + '">' +
      '<div class="ocard__img' + (o.cover ? " is-cover" : "") + '"><img src="' + esc(o.image) + '" alt="" loading="lazy" style="--focal:' + esc(o.focal || "50% 30%") + '"><span class="ocard__type">' + esc(typeOf(o.type).one) + "</span>" + coverText(o) + "</div>" +
      '<div class="ocard__body">' +
        '<p class="ocard__by">' + esc(o.by) + (FIELD[o.field] ? " · <span>" + FIELD[o.field] + "</span>" : "") + "</p>" +
        "<h3>" + esc(o.title) + "</h3>" +
        "<p>" + esc(o.summary) + "</p>" +
        '<div class="ocard__meta">' + pill(o) +
          (pr ? '<span class="ocard__price">' + esc(pr.text) + "</span>" : '<span class="ocard__price is-tbd">' + (o.status === "application" ? "No fee to apply" : "Price set at launch") + "</span>") +
        "</div>" +
      "</div></a>";
  }

  $all('[data-render="market"]').forEach(function (root) {
    var only = (root.getAttribute("data-types") || "").split(",").filter(Boolean);
    var limit = +root.getAttribute("data-limit") || 0;
    var list = OFFERS.filter(function (o) { return !only.length || only.indexOf(o.type) > -1; });
    // Open first, then application/free, then the rest — so what can be done today leads
    var rank = { open: 0, free: 1, application: 2, preview: 3, soon: 4, sample: 5 };
    var r = function (o) { return o.status in rank ? rank[o.status] : 9; };
    list = list.slice().sort(function (a, b) { return r(a) - r(b); });
    if (limit) list = list.slice(0, limit);
    var withTabs = !only.length;
    var types = TYPES.filter(function (t) { return list.some(function (o) { return o.type === t.id; }); });
    root.innerHTML =
      (withTabs ? '<div class="market__types" role="group" aria-label="Filter by type"><button type="button" class="tab" aria-pressed="true" data-t="">All</button>' +
        types.map(function (t) { return '<button type="button" class="tab" aria-pressed="false" data-t="' + t.id + '">' + esc(t.label) + "</button>"; }).join("") +
        '</div><p class="market__line" aria-live="polite">Everything Aurora members can join, learn, keep or experience.</p>' : "") +
      '<div class="ogrid">' + list.map(ocard).join("") + "</div>";
    if (withTabs) $all("[data-t]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        var t = b.getAttribute("data-t");
        $all("[data-t]", root).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        $all(".ocard", root).forEach(function (c) { c.hidden = !!t && c.getAttribute("data-type") !== t; c.classList.add("is-in"); });
        $(".market__line", root).textContent = t ? typeOf(t).line : "Everything Aurora members can join, learn, keep or experience.";
      });
    });
  });

  /* ======================================================================
     OFFER DETAIL
     ====================================================================== */
  var offerRoot = $('[data-render="offer"]');
  if (offerRoot) renderOffer();

  function afterSteps(o) {
    var T = { s: "sys--native", n: "Shopify" }, V = { s: "sys--tevello", n: "Tevello" }, L = { s: "sys--theme", n: "Asia Lab" }, AU = { s: "sys--theme", n: "Aurora" };
    var map = {
      community: o.status === "free"
        ? [[T, "Sign in", "Your Aurora account — the same one you use for orders."], [V, "Enter the space", "Aurora Lounge opens in the member area."], [V, "Say hello", "Start in Introductions or a field topic."]]
        : o.status === "application"
          ? [[AU, "Apply", "Tell the editors about you and what you would report."], [AU, "Review", "A submission is not an approval. We reply by email."], [V, "Access if approved", "The desk appears in your member area."]]
          : [[T, "Checkout", "Membership is bought at Shopify Checkout."], [V, "Membership added", "To the account with your checkout email."], [V, "Enter", "The circle opens in My learning."]],
      cohort: [[L, "Start with the Entry Session", "A fit review comes first."], [T, "Enrol & pay", "At Shopify Checkout, if accepted."], [V, "Cohort space opens", "Schedule and week one in My learning."], [V, "Learn together", "Lessons open on the cohort’s schedule."]],
      course: [[T, "Checkout", "Bought at Shopify Checkout."], [V, "Access added", "To the account with your checkout email."], [V, "Start lesson one", "Self-paced, in My learning."]],
      workshop: [[T, "Checkout", "Bought at Shopify Checkout."], [AU, "Joining details", "By email before the session."], [AU, "Live session", "Online with the host."]],
      digital: [[T, "Checkout", "Bought at Shopify Checkout."], [V, "In your library", "Open or download in My learning."]],
      experience: [[T, "Book & pay", "At Shopify Checkout."], [L, "Schedule", "Asia Lab emails you to choose a time."], [L, "Meet", "Your private session and next step."]]
    };
    return map[o.type] || map.course;
  }

  function cta(o) {
    var p = productFor(o), v = p && p.variants && p.variants[0];
    var sampleLink = o.structure ? '<a class="btn btn--secondary" href="learn.html?s=sample&o=' + esc(o.key) + '">Read a sample lesson</a>' : "";
    var notify = '<a class="btn btn--secondary" href="mailto:' + EMAIL + "?subject=" + encodeURIComponent("Notify me — " + o.title) + '">Ask to be notified</a>';
    switch (o.status) {
      case "open":
        if (p && v && v.id) return '<a class="btn btn--primary" href="cart.html?add=' + esc(p.key) + "&v=" + esc(v.id) + '&q=1">' + (o.type === "experience" ? "Book this session" : "Join now") + "</a>" +
          (sampleLink || '<a class="btn btn--secondary" href="product.html?p=' + esc(p.key) + '">See it in the Shop</a>');
        return '<button class="btn btn--primary" type="button" disabled>Not yet open</button>' + notify;
      case "free":
        return '<a class="btn btn--primary" href="learn.html?s=signin&o=' + esc(o.key) + '" data-note="Live theme: links to ' + esc(o.href || LOUNGE) + ' — Tevello asks the visitor to sign in first.">Join free</a><a class="btn btn--secondary" href="learn.html?s=guest-thread">Look inside first</a>';
      case "application":
        return '<a class="btn btn--primary" href="' + esc(o.apply || "work-with-aurora.html") + '">' + esc(o.applyLabel || "Apply") + "</a>" + (sampleLink || '<a class="btn btn--secondary" href="#after">How it works</a>');
      case "preview":
        return '<button class="btn btn--primary" type="button" disabled>Not on sale yet</button>' + (sampleLink || notify);
      case "soon":
        return '<button class="btn btn--primary" type="button" disabled>Not yet open</button>' + notify;
      default:
        return '<button class="btn btn--primary" type="button" disabled>Design sample · not on sale</button>' + (sampleLink || notify);
    }
  }

  // FAQ that matches how this item is actually joined (free · application · purchase)
  function faq(o) {
    var d = function (q, a, open) { return "<details" + (open ? " open" : "") + "><summary>" + q + "</summary><p>" + a + "</p></details>"; };
    if (o.status === "free") return d("Is it really free?", "Yes. You only need an Aurora sign-in. Nothing is charged and no card is asked for.", true) +
      d("Where will I find it?", 'In the member area, under Communities, after you <a href="learn.html?s=signin">sign in</a>.') +
      d("Can I read before joining?", 'You can look at example conversations first. Posting and replying need a sign-in. <a href="learn.html?s=guest-thread">Look inside</a>.');
    if (o.status === "application") return d("Does applying give me access?", "No. Access opens only if your application is approved. Applying is not an approval, a selection or a purchase.", true) +
      d("Is there a fee?", "There is no fee to apply." + (o.type === "cohort" ? " If you are accepted, the programme fee and dates are shown before you enrol." : "")) +
      d("When will I hear back?", "Every application gets a reply by email. The reply time is confirmed before launch.");
    var notOpen = o.status !== "open";
    var where = o.type === "experience" || o.type === "workshop" ? "Asia Lab or the host emails you the date, time zone, joining link and how to change it. Your receipt is in your account." : 'In <a href="learn.html?s=home">My learning</a>, signed in with the email you used at checkout.';
    return (notOpen ? d("When can I buy it?", o.status === "preview" ? "It isn’t on sale yet. You can read the sample lesson now; the page will show a price and a buy button once it opens." : "It isn’t on sale yet. Ask to be notified and we’ll email you when it opens.", true) : "") +
      d("Where will I find it after buying?", where, !notOpen) +
      (o.type === "experience" || o.type === "workshop" ? d("Is my time booked when I pay?", "Not yet. Paying secures your place; the time is booked when you confirm it by email.") :
        d("I bought it but can’t see it.", 'Access can take a few minutes — please don’t buy again. If you used another email, <a href="learn.html?s=denied-email">follow these steps</a>.')) +
      d("How long can I use it?", "Access period, schedule changes, downloads and recordings are set for each program and shown here before it goes on sale.") +
      d("Can I get a refund?", 'Refund terms for each program are shown here before you buy. See <a href="help.html#returns">Returns &amp; refunds</a>.');
  }

  function renderOffer() {
    var key = A.param("o");
    var o = offer(key) || OFFERS[0];
    var ko = A.param("copy") === "ko" && o.ko;
    var title = ko ? o.ko.title : o.title, summary = ko ? o.ko.summary : o.summary;
    document.title = o.title + " — Aurora " + typeOf(o.type).one;
    var pr = priceOf(o);
    var st = STATUS[o.status] || {};
    A.bar({
      states: [], current: "", system: o.status === "sample" ? "theme" : "theme",
      note: "Program template in the Aurora theme. The buy step is Shopify Checkout and the learning space is Tevello. " + (o.status === "sample" ? "This item is a design sample to test the template." : "Status: " + (st.label || o.status) + ".")
    });
    var links = o.links || {};
    var worlds = [];
    if (links.studio) worlds.push(['<small>Studio</small><b>Read the stories</b>', links.studio]);
    if (links.curators) worlds.push(['<small>Curators</small><b>Meet the perspectives</b>', links.curators]);
    if (links.field) worlds.push(["<small>Field</small><b>The " + esc(FIELD[o.field] || "field") + " field</b>", links.field]);
    if (links.shop) worlds.push(['<small>Shop</small><b>Related in the Shop</b>', links.shop]);
    if (links.community) worlds.push(['<small>Community</small><b>Continue in Community</b>', links.community]);
    var steps = afterSteps(o);

    offerRoot.innerHTML =
      '<div class="jr__crumbs"><a href="community.html">Community</a><span aria-hidden="true">/</span><a href="community.html#market">' + esc(typeOf(o.type).label) + '</a><span aria-hidden="true">/</span><span>' + esc(o.title) + "</span></div>" +
      (ko ? '<p class="status" data-tone="ok" style="margin-bottom:16px"><b>Layout test · Korean copy.</b> Not a language option — checks long Korean titles and paragraphs in this template.</p>' : "") +
      '<div class="sheet">' +
        '<div class="offer">' +
          '<div class="offer__media' + (o.cover ? " is-cover" : "") + '"><img src="' + esc(o.image) + '" alt="" style="--focal:' + esc(o.focal || "50% 30%") + '"><span class="ocard__type">' + esc(typeOf(o.type).one) + "</span>" + coverText(o) + "</div>" +
          '<div class="offer__info' + (ko ? " ko-test" : "") + '">' +
            '<p class="kicker">' + esc(o.by) + (FIELD[o.field] ? " · <b>" + FIELD[o.field] + "</b>" : "") + "</p>" +
            '<h1 class="offer__title">' + esc(title) + "</h1>" +
            '<div>' + pill(o) + "</div>" +
            '<p class="muted" style="margin:0">' + esc(summary) + "</p>" +
            '<dl class="offer__facts">' +
              "<div><dt>Format</dt><dd>" + esc(o.format) + "</dd></div>" +
              "<div><dt>Length</dt><dd>" + esc(o.length) + "</dd></div>" +
              "<div><dt>Where</dt><dd>" + esc(o.where) + "</dd></div>" +
              "<div><dt>Access</dt><dd>" + (o.type === "experience" || o.type === "workshop" ? "Joining details by email" : "Aurora member area") + "</dd></div>" +
            "</dl>" +
            '<div class="offer__price">' + (pr ? "<b>" + esc(pr.text) + "</b><span>" + (pr.amount ? "USD · taxes shown at checkout" : "Sign-in required") + "</span>"
              : o.status === "application" ? '<b style="font-size:1.0625rem">By application</b><span>No fee to apply' + (o.type === "cohort" ? " · the programme fee is shown only if you are accepted" : "") + "</span>"
              : '<b style="font-size:1.0625rem">Price set at launch</b><span>Shown here once approved</span>') + "</div>" +
            '<div class="offer__cta">' + cta(o) + "</div>" +
            (o.fine ? '<p class="fine">' + esc(o.fine) + "</p>" : "") +
          "</div>" +
        "</div>" +
      "</div>" +

      '<div class="sheet" style="margin-top:24px">' +
        '<section class="offer-sec"><h2>What you’ll do</h2><ul class="ticks">' + (o.outcomes || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></section>" +
        (o.structure ? '<section class="offer-sec"><h2>' + (o.type === "cohort" ? "Weeks &amp; topics" : "Curriculum") + '</h2><ol class="curric">' + o.structure.map(function (x, i) {
          return "<li><b>" + esc(x) + "</b>" + (i === 0 ? '<a href="learn.html?s=sample&o=' + esc(o.key) + '">Sample lesson</a>' : '<span class="fine">' + (o.type === "cohort" ? "Opens on schedule" : (o.status === "open" ? "Included" : "Planned")) + "</span>") + "</li>";
        }).join("") + "</ol></section>" : "") +
        '<section class="offer-sec"><h2>Who it’s for</h2><p class="muted" style="margin:0">' + esc(o.forWho) + "</p></section>" +
        '<section class="offer-sec" id="after"><h2>' + (o.status === "application" ? "What happens after you apply" : o.status === "free" ? "What happens after you join" : o.status === "open" ? "What happens after you buy" : "How it will work once it opens") + '</h2><div style="display:grid;gap:12px;min-width:0">' + (["preview", "soon", "sample"].indexOf(o.status) > -1 ? '<p class="fine" style="margin:0">Not on sale yet. These are the planned steps; nothing can be bought today.</p>' : "") + '<ol class="steps-h" style="--n:' + steps.length + '">' + steps.map(function (st) {
          return '<li><span class="sys ' + st[0].s + '">' + st[0].n + "</span><b>" + esc(st[1]) + "</b>" + esc(st[2]) + "</li>";
        }).join("") + "</ol></div></section>" +
        '<section class="offer-sec"><h2>Access &amp; help</h2><div class="faq">' + faq(o) +
          '<details><summary>Does joining make me a Curator or part of Aurora 100?</summary><p>No. Programs and communities are for learning and participation. Curator status and Aurora 100 are separate editorial decisions.</p></details>' +
        "</div></section>" +
        (worlds.length ? '<section class="offer-sec"><h2>Connected in Aurora</h2><div class="worlds">' + worlds.map(function (w) { return '<a href="' + esc(w[1]) + '">' + w[0] + "</a>"; }).join("") + "</div></section>" : "") +
      "</div>" +

      '<section style="margin-top:56px"><div class="row__head"><div><p class="eyebrow">More to join</p><h2 class="h2">Other ' + esc(typeOf(o.type).label.toLowerCase()) + " <em>and programs</em></h2></div><a class=\"link-arrow\" href=\"community.html#market\">All programs</a></div>" +
        '<div class="ogrid">' + OFFERS.filter(function (x) { return x.key !== o.key; }).sort(function (a, b) { return (a.type === o.type ? 0 : 1) - (b.type === o.type ? 0 : 1); }).slice(0, 3).map(ocard).join("") + "</div></section>";
    A.notes();
  }

  /* ======================================================================
     MEMBER AREA (Tevello reference)
     ====================================================================== */
  var learnRoot = $('[data-render="learn"]');

  function appFrame(active, body, signedIn) {
    var nav = [["home", "Home", "learn.html?s=home"], ["learning", "My learning", "learn.html?s=course"], ["community", "Communities", "learn.html?s=thread"], ["library", "Library", "learn.html?s=home#library"]];
    return '<div class="app">' +
      '<div class="app__bar">' +
        '<a class="app__brand" href="index.html"><img src="assets/brand/black-logo.png" alt="Aurora"><span>Members</span></a>' +
        (signedIn !== false ? '<nav class="app__nav" aria-label="Member area">' + nav.map(function (n) {
          return '<a href="' + n[2] + '"' + (n[0] === active ? ' aria-current="page"' : "") + ">" + n[1] + "</a>";
        }).join("") + "</nav>" : '<span style="flex:1"></span>') +
        (signedIn !== false ? '<span class="app__me"><span class="avatar" aria-hidden="true">PV</span><span>Priyanka</span></span>' : '<a class="btn btn--secondary btn--sm" href="learn.html?s=signin">Sign in</a>') +
      "</div>" +
      '<div class="app__body">' + body + "</div></div>";
  }

  function stateCard(cls, icon, kicker, title, body, actions, why) {
    return '<div class="state ' + cls + '" style="max-width:620px">' +
      '<span class="state__icon">' + icon + "</span>" +
      '<p class="kicker">' + kicker + "</p>" +
      '<h2 class="state__title">' + title + "</h2>" +
      '<p class="state__body">' + body + "</p>" +
      (actions ? '<div class="state__actions">' + actions + "</div>" : "") +
      (why ? '<div class="why">' + why + "</div>" : "") +
    "</div>";
  }

  var ICON = {
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
    door: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 20V4h9l3 2v14"/><path d="M4 20h16M13 12h.01"/></svg>',
    star: '<span class="aurora-star" aria-hidden="true"></span>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>'
  };

  if (learnRoot) renderLearn();

  function renderLearn() {
    var s = A.param("s") || "home";
    var o = offer(A.param("o")) || offer("entertainment-builder");
    var STATES = [
      { id: "signin", label: "Sign-in handoff" }, { id: "home", label: "Member home" }, { id: "empty", label: "Nothing yet" },
      { id: "course", label: "My course" }, { id: "lesson", label: "Lesson" }, { id: "sample", label: "Sample lesson (not bought)" },
      { id: "pending", label: "Access on its way" }, { id: "denied-guest", label: "Denied · signed out" },
      { id: "denied-other", label: "Denied · other course" }, { id: "denied-email", label: "Denied · other email" },
      { id: "restricted", label: "Restricted space" }, { id: "guest-thread", label: "Community · before joining" },
      { id: "thread", label: "Community · post" }, { id: "compose", label: "Write a post" },
      { id: "compose-error", label: "Post failed" }, { id: "report", label: "Report" }
    ];
    A.bar({ states: STATES, current: s, system: s === "signin" ? "shopify" : "tevello", keep: A.param("o") ? { o: A.param("o") } : {},
      note: s === "signin" ? "Sign-in uses the store’s Shopify customer account. Tevello reads the same account — confirm this setting before launch." : null });

    var course = offer("entertainment-builder");
    var lessonsList = (course.structure || []);
    var nav = function (cur, locked) {
      return '<nav class="lesson__nav" aria-label="Lessons"><h3>' + esc(course.title) + "</h3>" + lessonsList.map(function (x, i) {
        var done = i < cur, now = i === cur, lock = locked && i > cur;
        var tag = done ? "is-done" : lock ? "is-locked" : "";
        var mark = done ? "✓" : lock ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>' : String(i + 1);
        return now ? '<span class="' + tag + '" aria-current="page"><i>' + mark + "</i>" + esc(x) + "</span>"
          : lock ? '<span class="is-locked"><i aria-hidden="true">' + mark + "</i>" + esc(x) + '<span class="visually-hidden"> (locked)</span></span>'
          : '<a class="' + tag + '" href="learn.html?s=lesson"><i aria-hidden="true">' + mark + "</i>" + esc(x) + "</a>";
      }).join("") + "</nav>";
    };
    var html = "";

    if (s === "signin") {
      html = '<div class="signin">' +
        '<img src="assets/brand/black-logo.png" alt="Aurora">' +
        '<h2 class="h-disp" style="font-size:1.75rem;margin:0">Sign in to open your learning</h2>' +
        '<p class="muted" style="margin:0">Use the email from your order. We’ll send a one-time code — no password needed.</p>' +
        '<label class="visually-hidden" for="em">Email</label><input id="em" type="email" autocomplete="email" placeholder="you@example.com" value="priyanka@example.com">' +
        '<a class="btn btn--primary" href="learn.html?s=' + (o && o.status === "free" ? "thread" : "home") + '">Continue</a>' +
        '<p class="fine">After sign-in you return to ' + esc(o && o.status === "free" ? "Aurora Lounge" : "My learning") + ". New here? Signing in creates your account.</p></div>";
      learnRoot.innerHTML = appFrame("", html, false);
    } else if (s === "home" || s === "empty") {
      if (s === "empty") {
        html = '<div class="app__head"><div><h2>Welcome, Priyanka</h2><p>Your programs, communities and library will appear here.</p></div></div>' +
          stateCard("", ICON.star, "My learning · <b>Nothing yet</b>", "Start with something free", "Join Aurora Lounge to meet people across the nine fields, or browse programs. Anything you buy with this email appears here automatically.",
            '<a class="btn btn--primary" href="learn.html?s=thread">Open Aurora Lounge</a><a class="btn btn--secondary" href="community.html#market">Browse programs</a>',
            "<b>Bought something already?</b><span>Check you’re signed in with the email from your order — <a href=\"learn.html?s=denied-email\">see how</a>.</span>");
      } else {
        var owned = [offer("entertainment-builder"), offer("aurora-lounge"), offer("builder-workbook")];
        html = '<div class="app__head"><div><h2>Welcome back, Priyanka</h2><p>Pick up where you left off.</p></div><a class="link-arrow" href="community.html#market" style="color:var(--read-text)">Find more programs</a></div>' +
          '<div class="continue"><img src="' + esc(course.image) + '" alt="" style="--focal:' + esc(course.focal) + '"><div class="continue__body"><p class="kicker">Continue · <b>Course</b></p><h3>' + esc(course.title) + "</h3>" +
            '<div class="prog"><span>Lesson 3 of 6 · Market Path <span class="sim">Planned structure</span></span><div class="prog__bar" role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" aria-label="Your progress"><span style="width:33%"></span></div></div>' +
            '<div class="state__actions"><a class="btn btn--primary" href="learn.html?s=lesson">Continue lesson 3</a><a class="btn btn--secondary" href="learn.html?s=course">Course overview</a></div></div></div>' +
          '<section style="display:grid;gap:16px"><h2>My learning</h2><div class="tiles">' + owned.map(function (x) {
            var lbl = x.type === "community" ? "Community" : x.type === "digital" ? "Library" : "Course";
            var href = x.type === "community" ? "learn.html?s=thread" : x.type === "digital" ? "learn.html?s=home#library" : "learn.html?s=course";
            return '<a class="tile-l" href="' + href + '"><img src="' + esc(x.image) + '" alt="" style="--focal:' + esc(x.focal || "50% 30%") + '"><div><small>' + lbl + "</small><b>" + esc(x.title) + "</b></div></a>";
          }).join("") + "</div></section>" +
          '<section id="library" style="display:grid;gap:12px"><h2>Library</h2><div class="order__box" style="background:#fff"><div class="oitem"><div class="pmedia is-missing" style="border-radius:8px"><span style="font-size:11px;padding:6px">PDF</span></div><div><b>Entertainment Builder Workbook</b><span>Six reflection sheets · planner</span></div><a class="btn btn--secondary btn--sm" href="#" aria-disabled="true">Download</a></div></div>' +
            '<p class="fine">Downloads depend on Tevello’s file support — confirm before selling digital products.</p></section>' +
          '<p class="fine">Prototype data. Progress is the member’s own; Aurora shows no public counts of members or learners.</p>';
      }
      learnRoot.innerHTML = appFrame("home", html);
    } else if (s === "course") {
      html = '<div class="app__head"><div><p class="kicker">Course · <b>Asia Lab</b></p><h2>' + esc(course.title) + '</h2><p>Planned structure: six lessons, one per topic. The current Tevello test course holds all six topics in one reading lesson. <span class="sim">Planned structure</span></p></div><a class="btn btn--primary btn--sm" href="learn.html?s=lesson">Continue lesson 3</a></div>' +
        '<div class="lesson">' + nav(2, false) +
          '<div class="lesson__main"><article><h3>About this course</h3><p>' + esc(course.summary) + "</p>" +
            '<div class="prog"><span>2 of 6 complete</span><div class="prog__bar" role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" aria-label="Your progress"><span style="width:33%"></span></div></div>' +
          "</article>" +
          '<article style="background:#FBFAFD"><h3>In a cohort?</h3><p>Cohort lessons open on the cohort’s schedule. Locked lessons show the date they open — for example <b>“Opens with your cohort”</b>. Nothing is wrong with your access.</p><a class="link-arrow" style="color:var(--read-text)" href="offer.html?o=entertainment-builder-cohort">See the cohort format</a></article>' +
        "</div></div>";
      learnRoot.innerHTML = appFrame("learning", html);
    } else if (s === "lesson" || s === "sample") {
      var sample = s === "sample";
      var so = sample ? (o || course) : course;
      var topic = (so.structure || ["Lesson"])[sample ? 0 : 2];
      html = '<div class="lesson">' + (sample ? '<nav class="lesson__nav" aria-label="Lessons"><h3>' + esc(so.title) + "</h3>" + (so.structure || []).map(function (x, i) {
            return i === 0 ? '<span aria-current="page"><i>1</i>' + esc(x) + "</span>" : '<span class="is-locked"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg></i>' + esc(x) + '<span class="visually-hidden"> (included when you join)</span></span>';
          }).join("") + "</nav>" : nav(2, false)) +
        '<div class="lesson__main"><article>' +
          '<p class="kicker">' + (sample ? "Sample lesson · <b>Free preview</b>" : "Lesson 3 of 6") + "</p>" +
          '<h3>' + esc(topic) + "</h3>" +
          (sample ? "<p>Every creative direction starts with an honest look at where you stand. In this lesson you describe your current work, what you want people to feel when they meet it, and the one thing you want to explore next. The goal is not a perfect statement — it is a starting point you can test with others.</p>"
            : "<p>A market is not a country on a map. It is a group of people who share a need, a habit or a curiosity your work can meet. In this lesson you compare two possible audiences for your work, list what you would need to learn about each, and choose one question to research this week.</p>") +
          '<div class="exercise"><b>Exercise</b><span>' + (sample ? "Write a one-page creative self-introduction: who you are, what you make, and what you want to explore next." : "Map three questions you would need to answer about one target audience, and where you could find each answer.") + "</span></div>" +
          (sample ? "" : '<p class="fine">Lesson text is a writing sample to test the template; the live course content comes from Tevello.</p>') +
        "</article>" +
        (sample
          ? '<div class="gate"><div class="aurora-field"></div><p class="kicker" style="color:var(--stage-text-2)">That was lesson one</p><h3>Continue with the full ' + esc(typeOf(so.type).one.toLowerCase()) + "</h3><p>" + esc((so.structure || []).length - 1) + " more topics, exercises and your own progress in My learning.</p>" +
              '<div class="state__actions"><a class="btn btn--primary" href="offer.html?o=' + esc(so.key) + '">See how to join</a><a class="btn btn--mist" href="community.html#market">Other programs</a></div></div>'
          : '<div class="lesson__foot"><a class="btn btn--secondary" href="learn.html?s=lesson">← Brand</a><a class="btn btn--primary" href="learn.html?s=lesson">Mark complete &amp; continue</a></div>') +
        "</div></div>";
      learnRoot.innerHTML = appFrame("learning", html, !sample);
    } else if (s === "pending") {
      learnRoot.innerHTML = appFrame("learning", stateCard("state--warn", ICON.clock, "Access · <b>On its way</b>", "Your program is being added", "Your payment went through and your order is saved — you don’t need to buy again. Access usually appears within a few minutes; this page shows it as soon as it’s ready.",
        '<a class="btn btn--primary" href="learn.html?s=home">Refresh My learning</a><a class="btn btn--secondary" href="help.html#access">Get help</a>',
        "<b>Still not here after 30 minutes?</b><span>Email <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a> with your order number. <span class=\"sim\">Wait time to confirm</span></span>"));
    } else if (s === "denied-guest") {
      learnRoot.innerHTML = appFrame("", stateCard("", ICON.lock, "Members · <b>Sign in to continue</b>", "This lesson is for members", "Sign in to open lessons you’ve bought. If you haven’t joined yet, you can read a sample lesson first.",
        '<a class="btn btn--primary" href="learn.html?s=signin">Sign in</a><a class="btn btn--secondary" href="learn.html?s=sample&o=entertainment-builder">Read a sample lesson</a>'), false);
    } else if (s === "denied-other") {
      learnRoot.innerHTML = appFrame("learning", stateCard("", ICON.door, "My learning · <b>Not in your account</b>", "This course isn’t part of your programs", "You’re signed in as priyanka@example.com, which has <b>Entertainment Builder · Online Learning Preview</b>. <b>Korean Language &amp; Culture</b> is a separate course.",
        '<a class="btn btn--primary" href="offer.html?o=korean-culture">See Korean Language &amp; Culture</a><a class="btn btn--secondary" href="learn.html?s=home">Back to my programs</a>',
        "<b>Already bought it?</b><span>It may be on another email. <a href=\"learn.html?s=denied-email\">Check your email</a>.</span>"));
    } else if (s === "denied-email") {
      learnRoot.innerHTML = appFrame("learning", stateCard("", ICON.mail, "My learning · <b>Different email?</b>", "We can’t find this purchase on this account", "Programs open on the account with the email used at checkout. You’re signed in as <b>priyanka@example.com</b>.",
        '<a class="btn btn--primary" href="learn.html?s=signin">Sign in with another email</a><a class="btn btn--secondary" href="mailto:' + EMAIL + '?subject=Move%20my%20program%20access">Ask us to move it</a>',
        "<b>How to check</b><span>Your order confirmation email shows which address was used. Moving access between emails is done by the Aurora team. <span class=\"sim\">Tevello support to confirm</span></span>"));
    } else if (s === "restricted") {
      learnRoot.innerHTML = appFrame("community", stateCard("", ICON.door, "Members", "This page isn’t available", "It may have moved, or it isn’t open to your account.",
        '<a class="btn btn--primary" href="learn.html?s=home">Go to Member home</a><a class="btn btn--secondary" href="community.html">Community</a>')) +
        '<p class="note" data-note="Restricted spaces (for example a reporters’ newsroom) must answer exactly like a page that doesn’t exist — no title, no hint that it exists. Direct-URL blocking must be tested in Tevello.">Restricted spaces never reveal their name or existence to accounts without access.</p>';
    } else if (s === "guest-thread" || s === "thread") {
      var guest = s === "guest-thread";
      html = '<div class="app__head"><div><p class="kicker">Aurora Lounge · <b>Beauty</b></p><h2>Community</h2></div>' + (guest ? '<a class="btn btn--primary btn--sm" href="learn.html?s=signin&o=aurora-lounge">Join free to reply</a>' : '<a class="btn btn--primary btn--sm" href="learn.html?s=compose">Write a post</a>') + "</div>" +
        (guest ? '<div class="why"><b>You’re looking in as a guest.</b><span>Read freely. To post or reply, join Aurora Lounge — it’s free with an Aurora sign-in. Read the <a href="community.html#principles">participation principles</a> first.</span></div>' : "") +
        '<article class="post">' +
          '<div class="post__who"><span class="avatar" aria-hidden="true">MS</span><div><b>Member name</b><span>Beauty · Example post</span></div></div>' +
          "<h3>What does a Korean skincare routine look like when you live somewhere humid?</h3>" +
          "<p>I moved to Manila last year and my routine from Seoul feels too heavy. For people in humid cities — what did you drop, what did you keep, and what did you add? Interested in the reasons, not only product names.</p>" +
          '<div class="post__actions"><button type="button"' + (guest ? " disabled" : "") + '>Reply</button><a href="learn.html?s=report">Report</a></div>' +
        "</article>" +
        '<div class="replies">' +
          '<div class="reply"><div class="post__who"><span class="avatar" aria-hidden="true">JK</span><div><b>Member name</b><span>Example reply</span></div></div><p>I kept the essence step and switched to a gel moisturiser. Sunscreen became the one step I never skip.</p></div>' +
          '<div class="reply"><div class="post__who"><span class="avatar" aria-hidden="true">AR</span><div><b>Member name</b><span>Example reply</span></div></div><p>Same in Bangkok — fewer layers, more attention to cleansing at night.</p></div>' +
        "</div>" +
        (guest ? "" : '<div class="composer"><label for="rep">Your reply</label><textarea id="rep" placeholder="Share your experience — be specific and kind."></textarea><div class="composer__foot"><span class="fine">Visible to Aurora Lounge members.</span><a class="btn btn--primary btn--sm" href="learn.html?s=thread">Reply</a></div></div>') +
        '<p class="fine">Example conversation to test the layout — names and posts are placeholders. Aurora shows no member counts or likes.</p>';
      learnRoot.innerHTML = appFrame("community", html, !guest);
    } else if (s === "compose" || s === "compose-error") {
      var err = s === "compose-error";
      html = '<div class="app__head"><div><p class="kicker">Aurora Lounge · <b>New post</b></p><h2>Share a discovery or ask a question</h2></div></div>' +
        (err ? '<p class="status" data-tone="error" role="alert"><b>Your post wasn’t published.</b> Your text is kept below. Check the highlighted field, then try again. If it keeps failing, copy your text and <a href="mailto:' + EMAIL + '">email us</a>.</p>' : "") +
        '<div class="composer">' +
          '<label for="topic">Topic</label><select id="topic">' + Object.keys(FIELD).map(function (k) { return "<option" + (k === "beauty" ? " selected" : "") + ">" + FIELD[k] + "</option>"; }).join("") + "</select>" +
          '<label for="ttl">Title</label><input id="ttl" value="' + (err ? "Help" : "Seoul cafés where designers actually work") + '"' + (err ? ' aria-invalid="true" aria-describedby="ttl-err"' : "") + ">" +
          (err ? '<span id="ttl-err" class="fine" style="color:var(--velvet-eclipse)">Add a title that says what your post is about (at least 10 characters).</span>' : "") +
          '<label for="bd">Post</label><textarea id="bd">I’ll be in Seoul for two weeks in November and want to work from cafés designers use — quiet, good light, not too touristy. What would you recommend, and why?</textarea>' +
          '<div class="composer__foot"><span class="fine">Be specific, kind and no selling. <a href="community.html#principles">Principles</a></span><span class="state__actions"><a class="btn btn--secondary btn--sm" href="learn.html?s=thread">Cancel</a><a class="btn btn--primary btn--sm" href="learn.html?s=' + (err ? "thread" : "compose-error") + '">Publish</a></span></div>' +
        "</div>" +
        '<p class="fine" data-note="Posting, editing, images and links depend on Tevello’s community features. Confirm what members can post before launch; if it can’t, show this screen as Tevello’s own composer.">Prototype composer.</p>';
      learnRoot.innerHTML = appFrame("community", html);
    } else if (s === "report") {
      html = '<div class="modal" role="dialog" aria-labelledby="rp-title" aria-modal="false">' +
        '<p class="kicker">Report · <b>Aurora moderators</b></p><h2 id="rp-title" class="h-disp" style="font-size:1.75rem;margin:0">What’s wrong with this post?</h2>' +
        '<div class="radio-list" role="radiogroup">' +
          ["Spam or selling", "Harassment or hate", "Shares someone’s private information", "Copyright or someone else’s work", "Something else"].map(function (r, i) {
            return '<label><input type="radio" name="r"' + (i === 0 ? " checked" : "") + "><span>" + r + "</span></label>";
          }).join("") +
        "</div>" +
        '<p class="fine">Reports go to the Aurora team, not to the member. We may contact you by email. In danger? Contact local emergency services.</p>' +
        '<div class="state__actions"><a class="btn btn--primary" href="learn.html?s=thread">Send report</a><a class="btn btn--secondary" href="learn.html?s=thread">Cancel</a></div>' +
        '<p class="fine" data-note="Reporting and moderation tools must be confirmed in Tevello. If missing, Report opens an email to the moderation inbox.">Moderation owner and response time: to confirm.</p></div>';
      learnRoot.innerHTML = appFrame("community", html);
    }
    A.notes();
  }
})();
