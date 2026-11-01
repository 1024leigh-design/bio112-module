/* Lab 15 interactive pieces: Follow the cells, the AraC switch, the UV glow, and the pGLO bench.
   All drawing is inline SVG. Animations stop on their own when the page moves on. */
(function(){
  const V = window.VLAB, A = window.ART, f1 = A.f1;
  const lerp = (a, b, k) => a + (b - a) * k, clamp = (v, a, b) => Math.max(a, Math.min(b, v)), ease = k => { k = clamp(k, 0, 1); return k * k * (3 - 2 * k); };
  const T = (x, y, s, o) => { o = o || {}; return `<text x="${f1(x)}" y="${f1(y)}" font-size="${o.fs || 15}" font-weight="${o.w || 700}" fill="${o.c || "currentColor"}" text-anchor="${o.a || "middle"}">${s}</text>`; };
  const RM = () => window.VDISPLAY ? window.VDISPLAY.reduced() : !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  function loop(host, svg, draw){
    const t0 = performance.now();
    const tick = now => { if (!host.isConnected) return; svg.innerHTML = draw(RM() ? 99 : (now - t0) / 1000); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }

  /* little shapes */
  const cellShape = (x, y, o) => { o = o || {};
    const fill = o.dead ? "#c9c9c9" : o.green ? `rgba(110,230,140,${0.35 + 0.65 * (o.green || 0)})` : "#f3e3c0", stroke = o.dead ? "#8b8b8b" : "#b9975b";
    return `<rect x="${f1(x - 80)}" y="${f1(y - 38)}" width="160" height="76" rx="38" fill="${fill}" stroke="${stroke}" stroke-width="3"/>` +
      (o.dead ? `<path d="M${x - 30},${y - 20} l60,40 M${x + 30},${y - 20} l-60,40" stroke="#c43a2b" stroke-width="6" stroke-linecap="round"/>` : "") +
      (o.glow ? `<rect x="${f1(x - 92)}" y="${f1(y - 50)}" width="184" height="100" rx="50" fill="#6dff95" opacity="${f1(o.glow * .35 * 100) / 100}"/>` : ""); };
  const plasmid = (x, y) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="11" fill="none" stroke="#1683cc" stroke-width="4"/><path d="M${f1(x + 11)},${f1(y)} A11,11 0 0 1 ${f1(x)},${f1(y + 11)}" fill="none" stroke="#1f8a55" stroke-width="4"/>`;
  const ca = (x, y) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="7" fill="#1f8a55"/><text x="${f1(x)}" y="${f1(y + 3)}" font-size="7" font-weight="700" fill="#fff" text-anchor="middle">Ca</text>`;
  const amp = (x, y, broken) => broken ? `<path d="M${f1(x - 8)},${f1(y + 6)} l6,-10 M${f1(x + 2)},${f1(y + 8)} l7,-4" stroke="#c43a2b" stroke-width="3"/>` : `<polygon points="${f1(x)},${f1(y - 9)} ${f1(x + 9)},${f1(y + 7)} ${f1(x - 9)},${f1(y + 7)}" fill="#c43a2b"/>`;
  const enzyme = (x, y) => `<path d="M${f1(x)},${f1(y)} L${f1(x + 9)},${f1(y - 5)} A10,10 0 1 0 ${f1(x + 9)},${f1(y + 5)} Z" fill="#a96c05"/>`;
  const arab = (x, y, s) => { s = s || 9; const pts = Array.from({length:5}, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return `${f1(x + Math.cos(a) * s)},${f1(y + Math.sin(a) * s)}`; }).join(" "); return `<polygon points="${pts}" fill="#f7d3e4" stroke="#c2185b" stroke-width="2"/>`; };
  const gfp = (x, y, k) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(11 * k)}" fill="#6dff95" opacity=".35"/><rect x="${f1(x - 5)}" y="${f1(y - 7)}" width="10" height="14" rx="4" fill="#1f8a55"/>`;

  /* ================= Follow the cells ================= */
  V.sims.follow = (host, spec) => {
    const ST = spec.stages;
    let k = 0, answered = {};
    host.innerHTML = `<div class="stagebar" id="fcBar"></div><div class="svgbox anim"><svg id="fcSvg" viewBox="0 0 640 300" role="img" aria-label="A +pGLO cell and a -pGLO cell at each step"></svg></div>
      <p class="msg" id="fcCap"></p><div id="fcQ" style="margin-top:10px"></div>
      <div class="btnrow" style="margin-top:12px"><button type="button" class="btn ghost" id="fcBack">Back</button><button type="button" class="btn ghost" id="fcReplay">Replay</button><button type="button" class="btn" id="fcNext">Next</button></div>`;
    const svg = host.querySelector("#fcSvg");
    let tStage = performance.now();
    /* the cell: a stadium shape; u runs 0 to 1 clockwise from the top center, off is the distance outside the middle of the membrane */
    const CW = 112, CH = 56, CY = 158, HS = CW - CH, ARC = Math.PI * CH, PER = 4 * HS + 2 * ARC;
    const at = (cx, u, off) => { let d = ((u % 1) + 1) % 1 * PER;
      if (d < HS) return {x:cx + d, y:CY - CH - off, nx:0, ny:-1}; d -= HS;
      if (d < ARC){ const th = -Math.PI / 2 + d / CH; return {x:cx + HS + Math.cos(th) * (CH + off), y:CY + Math.sin(th) * (CH + off), nx:Math.cos(th), ny:Math.sin(th)}; } d -= ARC;
      if (d < 2 * HS) return {x:cx + HS - d, y:CY + CH + off, nx:0, ny:1}; d -= 2 * HS;
      if (d < ARC){ const th = Math.PI / 2 + d / CH; return {x:cx - HS + Math.cos(th) * (CH + off), y:CY + Math.sin(th) * (CH + off), nx:Math.cos(th), ny:Math.sin(th)}; } d -= ARC;
      return {x:cx - HS + d, y:CY - CH - off, nx:0, ny:-1}; };
    const near = (u, g) => { const d = Math.abs(u - g.u) % 1; return Math.min(d, 1 - d) < g.w / 2; };
    /* lipid bilayer: two rows of phosphate heads with the fatty-acid tails in between. gaps: [{u, w}] where the membrane has opened */
    const memo = new Map();
    function membrane(cx, o){
      const key = cx + "|" + (o.dead ? "d" : "") + f1(o.green || 0) + "|" + (o.gaps || []).map(g => f1(g.u) + ":" + f1(g.w * 1000)).join(",");
      if (memo.has(key)) return memo.get(key);
      const gaps = (o.gaps || []).filter(g => g.w > .002);
      const head = o.dead ? "#9a9a9a" : "#d08a3c", tail = o.dead ? "#e0e0e0" : "#f2dca6";
      const fill = o.dead ? "#d4d4d4" : o.green ? `rgba(110,230,140,${f1((0.3 + 0.6 * o.green) * 100) / 100})` : "#fdf5e3";
      const path = `M${cx},${CY - CH} H${cx + HS} A${CH},${CH} 0 0 1 ${cx + HS},${CY + CH} H${cx - HS} A${CH},${CH} 0 0 1 ${cx - HS},${CY - CH} Z`;
      let dash = "";
      if (gaps.length){ const iv = [];
        gaps.forEach(g => { const lo = g.u - g.w / 2, hi = g.u + g.w / 2; if (lo < 0){ iv.push([lo + 1, 1], [0, hi]); } else if (hi > 1){ iv.push([lo, 1], [0, hi - 1]); } else iv.push([lo, hi]); });
        iv.sort((p, q) => p[0] - q[0]); let pos = 0; const parts = [];
        iv.forEach(([lo, hi]) => { parts.push(Math.max(0, lo - pos), hi - Math.max(lo, pos)); pos = hi; });
        parts.push(Math.max(0, 1 - pos), 1); dash = ` stroke-dasharray="${parts.map(x => f1(x * 10000) / 10000).join(" ")}"`; }
      let o2 = `<path d="${path}" fill="${fill}"/><path d="${path}" fill="none" stroke="${tail}" stroke-width="13" pathLength="1"${dash}/>`;
      const n = 66;
      for (let i = 0; i < n; i++){ const u = (i + .5) / n; if (gaps.some(g => near(u, g))) continue;
        [6.5, -6.5].forEach(off => { const p = at(cx, u, off), q = at(cx, u, off * .25); o2 += `<line x1="${f1(p.x)}" y1="${f1(p.y)}" x2="${f1(q.x)}" y2="${f1(q.y)}" stroke="${head}" stroke-width="1.2" opacity=".55"/><circle cx="${f1(p.x)}" cy="${f1(p.y)}" r="3.3" fill="${head}"/>`; }); }
      if (o.dead) o2 += `<path d="M${cx - 30},${CY - 22} l60,44 M${cx + 30},${CY - 22} l-60,44" stroke="#c43a2b" stroke-width="6" stroke-linecap="round"/>`;
      if (memo.size > 400) memo.clear();
      memo.set(key, o2); return o2;
    }
    const ion = (x, y) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="9.5" fill="#1f8a55"/><text x="${f1(x)}" y="${f1(y + 2.8)}" font-size="8" font-weight="700" fill="#fff" text-anchor="middle">Ca²⁺</text>`;
    const dna = (x, y) => plasmid(x, y) + `<text x="${f1(x)}" y="${f1(y + 4)}" font-size="12" font-weight="700" fill="#1683cc" text-anchor="middle">−</text>`;
    const minus = (x, y) => `<text x="${f1(x)}" y="${f1(y + 4)}" font-size="13" font-weight="700" fill="#7a4a12" text-anchor="middle">−</text>`;
    const SITES = [0, .3, .5, .8], ENTER = [0, .5];
    const CA = SITES.flatMap(u => [u - .042, u + .042]).concat([.15, .4, .65, .92]);
    const box = (x, y, v) => ({x:clamp(x, v.x0, v.x1), y:clamp(y, 58, 246)});
    function scene(t){
      const s = ST[k].id, a = ease(t / 1.6);
      const dark = s === "uv";
      let o = `<rect width="640" height="300" rx="14" fill="${dark ? "#120f2a" : s === "heat" ? "#fde7df" : s === "plate" ? "#f6efd9" : "#e9f5fb"}"/>`;
      [160, 480].forEach((cx, side) => {
        const plus = side === 0, col = plus ? "#1f8a55" : "#c43a2b", v = {x0:cx - 128, x1:cx + 128};
        /* each tube is its own box, so it is clear these cells are in different tubes */
        o += `<rect x="${cx - 152}" y="8" width="304" height="284" rx="14" fill="${dark ? "#1b1840" : "#fff"}" opacity="${dark ? 1 : .6}" stroke="${dark ? "#3b3773" : col}" stroke-width="2" stroke-opacity=".5"/>`;
        o += T(cx, 34, plus ? "+pGLO tube" : "-pGLO tube", {fs:16, c:dark ? "#fff" : col});
        if (s === "uv"){
          if (plus) for (let i = 0; i < 7; i++){ const x = cx - 54 + (i % 4) * 36, y = CY - 20 + Math.floor(i / 4) * 40; o += `<circle cx="${x}" cy="${y}" r="${f1(26 * (.6 + .4 * a))}" fill="#6dff95" opacity="${f1(.25 * a * 100) / 100}"/><circle cx="${x}" cy="${y}" r="15" fill="${a > .3 ? "#8dffad" : "#4c4a72"}"/>`; }
          else o += T(cx, CY, "No colony", {fs:18, c:"#fff"});
          o += T(cx, 276, plus ? "Glowing colony" : "Nothing grew", {fs:15, c:"#fff"});
          return;
        }
        const dead = !plus && s === "plate" && a > .7;
        const green = plus && s === "plate" ? ease((t - 1.6) / 1.4) : 0;
        const open = s === "heat" ? ease(t / .9) : 0;
        o += membrane(cx, {dead, green, gaps:ENTER.map(u => ({u, w:open * 34 / PER}))});
        /* Ca2+ drifts in and lands on the negative charges on the outside of the membrane */
        if (["cacl2", "ice", "heat"].includes(s)) CA.forEach((u, i) => {
          const p = at(cx, u, 19), m = at(cx, u, 12);
          const land = s === "cacl2" ? ease((t - .2 - i * .1) / 1.1) : 1;
          if (land < 1) o += minus(m.x, m.y);
          const st = box(p.x + p.nx * 70 + (i % 3 - 1) * 14, p.y + p.ny * 70, v);
          o += ion(lerp(st.x, p.x, land), lerp(st.y, p.y, land));
        });
        if (plus){
          SITES.forEach((u, i) => {
            const stuck = at(cx, u, 29), fl = at(cx, u, 80), free = box(fl.x + (i % 2 ? 1 : -1) * (fl.nx ? 10 : 58), fl.y, v);
            const bob = Math.sin(t * 1.6 + i * 1.7) * 3;
            let x = free.x, y = free.y + bob;
            if (s === "ice"){ x = lerp(free.x, stuck.x, a); y = lerp(free.y + bob, stuck.y, a); }
            if (s === "heat"){ x = stuck.x; y = stuck.y;
              if (ENTER.includes(u)){ const into = at(cx, u, -34), go = ease((t - .7) / 1.5); x = lerp(stuck.x, into.x, go); y = lerp(stuck.y, into.y, go); } }
            if (["recover", "plate"].includes(s)){ if (!ENTER.includes(u)) return; const into = at(cx, u, -34); x = into.x; y = into.y; }
            o += dna(x, y);
          });
          if (s === "recover" || s === "plate") for (let i = 0; i < (s === "recover" ? Math.floor(clamp(t * 2, 0, 5)) : 5); i++) o += enzyme(cx - 66 + i * 30, CY + 2);
          if (s === "plate") [-80, -54, -28, 28, 54, 80].slice(0, Math.floor(clamp((t - 1.6) * 4, 0, 6))).forEach(dx => { o += gfp(cx + dx, CY - 26, 1); });
        }
        if (s === "plate"){
          [.08, .18, .62, .72].forEach((u, i) => { const st = at(cx, u, 70), en = at(cx, u, plus ? 20 : -22); o += amp(lerp(st.x, en.x, a), lerp(st.y, en.y, a), plus && a > .9); });
          if (plus) for (let i = 0; i < 3; i++) o += arab(lerp(cx + 70 + i * 18, cx + 44 + i * 16, a), lerp(262, CY + 30, a), 8);
          o += T(cx, 280, plus ? (green > .5 ? "Survives, makes GFP" : "Breaking down ampicillin") : (dead ? "Killed by ampicillin" : "No protection"), {fs:14, c:col});
        }
        const lab = {cacl2:"Ca²⁺ sticks to the membrane", ice:plus ? "Ca²⁺ holds the plasmid close" : "Ca²⁺ on the membrane, no plasmid",
          heat:plus ? "Membrane opens, plasmid slips in" : "Membrane opens, nothing to take in", recover:plus ? "Making beta-lactamase" : "No plasmid, no beta-lactamase"}[s];
        if (s === "heat") o += T(cx, 54, "42°C water bath", {fs:13, c:"#c43a2b", w:600});
        if (lab) o += T(cx, 280, lab, {fs:14, c:s === "recover" && plus ? "#a96c05" : col});
      });
      if (s === "plate") o += `<g transform="translate(572 28)"><polygon points="0,-6 7,6 -7,6" fill="#c43a2b"/>${T(12, 5, "amp", {fs:11, a:"start"})}</g>`;
      return o;
    }
    function draw(){
      host.querySelector("#fcBar").innerHTML = ST.map((s, i) => `<span class="${i === k ? "on" : answered[i] ? "done" : ""}">${i + 1}. ${s.short}</span>`).join("");
      host.querySelector("#fcCap").innerHTML = `<b>${ST[k].title}</b><br>${ST[k].cap}`;
      const q = host.querySelector("#fcQ"); q.innerHTML = "";
      V.mc(q, ST[k].q, () => { answered[k] = true; upd(); });
      if (answered[k]) q.querySelector("[data-moveon]").click();
      upd(); tStage = performance.now();
    }
    function upd(){ const nb = host.querySelector("#fcNext"); nb.disabled = !answered[k]; nb.textContent = k === ST.length - 1 ? "Start over" : "Next"; host.querySelector("#fcBack").disabled = k === 0;
      host.querySelector("#fcBar").innerHTML = ST.map((s, i) => `<span class="${i === k ? "on" : answered[i] ? "done" : ""}">${i + 1}. ${s.short}</span>`).join(""); }
    host.querySelector("#fcNext").addEventListener("click", () => { if (k === ST.length - 1){ k = 0; answered = {}; } else k++; draw(); });
    host.querySelector("#fcBack").addEventListener("click", () => { if (k > 0){ k--; draw(); } });
    host.querySelector("#fcReplay").addEventListener("click", () => { tStage = performance.now(); });
    let still = "";
    const tick = now => { if (!host.isConnected) return; const t = RM() ? 99 : (now - tStage) / 1000, key = k + "|" + tStage;
      /* the cacl2 and ice stages keep a gentle bob; the others hold still once they finish */
      if (t < 4.5 || ["cacl2"].includes(ST[k].id) || still !== key){ svg.innerHTML = scene(t); if (t >= 4.5) still = key; }
      requestAnimationFrame(tick); };
    draw(); requestAnimationFrame(tick);
  };

  /* ================= AraC switch ================= */
  V.sims.arac = (host, spec) => {
    let on = false, tOn = 0;
    host.innerHTML = `<div class="btnrow"><button type="button" class="opt sel" data-ara="0" aria-pressed="true">No arabinose</button><button type="button" class="opt" data-ara="1" aria-pressed="false">Add arabinose</button></div>
      <div class="svgbox anim" style="margin-top:10px"><svg viewBox="0 24 640 206" role="img" aria-label="AraC, RNA polymerase, and the GFP gene"></svg></div><p class="msg" id="acCap"></p>`;
    const svg = host.querySelector("svg"), cap = host.querySelector("#acCap");
    const setCap = () => { cap.className = "msg " + (on ? "good" : ""); cap.innerHTML = on ? spec.onCap : spec.offCap; };
    host.querySelectorAll("[data-ara]").forEach(b => b.addEventListener("click", () => { on = b.dataset.ara === "1"; tOn = performance.now();
      host.querySelectorAll("[data-ara]").forEach(x => { const me = x === b; x.classList.toggle("sel", me); x.setAttribute("aria-pressed", String(me)); }); setCap(); }));
    setCap();
    const t0 = performance.now();
    function scene(now){
      const t = (now - t0) / 1000, ts = RM() ? 99 : (now - tOn) / 1000, y = 172;
      let o = `<rect y="24" width="640" height="206" rx="14" fill="var(--surface)"/>`;
      o += `<rect x="30" y="${y}" width="170" height="26" rx="6" fill="#a96c05"/>${T(115, y + 18, "araC gene", {fs:14, c:"#fff"})}<rect x="200" y="${y}" width="70" height="26" fill="#5a2a98"/>${T(235, y + 18, "pBAD", {fs:13, c:"#fff"})}<rect x="270" y="${y}" width="340" height="26" rx="6" fill="${on && ts > 2.2 ? "#1f8a55" : "#9aa7b5"}"/>${T(440, y + 18, "GFP gene", {fs:14, c:"#fff"})}`;
      if (!on){
        o += `<g transform="translate(235 ${y - 34})"><polygon points="-22,-9 -9,-22 9,-22 22,-9 22,9 9,22 -9,22 -22,9" fill="#c43a2b" stroke="#fff" stroke-width="2"/>${T(0, 5, "STOP", {fs:11, c:"#fff"})}</g>${T(235, y - 64, "AraC", {fs:14, c:"#c43a2b"})}`;
        const ph = (t % 2.4) / 2.4, x = ph < .5 ? lerp(90, 178, ease(ph * 2)) : lerp(178, 90, ease((ph - .5) * 2));
        o += `<ellipse cx="${f1(x)}" cy="${y - 22}" rx="34" ry="20" fill="#3f7bd1"/>${T(x, y - 17, "RNA pol", {fs:12, c:"#fff"})}`;
        if (ph > .42 && ph < .58) o += T(205, y - 50, "blocked!", {fs:14, c:"#c43a2b"});
        o += T(500, 70, "GFP OFF", {fs:22, c:"#53657b"});
      } else {
        const drop = ease(ts / 1.2), morph = ease((ts - 1.1) / .7);
        for (let i = 0; i < 3; i++) o += arab(lerp(150 + i * 60, 222 + i * 9, drop), lerp(44, y - 44, drop), 10);
        const ax = 235, ay = y - 34 - morph * 16;
        o += morph < .5 ? `<g transform="translate(${ax} ${ay})"><polygon points="-22,-9 -9,-22 9,-22 22,-9 22,9 9,22 -9,22 -22,9" fill="#c43a2b"/>${T(0, 5, "STOP", {fs:11, c:"#fff"})}</g>`
          : `<g transform="translate(${ax} ${ay})"><circle r="24" fill="#1f8a55"/>${T(0, 5, "GO", {fs:13, c:"#fff"})}</g>`;
        o += T(ax, ay - 34, morph < .5 ? "Arabinose binds AraC" : "AraC changes shape", {fs:14, c:morph < .5 ? "#c2185b" : "#1f8a55"});
        if (ts > 1.9){
          const run = ((ts - 1.9) % 3.2) / 3.2, x = lerp(250, 600, run);
          o += `<line x1="270" y1="${y - 6}" x2="${f1(Math.max(270, x - 30))}" y2="${y - 6}" stroke="#c2185b" stroke-width="4" stroke-dasharray="7 4"/>`;
          o += `<ellipse cx="${f1(x)}" cy="${y - 22}" rx="34" ry="20" fill="#3f7bd1"/>${T(x, y - 17, "RNA pol", {fs:12, c:"#fff"})}`;
          const made = Math.min(8, Math.floor((ts - 1.9) / 1.1));
          for (let i = 0; i < made; i++) o += gfp(330 + (i % 4) * 70, 58 + Math.floor(i / 4) * 40 + Math.sin(t * 2 + i) * 3, 1 + .25 * Math.sin(t * 3 + i));
          o += T(586, 50, "GFP ON", {fs:20, c:"#1f8a55"});
        } else o += `<ellipse cx="160" cy="${y - 22}" rx="34" ry="20" fill="#3f7bd1"/>${T(160, y - 17, "RNA pol", {fs:12, c:"#fff"})}`;
      }
      return o;
    }
    const tick = now => { if (!host.isConnected) return; svg.innerHTML = scene(now); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };

  /* ================= UV light and fluorescence ================= */
  V.sims.glow = (host, spec) => {
    let on = false, tOn = 0;
    host.innerHTML = `<div class="btnrow"><button type="button" class="btn" id="glBtn">Turn on the UV light</button><button type="button" class="btn ghost" id="glReplay" hidden>Replay</button></div>
      <div class="svgbox anim" style="margin-top:10px"><svg viewBox="0 0 660 320" role="img" aria-label="A UV light shines on a plate; an electron in GFP is excited, then emits green light"></svg></div>
      <div class="stagebar" id="glSteps"></div><p class="msg" id="glCap"></p>`;
    const svg = host.querySelector("svg"), btn = host.querySelector("#glBtn"), rp = host.querySelector("#glReplay");
    const steps = ["1. UV light shines", "2. Excitation", "3. Loses some energy", "4. Emission", "5. The plate glows"];
    const caps = [spec.c0, spec.c1, spec.c2, spec.c3, spec.c4];
    const cols = A.scatter(14, 152, "white", 6, 9);
    let lastPh = -1;
    btn.addEventListener("click", () => { on = !on; tOn = performance.now(); btn.textContent = on ? "Turn off the UV light" : "Turn on the UV light"; rp.hidden = !on; lastPh = -1; });
    rp.addEventListener("click", () => { tOn = performance.now(); lastPh = -1; });
    const squig = (x1, y1, x2, y2, waves, col, prog) => { const n = 60, pts = []; const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
      for (let i = 0; i <= n * prog; i++){ const s = i / n, w = Math.sin(s * waves * 6.283) * 6; pts.push(`${f1(x1 + ux * L * s - uy * w)},${f1(y1 + uy * L * s + ux * w)}`); }
      return pts.length > 1 ? `<polyline points="${pts.join(" ")}" fill="none" stroke="${col}" stroke-width="3"/>` : ""; };
    function scene(now){
      const t = RM() ? 99 : (now - tOn) / 1000;
      const ph = !on ? -1 : t < 1 ? 0 : t < 2.2 ? 1 : t < 3 ? 2 : t < 4.2 ? 3 : 4;
      if (ph !== lastPh){ lastPh = ph;
        host.querySelector("#glSteps").innerHTML = steps.map((s, i) => `<span class="${i === ph ? "on" : i < ph ? "done" : ""}">${s}</span>`).join("");
        const c = host.querySelector("#glCap"); c.className = "msg " + (ph === 4 ? "good" : ""); c.innerHTML = ph < 0 ? spec.off : caps[ph]; }
      const dark = on ? ease(t / .8) : 0, glow = on ? ease((t - 4.2) / .8) : 0;
      let o = `<rect width="660" height="320" rx="14" fill="${dark > .5 ? "#120f2a" : "#f2f5f8"}"/>`;
      /* lamp and plate */
      o += `<rect x="40" y="18" width="120" height="30" rx="8" fill="#3b3570"/><rect x="50" y="46" width="100" height="8" rx="3" fill="${on ? "#b18cff" : "#7a7398"}"/>${T(100, 38, "UV lamp", {fs:13, c:"#fff"})}`;
      if (on) for (let i = 0; i < 5; i++) o += `<line x1="${60 + i * 20}" y1="56" x2="${40 + i * 30}" y2="140" stroke="#b18cff" stroke-width="3" stroke-dasharray="6 6" opacity="${f1(dark * 100) / 100}"/>`;
      o += `<g transform="translate(10 120) scale(.9)">${A.plate({uv:dark > .5, colonies:cols.map(c => Object.assign({}, c, {glow:glow > .1}))}).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</g>`;
      o += T(100, 312, "LB/amp/ara, +pGLO", {fs:13, c:dark > .5 ? "#fff" : "#14223a"});
      /* zoom box: energy levels in one GFP molecule */
      const zx = 260, zc = dark > .5 ? "#fff" : "#14223a";
      o += `<rect x="${zx}" y="16" width="384" height="290" rx="12" fill="${dark > .5 ? "#1d1940" : "#ffffff"}" stroke="#8b93a3" stroke-width="2"/>${T(zx + 192, 38, "Zoom in: one GFP molecule", {fs:14, c:zc})}`;
      const gy = 262, ey = 92, ex = zx + 190;
      o += `<line x1="${zx + 90}" y1="${gy}" x2="${zx + 360}" y2="${gy}" stroke="${zc}" stroke-width="3"/>${T(zx + 84, gy + 5, "Low energy", {fs:12, a:"end", c:zc})}`;
      o += `<line x1="${zx + 90}" y1="${ey}" x2="${zx + 360}" y2="${ey}" stroke="${zc}" stroke-width="3"/><line x1="${zx + 90}" y1="${ey + 22}" x2="${zx + 360}" y2="${ey + 22}" stroke="${zc}" stroke-width="1.5" opacity=".6"/>${T(zx + 84, ey + 5, "High energy", {fs:12, a:"end", c:zc})}`;
      let eY = gy, eX = ex;
      if (ph === 1){ o += squig(zx + 20, 300, ex - 8, gy, 9, "#9b6bff", ease((t - 1) / .7)); if (t > 1.7) eY = lerp(gy, ey, ease((t - 1.7) / .5)); o += T(ex + 60, 180, "absorbs UV", {fs:14, c:"#9b6bff"}); }
      if (ph === 2){ eY = lerp(ey, ey + 22, ease((t - 2.2) / .6)); eX = ex + Math.sin(t * 30) * 4; o += T(ex + 70, ey - 10, "loses some as vibration", {fs:13, c:"#a96c05"}); }
      if (ph === 3){ eY = lerp(ey + 22, gy, ease((t - 3) / .5)); o += squig(ex + 10, 180, zx + 370, 150, 4, "#2fd35a", ease((t - 3.3) / .8)); o += T(ex + 120, 200, "gives off green light", {fs:14, c:"#2fd35a"}); }
      if (ph === 4){ eY = gy; const r = ((t - 4.2) % 2.4) / 2.4; o += squig(zx + 20, 300, ex - 8, gy, 9, "#9b6bff", ease(r * 2.5)); o += squig(ex + 10, 180, zx + 370, 150, 4, "#2fd35a", ease((r - .35) * 2.5)); }
      if (ph >= 1) o += `<line x1="${ex}" y1="${gy}" x2="${ex}" y2="${f1(eY)}" stroke="#9b6bff" stroke-width="2" stroke-dasharray="4 4" opacity=".6"/>`;
      o += `<circle cx="${f1(eX)}" cy="${f1(eY)}" r="11" fill="#f2b134" stroke="#a8760f" stroke-width="2"/>${T(eX, eY + 4, "e⁻", {fs:11, c:"#3b2a00"})}`;
      o += T(zx + 192, 58, "UV in: short wavelength, more energy.", {fs:12, w:400, c:zc}) + T(zx + 192, 73, "Green out: longer wavelength, less energy.", {fs:12, w:400, c:zc});
      return o;
    }
    const tick = now => { if (!host.isConnected) return; svg.innerHTML = scene(now); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };

  /* ================= heat shock too long: the membrane melts ================= */
  V.sims.melt = host => {
    host.innerHTML = `<svg viewBox="0 0 600 230" role="img" aria-label="A lipid bilayer gets more fluid in the heat, then too liquid, and falls apart"></svg><div class="btnrow" style="justify-content:center;margin-top:6px"><button type="button" class="btn ghost small">Replay</button></div>`;
    const svg = host.querySelector("svg"); let t0 = performance.now();
    host.querySelector("button").addEventListener("click", () => { t0 = performance.now(); });
    const R = A.rng(41), N = 28, seeds = Array.from({length:N * 2}, () => [R() * 6.28, R() * 2 - 1, R() * 2 - 1]);
    const leaks = Array.from({length:14}, () => [40 + R() * 520, R()]);
    const PH = [[0, "On ice: the membrane is stiff.", "#e9f5fb"], [2, "42°C: the membrane gets more fluid. The plasmid slips in.", "#fde7df"], [4.5, "Still too hot: the membrane gets too liquid.", "#fbd3c4"], [6.5, "It cannot reform. The membrane falls apart and the cell dies.", "#f5b8a6"]];
    function scene(now){
      const t = RM() ? 8 : ((now - t0) / 1000) % 10, ph = PH.filter(p => t >= p[0]).length - 1;
      const amp = t < 2 ? .4 : t < 4.5 ? 3 : t < 6.5 ? 3 + (t - 4.5) * 4.5 : 12, spread = t < 6.5 ? 0 : Math.min(1, (t - 6.5) / 2.2);
      let o = `<rect width="600" height="230" rx="12" fill="${PH[ph][2]}"/>` + T(300, 26, PH[ph][1], {fs:16, c:"#14223a"});
      if (t >= 2) [70, 300, 530].forEach((x, i) => { o += `<g opacity="${f1(Math.min(1, (t - 2) * 2))}">${A.fire ? A.fire(x, 52, .9) : ""}</g>`; });
      else [70, 300, 530].forEach(x => { o += A.snow ? A.snow(x, 50, 8) : ""; });
      for (let row = 0; row < 2; row++) for (let k = 0; k < N; k++){
        const sd = seeds[row * N + k], x0 = 20 + k * 20, y0 = row ? 170 : 106, dir = row ? 1 : -1;
        const jx = Math.sin(t * 9 + sd[0]) * amp + sd[1] * spread * 60, jy = Math.cos(t * 7 + sd[0]) * amp * .6 + sd[2] * spread * 70 + dir * spread * 20;
        const x = x0 + jx, y = y0 + jy, rot = Math.sin(t * 5 + sd[0]) * amp * 3 + spread * sd[1] * 90;
        o += `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})"><line x1="-3" y1="0" x2="-3" y2="${-dir * 26}" stroke="#c99a3e" stroke-width="2"/><line x1="3" y1="0" x2="3" y2="${-dir * 26}" stroke="#c99a3e" stroke-width="2"/><circle r="7" fill="#e6b85c" stroke="#b98d3a"/></g>`;
      }
      if (t >= 2.4 && t < 4.5){ const k = Math.min(1, (t - 2.4) / 1.6); o += `<circle cx="300" cy="${f1(60 + k * 150)}" r="12" fill="none" stroke="#1683cc" stroke-width="4"/>`; }
      if (spread > 0) leaks.forEach(([x, r]) => { o += `<circle cx="${f1(x)}" cy="${f1(220 - spread * (40 + r * 150))}" r="4" fill="#a96c05" opacity="${f1(.9 * spread)}"/>`; });
      o += T(16, 220, "inside the cell", {fs:12, a:"start", w:400, c:"#53657b"}) + T(16, 74, "outside", {fs:12, a:"start", w:400, c:"#53657b"});
      return o;
    }
    const tick = now => { if (!host.isConnected) return; svg.innerHTML = scene(now); requestAnimationFrame(tick); };
    svg.innerHTML = scene(performance.now()); requestAnimationFrame(tick);
  };

  /* ================= pGLO bench ================= */
  V.sims.pglobench = (host, spec) => {
    const SPEED = 3; /* heat shock clock runs 3x faster than real time */
    const VOLS = [4, 100, 200, 400];
    const PL = [{name:"LB", tube:"t2", lab:"LB (-pGLO)"}, {name:"LB/amp", tube:"t2", lab:"LB/amp (-pGLO)"}, {name:"LB/amp", tube:"t1", lab:"LB/amp (+pGLO)"}, {name:"LB/amp/ara", tube:"t1", lab:"LB/amp/ara (+pGLO)"}];
    let S;
    const fresh = () => ({k:0, got:{}, vol:null, sel:null, uv:false, grown:false, platesIn:false, bathT:null, log:[], msg:"", cls:"",
      tubes:{t1:{loc:"rack", vol:0, cells:false, plasmid:false, lb:false, label:"Tube 1"}, t2:{loc:"rack", vol:0, cells:false, plasmid:false, lb:false, label:"Tube 2"}}, plated:{}});
    const both = loc => { S.tubes.t1.loc = loc; S.tubes.t2.loc = loc; };
    const STEPS = [
      {text:"Set the pipette to <b>400 µL</b>. Move ice-cold calcium chloride (CaCl<sub>2</sub>) into <b>Tube 1</b>.", done:"400 µL CaCl<sub>2</sub> into Tube 1",
        acts:[{src:"cacl2", dst:"t1", vol:400, ok:"400 µL of ice-cold CaCl<sub>2</sub> is in Tube 1.", fx:() => { S.tubes.t1.vol = 400; }}]},
      {text:"Use the <b>loop</b>: pick <b>one colony</b> from the <b>starter plate</b> to start. Mix it into <b>Tube 1</b>.", done:"One colony mixed into Tube 1",
        acts:[{src:"start", dst:"t1", ok:"One colony is mixed in. The cells are now in ice-cold CaCl<sub>2</sub>.", fx:() => { S.tubes.t1.cells = true; }}]},
      {text:"Set the pipette to <b>200 µL</b>. Split the cells: move 200 µL from Tube 1 into <b>Tube 2</b>.", done:"Split: 200 µL into Tube 2",
        acts:[{src:"t1", dst:"t2", vol:200, ok:"Each tube now has 200 µL of cells.", fx:() => { S.tubes.t1.vol = 200; S.tubes.t2.vol = 200; S.tubes.t2.cells = true; }}]},
      {text:"Label the tubes.", done:"Labeled +pGLO and -pGLO", button:"Label: Tube 1 = +pGLO, Tube 2 = -pGLO", fx:() => { S.tubes.t1.label = "+pGLO"; S.tubes.t2.label = "-pGLO"; }, ok:"Labeled! Tube 2 (-pGLO) is your control."},
      {text:"Set the pipette to <b>4 µL</b>. Add pGLO plasmid to the <b>+pGLO</b> tube only.", done:"4 µL pGLO into +pGLO",
        acts:[{src:"plasmid", dst:"t1", vol:4, ok:"The plasmid is in the +pGLO tube.", fx:() => { S.tubes.t1.plasmid = true; S.tubes.t1.vol = 204; }}],
        oops:{"plasmid>t2":"Stop! That is the <b>-pGLO</b> tube. If it gets plasmid too, you lose your control. Add the plasmid to +pGLO only."}},
      {text:"Move <b>both</b> tubes onto the <b>ice</b>.", done:"Both tubes on ice",
        acts:[{src:"t1", dst:"ice", ok:"+pGLO is on ice.", fx:() => { S.tubes.t1.loc = "ice"; }}, {src:"t2", dst:"ice", ok:"-pGLO is on ice.", fx:() => { S.tubes.t2.loc = "ice"; }}]},
      {text:"Keep both tubes on ice for about 1 hour.", done:"About 1 hour on ice", button:"⏩ About 1 hour later", ok:"An hour on ice. Positive Ca<sup>2+</sup> shields the negative charges so the plasmid can get close to the cells: proximity."},
      {text:"Heat shock! Move the tubes into the <b>42°C water bath</b>. Take them out at <b>45 seconds</b> by tapping the <b>ice</b>.", done:"Heat shock: 42°C for 45 seconds", heat:true},
      {text:"Keep them on ice for 2 to 10 minutes.", done:"Back on ice for a few minutes", button:"⏩ A few minutes later", ok:"The cells cooled back down."},
      {text:"Set the pipette to <b>200 µL</b>. Add <b>LB broth</b> to <b>each</b> tube.", done:"200 µL LB into each tube",
        acts:[{src:"lb", dst:"t1", vol:200, ok:"LB is in +pGLO (404 µL total).", fx:() => { S.tubes.t1.lb = true; S.tubes.t1.vol = 404; }}, {src:"lb", dst:"t2", vol:200, ok:"LB is in -pGLO (400 µL total).", fx:() => { S.tubes.t2.lb = true; S.tubes.t2.vol = 400; }}]},
      {text:"Move both tubes into the <b>37°C incubator</b> to recover.", done:"Tubes in the 37°C incubator",
        acts:[{src:"t1", dst:"incub", ok:"+pGLO is recovering.", fx:() => { S.tubes.t1.loc = "incub"; }}, {src:"t2", dst:"incub", ok:"-pGLO is recovering.", fx:() => { S.tubes.t2.loc = "incub"; }}]},
      {text:"Recover at 37°C for 1 hour.", done:"Recovered 1 hour", button:"⏩ 1 hour later", ok:"The cells repaired and started making beta-lactamase before they meet ampicillin."},
      {text:"Set the pipette to <b>100 µL</b>. Plate each tube onto the plates labeled for it.", done:"100 µL onto each of the 4 plates",
        acts:PL.map((p, i) => ({src:p.tube, dst:"p" + i, vol:100, ok:`Spread 100 µL on ${p.lab}. (Spreader dipped in isopropanol and flamed.)`, fx:() => { S.plated[i] = true; }}))},
      {text:"Put the plates in the <b>37°C incubator</b>, upside down.", done:"Plates in the incubator, upside down",
        acts:[{src:"p*", dst:"incub", ok:"All four plates are in the incubator, upside down.", fx:() => { S.platesIn = true; }}]},
      {text:"Let the plates grow.", done:"Incubated", button:"⏩ Incubate", ok:"Growth! Now look under the UV light.", fx:() => { S.grown = true; S.platesIn = false; }},
      {text:"Tap <b>UV light</b> to shine it on the plates. Which plate glows?", done:"Looked under UV", final:true}
    ];
    const NAMES = {cacl2:"calcium chloride (CaCl<sub>2</sub>)", start:"starter plate", plasmid:"pGLO plasmid", lb:"LB broth", t1:"Tube 1", t2:"Tube 2", ice:"ice", bath:"water bath", incub:"incubator"};
    const nameOf = id => id === "t1" || id === "t2" ? S.tubes[id].label : id[0] === "p" && id.length === 2 ? PL[+id[1]].lab : NAMES[id] || id;

    function say(m, c){ S.msg = m; S.cls = c || ""; }
    function stepDone(){ const st = STEPS[S.k]; S.log.push(st.done); S.k++; S.got = {}; S.sel = null; }
    function act(src, dst){
      const st = STEPS[S.k]; if (!st || st.button || st.final) return;
      /* a tube sitting on the ice, in the bath, or in the incubator covers that spot: dropping on it means the spot */
      const isTube = id => id === "t1" || id === "t2";
      if (isTube(dst) && S.tubes[dst].loc !== "rack" && !(st.acts || []).some(a => a.src === src && a.dst === dst)) dst = S.tubes[dst].loc;
      if (st.heat){ heatAct(src, dst); return; }
      const key = src + ">" + dst;
      if (st.oops && st.oops[key]){ say(st.oops[key], "bad"); return; }
      const i = st.acts.findIndex((a, j) => !S.got[j] && (a.src === src || (a.src === "p*" && /^p\d$/.test(src))) && a.dst === dst);
      if (i < 0){
        if (isTube(src) && /^p\d$/.test(dst) && PL[+dst[1]].tube !== src){ say(`That plate is labeled for the <b>${S.tubes[PL[+dst[1]].tube].label}</b> tube. Use the plate that matches <b>${S.tubes[src].label}</b>.`, "bad"); return; }
        if (st.acts.some((a, j) => S.got[j] && a.src === src && a.dst === dst)){ say("You already did that one. What is next?", "warn"); return; }
        say(`Not that move. ${hintText()}`, "bad"); return; }
      const a = st.acts[i];
      if (a.vol){ if (!S.vol){ say(`Pick a volume on the micropipette first. You need <b>${a.vol} µL</b>.`, "bad"); return; }
        if (S.vol !== a.vol){ say(`The micropipette is set to ${S.vol} µL. Set it to <b>${a.vol} µL</b>.`, "bad"); return; } }
      S.got[i] = true; a.fx(); say("<b>Yes!</b> " + a.ok, "good");
      if (st.acts.every((_, j) => S.got[j])) stepDone();
    }
    function heatAct(src, dst){
      const inBath = S.tubes.t1.loc === "bath";
      if (!inBath){
        if ((src === "t1" || src === "t2") && dst === "bath"){ both("bath"); S.bathT = performance.now(); say("Both tubes are in the 42°C bath. Watch the timer. Tap the <b>ice</b> at 45 seconds!", ""); return; }
        say("Move the tubes into the <b>42°C water bath</b> (tap a tube, then the bath).", "bad"); return;
      }
      if (dst === "ice" || src === "ice"){
        const sec = (performance.now() - S.bathT) / 1000 * SPEED; both("ice"); S.bathT = null;
        if (sec < 40){ say(`<b>Too short (${Math.round(sec)} seconds).</b> The membrane did not loosen enough, so few cells take up the plasmid. Try the heat shock again.`, "bad"); return; }
        if (sec > 50){ say(`<b>Too long (${Math.round(sec)} seconds).</b> The membrane got too liquid to reform. The cells are damaged or killed. Try the heat shock again.`, "bad"); return; }
        say(`<b>${Math.round(sec)} seconds. Nice timing!</b> The heat gave the energy, and the membrane loosened just enough for the plasmid to slip in.`, "good"); stepDone(); return;
      }
      say("The tubes are in the bath! Tap the <b>ice</b> at 45 seconds.", "warn");
    }
    function hintText(){ const st = STEPS[S.k]; if (!st) return ""; if (st.button) return `Tap the <b>${st.button}</b> button.`; if (st.heat) return "Tap a tube, then the water bath.";
      const a = st.acts.find((_, j) => !S.got[j]); return a ? `Tap <b>${a.src === "p*" ? "a plate" : nameOf(a.src)}</b>, then <b>${nameOf(a.dst)}</b>${a.vol ? `, with the pipette at ${a.vol} µL` : ""}.` : ""; }

    /* ---------- drawing ---------- */
    const P = {cacl2:[70, 70], start:[170, 70], plasmid:[270, 70], lb:[360, 70], ice:[330, 250], bath:[480, 250], incub:[630, 240]};
    const TUBE_AT = (id, loc) => { const d = id === "t1" ? -22 : 22; return loc === "rack" ? [110 + (id === "t1" ? 0 : 60), 250] : loc === "ice" ? [330 + d, 238] : loc === "bath" ? [480 + d, 236] : [630 + d, 226]; };
    function tubeSVG(id){
      const t = S.tubes[id], [x, y] = TUBE_AT(id, t.loc), lvl = Math.min(1, t.vol / 420), sel = S.sel === id;
      const liquid = t.vol ? `<rect x="${x - 11}" y="${f1(y + 40 - 50 * lvl)}" width="22" height="${f1(50 * lvl)}" fill="${t.cells ? (t.lb ? "#efe0b5" : "#e8f2f8") : "#dff1fb"}"/>${t.cells ? `<rect x="${x - 11}" y="${f1(y + 40 - 50 * lvl)}" width="22" height="${f1(50 * lvl)}" fill="#d9c58f" opacity=".45"/>` : ""}` : "";
      return `<g data-obj="${id}" class="${sel ? "sel" : ""}" role="button" tabindex="0" aria-label="${nameOf(id)}"><rect x="${x - 22}" y="${y - 40}" width="44" height="110" fill="transparent"/>
        <path d="M${x - 12},${y - 10} L${x - 12},${y + 38} Q${x},${y + 56} ${x + 12},${y + 38} L${x + 12},${y - 10}" fill="#f4f8fb" stroke="#8b93a3" stroke-width="2"/>${liquid}
        ${t.plasmid ? plasmid(x, y + 28).replace(/r="11"/g, 'r="5"').replace(/stroke-width="4"/g, 'stroke-width="2"') : ""}
        <rect x="${x - 14}" y="${y - 18}" width="28" height="10" rx="3" fill="${t.label === "+pGLO" ? "#1f8a55" : t.label === "-pGLO" ? "#c43a2b" : "#8b93a3"}"/>
        ${T(x, y - 24, t.label, {fs:12})}</g>`;
    }
    const obj = (id, body, label) => `<g data-obj="${id}" class="${S.sel === id ? "sel" : ""}" role="button" tabindex="0" aria-label="${label}">${body}</g>`;
    const ico = (name, arg, x, y, sc) => `<g transform="translate(${x - 30 * sc} ${y - 30 * sc}) scale(${sc})">${A.ico(name, arg).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</g>`;
    function benchSVG(){
      const uv = S.uv && S.grown;
      let o = `<rect width="720" height="470" rx="14" fill="${uv ? "#120f2a" : "var(--bg)"}"/>`;
      o += `<rect x="20" y="20" width="400" height="104" rx="10" fill="${uv ? "#1d1940" : "var(--surface)"}" stroke="var(--line)"/>`;
      o += obj("cacl2", ico("bottle", "#9fd1f0", 70, 62, 1) + T(70, 112, "CaCl₂ (ice-cold)", {fs:12}), "CaCl2 bottle");
      o += obj("start", `<g transform="translate(140 34) scale(.3)">${A.plate({colonies:A.scatter(8, 4, "white", 6, 9)}).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</g>` + T(170, 112, "Starter plate", {fs:12}), "Starter plate with E. coli colonies");
      o += obj("plasmid", ico("tube", "#cfe3f7", 270, 62, 1) + plasmid(270, 70).replace(/r="11"/g, 'r="6"').replace(/stroke-width="4"/g, 'stroke-width="2.5"') + T(270, 112, "pGLO plasmid", {fs:12}), "pGLO plasmid tube");
      o += obj("lb", ico("bottle", "#efe0b5", 360, 62, 1) + T(360, 112, "LB broth", {fs:12}), "LB broth bottle");
      o += `<rect x="70" y="214" width="120" height="16" rx="4" fill="#c9ced6"/>` + T(130, 316, "Tube rack", {fs:12, c:uv ? "#fff" : "currentColor"});
      o += obj("ice", `<path d="M280,226 L380,226 L370,300 L290,300 Z" fill="#dff1fb" stroke="#7fb8d9" stroke-width="2"/>${[0, 1, 2, 3].map(i => `<rect x="${290 + i * 22}" y="262" width="16" height="16" rx="3" fill="#fff" stroke="#9cc6e4"/>`).join("")}` + T(330, 318, "Ice", {fs:13, c:uv ? "#fff" : "currentColor"}), "Ice bucket");
      const sec = S.bathT ? (performance.now() - S.bathT) / 1000 * SPEED : null;
      o += obj("bath", `<rect x="420" y="226" width="120" height="76" rx="8" fill="#cfe9f7" stroke="#6aa9d1" stroke-width="2"/><path d="M420,240 q15,-8 30,0 t30,0 t30,0 t30,0" stroke="#6aa9d1" stroke-width="2" fill="none"/>` + T(480, 318, "42°C water bath", {fs:13, c:uv ? "#fff" : "currentColor"}) + `<text id="pbTimer" x="480" y="216" font-size="16" font-weight="700" fill="#c43a2b" text-anchor="middle">${sec !== null ? Math.floor(sec) + " s" : ""}</text>`, "42 degree water bath");
      o += obj("incub", `<rect x="580" y="190" width="110" height="112" rx="8" fill="#e8ecf2" stroke="#8b93a3" stroke-width="2"/><rect x="590" y="200" width="90" height="70" rx="4" fill="#fff" stroke="#b9c0cc"/>` + T(635, 318, "37°C incubator", {fs:13, c:uv ? "#fff" : "currentColor"}) + (S.platesIn ? T(635, 290, "4 plates inside", {fs:11}) : ""), "37 degree incubator");
      ["t1", "t2"].forEach(id => { o += tubeSVG(id); });
      PL.forEach((p, i) => { const x = 90 + i * 170, y = 395;
        let spec2 = {uv};
        if (S.grown){ if (i === 0) spec2.lawn = true; if (i === 2) spec2.colonies = A.scatter(14, 151, "white", 5, 8); if (i === 3) spec2.colonies = A.scatter(14, 152, "white", 5, 8).map(c => Object.assign(c, {glow:true})); }
        const faded = S.platesIn ? ' opacity=".35"' : "";
        o += obj("p" + i, `<g transform="translate(${x - 44} ${y - 50}) scale(.44)"${faded}>${A.plate(spec2).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</g>${S.plated[i] && !S.grown ? T(x, y + 4, "spread", {fs:11, c:"#1683cc"}) : ""}` + T(x, y + 56, p.lab, {fs:12, c:uv ? "#fff" : "currentColor"}), p.lab + " plate");
      });
      return o;
    }
    function draw(){
      const st = STEPS[S.k];
      host.innerHTML = `<div class="stagebar">${STEPS.map((s, i) => `<span class="${i === S.k ? "on" : i < S.k ? "done" : ""}">${i + 1}</span>`).join("")}</div>
        <div class="msg"><b>Step ${Math.min(S.k + 1, STEPS.length)} of ${STEPS.length}:</b> ${st ? st.text : "Done!"}</div>
        <div class="vols" style="margin-top:10px"><b>Micropipette:</b> ${VOLS.map(v => `<button type="button" class="opt ${S.vol === v ? "sel" : ""}" data-vol="${v}" aria-pressed="${S.vol === v}">${v} µL</button>`).join("")}</div>
        <div class="svgbox bench" style="margin-top:10px"><svg viewBox="0 0 720 470" role="img" aria-label="Lab bench. Tap an item, then tap where it goes. You can also drag.">${benchSVG()}</svg></div>
        <div class="btnrow" style="margin-top:10px">${st && st.button ? `<button type="button" class="btn" id="pbBtn">${st.button}</button>` : ""}${st && st.final ? `<button type="button" class="btn" id="pbUV">${S.uv ? "Turn off UV light" : "Shine the UV light"}</button>` : ""}<button type="button" class="btn hint" id="pbHint">Hint</button><button type="button" class="btn ghost" id="pbReset">Start over</button></div>
        <div class="msg ${S.cls}" id="pbMsg" aria-live="polite">${S.msg}</div>
        ${S.log.length ? `<div class="lbl">Done so far</div><ol class="donelist">${S.log.map(l => `<li>${l}</li>`).join("")}</ol>` : ""}`;
      wire();
    }
    function wire(){
      const svg = host.querySelector(".bench svg");
      host.querySelectorAll("[data-vol]").forEach(b => b.addEventListener("click", () => { S.vol = +b.dataset.vol; say(`Micropipette set to ${S.vol} µL.`, ""); draw(); }));
      const bb = host.querySelector("#pbBtn"); if (bb) bb.addEventListener("click", () => { const st = STEPS[S.k]; if (st.fx) st.fx(); say("<b>Done.</b> " + (st.ok || ""), "good"); stepDone(); draw(); });
      const uvb = host.querySelector("#pbUV"); if (uvb) uvb.addEventListener("click", () => { S.uv = !S.uv;
        say(S.uv ? `<b>${spec.uvMsg}</b>` : "UV light is off. Under normal light, colonies on both LB/amp plates look white.", S.uv ? "good" : ""); if (S.uv && S.log[S.log.length - 1] !== STEPS[STEPS.length - 1].done) S.log.push(STEPS[STEPS.length - 1].done); draw(); });
      host.querySelector("#pbHint").addEventListener("click", () => { say(hintText(), "warn"); draw();
        const st = STEPS[S.k]; const a = st && st.acts && st.acts.find((_, j) => !S.got[j]);
        if (a) [a.src === "p*" ? "p0" : a.src, a.dst].forEach(id => { const g = host.querySelector(`[data-obj="${id}"]`); if (g) g.classList.add("pulse"); }); });
      host.querySelector("#pbReset").addEventListener("click", () => { S = fresh(); draw(); });
      let down = null;
      svg.addEventListener("pointerdown", e => { const g = e.target.closest("[data-obj]"); down = g ? g.dataset.obj : null; });
      svg.addEventListener("pointerup", e => {
        const el = document.elementFromPoint(e.clientX, e.clientY), g = el && el.closest && el.closest("[data-obj]"), id = g ? g.dataset.obj : null;
        if (down && id && down !== id){ act(down, id); down = null; draw(); return; }
        down = null; if (!id) return; tap(id);
      });
      svg.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " "){ const g = e.target.closest("[data-obj]"); if (g){ e.preventDefault(); tap(g.dataset.obj); } } });
    }
    function tap(id){
      const st = STEPS[S.k];
      if (st && st.heat && S.tubes.t1.loc === "bath" && id === "ice"){ act("ice", "ice"); draw(); return; }
      if (!S.sel){ S.sel = id; say(`<b>${nameOf(id)}</b> picked. Now tap where it goes.`, ""); draw(); return; }
      if (S.sel === id){ S.sel = null; say("", ""); draw(); return; }
      const src = S.sel; S.sel = null; act(src, id); draw();
    }
    const tick = () => { if (!host.isConnected) return; const el = host.querySelector("#pbTimer"); if (el && S.bathT){ const sec = (performance.now() - S.bathT) / 1000 * SPEED; el.textContent = Math.floor(sec) + " s";
        if (sec > 75){ both("ice"); S.bathT = null; say("<b>Too long (75 seconds).</b> The membrane got too liquid to reform. The cells are damaged or killed. Try the heat shock again.", "bad"); draw(); } }
      requestAnimationFrame(tick); };
    S = fresh(); say("Tap an item, then tap where it goes. You can also drag it.", ""); draw(); requestAnimationFrame(tick);
  };
})();
