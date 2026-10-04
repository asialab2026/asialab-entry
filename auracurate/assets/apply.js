/* ==========================================================================
   AURORA — Proposals, applications and projects (J05 + Projects)
   work-with-aurora.html   type-specific questions → review before sending →
                           send (endpoint) or hand over to email (never shown as sent)
   application.html        results: what happens · received · not sent · failed ·
                           duplicate · more info · accepted · not this time
   project.html?p=&s=      Fund / Together / Made for You detail with
                           preparing · open · closed states
   ========================================================================== */
(function () {
  "use strict";
  var A = window.AURORA_PROTO;
  if (!A) return;
  var esc = A.esc, $ = A.$, $all = A.$all;
  var C = window.AURORA_CONTENT || {};
  var CFG = C.intake || {};
  var EMAIL = CFG.email || "contact@auroracurate.com";

  var TYPES = {
    partners:     { label: "Partner proposal", team: "Aurora partnerships", what: "a brand, product or production collaboration" },
    curators:     { label: "Curator or host proposal", team: "Aurora editors", what: "a curator collaboration or a program to host" },
    contributors: { label: "Reporter application", team: "Aurora Studio editors", what: "an honorary reporter application" },
    host:         { label: "Host proposal", team: "Aurora editors", what: "a community, course, workshop or experience to host" },
    fund:         { label: "Fund project request", team: "Aurora Projects", what: "a project to fund" },
    together:     { label: "Together request", team: "Aurora Projects", what: "a group order idea" },
    made:         { label: "Made for You request", team: "Aurora Projects", what: "a custom piece" }
  };
  var ICON = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 8v5M12 16.5v.5"/><circle cx="12" cy="12" r="9"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg>',
    star: '<span class="aurora-star" aria-hidden="true"></span>'
  };

  /* ======================================================================
     WORK WITH AURORA — review before sending
     ====================================================================== */
  var form = document.getElementById("intake");
  if (form) initIntake();

  function initIntake() {
    var segs = $all(".seg button", form);
    var groups = $all("[data-for]", form);
    var status = document.getElementById("intake-status");
    var note = document.getElementById("intake-note");
    var submit = document.getElementById("intake-submit");
    var type = "partners";
    var LABELS = {};
    $all("label[for]", form).forEach(function (l) { LABELS[l.getAttribute("for")] = l.textContent.replace(/\(optional\)/i, "").trim(); });

    function setType(t) {
      if (!/^(partners|curators|contributors)$/.test(t)) return;
      type = t;
      segs.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-type") === t)); });
      groups.forEach(function (g) { g.hidden = g.getAttribute("data-for") !== t; });
    }
    segs.forEach(function (b) {
      b.addEventListener("click", function () { setType(b.getAttribute("data-type")); try { history.replaceState(null, "", location.pathname + location.search + "#" + type); } catch (e) {} });
    });
    var qType = A.param("type");
    setType(qType === "curator" ? "curators" : qType || (location.hash || "").slice(1) || "partners");
    window.addEventListener("hashchange", function () { setType(location.hash.slice(1)); });
    if (/^#(partners|curators|contributors|apply)$/.test(location.hash) || qType) setTimeout(function () { form.scrollIntoView({ block: "start" }); }, 0);

    // Prefill from context (profile CTA, Host on Aurora)
    var about = A.param("about"), interest = A.param("interest");
    var msg = document.getElementById("f-msg"), mode = document.getElementById("c-mode");
    if (interest === "host" && mode) mode.value = "Host a community, course, workshop or experience on Aurora";
    if (about && msg && !msg.value) msg.value = "About: " + about + "\n\n";

    note.textContent = CFG.endpoint ? "" : "Online sending is being connected. After you check your answers, we’ll open an email with them filled in — it’s sent only when you send that email.";

    function show(m, tone) { status.hidden = false; status.innerHTML = m; status.setAttribute("data-tone", tone); }
    var panel = document.createElement("div");
    panel.className = "confirm";
    panel.hidden = true;
    panel.setAttribute("tabindex", "-1");
    form.parentNode.insertBefore(panel, form.nextSibling);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var visible = $all("[required]", form).filter(function (el) { return !el.closest("[hidden]"); });
      var bad = visible.filter(function (el) { return el.type === "checkbox" ? !el.checked : !el.value.trim() || !el.checkValidity(); });
      visible.forEach(function (el) { el.setAttribute("aria-invalid", String(bad.indexOf(el) > -1)); });
      if (bad.length) { show("Please complete the highlighted fields.", "error"); bad[0].focus(); return; }
      status.hidden = true;

      // Review before sending
      var rows = [];
      $all("input, select, textarea", form).forEach(function (el) {
        if (el.closest("[hidden]") || el.type === "checkbox" || !el.value.trim() || !el.id) return;
        rows.push([LABELS[el.id] || el.name, el.value.trim()]);
      });
      form.hidden = true;
      panel.hidden = false;
      panel.innerHTML =
        '<p class="kicker">Step 2 of 2 · <b>Check your ' + esc(TYPES[type].label.toLowerCase()) + "</b></p>" +
        '<h3 class="h-disp" style="font-size:1.75rem;margin:0">Is this right?</h3>' +
        "<dl>" + rows.map(function (r) { return "<dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd>"; }).join("") + "</dl>" +
        '<p class="fine">Sending this is not an approval, a selection or a contract. ' + esc(TYPES[type].team) + " review it and reply by email.</p>" +
        '<div class="state__actions"><button type="button" class="btn btn--primary" data-send>' + (CFG.endpoint ? "Send proposal" : "Continue in my email app") + '</button><button type="button" class="btn btn--secondary" data-edit>Edit answers</button></div>' +
        '<p class="status" data-confirm-status role="status" hidden></p>';
      panel.focus();

      $("[data-edit]", panel).addEventListener("click", function () { panel.hidden = true; form.hidden = false; submit.focus(); });
      $("[data-send]", panel).addEventListener("click", function () {
        var data = new FormData(form);
        data.append("type", type);
        data.append("source_page", document.referrer || location.href);
        var key = "aurora.proto.sent." + type + "." + String(data.get("email") || "").toLowerCase();
        var dup = false;
        try { dup = !!localStorage.getItem(key); } catch (err) { /* no storage */ }
        if (dup) { location.href = A.url("application.html", { t: type, s: "duplicate" }); return; }
        if (CFG.endpoint) {
          var btn = this; btn.disabled = true; btn.textContent = "Sending…";
          fetch(CFG.endpoint, { method: "POST", body: data })
            .then(function (r) { if (!r.ok) throw new Error(r.status); try { localStorage.setItem(key, String(Date.now())); } catch (err) {} location.href = A.url("application.html", { t: type, s: "received" }); })
            .catch(function () {
              btn.disabled = false; btn.textContent = "Try again";
              var st = $("[data-confirm-status]", panel); st.hidden = false; st.setAttribute("data-tone", "error");
              st.innerHTML = "<b>We couldn’t send your proposal.</b> Your answers are kept. Try again, or email <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a>.";
            });
          return;
        }
        var lines = [];
        data.forEach(function (v, k) { if (String(v).trim()) lines.push(k + ": " + v); });
        var mailto = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("[Work with Aurora] " + type + " — " + (data.get("name") || "")) + "&body=" + encodeURIComponent(lines.join("\n"));
        try { sessionStorage.setItem("aurora.proto.mailto", mailto); sessionStorage.setItem("aurora.proto.mailbody", lines.join("\n")); } catch (err) {}
        location.href = mailto;
        setTimeout(function () { location.href = A.url("application.html", { t: type, s: "not-sent" }); }, 600);
      });
    });
  }

  /* ======================================================================
     APPLICATION RESULTS
     ====================================================================== */
  var appRoot = $('[data-render="application"]');
  if (appRoot) renderApplication();

  function renderApplication() {
    var t = A.param("t") || "partners";
    if (t === "curator") t = "curators";
    var T = TYPES[t] || TYPES.partners;
    var s = A.param("s") || "review";
    var email = ["info", "accepted", "declined"].indexOf(s) > -1;
    A.bar({
      states: [
        { id: "review", label: "What happens after" }, { id: "received", label: "Received" }, { id: "not-sent", label: "Email not sent yet" },
        { id: "error", label: "Sending failed" }, { id: "duplicate", label: "Already sent" },
        { id: "info", label: "Email · more info" }, { id: "accepted", label: "Email · let’s talk" }, { id: "declined", label: "Email · not this time" }
      ],
      current: s, system: email ? "email" : "intake", keep: { t: t },
      note: email ? "Reply emails from the team. Wording for approval; sent by whoever owns the intake inbox." : null
    });
    var steps = '<ol class="steps-h" style="--n:4">' +
      '<li class="' + (s === "review" ? "" : "is-done") + '"><b>Received</b>Your proposal reaches ' + esc(T.team) + ".</li>" +
      '<li class="' + (s === "received" ? "is-now" : "") + '"><b>Review</b>We read every proposal against what Aurora is producing.</li>' +
      '<li><b>Reply</b>By email — a question, a conversation, or a no for now.</li>' +
      "<li><b>If it fits</b>A call, then terms in writing. Nothing is agreed before that.</li>" +
    "</ol>";
    var REF = "AUR-" + t.slice(0, 1).toUpperCase() + "-0000";
    var html;
    var back = '<a class="btn btn--secondary" href="index.html">Back to Aurora</a>';
    switch (s) {
      case "received":
        html = state("state--ok", ICON.check, T.label + " · <b>Received</b>", "Thank you — we have your proposal", "Your reference is <b>" + REF + '</b> <span class="sim">Example</span>. We’ve emailed you a copy. Receiving it is not an approval; ' + esc(T.team) + " will reply by email.",
          '<a class="btn btn--primary" href="studio.html">Read Studio while you wait</a>' + back,
          '<b>When will I hear back?</b><span>Reply time is confirmed by operations before launch. <span class="sim">To confirm</span></span>') + steps;
        break;
      case "not-sent":
        var body = "", again = "mailto:" + EMAIL;
        try { body = sessionStorage.getItem("aurora.proto.mailbody") || ""; again = sessionStorage.getItem("aurora.proto.mailto") || again; } catch (e) {}
        html = state("state--warn", ICON.mail, T.label + " · <b>Not sent yet</b>", "Finish sending in your email app", "We opened an email with your answers filled in. Your proposal is sent only when you press Send in that email.",
          '<a class="btn btn--primary" href="' + esc(again) + '">Open the email again</a><button type="button" class="btn btn--secondary" data-copy>' + ICON.copy.replace('aria-hidden="true"', 'aria-hidden="true" width="16" height="16"') + " Copy my answers</button>",
          "<b>No email app?</b><span>Copy your answers and send them to <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a> from any email account.</span>") +
          (body ? '<pre class="why" style="white-space:pre-wrap;font:inherit" data-body>' + esc(body) + "</pre>" : "");
        break;
      case "error":
        html = state("state--stop", ICON.alert, T.label + " · <b>Not sent</b>", "We couldn’t send your proposal", "Nothing was lost — your answers are still in the form. Check your connection and try again.",
          '<a class="btn btn--primary" href="work-with-aurora.html#' + (t === "host" ? "curators" : t) + '">Back to my answers</a><a class="btn btn--secondary" href="mailto:' + EMAIL + '">Email us instead</a>');
        break;
      case "duplicate":
        html = state("", ICON.mail, T.label + " · <b>Already sent</b>", "You’ve already sent us a proposal", "We received a proposal from this email recently. To add something, reply to our confirmation email so it stays in one conversation.",
          '<a class="btn btn--primary" href="mailto:' + EMAIL + '?subject=' + encodeURIComponent("Update to my proposal " + REF) + '">Send an update</a><a class="btn btn--secondary" href="work-with-aurora.html">Send a different proposal</a>');
        break;
      case "info":
        html = mail("Re: your " + T.label.toLowerCase() + " " + REF, ["Hello Priyanka,", "Thank you for your proposal. Before we can review it, could you share two things?", "1. A link to past work that shows the format you have in mind.\n2. The audience you would most like to reach, and where they are.", "Reply to this email and we’ll pick it up from there.", "— " + T.team]);
        break;
      case "accepted":
        html = mail("Re: your " + T.label.toLowerCase() + " " + REF, ["Hello Priyanka,", "Thank you — we’d like to talk about your proposal.", "Could you choose a time for a 30-minute call next week? On the call we’ll talk about format, timing and what each side would bring. Nothing is agreed until terms are confirmed in writing.", "— " + T.team]);
        break;
      case "declined":
        html = mail("Re: your " + T.label.toLowerCase() + " " + REF, ["Hello Priyanka,", "Thank you for thinking of Aurora. We’ve read your proposal carefully, and it isn’t a fit for what we’re producing right now.", "This isn’t a judgement of your work. Aurora 100, Studio and the Lounge stay open to you, and you’re welcome to propose again when your project changes.", "— " + T.team]);
        break;
      default:
        html = '<div class="state" style="max-width:720px"><span class="state__icon">' + ICON.star + "</span>" +
          '<p class="kicker">' + esc(T.label) + " · <b>What happens after you send</b></p>" +
          '<h1 class="state__title">A proposal starts a conversation</h1>' +
          '<p class="state__body">Aurora works with a small number of partners at a time. We read every proposal for ' + esc(T.what) + ", and we reply to each one. A proposal is not an application to be listed, and sending one is not an approval, a selection or a contract.</p>" +
          '<div class="state__actions"><a class="btn btn--primary" href="work-with-aurora.html?type=' + (t === "host" ? "curator&interest=host" : t) + '#apply">Start a proposal</a>' + back + "</div></div>" + steps;
    }
    appRoot.innerHTML = '<div class="sheet" style="display:grid;gap:28px">' + html + "</div>";
    var cp = $("[data-copy]", appRoot);
    if (cp) cp.addEventListener("click", function () {
      var b = $("[data-body]", appRoot);
      if (navigator.clipboard && b) navigator.clipboard.writeText(b.textContent).then(function () { cp.textContent = "Copied"; });
    });
    A.notes();
  }

  function state(cls, icon, kicker, title, body, actions, why) {
    return '<div class="state ' + cls + '"><span class="state__icon">' + icon + "</span>" +
      '<p class="kicker">' + kicker + '</p><h1 class="state__title">' + title + '</h1><p class="state__body">' + body + "</p>" +
      (actions ? '<div class="state__actions">' + actions + "</div>" : "") + (why ? '<div class="why">' + why + "</div>" : "") + "</div>";
  }
  function mail(subject, paras) {
    return '<div class="modal" style="max-width:680px;margin:0">' +
      '<p class="kicker">Email · <b>From ' + EMAIL + "</b></p>" +
      '<h1 class="h-disp" style="font-size:1.5rem;margin:0">' + esc(subject) + "</h1>" +
      paras.map(function (p) { return '<p style="margin:0;white-space:pre-line;color:var(--read-text-2)">' + esc(p) + "</p>"; }).join("") +
      '<p class="fine">Reply-email template for approval. Names and reference are examples.</p></div>';
  }

  /* ======================================================================
     PROJECT DETAILS (Fund · Together · Made for You)
     ====================================================================== */
  var projRoot = $('[data-render="project"]');
  if (projRoot) renderProject();

  function renderProject() {
    var p = A.param("p") || "fund";
    var s = A.param("s") || "open";
    var step = A.param("step");
    var PROJ = {
      fund: {
        kind: "Fund", title: "Behind the Scene: an Original Edition", field: "Entertainment", image: "assets/img/studio/behind-the-shoot.jpg", focal: "50% 40%",
        lede: "Back a short-form production and its companion editorial edition. Backers receive the edition and their name in the credits.",
        purpose: ["Produce a short documentary from a working film set", "Publish a companion editorial edition in Studio", "Credit every backer in the edition"],
        rewards: [["Digital edition + credit", "Sent when the edition is released"], ["Printed edition + credit", "Ships after release; shipping at checkout"]],
        terms: ["You pay when you back the project.", "If the goal isn’t reached by the closing date, every backer is refunded in full.", "Delivery dates are estimates and may move; we email every change.", "Backing does not buy editorial influence or a role in the production."],
        goal: 20000, raised: 7400, ends: "Closes 31 January 2027"
      },
      together: {
        kind: "Together", title: "OHUI The First Geniture Lipstick — Group Order", field: "Beauty", image: "assets/img/studio/kbeauty-selection.jpg", focal: "50% 50%",
        lede: "Join a group order for a K-beauty object. When enough people join, everyone gets the group price.",
        purpose: ["One product, one group price", "The order goes ahead only when the minimum group size is reached", "Ships together from Korea"],
        rewards: [["Group price", "Set before the group opens"], ["Shades", "Choose your shade when you join"]],
        terms: ["You’re charged only if the group reaches its minimum.", "If it doesn’t, no payment is taken.", "Shipping, taxes and duties are shown at checkout.", "Price, minimum and closing date are set before the group opens."],
        goal: 50, raised: 18, unit: "people", ends: "Closes 15 December 2026"
      },
      made: {
        kind: "Made for You", title: "A Personal Archive, Made with You", field: "Icons", image: "assets/img/aurora100/cover-entertainment.jpg", focal: "50% 20%",
        lede: "Turn a personal creative story into a finished edition — designed and produced with the Aurora team.",
        purpose: ["Tell us what you want to make", "We review it and propose a scope and a quote", "Produce it together, with checkpoints"],
        rewards: [["Brief & review", "No charge to send a request"], ["Quote", "A written scope and price before anything starts"]],
        terms: ["Sending a request is free and is not an order.", "Work starts only after you accept a written quote.", "Rights and use of the finished piece are agreed in the quote."],
        process: true
      }
    };
    var d = PROJ[p] || PROJ.fund;
    var STATES = d.process ? [{ id: "open", label: "Requests open" }, { id: "preparing", label: "Preparing" }, { id: "closed", label: "Paused" }]
      : [{ id: "preparing", label: "Preparing" }, { id: "open", label: "Open" }, { id: "confirm", label: "Before you commit" }, { id: "closed", label: "Closed" }];
    if (step === "confirm") s = "confirm";
    A.bar({ states: STATES, current: s, system: "theme", keep: { p: p },
      note: "Project template in the Aurora theme. Goal, progress, dates and group sizes here are SIMULATED to test the layout — no Fund or Together project is open, and payment terms need founder approval." });

    var sim = '<span class="sim">Simulated</span>';
    var progress = "";
    if (!d.process) {
      var pct = Math.round(d.raised / d.goal * 100);
      progress = s === "preparing"
        ? '<p class="muted" style="margin:0">Opens once the terms are approved. Get an email when it does.</p>'
        : '<div style="display:grid;gap:8px" data-note="Show real numbers only when they come from payments. These are simulated.">' +
            '<div class="meter2" role="progressbar" aria-label="Progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><span style="width:' + Math.min(100, pct) + '%"></span></div>' +
            '<dl class="kv"><dt>' + (d.unit ? "Joined" : "Backed") + "</dt><dd>" + (d.unit ? d.raised + " of " + d.goal + " " + d.unit : A.money(d.raised) + " of " + A.money(d.goal)) + " " + sim + "</dd><dt>" + (s === "closed" ? "Result" : "Closing") + "</dt><dd>" + (s === "closed" ? (d.unit ? "Minimum not reached — no one was charged" : "Goal reached — in production") : esc(d.ends)) + " " + sim + "</dd></dl>" +
          "</div>";
    }
    var ctaHTML;
    if (d.process) {
      ctaHTML = s === "open" ? '<a class="btn btn--primary" href="projects.html#made-for-you">Send a request</a><a class="btn btn--secondary" href="application.html?t=made&s=review">What happens after</a>'
        : s === "preparing" ? '<button class="btn btn--primary" type="button" disabled>Requests open soon</button><a class="btn btn--secondary" href="mailto:' + EMAIL + '?subject=Made%20for%20You">Ask to be notified</a>'
        : '<button class="btn btn--primary" type="button" disabled>Requests paused</button><a class="btn btn--secondary" href="projects.html">Other projects</a>';
    } else {
      ctaHTML = s === "open" ? '<a class="btn btn--primary" href="project.html?p=' + p + '&s=open&step=confirm">' + (p === "fund" ? "Back this project" : "Join the group") + '</a><a class="btn btn--secondary" href="#terms">Read the terms</a>'
        : s === "preparing" ? '<button class="btn btn--primary" type="button" disabled>Not open yet</button><a class="btn btn--secondary" href="mailto:' + EMAIL + "?subject=" + encodeURIComponent("Notify me — " + d.title) + '">Ask to be notified</a>'
        : s === "confirm" ? ""
        : '<button class="btn btn--primary" type="button" disabled>Closed</button><a class="btn btn--secondary" href="projects.html">See open projects</a>';
    }

    var confirm = s === "confirm" ? '<div class="sheet" style="margin-bottom:24px;box-shadow:inset 0 0 0 2px var(--aurora-magenta)">' +
      state("", ICON.check, d.kind + " · <b>Before you commit</b>", p === "fund" ? "You’re backing “" + esc(d.title) + "”" : "You’re joining the group order",
        p === "fund" ? "You pay the reward amount now at Shopify Checkout. If the goal isn’t reached by the closing date, you’re refunded in full." : "You choose your shade and confirm at checkout. You’re charged only if the group reaches its minimum by the closing date.",
        '<button class="btn btn--primary" type="button" disabled>Continue to checkout · simulation</button><a class="btn btn--secondary" href="project.html?p=' + p + '&s=open">Back</a>',
        "<b>Prototype</b><span>Checkout for Fund and Together is not set up. Shopify’s pre-order and conditional-charge options must be chosen before this button can work. <span class=\"sim\">Founder + Codex decision</span></span>") + "</div>" : "";

    projRoot.innerHTML =
      '<div class="jr__crumbs"><a href="shop.html">Shop</a><span aria-hidden="true">/</span><a href="projects.html">Projects</a><span aria-hidden="true">/</span><span>' + esc(d.kind) + "</span></div>" +
      confirm +
      '<div class="sheet"><div class="proj-d">' +
        '<div style="display:grid;gap:24px;min-width:0">' +
          '<div class="proj-d__media"><img src="' + esc(d.image) + '" alt="" style="--focal:' + esc(d.focal) + '"><span class="ocard__type">' + esc(d.kind) + "</span></div>" +
          '<div><p class="kicker">' + esc(d.kind) + " · <b>" + esc(d.field) + '</b> · <span class="sim">Design sample</span></p><h1 class="offer__title" style="margin-top:8px">' + esc(d.title) + '</h1><p class="muted" style="margin:12px 0 0;max-width:62ch">' + esc(d.lede) + "</p></div>" +
          '<section class="flow"><h3>' + (d.process ? "How it works" : "What this project does") + '</h3><ul class="ticks">' + d.purpose.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></section>" +
          '<section class="flow"><h3>' + (p === "fund" ? "Rewards" : p === "together" ? "What you get" : "What it costs") + '</h3><dl class="kv" style="grid-template-columns:1fr auto">' + d.rewards.map(function (r) { return "<dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd>"; }).join("") + "</dl></section>" +
          '<section class="flow" id="terms"><h3>What you pay and what you commit to</h3><ul class="ticks">' + d.terms.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul><p class="fine">Terms shown are proposals for founder approval, not a commercial policy.</p></section>' +
        "</div>" +
        '<aside class="panel">' +
          '<p class="kicker">' + esc(d.kind) + " · <b>" + (s === "closed" ? "Closed" : s === "preparing" ? "Preparing" : "Open") + "</b></p>" +
          "<h2>" + esc(d.title) + "</h2>" + progress +
          (ctaHTML ? '<div class="state__actions" style="display:grid;grid-template-columns:1fr;gap:10px">' + ctaHTML + "</div>" : "") +
          '<div class="linkrow"><a href="studio.html">The story behind it</a><a href="help.html#returns">Refunds</a></div>' +
        "</aside>" +
      "</div></div>";
    A.notes();
  }
})();
