/* ==========================================================================
   AURORA — Curator profile variants (J03)
   curator.html            Rashmika Mandanna (static: rich Studio, no products)
   curator.html?c=nmixx    NMIXX (external content only: no products, no
                           community relation) — proves the template stays
                           honest and complete with a different data set.
   Runs before aurora.js so the tabs are bound by the shared tab script.
   ========================================================================== */
(function () {
  "use strict";
  var A = window.AURORA_PROTO;
  var esc = A ? A.esc : function (s) { return String(s); };
  var c = A ? A.param("c") : "";
  if (c !== "nmixx") return;

  var root = document.querySelector(".profile");
  if (!root) return;
  document.title = "NMIXX — Aurora Curator";
  var empty = function (title, body, href, label) {
    return '<div class="empty" style="background:#fff;border-color:#DCD9EA;color:var(--cosmic-midnight)">' +
      '<span class="empty__icon" style="color:var(--aurora-magenta);filter:none"><span class="aurora-star" aria-hidden="true"></span></span>' +
      '<h3 class="empty__title">' + title + '</h3><p class="empty__body" style="color:var(--read-text-2)">' + body + "</p>" +
      '<a class="link-arrow" href="' + href + '" style="color:var(--cosmic-midnight)">' + label + "</a></div>";
  };
  var story = function (img, alt, focal, label, title, src) {
    return '<article class="story"><div class="story__img"><img src="' + img + '" alt="' + esc(alt) + '" loading="lazy" style="--focal:' + focal + '"></div>' +
      '<div class="story__body"><p class="story__label">' + label + '</p><h3 class="story__title">' + title + "</h3>" + (src ? '<span class="sample">' + src + "</span>" : "") + "</div></article>";
  };

  root.innerHTML =
    '<aside class="profile__side" aria-label="Curator navigation">' +
      '<ul class="profile__menu">' +
        '<li><a href="#p-studio" aria-current="true"><span class="aurora-star" aria-hidden="true"></span>Recent</a></li>' +
        '<li><a href="curators.html"><span class="aurora-star" aria-hidden="true"></span>Find Curators</a></li>' +
        '<li><a href="collection.html?c=curators-recommendation"><span class="aurora-star" aria-hidden="true"></span>Shop by Curator</a></li>' +
      "</ul>" +
      '<div class="profile__more"><h3>More Curators</h3>' +
        '<a class="mini" href="curator.html"><img src="assets/img/people/rashmika-portrait.jpg" alt=""><span><b>Rashmika Mandanna</b><span>India</span></span></a>' +
        '<a class="mini" href="curators.html#people"><img src="assets/img/people/mike-angelo.jpg" alt=""><span><b>Mike Angelo</b><span>Thailand</span></span></a>' +
        '<a class="mini" href="curators.html#people"><img src="assets/img/people/mackenyu.jpg" alt=""><span><b>Mackenyu</b><span>Japan</span></span></a>' +
      "</div>" +
    "</aside>" +
    '<div class="profile__main">' +
      '<div class="profile__banner profile__banner--hero"><div class="aurora-field"></div></div>' +
      '<div class="profile__head profile__head--hero">' +
        '<img class="profile__avatar" src="assets/img/curators/nmixx-avatar.png" alt="NMIXX" width="180" height="180">' +
        '<span class="profile__badge">K-Pop</span>' +
        '<h1 class="profile__name" id="rm-title">NMIXX</h1>' +
        '<p class="profile__bio">A JYP Entertainment girl group known for “MIXX POP” — switching genres inside a single song. Featured here for how they bring K-pop performance to a global audience.</p>' +
        '<a class="btn btn--outline-magenta" href="work-with-aurora.html?about=NMIXX#curators">Start Collaboration</a>' +
        '<p class="profile__route">Proposals are received by the Aurora team, not sent to NMIXX or their agency directly.</p>' +
      "</div>" +
      '<div class="profile__tabs" role="tablist" aria-label="NMIXX on Aurora">' +
        '<button type="button" role="tab" id="t-studio" aria-controls="p-studio" aria-selected="true">Studio</button>' +
        '<button type="button" role="tab" id="t-shop" aria-controls="p-shop" aria-selected="false" tabindex="-1">Shop</button>' +
        '<button type="button" role="tab" id="t-community" aria-controls="p-community" aria-selected="false" tabindex="-1">Community</button>' +
      "</div>" +
      '<div class="profile__panel" role="tabpanel" id="p-studio" aria-labelledby="t-studio">' +
        '<div class="stories">' +
          story("assets/img/curators/nmixx-dice.jpg", "NMIXX member in the DICE music video", "60% 40%", "Music video", "NMIXX “DICE” M/V", "External · JYP") +
          story("assets/img/curators/nmixx-billboard.jpg", "NMIXX on Billboard's Fishing for Answers", "50% 40%", "Interview", "Fishing for Answers with Billboard", "External · Billboard") +
          story("assets/img/curators/nmixx-guess.jpg", "NMIXX in denim for GUESS", "50% 30%", "Brand campaign", "GUESS × NMIXX", "External · not an Aurora collaboration") +
        "</div>" +
      "</div>" +
      '<div class="profile__panel" role="tabpanel" id="p-shop" aria-labelledby="t-shop" hidden>' +
        empty("No NMIXX objects on Aurora", "Aurora sells an object with a person only after a collaboration is agreed. Until then this tab stays honest — and points to Aurora’s own picks.", "collection.html?c=curators-recommendation", "Browse Curator’s Recommendation") +
      "</div>" +
      '<div class="profile__panel" role="tabpanel" id="p-community" aria-labelledby="t-community" hidden>' +
        empty("Talk about K-pop performance", "There’s no NMIXX space on Aurora. Share what you’re watching in the Entertainment topic of Aurora Lounge.", "offer.html?o=aurora-lounge", "Open Aurora Lounge") +
      "</div>" +
    "</div>";

  var note = root.parentNode && root.parentNode.querySelector(".note");
  if (note) note.textContent = "Second data set for the same template: external content only, no products and no community space. Featuring a person does not establish a Curator appointment, a recommendation or a collaboration.";
})();
