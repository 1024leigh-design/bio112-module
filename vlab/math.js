/* Math that looks like a textbook (KaTeX, MIT license, kept in vlab/katex).
   Write $...$ for math inside a sentence and $$...$$ for math on its own centered line.
   In the .js data files, double each backslash: "$$\\frac{0.1}{10}$$". Text added later (tabs, sims, pop-ups) is typeset as it appears. */
(function(){
  const opts = {delimiters:[{left:"$$", right:"$$", display:true}, {left:"$", right:"$", display:false}], throwOnError:false,
    ignoredTags:["script", "noscript", "style", "textarea", "pre", "code", "option", "svg", "input"], ignoredClasses:["katex"]};
  const run = el => {
    if (!window.renderMathInElement || !el || el.nodeType !== 1) return;
    if (el.closest && el.closest("svg")) return;
    if (el.textContent.indexOf("$") < 0) return;
    window.renderMathInElement(el, opts);
  };
  window.VMATH = {run, tex:(s, display) => window.katex ? window.katex.renderToString(s, {displayMode:!!display, throwOnError:false}) : s};
  run(document.body);
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => run(n.nodeType === 3 ? n.parentElement : n))))
    .observe(document.body, {childList:true, subtree:true});
})();
