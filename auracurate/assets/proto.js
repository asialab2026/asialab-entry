/* ==========================================================================
   AURORA — Prototype layer (shared by journey pages)
   - Helpers, field names, money formatting
   - Prototype state bar: shows which state is simulated and which system owns
     the real screen (Aurora theme · Shopify native · Tevello · intake)
   - Simulated cart stored in this browser only (never a real order)
   - ?review=1 shows review notes ([data-note]) for the founder / Codex review
   ========================================================================== */
(function () {
  "use strict";

  var STORE = window.AURORA_STORE || { origin: "https://auroracurate.com", currency: "USD" };
  var FIELD = {
    entertainment: "Entertainment", icons: "Icons", beauty: "Beauty", fashion: "Fashion", hustle: "Hustle",
    taste: "Taste", lifestyle: "Lifestyle", travel: "Travel", wellness: "Wellness"
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function param(name) {
    var m = location.search.match(new RegExp("[?&]" + name + "=([^&#]*)"));
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }
  function money(n) {
    if (n == null || isNaN(n)) return "";
    try { return new Intl.NumberFormat("en-US", { style: "currency", currency: STORE.currency || "USD" }).format(n); }
    catch (e) { return "$" + Number(n).toFixed(2); }
  }
  function url(page, params) {
    var q = Object.keys(params || {}).filter(function (k) { return params[k] !== "" && params[k] != null; })
      .map(function (k) { return k + "=" + encodeURIComponent(params[k]); }).join("&");
    return page + (q ? "?" + q : "");
  }

  /* ---- Systems that own the real screen --------------------------------- */
  var SYSTEMS = {
    theme:   { label: "Aurora theme", tone: "theme",   text: "Built in the Aurora Shopify theme. This design is the build target." },
    shopify: { label: "Shopify native · reference", tone: "native", text: "Shopify hosts this screen. Layout and wording here are a reference; branding is set in Shopify’s checkout and account settings, and any extra blocks need extensions available on the store’s plan. Verify before promising." },
    tevello: { label: "Tevello member app · reference", tone: "tevello", text: "Tevello renders the member area. This is a design proposal; confirm each capability in Tevello, and keep theme colours out of the app unless its settings allow them." },
    intake:  { label: "Intake · simulated", tone: "intake", text: "The intake endpoint is not connected yet. Results shown here are simulated so the team can approve the wording." },
    email:   { label: "Email · reference", tone: "native", text: "Sent by Shopify notifications or the intake tool. Wording needs approval." }
  };

  /* State bar: { states:[{id,label}], current, system, note, base:{params} } */
  function bar(cfg) {
    var root = $("[data-proto-bar]");
    if (!root) return;
    var sys = SYSTEMS[cfg.system] || SYSTEMS.theme;
    var base = cfg.page || location.pathname.split("/").pop() || "index.html";
    var keep = cfg.keep || {};
    var review = /[?&]review=1\b/.test(location.search);
    root.innerHTML =
      '<div class="container pt">' +
        '<div class="pt__head">' +
          '<span class="pt__tag">Prototype</span>' +
          '<span class="pt__sys pt__sys--' + sys.tone + '">' + esc(sys.label) + "</span>" +
          '<p class="pt__text">' + esc(cfg.note || sys.text) + "</p>" +
          '<a class="pt__review" href="' + esc(url(base, Object.assign({}, keep, { s: cfg.current, review: review ? "" : "1" }))) + '">' + (review ? "Hide review notes" : "Show review notes") + "</a>" +
        "</div>" +
        (cfg.states && cfg.states.length > 1 ?
          '<nav class="pt__states" aria-label="Simulated states">' + cfg.states.map(function (s) {
            var on = s.id === cfg.current;
            return '<a href="' + esc(url(base, Object.assign({}, keep, { s: s.id, review: review ? "1" : "" }))) + '"' + (on ? ' aria-current="true"' : "") + ">" + esc(s.label) + "</a>";
          }).join("") + "</nav>" : "") +
      "</div>";
  }

  /* ---- Review notes ----------------------------------------------------- */
  if (/[?&]review=1\b/.test(location.search)) document.documentElement.setAttribute("data-review", "true");
  function notes() {
    if (!document.documentElement.hasAttribute("data-review")) return;
    $all("[data-note]").forEach(function (el, i) {
      if (el.querySelector(":scope > .rnote")) return;
      var n = document.createElement("span");
      n.className = "rnote";
      n.setAttribute("role", "note");
      n.innerHTML = "<b>Review " + (i + 1) + "</b> " + esc(el.getAttribute("data-note"));
      el.appendChild(n);
    });
  }

  /* ---- Simulated cart (this browser only) ------------------------------- */
  var KEY = "aurora.proto.cart";
  function cartGet() {
    try { var v = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(v) ? v : []; }
    catch (e) { return []; }
  }
  function cartSet(lines) {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch (e) { /* storage blocked: cart lives for this page only */ }
    cartMem = lines;
  }
  var cartMem = null;
  function cart() { return cartMem || (cartMem = cartGet()); }
  function cartAdd(key, vid, qty) {
    var lines = cart().slice();
    var hit = lines.filter(function (l) { return l.key === key && l.vid === vid; })[0];
    if (hit) hit.qty = Math.min(10, hit.qty + qty); else lines.push({ key: key, vid: vid, qty: qty });
    cartSet(lines);
    return lines;
  }
  function product(key) { return (window.AURORA_PRODUCTS || []).filter(function (p) { return p.key === key; })[0]; }
  function variantOf(p, vid) {
    if (!p) return null;
    if (p.matrix) {
      for (var k in p.matrix.ids) if (p.matrix.ids[k] === vid) return { id: vid, label: k.replace("/", " · "), price: p.matrix.price };
      return null;
    }
    return (p.variants || []).filter(function (v) { return v.id === vid; })[0] || p.variants[0];
  }
  function firstImage(p, v) {
    return (v && v.image) || (p.variants && p.variants[0] && p.variants[0].image) || (p.images && p.images[0]) || p.fallbackImage || "";
  }

  /* Product photo frame with honest fallback (same as shop.js). */
  function photo(src, alt, cls) {
    if (!src) return '<div class="pmedia is-missing' + (cls ? " " + cls : "") + '"><span>' + esc(alt) + "</span></div>";
    return '<div class="pmedia' + (cls ? " " + cls : "") + '"><img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async"></div>';
  }
  document.addEventListener("error", function (e) {
    var img = e.target, box = img && img.parentNode;
    if (!img || img.tagName !== "IMG" || !box || !box.classList || !box.classList.contains("pmedia") || box.classList.contains("is-missing")) return;
    var label = document.createElement("span");
    label.textContent = img.alt;
    box.classList.add("is-missing");
    box.replaceChild(label, img);
  }, true);

  // Pages render their own content first; show notes once everything is parsed.
  document.addEventListener("DOMContentLoaded", notes);

  window.AURORA_PROTO = {
    esc: esc, $: $, $all: $all, param: param, money: money, url: url, FIELD: FIELD, STORE: STORE,
    bar: bar, notes: notes, SYSTEMS: SYSTEMS,
    cart: cart, cartSet: cartSet, cartAdd: cartAdd, product: product, variantOf: variantOf, firstImage: firstImage, photo: photo
  };
})();
