/* =====================================================================
   BIO 112 spelling helper, shared by the games.

   BIO112_SPELL.hint(guess, correct) -> a friendly message when the student
   typed the RIGHT microbe with a spelling slip, or null when it's not close.
   Both strings should already be lower case with single spaces.

   BIO112_SPELL.close(a, b) -> true when word a is a near miss of word b.
   ===================================================================== */
(function(){
  "use strict";

  /* edit distance that also counts a swap of two neighbors as one edit (ie / ei) */
  function dist(a, b){
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++){ d[i] = [i]; }
    for (j = 0; j <= n; j++){ d[0][j] = j; }
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++){
      var c = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
    return d[m][n];
  }
  /* how it sounds: ph = f, ae/oe = e, y = i, k = c, and doubled letters count once */
  function skel(w){
    return w.replace(/ph/g, "f").replace(/ae|oe/g, "e").replace(/y/g, "i").replace(/k/g, "c").replace(/(.)\1+/g, "$1");
  }
  function tol(w){ return w.length <= 4 ? 1 : w.length <= 8 ? 2 : 3; }
  function close(a, b){
    a = String(a).toLowerCase(); b = String(b).toLowerCase();
    if (a === b) return true;
    return dist(a, b) <= tol(b) || dist(skel(a), skel(b)) <= 1;
  }

  /* classic slips. good = the correct word; bad = what students often type instead */
  var PITFALLS = [
    {good: "meningitidis", bad: /^meningit(i|u)s$/, tip: "Careful: the microbe is meningitidis (ends in -idis). Meningitis is the disease."},
    {good: "gonorrhoeae", bad: /^gonor+h?(e|ea|oea)$/, tip: "Careful: the microbe is gonorrhoeae. Gonorrhea is the disease."},
    {good: "cholerae", bad: /^cholera$/, tip: "Careful: the microbe is cholerae (ends in -ae). Cholera is the disease."},
    {good: "botulinum", bad: /^botulism$/, tip: "Careful: the microbe is botulinum. Botulism is the disease."},
    {good: "tetani", bad: /^tetanus$/, tip: "Careful: the microbe is tetani. Tetanus is the disease."},
    {good: "anthracis", bad: /^anthrax$/, tip: "Careful: the microbe is anthracis. Anthrax is the disease."},
    {good: "diphtheriae", bad: /^dip(h)?t(h)?eria$/, tip: "Careful: the microbe is diphtheriae (ends in -ae). Diphtheria is the disease."},
    {good: "epidermidis", bad: /^epidermis$/, tip: "Careful: it's epidermidis (ends in -idis). The epidermis is your skin layer."},
    {good: "pneumoniae", bad: /^pneumonia$/, tip: "Careful: the microbe is pneumoniae (ends in -ae). Pneumonia is the disease."},
    {good: "clostridioides", bad: /^clostridium$/, tip: "Almost! C. diff was renamed: it's now Clostridioides difficile."}
  ];
  var WHICH = ["genus", "species", "third"];

  function hint(guess, correct){
    var g = String(guess).replace(/\./g, " ").replace(/\s+/g, " ").trim().split(" "),
        c = String(correct).replace(/\s+/g, " ").trim().split(" "), i;
    if (g.length !== c.length) return null;
    /* abbreviated genus: "S aureus", "E. coli" */
    if (g.length > 1 && g[0].length === 1 && g[0] === c[0].charAt(0) && g.slice(1).every(function(w, j){ return close(w, c[j + 1]); })){
      return "✏️ Right microbe! Now write out the full genus name (no abbreviations).";
    }
    /* every word must be right or a near miss; a disease word typed for the microbe word gets its own tip */
    var off = [], tip = null;
    for (i = 0; i < c.length; i++){
      if (g[i] === c[i]) continue;
      var pit = PITFALLS.filter(function(p){ return p.good === c[i] && p.bad.test(g[i]); })[0];
      if (pit){ tip = pit.tip; continue; }
      if (!close(g[i], c[i])) return null;
      off.push(i);
    }
    if (tip) return "✏️ " + tip + (off.length ? " Also check the " + WHICH[off[0]] + " name." : "");
    if (!off.length) return null;
    if (off.length === 1) return "✏️ Right microbe! Check the spelling of the " + WHICH[off[0]] + " name: \"" + g[off[0]] + "\" isn't quite right.";
    return "✏️ Right microbe! Check the spelling of both words.";
  }

  window.BIO112_SPELL = {hint: hint, close: close, dist: dist};
})();
