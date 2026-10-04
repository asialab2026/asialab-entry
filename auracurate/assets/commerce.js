/* ==========================================================================
   AURORA — Purchase journey (J02)
   cart.html       prototype cart: lines, option change, sold-out, errors,
                   ship-to country, Shopify checkout handoff
   order.html      after purchase (Shopify order status reference)
   help.html       help & support hub, policy templates
   collection.html editorial collections with filters, clear and no results
   Needs proto.js + content/products.js loaded first.
   ========================================================================== */
(function () {
  "use strict";
  var A = window.AURORA_PROTO;
  if (!A) return;
  var esc = A.esc, $ = A.$, $all = A.$all, money = A.money, FIELD = A.FIELD;
  var P = window.AURORA_PRODUCTS || [];
  var C = window.AURORA_CONTENT || {};
  var EMAIL = (C.intake && C.intake.email) || "contact@auroracurate.com";

  var ICON = {
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 7h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 7Z"/><path d="M9 7V6a3 3 0 0 1 6 0v1"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 8v5M12 16.5v.5"/><circle cx="12" cy="12" r="9"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>'
  };

  /* Ship-to markets. Only what was actually checked is marked as such. */
  var MARKETS = [
    { code: "KR", name: "Republic of Korea", state: "tested", note: "Shown at checkout in a staff test. Live payment and delivery not yet verified." },
    { code: "US", name: "United States", state: "unconfirmed" },
    { code: "IN", name: "India", state: "unconfirmed" },
    { code: "JP", name: "Japan", state: "unconfirmed" },
    { code: "SG", name: "Singapore", state: "unconfirmed" },
    { code: "ID", name: "Indonesia", state: "unconfirmed" },
    { code: "PH", name: "Philippines", state: "unconfirmed" },
    { code: "TH", name: "Thailand", state: "unconfirmed" },
    { code: "VN", name: "Vietnam", state: "unconfirmed" },
    { code: "GB", name: "United Kingdom", state: "unconfirmed" },
    { code: "AE", name: "United Arab Emirates", state: "unconfirmed" }
  ];

  /* ======================================================================
     CART
     ====================================================================== */
  var cartRoot = $('[data-render="cart"]');
  if (cartRoot) {
    var s = A.param("s");
    // Arriving from a product page: ?add=<key>&v=<variant>&q=<qty>
    var addKey = A.param("add");
    if (addKey) {
      A.cartAdd(addKey, A.param("v"), Math.max(1, +A.param("q") || 1));
      if (!s) s = "added";
    }
    // Demo seeds so every state can be opened directly
    var DEMO = [
      { key: "ohui-geniture-lipstick", vid: "50344064548967", qty: 1 },
      { key: "biblian-hair-mask", vid: "50354044731495", qty: 2 },
      { key: "k-career-entry-session", vid: "44613302354023", qty: 1 }
    ];
    if (!s) s = A.cart().length ? "items" : "empty";
    if ((s === "items" || s === "soldout" || s === "error" || s === "country" || s === "handoff") && !A.cart().length) A.cartSet(DEMO.slice());
    var country = A.param("ship") || (s === "country" ? "IN" : "KR");

    A.bar({
      states: [
        { id: "items", label: "Cart" }, { id: "added", label: "Just added" }, { id: "empty", label: "Empty" },
        { id: "soldout", label: "Option sold out" }, { id: "error", label: "Update failed" },
        { id: "country", label: "Country not confirmed" }, { id: "handoff", label: "Checkout handoff" }
      ],
      current: s, system: "theme",
      note: "The cart is part of the Aurora theme. Lines here are simulated in this browser — no order is created. Checkout itself is Shopify’s."
    });
    renderCart(s, country);
  }

  function lineData(l) {
    var p = A.product(l.key);
    if (!p) return null;
    var v = A.variantOf(p, l.vid) || (p.variants && p.variants[0]);
    return { l: l, p: p, v: v, price: v ? v.price : (p.matrix ? p.matrix.price : 0) };
  }

  function renderCart(s, country) {
    var lines = A.cart().map(lineData).filter(Boolean);
    var mkt = MARKETS.filter(function (m) { return m.code === country; })[0] || MARKETS[0];

    if (s === "empty" || !lines.length) {
      A.cartSet([]);
      cartRoot.innerHTML =
        '<div class="sheet"><div class="state">' +
          '<span class="state__icon">' + ICON.bag + "</span>" +
          '<h1 class="state__title">Your cart is empty</h1>' +
          '<p class="state__body">Objects you add from the Shop appear here. Nothing is reserved until you complete Shopify checkout.</p>' +
          '<div class="state__actions"><a class="btn btn--primary" href="shop.html#ready">Shop ready-now objects</a><a class="btn btn--secondary" href="community.html#market">Explore programs</a></div>' +
          '<p class="fine">Looking for a past order? <a href="help.html#orders">Find your order</a>.</p>' +
        "</div></div>";
      return;
    }

    var unavailable = s === "soldout" ? lines[0] : null;
    var failed = s === "error" ? lines[1] || lines[0] : null;
    var physical = lines.some(function (d) { return d.p.kind === "physical"; });
    var subtotal = lines.reduce(function (t, d) { return t + (d === unavailable ? 0 : d.price * d.l.qty); }, 0);
    var count = lines.reduce(function (t, d) { return t + d.l.qty; }, 0);

    var added = "";
    if (s === "added") {
      var last = lines[lines.length - 1];
      added = '<div class="added" role="status">' + A.photo(A.firstImage(last.p, last.v), last.p.title) +
        "<div><p><b>Added to your cart</b></p><p>" + esc(last.p.brand + " · " + last.p.title) + (last.v && last.v.label ? " — " + esc(last.v.label) : "") + "</p></div>" +
        '<div class="added__actions"><a class="btn btn--secondary btn--sm" href="product.html?p=' + esc(last.p.key) + '">Keep looking at this product</a><a class="btn btn--secondary btn--sm" href="shop.html#ready">Continue shopping</a></div></div>';
    }

    var linesHTML = lines.map(function (d, i) {
      var p = d.p, isGone = d === unavailable, isFail = d === failed;
      var opts = "";
      if (p.variants && p.variants.length > 1) {
        opts = '<label class="visually-hidden" for="opt-' + i + '">' + esc(p.optionName || "Option") + "</label>" +
          '<select id="opt-' + i + '" data-line-opt="' + i + '">' + p.variants.map(function (v) {
            var gone = isGone && v.id === d.v.id;
            return '<option value="' + esc(v.id) + '"' + (v.id === d.v.id ? " selected" : "") + (gone ? " disabled" : "") + ">" + esc((p.optionName ? p.optionName + ": " : "") + v.label + (gone ? " — sold out" : "")) + "</option>";
          }).join("") + "</select>";
      } else if (d.v && d.v.label) {
        opts = "<span>" + esc(d.v.label) + "</span>";
      }
      var delivery = p.kind === "session" ? "Online · no shipping" : "Ships from Korea";
      return '<div class="cline' + (isGone ? " is-unavailable" : "") + '">' +
        A.photo(A.firstImage(p, d.v), p.brand + " " + p.title) +
        '<div class="cline__info">' +
          '<p class="cline__brand">' + esc(p.brand) + (FIELD[p.field] ? " · " + FIELD[p.field] : "") + "</p>" +
          '<h2 class="cline__title"><a href="product.html?p=' + esc(p.key) + '">' + esc(p.title) + "</a></h2>" +
          '<div class="cline__opt">' + opts + '<span aria-hidden="true">·</span><span>' + delivery + "</span></div>" +
          '<div class="cline__row">' +
            (isGone ? "" : '<div class="qty qty--sm" role="group" aria-label="Quantity for ' + esc(p.title) + '"><button type="button" data-line-q="' + i + '" data-d="-1" aria-label="Decrease">−</button><output aria-live="polite">' + d.l.qty + '</output><button type="button" data-line-q="' + i + '" data-d="1" aria-label="Increase">+</button></div>') +
            '<button type="button" class="cline__remove" data-line-rm="' + i + '">Remove</button>' +
          "</div>" +
        "</div>" +
        '<p class="cline__price">' + (isGone ? "—" : money(d.price * d.l.qty)) + (d.l.qty > 1 && !isGone ? "<small>" + money(d.price) + " each</small>" : "") + "</p>" +
        (isGone ? '<p class="status cline__alert" data-tone="error" role="alert"><b>' + esc(d.v.label) + " sold out since you added it.</b> Choose another " + esc((p.optionName || "option").toLowerCase()) + " above, or remove it. It is not included in your total.</p>" : "") +
        (isFail ? '<p class="status cline__alert" data-tone="error" role="alert"><b>We couldn’t update this quantity.</b> The store can’t add that many right now, so your cart keeps the last quantity that worked. Try a smaller quantity or <a href="mailto:' + EMAIL + '">ask us</a>.</p>' : "") +
      "</div>";
    }).join("");

    var shipNote = mkt.state === "tested"
      ? '<p class="fine">' + esc(mkt.note) + "</p>"
      : '<p class="status" data-tone="error" role="alert" data-note="Market list must come from Shopify Markets. Only Korea was seen in a staff checkout test.">' +
          "<b>Shipping to " + esc(mkt.name) + " isn’t confirmed yet.</b> " + (physical ? "We can’t promise delivery or duties for this country. " : "") +
          'You can keep your cart, <a href="mailto:' + EMAIL + "?subject=" + encodeURIComponent("Shipping to " + mkt.name) + '">ask us about shipping</a>, or choose another country.</p>';

    var canCheckout = mkt.state === "tested" && !unavailable;
    cartRoot.innerHTML =
      '<div class="jr__crumbs"><a href="shop.html">Shop</a><span aria-hidden="true">/</span><span>Cart</span></div>' +
      '<h1 class="jr__title">Your cart <em>(' + count + ")</em></h1>" +
      (added ? '<div style="margin-top:24px">' + added + "</div>" : "") +
      (s === "handoff" ? handoff(lines, subtotal, mkt) : "") +
      '<div class="sheet" style="margin-top:24px"><div class="cart">' +
        '<div class="cart__lines">' + linesHTML + "</div>" +
        '<aside class="summary" aria-label="Order summary">' +
          "<h2>Summary</h2>" +
          '<div class="shipto"><label for="shipto">Ship to</label><select id="shipto" data-shipto>' + MARKETS.map(function (m) {
            return '<option value="' + m.code + '"' + (m.code === mkt.code ? " selected" : "") + ">" + esc(m.name) + (m.state === "tested" ? "" : " — not yet confirmed") + "</option>";
          }).join("") + "</select></div>" +
          shipNote +
          "<dl>" +
            "<dt>Subtotal</dt><dd>" + money(subtotal) + "</dd>" +
            "<dt>Shipping</dt><dd>" + (physical ? "At checkout" : "None") + "</dd>" +
            "<dt>Taxes &amp; duties</dt><dd>At checkout</dd>" +
            '<dt class="t">Estimated total</dt><dd class="t">' + money(subtotal) + "</dd>" +
          "</dl>" +
          '<p class="fine">Prices in US dollars, read from the Shopify store. Your card issuer may convert the amount. The final total is shown at checkout before you pay.</p>' +
          (canCheckout
            ? '<a class="btn btn--primary" href="cart.html?s=handoff">' + ICON.lock.replace('aria-hidden="true"', 'aria-hidden="true" width="16" height="16"') + " Check out securely</a>"
            : '<button class="btn btn--primary" type="button" disabled>Check out securely</button><p class="fine" style="margin-top:-8px">' + (unavailable ? "Resolve the sold-out item to continue." : "Choose a confirmed country to continue.") + "</p>") +
          '<p class="fine">Payment methods are offered by Shopify Checkout and depend on your country and card.</p>' +
          '<div class="linkrow"><a href="help.html#shipping">Shipping</a><a href="help.html#returns">Returns</a><a href="help.html">Help</a></div>' +
        "</aside>" +
      "</div></div>" +
      '<section style="margin-top:56px"><p class="eyebrow">While you’re here</p><h2 class="h2" style="margin:0 0 16px">Stories behind <em>the objects</em></h2>' +
        '<div class="tabs"><a class="chip chip--studio" href="studio.html">Studio stories</a><a class="chip chip--shop" href="field.html?f=beauty">The Beauty field</a><a class="chip chip--community" href="community.html#market">Programs &amp; experiences</a><a class="chip chip--curators" href="curators.html">Curators</a></div></section>';

    // Behaviour
    var shipto = $("[data-shipto]", cartRoot);
    if (shipto) shipto.addEventListener("change", function () {
      location.href = A.url("cart.html", { s: shipto.value === "KR" ? "items" : "country", ship: shipto.value });
    });
    $all("[data-line-q]", cartRoot).forEach(function (b) {
      b.addEventListener("click", function () {
        var i = +b.getAttribute("data-line-q"), all = A.cart().slice();
        all[i].qty = Math.max(1, Math.min(10, all[i].qty + +b.getAttribute("data-d")));
        A.cartSet(all); renderCart("items", country);
      });
    });
    $all("[data-line-rm]", cartRoot).forEach(function (b) {
      b.addEventListener("click", function () {
        var all = A.cart().slice(); all.splice(+b.getAttribute("data-line-rm"), 1);
        A.cartSet(all); renderCart(all.length ? "items" : "empty", country);
      });
    });
    $all("[data-line-opt]", cartRoot).forEach(function (sel) {
      sel.addEventListener("change", function () {
        var all = A.cart().slice(); all[+sel.getAttribute("data-line-opt")].vid = sel.value;
        A.cartSet(all); renderCart("items", country);
      });
    });
    A.notes();
  }

  function handoff(lines, subtotal, mkt) {
    return '<section class="sheet" id="handoff" style="margin-top:24px;box-shadow:inset 0 0 0 2px var(--aurora-magenta)" aria-labelledby="ho-title" data-note="In the live theme the button goes straight to /checkout. This panel documents what the customer meets there; it is not an extra step.">' +
      '<div class="handoff">' +
        '<div class="state">' +
          '<span class="state__icon">' + ICON.lock + "</span>" +
          '<p class="kicker">Next · <b>Shopify Checkout</b></p>' +
          '<h2 class="state__title" id="ho-title">You’re going to secure checkout</h2>' +
          '<p class="state__body">Checkout is run by Shopify on auroracurate.com. Aurora never sees your full card details.</p>' +
          '<div class="state__actions">' +
            '<a class="btn btn--primary" href="order.html?s=confirmed">Simulate a completed order</a>' +
            '<a class="btn btn--secondary" href="order.html?s=failed">Simulate a declined payment</a>' +
          "</div>" +
          '<p class="fine">Prototype: these buttons open reference screens. No payment is taken.</p>' +
        "</div>" +
        '<ol class="handoff__list">' +
          "<li><span>1</span><div><b>Contact &amp; delivery</b>Email for receipts and access to programs, and a delivery address for physical items.</div></li>" +
          "<li><span>2</span><div><b>Shipping, taxes &amp; duties</b>Shopify shows the methods and amounts for " + esc(mkt.name) + " before you pay.</div></li>" +
          "<li><span>3</span><div><b>Payment</b>Methods offered by Shopify for your country and card.</div></li>" +
          "<li><span>4</span><div><b>Confirmation</b>An order page and email. Programs and digital items open with the same email in your Aurora account.</div></li>" +
        "</ol>" +
      "</div></section>";
  }

  /* ======================================================================
     ORDER STATUS (after purchase)
     ====================================================================== */
  var orderRoot = $('[data-render="order"]');
  if (orderRoot) {
    var os = A.param("s") || "confirmed";
    A.bar({
      states: [
        { id: "confirmed", label: "Order confirmed" }, { id: "shipped", label: "Shipped · tracking" },
        { id: "program", label: "Program purchased" }, { id: "session", label: "Session to schedule" },
        { id: "failed", label: "Payment declined" }, { id: "unsupported", label: "Can’t ship here" }
      ],
      current: os, system: "shopify",
      note: "Shopify’s Thank-you and Order status pages. Layout is Shopify’s; Aurora can add brand settings and, where the plan allows, extension blocks such as “Your access” and “Read the story”. Example data, no real order."
    });
    renderOrder(os);
    A.notes();
  }

  function orderItems(keys) {
    return keys.map(function (k) {
      var p = A.product(k[0]); if (!p) return "";
      var v = A.variantOf(p, k[1]);
      return '<div class="oitem">' + A.photo(A.firstImage(p, v), p.title) +
        "<div><b>" + esc(p.brand + " " + p.title) + "</b><span>" + esc((v && v.label) || "") + " × " + k[2] + "</span></div><strong>" + money((v ? v.price : 0) * k[2]) + "</strong></div>";
    }).join("");
  }

  function renderOrder(s) {
    var NAME = "Priyanka Venkataraman-Kim";
    var ADDR = "Priyanka Venkataraman-Kim<br>Apt 1203, Building 104<br>25 Olympic-ro 35-gil, Songpa-gu<br>Seoul 05510<br>Republic of Korea";
    var phys = [["ohui-geniture-lipstick", "50344064548967", 1], ["biblian-hair-mask", "50354044731495", 2]];
    var prog = [["k-career-entry-session", "44613302354023", 1]];
    var html = "";

    var side = function (items, extra) {
      return '<aside class="order__box" aria-label="Order summary"><h3>Order #1001 <span class="sim">Example</span></h3>' +
        '<div class="order__items">' + orderItems(items) + "</div>" +
        '<p>Totals, shipping and taxes as charged at checkout appear here.</p>' + (extra || "") + "</aside>";
    };
    var help = '<div class="order__box"><h3>Need help?</h3><p>Questions about this order, delivery or a return.</p><div class="linkrow"><a href="help.html#orders">Order help</a><a href="help.html#returns">Start a return</a><a href="mailto:' + EMAIL + '?subject=Order%20%231001">Email Aurora</a></div></div>';
    var next = '<div class="order__box" data-note="Optional extension block on the Thank-you page — only if the plan supports it. Otherwise put these links in the confirmation email."><h3>While you wait</h3><p>The story and field behind what you chose.</p><div class="linkrow"><a href="field.html?f=beauty">The Beauty field</a><a href="studio.html">Studio</a><a href="community.html#fields">Talk about it in the Lounge</a></div></div>';

    if (s === "confirmed" || s === "shipped") {
      var shipped = s === "shipped";
      html = '<div class="order"><div style="display:grid;gap:20px">' +
        '<div class="state state--ok"><span class="state__icon">' + (shipped ? ICON.truck : ICON.check) + "</span>" +
          '<p class="kicker">Order #1001 · <b>' + (shipped ? "On its way" : "Confirmed") + "</b></p>" +
          '<h1 class="state__title">' + (shipped ? "Your order is on its way" : "Thank you, " + esc(NAME.split(" ")[0])) + "</h1>" +
          '<p class="state__body">' + (shipped ? "Tracking updates come from the carrier. Delivery times depend on the destination and customs." : "We’ve emailed your confirmation. You’ll get another email when your order ships.") + "</p></div>" +
        '<ol class="steps-h" style="--n:4">' +
          '<li class="is-done"><b>Confirmed</b>Payment accepted</li>' +
          '<li class="' + (shipped ? "is-done" : "is-now") + '"><b>Preparing</b>Packed in Korea</li>' +
          '<li class="' + (shipped ? "is-now" : "") + '"><b>Shipped</b>' + (shipped ? "Tracking available" : "Tracking by email") + "</li>" +
          "<li><b>Delivered</b>Duties may apply on arrival</li>" +
        "</ol>" +
        (shipped ? '<div class="order__box"><h3>Tracking</h3><p>Carrier: <b>Example carrier</b> · Tracking number <b>EX 0000 0000 KR</b></p><div class="linkrow"><a href="#" aria-disabled="true">Track on the carrier’s site</a></div><p class="fine">Shopify shows the carrier link that fulfilment adds to the order.</p></div>' : "") +
        '<div class="order__box"><h3>Delivery address</h3><address class="addr">' + ADDR + "</address></div>" +
        help + next +
      "</div>" + side(phys) + "</div>";
    } else if (s === "program") {
      html = '<div class="order"><div style="display:grid;gap:20px">' +
        '<div class="state state--ok"><span class="state__icon">' + ICON.check + "</span>" +
          '<p class="kicker">Order #1001 · <b>Program access</b></p>' +
          '<h1 class="state__title">You’re in. Here’s how to start.</h1>' +
          '<p class="state__body">Programs open in your Aurora account. Sign in with the same email you used at checkout.</p>' +
          '<div class="state__actions"><a class="btn btn--primary" href="learn.html?s=home">Go to My learning</a><a class="btn btn--secondary" href="learn.html?s=signin">Sign in first</a></div></div>' +
        '<ol class="steps-h" style="--n:3" data-note="Purchase-to-access must be tested once in Tevello before launch: buy the product, confirm automatic enrolment, confirm the email.">' +
          '<li class="is-done"><span class="sys sys--native">Shopify</span><b>Paid</b>Receipt sent by email</li>' +
          '<li class="is-now"><span class="sys sys--tevello">Tevello</span><b>Access added</b>To the account with your checkout email</li>' +
          '<li><span class="sys sys--tevello">Tevello</span><b>Start</b>My learning → your program</li>' +
        "</ol>" +
        '<div class="why"><b>Don’t see it yet?</b><span>Access can take a few minutes. If you used a different email, <a href="learn.html?s=denied-email">follow these steps</a>.</span></div>' +
        help +
      "</div>" + side([["k-career-entry-session", "44613302354023", 1]]) + "</div>";
    } else if (s === "session") {
      html = '<div class="order"><div style="display:grid;gap:20px">' +
        '<div class="state state--ok"><span class="state__icon">' + ICON.check + "</span>" +
          '<p class="kicker">Order #1001 · <b>Paid · time not yet booked</b></p>' +
          '<h1 class="state__title">Next, choose your time</h1>' +
          '<p class="state__body">Asia Lab will email you to schedule your private 60-minute session and send the Korea Career Entry Guide™.</p></div>' +
        '<ol class="steps-h" style="--n:3" data-note="Scheduling tool and reply time are not decided. Do not promise a response time until operations confirm it.">' +
          '<li class="is-done"><b>Paid</b>Receipt by email</li>' +
          '<li class="is-now"><b>Schedule</b>Asia Lab emails you a time to choose</li>' +
          "<li><b>Meet online</b>Your session and next step</li>" +
        "</ol>" +
        '<div class="why"><b>Time zones</b><span>Sessions are scheduled in your time zone. Keep the email from Asia Lab — it holds your joining link.</span></div>' +
        help +
      "</div>" + side(prog) + "</div>";
    } else if (s === "failed") {
      html = '<div class="sheet"><div class="state state--stop"><span class="state__icon">' + ICON.alert + "</span>" +
        '<p class="kicker">Shopify Checkout · <b>Payment</b></p>' +
        '<h1 class="state__title">Your payment didn’t go through</h1>' +
        '<p class="state__body">No order was placed. Your cart is saved. Try another payment method, or check with your card issuer — international payments are sometimes declined by default.</p>' +
        '<div class="state__actions"><a class="btn btn--primary" href="cart.html?s=handoff">Try again</a><a class="btn btn--secondary" href="cart.html?s=items">Back to cart</a></div>' +
        '<p class="fine">In the live store this message appears inside Shopify Checkout, in Shopify’s words.</p></div></div>';
    } else if (s === "unsupported") {
      html = '<div class="sheet"><div class="state state--warn"><span class="state__icon">' + ICON.globe + "</span>" +
        '<p class="kicker">Shopify Checkout · <b>Delivery</b></p>' +
        '<h1 class="state__title">We can’t ship to this address yet</h1>' +
        '<p class="state__body">This country isn’t in Aurora’s shipping list. Nothing has been charged. Online programs don’t need shipping; whether they can be bought from your country is shown at checkout.</p>' +
        '<div class="state__actions"><a class="btn btn--primary" href="community.html#market">See online programs</a><a class="btn btn--secondary" href="mailto:' + EMAIL + '?subject=Shipping%20request">Ask about shipping</a></div>' +
        '<p class="fine">The exact country list comes from Shopify Markets and must be confirmed before launch.</p></div></div>';
    }
    orderRoot.innerHTML = /class="sheet"/.test(html.slice(0, 40)) ? html : '<div class="sheet">' + html + "</div>";
  }

  /* ======================================================================
     COLLECTION (editorial collections + filters)
     ====================================================================== */
  var collRoot = $('[data-render="collection"]');
  if (collRoot) renderCollection();

  function renderCollection() {
    var COLLS = [
      { id: "ready", title: "Ready now", line: "Everything you can buy today, read live from the Shopify store.", source: "live" },
      { id: "ranking", title: "Ranking", note: "Editorial selection", line: "Aurora editors’ selection. Not a sales ranking.", source: "shelf" },
      { id: "curators-recommendation", title: "Curator’s Recommendation", line: "Shown only where a curator’s recommendation is documented.", source: "shelf" },
      { id: "curation", title: "Curation", line: "Edits built around a theme or a field.", source: "shelf" },
      { id: "experience", title: "Aurora Experience", line: "Experiences shaped by Aurora.", source: "shelf" },
      { id: "collaboration", title: "Collaboration", line: "Objects made with partners.", source: "shelf" }
    ];
    var cid = A.param("c") || "ready";
    var coll = COLLS.filter(function (c) { return c.id === cid; })[0] || COLLS[0];
    var state = { field: A.param("field"), kind: A.param("kind"), avail: A.param("avail") };

    var items;
    if (coll.source === "live") {
      items = P.map(function (p) {
        return { live: true, p: p, field: p.field, kind: p.kind === "session" ? "program" : "object", avail: p.status === "ready" ? "open" : "soon" };
      });
    } else {
      var shelf = (C.shelves || []).filter(function (x) { return x.id === coll.id; })[0];
      items = (shelf ? shelf.products : []).map(function (x) { return { live: false, x: x, field: "", kind: "object", avail: "sample" }; });
    }
    var fieldsPresent = [];
    items.forEach(function (it) { if (it.field && fieldsPresent.indexOf(it.field) < 0) fieldsPresent.push(it.field); });

    function matches(it) {
      return (!state.field || it.field === state.field) && (!state.kind || it.kind === state.kind) && (!state.avail || it.avail === state.avail);
    }
    function chip(group, val, label) {
      return '<button type="button" class="tab" data-f="' + group + '" data-v="' + val + '" aria-pressed="' + (state[group] === val) + '">' + esc(label) + "</button>";
    }
    function draw() {
      var shown = items.filter(matches);
      var applied = [];
      if (state.field) applied.push(["field", "Field: " + (FIELD[state.field] || state.field)]);
      if (state.kind) applied.push(["kind", state.kind === "program" ? "Programs" : "Objects"]);
      if (state.avail) applied.push(["avail", state.avail === "open" ? "Available now" : "Not yet open"]);

      var cards = shown.map(function (it) {
        if (it.live) {
          var p = it.p, soon = p.status !== "ready";
          return '<a class="pcard" href="product.html?p=' + esc(p.key) + '">' + A.photo(A.firstImage(p), p.brand + " " + p.title) +
            '<div class="pcard__body"><p class="pcard__brand">' + esc(p.brand) + (FIELD[p.field] ? " · <span>" + FIELD[p.field] + "</span>" : "") + '</p><h3 class="pcard__title">' + esc(p.title) + "</h3>" +
            '<div class="pcard__row"><span class="pcard__price">' + money(p.matrix ? p.matrix.price : p.variants[0].price) + (p.variants && p.variants.length > 1 ? "+" : "") + '</span><span class="pcard__state' + (soon ? " is-soon" : "") + '">' + (soon ? "Not yet open" : "View") + "</span></div></div></a>";
        }
        var x = it.x;
        return '<article class="pcard">' + A.photo(x.image && x.image.src, x.title) +
          '<div class="pcard__body"><p class="pcard__brand">' + esc(x.vendor) + '</p><h3 class="pcard__title">' + esc(x.title) + "</h3>" +
          '<div class="pcard__row"><span class="pill pill--sample">Design sample</span><span class="pcard__state is-soon">Not for sale</span></div></div></article>';
      }).join("");

      collRoot.innerHTML =
        '<div class="jr__crumbs"><a href="shop.html">Shop</a><span aria-hidden="true">/</span><span>' + esc(coll.title) + "</span></div>" +
        '<div class="coll-head"><div><p class="eyebrow">Shop · Collection</p><h1 class="jr__title">' + esc(coll.title) + (coll.note ? " <em>· " + esc(coll.note) + "</em>" : "") + '</h1><p class="jr__lede">' + esc(coll.line) + "</p></div>" +
          '<p class="note" style="margin:0">' + (coll.source === "live" ? "Live catalogue: prices and options come from Shopify." : "Editorial collection. Items are design samples until a product is approved and linked.") + "</p></div>" +
        '<nav class="coll-tabs" aria-label="Collections">' + COLLS.map(function (c) {
          return '<a class="tab" href="collection.html?c=' + c.id + '"' + (c.id === coll.id ? ' aria-current="page" style="background:var(--starlight-mist);color:var(--cosmic-midnight);border-color:var(--starlight-mist)"' : "") + ">" + esc(c.title) + "</a>";
        }).join("") + "</nav>" +
        '<div class="filters" role="group" aria-label="Filters">' +
          (fieldsPresent.length ? '<div class="filters__row"><span>Field</span>' + fieldsPresent.map(function (f) { return chip("field", f, FIELD[f]); }).join("") + chip("field", "taste", "Taste") + "</div>" : "") +
          (coll.source === "live" ? '<div class="filters__row"><span>Type</span>' + chip("kind", "object", "Objects") + chip("kind", "program", "Programs") + "</div>" +
            '<div class="filters__row"><span>Availability</span>' + chip("avail", "open", "Available now") + chip("avail", "soon", "Not yet open") + "</div>" : '<div class="filters__row"><span>Filters</span><small style="color:var(--stage-text-3)">Field and availability filters appear when approved products are linked to this collection.</small></div>') +
        "</div>" +
        '<div class="applied" aria-live="polite"><span>' + shown.length + " of " + items.length + " shown</span>" +
          applied.map(function (a) { return '<button type="button" data-rm="' + a[0] + '" aria-label="Remove filter ' + esc(a[1]) + '">' + esc(a[1]) + ' <span aria-hidden="true">×</span></button>'; }).join("") +
          (applied.length ? '<button type="button" class="clear" data-clear>Clear all</button>' : "") +
        "</div>" +
        (shown.length ? '<div class="pgrid" style="margin-top:16px">' + cards + "</div>" :
          '<div class="empty" style="margin-top:16px"><div class="aurora-field aurora-field--soft"></div><span class="empty__icon"><span class="aurora-star" aria-hidden="true"></span></span>' +
            '<h2 class="empty__title">Nothing here with these filters yet</h2>' +
            '<p class="empty__body">' + (state.field ? "There are no " + esc(FIELD[state.field] || "") + " items in this collection yet. The " + esc(FIELD[state.field] || "") + " field still has stories and a concept to explore." : "Try removing a filter.") + "</p>" +
            '<div class="state__actions"><button type="button" class="btn btn--mist" data-clear>Clear filters</button>' + (state.field ? '<a class="btn btn--secondary" href="field.html?f=' + esc(state.field) + '">Open the ' + esc(FIELD[state.field] || "") + " field</a>" : "") + "</div></div>");

      $all("[data-f]", collRoot).forEach(function (b) {
        b.addEventListener("click", function () {
          var g = b.getAttribute("data-f"), v = b.getAttribute("data-v");
          state[g] = state[g] === v ? "" : v; sync();
        });
      });
      $all("[data-rm]", collRoot).forEach(function (b) { b.addEventListener("click", function () { state[b.getAttribute("data-rm")] = ""; sync(); }); });
      $all("[data-clear]", collRoot).forEach(function (b) { b.addEventListener("click", function () { state = { field: "", kind: "", avail: "" }; sync(); }); });
      A.notes();
    }
    function sync() {
      history.replaceState(null, "", A.url("collection.html", { c: coll.id, field: state.field, kind: state.kind, avail: state.avail }));
      draw();
      var a = $(".applied", collRoot); if (a) a.focus && a.setAttribute("tabindex", "-1");
    }
    draw();
  }

  /* help.html is static; only review notes */
  if ($('[data-render="help"]')) {
    A.bar({ states: [], current: "", system: "theme", note: "Help hub in the Aurora theme. Policy sections are templates for approved text — they are not policies." });
    A.notes();
  }
})();
