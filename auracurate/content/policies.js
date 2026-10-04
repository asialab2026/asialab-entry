/* Aurora policy base set (v1.0, 2026-10-04) — draft for founder and US counsel review.
   One text, many entities: every policy says "the Aurora entity named as seller in your order",
   and the entity list lives in AURORA_CONTENT.brand.legal.entities. Adding a Korean, Indian or
   Singapore entity is a data change, not a rewrite.
   Per-item terms (ships from, return window, final sale) live on each product page and override
   the defaults here — this is how dropshipped goods from many cities stay accurate.
   Shopify: paste each body into Settings → Policies (export: docs/policies/*.html). */
(function () {
  var C = window.AURORA_CONTENT || {};
  var L = (C.brand && C.brand.legal) || {};
  var E = L.entities || [];
  var OP = E[0] || { name: "[Operator]", address: "[Address]" };
  var MAIL = L.email || "contact@auroracurate.com";
  var UPDATED = "October 4, 2026";
  var m = '<a href="mailto:' + MAIL + '">' + MAIL + "</a>";
  var phone = L.phone ? " or call " + L.phone : "";

  var WHO = "<p>Aurora is a brand created by Asia Lab. Aurora is operated by " + OP.name + " (" + (OP.form || "") + ") and, as Aurora grows, by other Aurora entities in different countries (together, the <b>Aurora entities</b>). " +
    "In these policies, <b>“Aurora”, “we”, “us”</b> and <b>“our”</b> mean the Aurora entity that sells to you. That entity is named as the seller in your checkout and order confirmation. " +
    "If no other entity is named, the seller is " + OP.name + ". The current list is on our <a href=\"/pages/aurora-entities\">Aurora entities</a> page.</p>";

  var CONSUMER = "<p>Nothing in this policy limits rights you have under the consumer laws of the country where you live that can’t be waived by agreement. Where those laws give you more, they apply.</p>";

  window.AURORA_POLICIES = {
    updated: UPDATED,
    order: ["terms", "refund", "shipping", "subscription", "contact", "entities"],

    terms: { title: "Terms of Service", shopify: "/policies/terms-of-service", body:
      "<p>Last updated: " + UPDATED + "</p>" +
      "<h2>1. Who we are</h2>" + WHO +
      "<p>These Terms apply to auroracurate.com, the Aurora community and learning spaces, and everything you buy from Aurora (the <b>Services</b>). By using the Services or placing an order you agree to them.</p>" +
      "<h2>2. Who sells to you</h2>" +
      "<p>Each order is a contract between you and the Aurora entity named as seller for that order. Different Aurora entities may sell in different countries, and some items are made, stored or shipped by our brand and fulfilment partners. Aurora remains responsible to you for the order. We may move an order to another Aurora entity where needed to serve your country (for example for tax, customs or local delivery); this does not change your rights under the order.</p>" +
      "<h2>3. Your account</h2>" +
      "<p>You must be old enough to enter a binding contract where you live. Keep your sign-in details safe; you are responsible for activity on your account. Programs and community access are tied to the email address used at checkout.</p>" +
      "<h2>4. Orders, prices and availability</h2>" +
      "<p>Prices, taxes, duties and delivery costs are shown at checkout before you pay. An order is accepted when we send the order confirmation. We may decline or cancel an order — for example if an item is unavailable, a price is clearly wrong, or we can’t deliver to your address — and we will refund anything you paid. Product images and descriptions come from Aurora and our brand partners; small differences in colour or packaging can occur.</p>" +
      "<h2>5. Item-specific terms</h2>" +
      "<p>Where an item ships from, its delivery estimate, its return window and whether it is final sale are shown on its product page. Those item terms form part of your order and take priority over the general defaults in our Refund and Shipping policies.</p>" +
      "<h2>6. Programs, sessions, digital items and experiences</h2>" +
      "<p>Courses, cohorts, workshops, one-to-one sessions, digital items, memberships and experiences are delivered online or by the partner named on the page. Access, schedule, refund terms and any limits are shown on the program page before you buy. Program access is personal to you and may not be shared or resold.</p>" +
      "<h2>7. Memberships and automatic renewal</h2>" +
      "<p>Memberships renew automatically until cancelled. The price, billing period and first charge date are shown before you agree. You can cancel online at any time. See our <a href=\"/policies/subscription-policy\">Subscription policy</a>.</p>" +
      "<h2>8. Community rules and your content</h2>" +
      "<p>Be respectful, honest and lawful. Don’t harass others, post what you don’t have rights to, or use the community to sell without permission. We may remove content or suspend access that breaks these rules. You keep ownership of what you post; you give Aurora a worldwide, non-exclusive, royalty-free licence to host, display and share it within the Services and to promote the community, with credit where practical. You can delete your posts at any time, subject to copies kept for legal reasons.</p>" +
      "<h2>9. Applications and collaborations</h2>" +
      "<p>Submitting an application or proposal does not create a partnership, employment or obligation to publish. Any collaboration is governed by a separate written agreement.</p>" +
      "<h2>10. Aurora content and marks</h2>" +
      "<p>Aurora, Aurora 100, Global Faces 100, our editorial content, photography and design belong to Aurora, Asia Lab or their licensors. You may share links and short quotes with credit; other uses need our written permission.</p>" +
      "<h2>11. Recommendations and partnerships</h2>" +
      "<p>Some content features products from brands we work with. Where a person or Aurora has a material connection to a product — payment, a free product or a commission — we say so near the recommendation.</p>" +
      "<h2>12. Third-party services</h2>" +
      "<p>Checkout is provided by Shopify, learning and community spaces may be hosted by third-party apps, and payments are processed by payment providers. Their terms also apply to your use of their services.</p>" +
      "<h2>13. Disclaimers and liability</h2>" +
      "<p>To the extent permitted by law, the Services are provided “as is”. Programs and content are for learning and inspiration and do not guarantee any career, business or personal result. To the extent permitted by law, our total liability for any claim relating to an order is limited to the amount you paid for that order, and we are not liable for indirect or consequential losses. Nothing here excludes liability that can’t be excluded by law.</p>" +
      "<h2>14. Governing law and disputes</h2>" +
      "<p>Contact us first — most issues are solved quickly by email. These Terms are governed by the laws of the place where the Aurora entity that sells to you is established (for " + OP.name + ", the State of Delaware, USA), without regard to conflict-of-law rules. If you are a consumer, you also keep the protection of the mandatory laws of, and may bring claims in the courts of, the country where you live.</p>" +
      "<h2>15. Changes</h2>" +
      "<p>We may update these Terms as Aurora grows, including when new Aurora entities or markets are added. The version in force when you place an order applies to that order.</p>" +
      "<h2>16. Contact</h2><p>Email " + m + phone + ". Postal address: " + OP.name + ", " + OP.address + ".</p>" },

    refund: { title: "Refund Policy", shopify: "/policies/refund-policy", body:
      "<p>Last updated: " + UPDATED + "</p>" + WHO +
      "<h2>Item terms come first</h2>" +
      "<p>Aurora items ship from different cities and partners. Each product page shows that item’s <b>return window</b>, whether it is <b>final sale</b>, and where it <b>ships from</b>. If a product page says something different from this policy, the product page applies.</p>" +
      "<h2>Physical items — default terms</h2>" +
      "<ul><li><b>Return window:</b> " + ((L.returnsDefault && L.returnsDefault.window) || 14) + " days from delivery, unless the product page says otherwise.</li>" +
      "<li><b>Condition:</b> unused, unopened and in original packaging.</li>" +
      "<li><b>Can’t be returned:</b> opened beauty and personal-care items, items marked final sale, made-to-order or personalised items (Made for You), and gift cards — unless they arrive damaged, faulty or not as described.</li></ul>" +
      "<h2>How to start a return</h2>" +
      "<ol><li>Email " + m + " with your order number and the item.</li>" +
      "<li>We reply with a return authorisation and the <b>return address for that item</b>. Because items ship from different locations, please don’t send anything back before you receive it.</li>" +
      "<li>Send the item with tracking. Keep your receipt until the refund arrives.</li></ol>" +
      "<h2>Return shipping costs</h2>" +
      "<p>If the item is damaged, faulty, not as described or the wrong item, we pay for the return or replace it — no return needed for low-value items. For other returns, you pay return shipping unless the product page says otherwise.</p>" +
      "<h2>Damaged, faulty or wrong items</h2>" +
      "<p>Tell us within 7 days of delivery with photos of the item and packaging. We will replace, refund or arrange a return at our cost.</p>" +
      "<h2>Refunds</h2>" +
      "<p>We refund to your original payment method within 10 business days after we receive and check the return, or after we approve a damaged-item claim. Your bank may take longer to show it. Original shipping is refunded when the return is due to our error. Duties and import taxes are refunded where we can recover them or where the law requires.</p>" +
      "<h2>Programs, sessions, digital items and memberships</h2>" +
      "<p>Each program page states its refund terms before you buy. Unless that page says otherwise:</p>" +
      "<ul><li><b>Cohorts and workshops:</b> full refund if you cancel at least 7 days before the start; after that, we can move you to a later date where one exists.</li>" +
      "<li><b>One-to-one sessions:</b> full refund before you book a time; rescheduling or cancelling a booked time is free up to 24 hours before.</li>" +
      "<li><b>Self-paced courses and digital items:</b> refundable within 7 days of purchase if you haven’t opened the content or downloaded the file.</li>" +
      "<li><b>Memberships:</b> cancel any time; access continues to the end of the paid period. See our <a href=\"/policies/subscription-policy\">Subscription policy</a>.</li>" +
      "<li><b>Experiences and events:</b> as stated on the page, including the partner’s cancellation terms.</li></ul>" +
      "<h2>Exchanges</h2><p>To change a size or shade, return the item and place a new order — it’s the fastest way to get the item you want.</p>" +
      CONSUMER +
      "<h2>Contact</h2><p>" + m + phone + "</p>" },

    shipping: { title: "Shipping Policy", shopify: "/policies/shipping-policy", body:
      "<p>Last updated: " + UPDATED + "</p>" + WHO +
      "<h2>Where items ship from</h2>" +
      "<p>Aurora works with brands and fulfilment partners in different countries. Each product page shows where the item ships from. Items in one order may arrive in separate packages.</p>" +
      "<h2>Where we deliver</h2>" +
      "<p>The countries we deliver to are the ones you can select at checkout. If your address isn’t available, we can’t ship there yet.</p>" +
      "<h2>Processing and delivery times</h2>" +
      "<p>Orders are usually prepared within 1–5 business days. The delivery estimate for your address is shown at checkout and on the product page. Estimates are not guarantees; customs checks and carrier delays can add time. Made-to-order items show their own timeline.</p>" +
      "<h2>Shipping costs</h2><p>Shown at checkout before you pay.</p>" +
      "<h2>Duties and import taxes</h2>" +
      "<p>If checkout shows duties and taxes as <b>included</b>, we pay them and there is nothing more to pay on delivery. If checkout says they are <b>not included</b>, the carrier or customs may charge you on delivery, and refusing to pay may mean the parcel is returned. Since August 29, 2025, United States import duties apply to all parcels regardless of value.</p>" +
      "<h2>Tracking</h2><p>You get a tracking link by email when each package ships. You can also see your order status in your account.</p>" +
      "<h2>Address problems, lost or damaged parcels</h2>" +
      "<p>Check your address at checkout — we can update it only before the order ships. If a parcel is marked delivered but you can’t find it, or arrives damaged, email us within 7 days and we’ll work with the carrier to resolve it.</p>" +
      "<h2>Programs and digital items</h2><p>Delivered online — no shipping. Access details are sent to your checkout email.</p>" +
      "<h2>Contact</h2><p>" + m + phone + "</p>" },

    subscription: { title: "Subscription Policy", shopify: "/policies/subscription-policy", body:
      "<p>Last updated: " + UPDATED + "</p>" + WHO +
      "<h2>How memberships renew</h2>" +
      "<p>Aurora memberships renew automatically at the end of each billing period until you cancel. Before you subscribe we show the price, the billing period, when you’ll first be charged and what is included, and you agree to automatic renewal at checkout. Any free trial or introductory price, and the price after it ends, is shown before you start.</p>" +
      "<h2>Cancelling</h2>" +
      "<p>Cancel online at any time from your account, or by emailing " + m + ". Cancellation stops the next renewal; you keep access until the end of the period you’ve paid for. We don’t refund partial periods unless the law requires it or the membership page says otherwise.</p>" +
      "<h2>Reminders and changes</h2>" +
      "<p>We email you before renewals where required by law, including a yearly reminder for annual plans. If we change the price or what’s included, we tell you at least 30 days before it applies, and you can cancel before then.</p>" +
      "<h2>Failed payments</h2><p>If a renewal payment fails we’ll tell you and may pause access until it’s updated.</p>" +
      CONSUMER },

    contact: { title: "Contact Information", shopify: "/policies/contact-information", body:
      "<p><b>Trade name:</b> Aurora</p>" +
      "<p><b>Operated by:</b> " + OP.name + (OP.form ? " (" + OP.form + ")" : "") + "</p>" +
      "<p><b>Address:</b> " + OP.address + "</p>" +
      "<p><b>Email:</b> " + m + "</p>" +
      (L.phone ? "<p><b>Phone:</b> " + L.phone + "</p>" : "") +
      "<p>Orders may be sold by another Aurora entity for your country; the seller is named in your order confirmation. See <a href=\"/pages/aurora-entities\">Aurora entities</a>.</p>" },

    entities: { title: "Aurora Entities", shopify: "/pages/aurora-entities", body:
      "<p>Last updated: " + UPDATED + "</p>" +
      "<p>Aurora is a brand created by Asia Lab and operated by the entities below. The entity that sells to you is named at checkout and in your order confirmation. We update this page when an entity is added.</p>" +
      "<table><thead><tr><th>Entity</th><th>Type · Country</th><th>Role</th><th>Markets</th></tr></thead><tbody>" +
      E.map(function (e) {
        return "<tr><td><b>" + e.name + "</b><br>" + (e.address || "") + (e.registration ? "<br>Reg. " + e.registration : "") + "</td><td>" + (e.form || "") + " · " + (e.country || "") + "</td><td>" + (e.role || "") + "</td><td>" + (e.markets || "") + "</td></tr>";
      }).join("") + "</tbody></table>" +
      "<p>Contact for all entities: " + m + "</p>" }
  };
})();
