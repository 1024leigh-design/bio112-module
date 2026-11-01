/* Display options for the whole Virtual Lab: color palettes and motion.
   Palettes change the page colors (CSS variables) and every drawing (colors in the SVG are remapped).
   Loaded first, so the saved choice applies before anything draws. */
(function(){
  const root = document.documentElement;
  const get = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const put = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const PALETTES = [
    ["default", "Standard", "The usual colors. Follows your device's light or dark setting."],
    ["cb1", "Color-blind safe: red-green", "For red-green color blindness. Greens become blue, reds become orange."],
    ["cb2", "Color-blind safe: blue-yellow", "For blue-yellow color blindness. Blues get darker, yellows become red-orange."],
    ["night", "Night mode", "Dark background, easy on the eyes."],
    ["drh", "Dr. H mode", "Olive green with navy, burnt orange, cranberry, teal, forest green, and mustard. No greys."]];
  const D = window.VDISPLAY = {
    PALETTES,
    palette: get("vlab-palette") || "default",
    motion: get("vlab-motion") || "auto",
    reduced(){ if (D.motion === "on") return false; if (D.motion === "off") return true; return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); },
    apply(){
      root.dataset.palette = D.palette; root.dataset.motion = D.motion;
      if (D.palette === "night") root.dataset.theme = "dark"; else if (D.palette === "default") delete root.dataset.theme; else root.dataset.theme = "light";
      cache.clear();
    },
    setPalette(p){ D.palette = p; put("vlab-palette", p); D.apply(); if (window.VLAB && VLAB.rerender) VLAB.rerender(); restoreStatic(); remapTree(document.body); },
    setMotion(m){ D.motion = m; put("vlab-motion", m); D.apply(); }
  };

  /* ---------- color math ---------- */
  const cache = new Map();
  function hexToHsl(hex){
    let h = hex.slice(1); if (h.length === 3) h = h.split("").map(c => c + c).join("");
    const r = parseInt(h.slice(0, 2), 16) / 255, g = parseInt(h.slice(2, 4), 16) / 255, b = parseInt(h.slice(4, 6), 16) / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; let hh = 0, s = 0;
    if (mx !== mn){ const d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
      hh = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; hh *= 60; }
    return [hh, s, l];
  }
  function hslToHex(h, s, l){
    h = ((h % 360) + 360) % 360; s = Math.max(0, Math.min(1, s)); l = Math.max(0, Math.min(1, l));
    const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l), f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return "#" + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
  }
  const inR = (h, a, b) => a <= b ? h >= a && h < b : h >= a || h < b;
  const DRH = [[222, .45], [22, .7], [350, .65], [68, .5], [180, .55], [140, .4], [45, .75]]; /* navy, burnt orange, cranberry, olive, teal, forest, mustard */
  function mapColor(hex){
    const p = D.palette; if (p === "default" || p === "night") return hex;
    const key = p + hex; if (cache.has(key)) return cache.get(key);
    let [h, s, l] = hexToHsl(hex), out = hex;
    if (p === "cb1"){
      if (s > .15 && inR(h, 70, 175)) out = hslToHex(205, Math.max(s, .55), l);          /* greens to blue */
      else if (s > .15 && inR(h, 345, 20)) out = hslToHex(26, Math.max(s, .7), l);      /* reds to orange */
    } else if (p === "cb2"){
      if (s > .15 && inR(h, 185, 255)) out = hslToHex(225, s * .8, Math.max(.12, l * .62));   /* blues darker */
      else if (s > .15 && inR(h, 38, 70)) out = hslToHex(12, Math.max(s, .7), Math.min(l, .55)); /* yellows to red-orange */
      else if (s > .15 && inR(h, 255, 300)) out = hslToHex(318, s, Math.max(.15, l * .8));       /* violets to dark magenta */
    } else if (p === "drh"){
      if (s < .14){ if (l < .97 && l > .03) out = hslToHex(72, .26, l); }               /* no greys: tint them olive */
      else { let best = DRH[0], bd = 999; DRH.forEach(c => { const d = Math.min(Math.abs(h - c[0]), 360 - Math.abs(h - c[0])); if (d < bd){ bd = d; best = c; } });
        out = hslToHex(best[0], Math.max(best[1] * .75, Math.min(s, best[1] + .2)), l); }
    }
    cache.set(key, out); return out;
  }
  const HEX = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g;
  const ATTRS = ["fill", "stroke", "stop-color"];
  function remapEl(el){
    for (const a of ATTRS){ const v = el.getAttribute(a); if (v && v[0] === "#"){ if (!el.hasAttribute("data-o-" + a)) el.setAttribute("data-o-" + a, v); el.setAttribute(a, mapColor(el.getAttribute("data-o-" + a))); } }
    const st = el.getAttribute("style"); if (st && st.indexOf("#") >= 0){ if (!el.hasAttribute("data-o-style")) el.setAttribute("data-o-style", st); el.setAttribute("style", el.getAttribute("data-o-style").replace(HEX, m => mapColor(m.toLowerCase()))); }
  }
  function remapTree(node){
    if (D.palette === "default" || D.palette === "night" || !node || node.nodeType !== 1) return;
    remapEl(node); node.querySelectorAll("[fill],[stroke],[stop-color],[style]").forEach(remapEl);
  }
  /* elements that were in the page from the start keep their original colors in data-o-* */
  function restoreStatic(){
    document.querySelectorAll("[data-o-fill],[data-o-stroke],[data-o-stop-color],[data-o-style]").forEach(el => {
      ATTRS.concat(["style"]).forEach(a => { const o = el.getAttribute("data-o-" + a); if (o !== null) el.setAttribute(a, o); }); });
  }
  D.remapTree = remapTree;
  D.apply();
  const start = () => {
    remapTree(document.body);
    new MutationObserver(list => { if (D.palette === "default" || D.palette === "night") return; for (const m of list) m.addedNodes.forEach(n => remapTree(n)); })
      .observe(document.body, {childList:true, subtree:true});
    /* the Display button and dialog */
    const btn = document.getElementById("displayBtn"), dlg = document.getElementById("displayDlg"); if (!btn || !dlg) return;
    const body = document.getElementById("displayBody");
    const draw = () => {
      body.innerHTML = `<fieldset class="dset"><legend>Colors</legend>${PALETTES.map(([id, name, desc]) => `<label class="dopt"><input type="radio" name="dpal" value="${id}" ${D.palette === id ? "checked" : ""}><span class="dsw" data-sw="${id}"><i></i><i></i><i></i><i></i></span><span><b>${name}</b><small>${desc}</small></span></label>`).join("")}</fieldset>
        <fieldset class="dset"><legend>Animations</legend>${[["auto", "Follow my device", "Turns animations off if your device is set to reduce motion."], ["on", "On", "Always play the moving graphics."], ["off", "Off", "Keep every graphic still."]].map(([id, name, desc]) => `<label class="dopt"><input type="radio" name="dmot" value="${id}" ${D.motion === id ? "checked" : ""}><span><b>${name}</b><small>${desc}</small></span></label>`).join("")}</fieldset>
        <p class="lead" style="margin-top:10px">Colors in the drawings change too. The words still name the real lab colors (for example, "pink" for gram negative).</p>`;
      body.querySelectorAll('[name="dpal"]').forEach(r => r.addEventListener("change", () => { D.setPalette(r.value); }));
      body.querySelectorAll('[name="dmot"]').forEach(r => r.addEventListener("change", () => { D.setMotion(r.value); }));
    };
    btn.addEventListener("click", () => { draw(); if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", ""); });
    document.getElementById("displayClose").addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
