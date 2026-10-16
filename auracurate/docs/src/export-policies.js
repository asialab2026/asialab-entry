// Regenerate docs/policies/*.html from content/policies.js (run from auracurate/: node docs/src/export-policies.js)
global.window = {};
require("../../content/content.js");
require("../../content/policies.js");
const P = window.AURORA_POLICIES, fs = require("fs");
for (const k of P.order) fs.writeFileSync("docs/policies/" + k + ".html", P[k].body.replace(/<h2>/g, "\n<h2>").replace(/<p>/g, "\n<p>") + "\n");
console.log("exported", P.order.join(", "));
