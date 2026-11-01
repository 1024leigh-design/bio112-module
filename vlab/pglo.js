/* Lab 15 interactive pieces: Follow the cells, the AraC switch, the UV glow, and the pGLO bench.
   All drawing is inline SVG. Animations stop on their own when the page moves on. */
(function(){
  const V = window.VLAB, A = window.ART, f1 = A.f1;
  const lerp = (a, b, k) => a + (b - a) * k, clamp = (v, a, b) => Math.max(a, Math.min(b, v)), ease = k => { k = clamp(k, 0, 1); return k * k * (3 - 2 * k); };
  const T = (x, y, s, o) => { o = o || {}; return `<text x="${f1(x)}" y="${f1(y)}" font-size="${o.fs || 15}" font-weight="${o.w || 700}" fill="${o.c || "currentColor"}" text-anchor="${o.a || "middle"}">${s}</text>`; };
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function loop(host, svg, draw){
    const t0 = performance.now();
    const tick = now => { if (!host.isConnected) return; svg.innerHTML = draw(reduce ? 99 : (now - t0) / 1000); requestAnimationFrame(tick); };
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
    const pos = [[-60, -66], [70, -60], [-20, 64], [96, 46]];
    function scene(t){
      const s = ST[k].id, a = ease(t / 1.6);
      const dark = s === "uv";
      let o = `<rect width="640" height="300" rx="14" fill="${dark ? "#120f2a" : s === "heat" ? "#fde7df" : s === "plate" ? "#f6efd9" : "#e9f5fb"}"/>`;
      o += T(160, 26, "+pGLO tube", {fs:16, c:dark ? "#fff" : "#1f8a55"}) + T(480, 26, "-pGLO tube", {fs:16, c:dark ? "#fff" : "#c43a2b"});
      [160, 480].forEach((cx, side) => {
        const cy = 160, plus = side === 0;
        if (s === "uv"){
          if (plus) for (let i = 0; i < 7; i++){ const x = cx - 54 + (i % 4) * 36, y = cy - 20 + Math.floor(i / 4) * 40; o += `<circle cx="${x}" cy="${y}" r="${f1(26 * (.6 + .4 * a))}" fill="#6dff95" opacity="${f1(.25 * a * 100) / 100}"/><circle cx="${x}" cy="${y}" r="15" fill="${a > .3 ? "#8dffad" : "#4c4a72"}"/>`; }
          else o += T(cx, cy, "No colony", {fs:18, c:"#fff"});
          o += T(cx, 276, plus ? "Glowing colony" : "Nothing grew", {fs:15, c:"#fff"});
          return;
        }
        const dead = !plus && s === "plate" && a > .7;
        const green = plus && s === "plate" ? ease((t - 1.6) / 1.4) : 0;
        o += cellShape(cx, cy, {dead, green:green || 0});
        if (["cacl2", "ice", "heat"].includes(s)) for (let i = 0; i < 8; i++){ const ang = i / 8 * 6.28 + t * .3, r = s === "cacl2" ? 112 : 96; o += ca(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r * .7); }
        if (plus){
          pos.forEach((p, i) => {
            let x = cx + p[0] * 1.6, y = cy + p[1] * 1.3 + Math.sin(t * 2 + i) * 4;
            if (s === "ice"){ x = lerp(x, cx + p[0] * 1.05, a); y = lerp(y, cy + (p[1] > 0 ? 44 : -44), a); }
            if (s === "heat"){ const inside = i < 2; x = cx + p[0] * (inside ? lerp(1.05, .5, a) : 1.05); y = cy + (p[1] > 0 ? (inside ? lerp(44, 14, a) : 44) : (inside ? lerp(-44, -14, a) : -44)); }
            if (["recover", "plate"].includes(s)){ if (i > 1) return; x = cx + p[0] * .5; y = cy + (p[1] > 0 ? 14 : -14); }
            o += plasmid(x, y);
          });
          if (s === "recover" || s === "plate") for (let i = 0; i < (s === "recover" ? Math.floor(clamp(t * 2, 0, 5)) : 5); i++) o += enzyme(cx - 50 + i * 22, cy + 26);
          if (s === "plate") for (let i = 0; i < Math.floor(clamp((t - 1.6) * 3, 0, 5)); i++) o += gfp(cx - 46 + i * 23, cy - 22, 1);
        }
        if (s === "plate"){
          for (let i = 0; i < 4; i++){ const ang = -2.6 + i * .5, r = lerp(140, plus ? 92 : 80, a); const x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r * .75; o += amp(x, y, plus && a > .9); }
          if (plus) for (let i = 0; i < 3; i++) o += arab(cx + 70 + i * 16 - a * 30, 252 - a * 40, 8);
          o += T(cx, 280, plus ? (green > .5 ? "Survives, makes GFP" : "Breaking down ampicillin") : (dead ? "Killed by ampicillin" : "No protection"), {fs:14, c:plus ? "#1f8a55" : "#c43a2b"});
        }
        if (s === "recover") o += T(cx, 280, plus ? "Making beta-lactamase" : "No plasmid, no beta-lactamase", {fs:14, c:plus ? "#a96c05" : "#53657b"});
        if (s === "heat") o += T(320, 286, "42°C for 45 seconds", {fs:16, c:"#c43a2b"});
      });
      return o + `<g transform="translate(560 220)">${s === "plate" ? `<polygon points="0,-6 7,6 -7,6" fill="#c43a2b"/>${T(14, 5, "amp", {fs:11, a:"start"})}` : ""}</g>`;
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
    const tick = now => { if (!host.isConnected) return; svg.innerHTML = scene(reduce ? 99 : (now - tStage) / 1000); requestAnimationFrame(tick); };
    draw(); requestAnimationFrame(tick);
  };

  /* ================= AraC switch ================= */
  V.sims.arac = (host, spec) => {
    let on = false, tOn = 0;
    host.innerHTML = `<div class="btnrow"><button type="button" class="opt sel" data-ara="0" aria-pressed="true">No arabinose</button><button type="button" class="opt" data-ara="1" aria-pressed="false">Add arabinose</button></div>
      <div class="svgbox anim" style="margin-top:10px"><svg viewBox="0 0 640 270" role="img" aria-label="AraC, RNA polymerase, and the GFP gene"></svg></div><p class="msg" id="acCap"></p>`;
    const svg = host.querySelector("svg"), cap = host.querySelector("#acCap");
    const setCap = () => { cap.className = "msg " + (on ? "good" : ""); cap.innerHTML = on ? spec.onCap : spec.offCap; };
    host.querySelectorAll("[data-ara]").forEach(b => b.addEventListener("click", () => { on = b.dataset.ara === "1"; tOn = performance.now();
      host.querySelectorAll("[data-ara]").forEach(x => { const me = x === b; x.classList.toggle("sel", me); x.setAttribute("aria-pressed", String(me)); }); setCap(); }));
    setCap();
    const t0 = performance.now();
    function scene(now){
      const t = (now - t0) / 1000, ts = reduce ? 99 : (now - tOn) / 1000, y = 200;
      let o = `<rect width="640" height="270" rx="14" fill="var(--surface)"/>`;
      o += `<rect x="30" y="${y}" width="170" height="26" rx="6" fill="#a96c05"/>${T(115, y + 18, "araC gene", {fs:14, c:"#fff"})}<rect x="200" y="${y}" width="70" height="26" fill="#5a2a98"/>${T(235, y + 18, "pBAD", {fs:13, c:"#fff"})}<rect x="270" y="${y}" width="340" height="26" rx="6" fill="${on && ts > 2.2 ? "#1f8a55" : "#9aa7b5"}"/>${T(440, y + 18, "GFP gene", {fs:14, c:"#fff"})}`;
      if (!on){
        o += `<g transform="translate(235 ${y - 34})"><polygon points="-22,-9 -9,-22 9,-22 22,-9 22,9 9,22 -9,22 -22,9" fill="#c43a2b" stroke="#fff" stroke-width="2"/>${T(0, 5, "STOP", {fs:11, c:"#fff"})}</g>${T(235, y - 64, "AraC", {fs:14, c:"#c43a2b"})}`;
        const ph = (t % 2.4) / 2.4, x = ph < .5 ? lerp(90, 178, ease(ph * 2)) : lerp(178, 90, ease((ph - .5) * 2));
        o += `<ellipse cx="${f1(x)}" cy="${y - 22}" rx="34" ry="20" fill="#3f7bd1"/>${T(x, y - 17, "RNA pol", {fs:12, c:"#fff"})}`;
        if (ph > .42 && ph < .58) o += T(205, y - 50, "blocked!", {fs:14, c:"#c43a2b"});
        o += T(500, 60, "GFP OFF", {fs:22, c:"#53657b"});
      } else {
        const drop = ease(ts / 1.2), morph = ease((ts - 1.1) / .7);
        for (let i = 0; i < 3; i++) o += arab(lerp(150 + i * 60, 222 + i * 9, drop), lerp(40, y - 44, drop), 10);
        const ax = 235, ay = y - 34 - morph * 16;
        o += morph < .5 ? `<g transform="translate(${ax} ${ay})"><polygon points="-22,-9 -9,-22 9,-22 22,-9 22,9 9,22 -9,22 -22,9" fill="#c43a2b"/>${T(0, 5, "STOP", {fs:11, c:"#fff"})}</g>`
          : `<g transform="translate(${ax} ${ay})"><circle r="24" fill="#1f8a55"/>${T(0, 5, "GO", {fs:13, c:"#fff"})}</g>`;
        o += T(ax, ay - 34, morph < .5 ? "Arabinose binds AraC" : "AraC changes shape", {fs:14, c:morph < .5 ? "#c2185b" : "#1f8a55"});
        if (ts > 1.9){
          const run = ((ts - 1.9) % 3.2) / 3.2, x = lerp(250, 600, run);
          o += `<line x1="270" y1="${y - 6}" x2="${f1(Math.max(270, x - 30))}" y2="${y - 6}" stroke="#c2185b" stroke-width="4" stroke-dasharray="7 4"/>`;
          o += `<ellipse cx="${f1(x)}" cy="${y - 22}" rx="34" ry="20" fill="#3f7bd1"/>${T(x, y - 17, "RNA pol", {fs:12, c:"#fff"})}`;
          const made = Math.min(8, Math.floor((ts - 1.9) / 1.1));
          for (let i = 0; i < made; i++) o += gfp(330 + (i % 4) * 70, 70 + Math.floor(i / 4) * 44 + Math.sin(t * 2 + i) * 3, 1 + .25 * Math.sin(t * 3 + i));
          o += T(570, 48, "GFP ON", {fs:22, c:"#1f8a55"});
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
      const t = reduce ? 99 : (now - tOn) / 1000;
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
      o += T(zx + 192, 296, "UV in: short wavelength, more energy. Green out: longer wavelength, less energy.", {fs:11, w:400, c:zc});
      return o;
    }
    const tick = now => { if (!host.isConnected) return; svg.innerHTML = scene(now); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
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
      {text:"Set the pipette to <b>400 µL</b>. Move ice-cold CaCl₂ into <b>Tube 1</b>.", done:"400 µL CaCl₂ into Tube 1",
        acts:[{src:"cacl2", dst:"t1", vol:400, ok:"400 µL of ice-cold CaCl₂ is in Tube 1.", fx:() => { S.tubes.t1.vol = 400; }}]},
      {text:"Use the <b>loop</b>: move one or two colonies from the <b>starter plate</b> into <b>Tube 1</b>. Mix well.", done:"Colonies mixed into Tube 1",
        acts:[{src:"start", dst:"t1", ok:"The colonies are mixed in. The cells are now in ice-cold CaCl₂.", fx:() => { S.tubes.t1.cells = true; }}]},
      {text:"Set the pipette to <b>200 µL</b>. Split the cells: move 200 µL from Tube 1 into <b>Tube 2</b>.", done:"Split: 200 µL into Tube 2",
        acts:[{src:"t1", dst:"t2", vol:200, ok:"Each tube now has 200 µL of cells.", fx:() => { S.tubes.t1.vol = 200; S.tubes.t2.vol = 200; S.tubes.t2.cells = true; }}]},
      {text:"Label the tubes.", done:"Labeled +pGLO and -pGLO", button:"Label: Tube 1 = +pGLO, Tube 2 = -pGLO", fx:() => { S.tubes.t1.label = "+pGLO"; S.tubes.t2.label = "-pGLO"; }, ok:"Labeled! Tube 2 (-pGLO) is your control."},
      {text:"Set the pipette to <b>4 µL</b>. Add pGLO plasmid to the <b>+pGLO</b> tube only.", done:"4 µL pGLO into +pGLO",
        acts:[{src:"plasmid", dst:"t1", vol:4, ok:"The plasmid is in the +pGLO tube.", fx:() => { S.tubes.t1.plasmid = true; S.tubes.t1.vol = 204; }}],
        oops:{"plasmid>t2":"Stop! That is the <b>-pGLO</b> tube. If it gets plasmid too, you lose your control. Add the plasmid to +pGLO only."}},
      {text:"Move <b>both</b> tubes onto the <b>ice</b>.", done:"Both tubes on ice",
        acts:[{src:"t1", dst:"ice", ok:"+pGLO is on ice.", fx:() => { S.tubes.t1.loc = "ice"; }}, {src:"t2", dst:"ice", ok:"-pGLO is on ice.", fx:() => { S.tubes.t2.loc = "ice"; }}]},
      {text:"Keep both tubes on ice for about 1 hour.", done:"About 1 hour on ice", button:"⏩ About 1 hour later", ok:"An hour on ice. Ca²⁺ shields the charges so the plasmid can get close to the cells."},
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
    const NAMES = {cacl2:"CaCl₂", start:"starter plate", plasmid:"pGLO plasmid", lb:"LB broth", t1:"Tube 1", t2:"Tube 2", ice:"ice", bath:"water bath", incub:"incubator"};
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
        if (sec < 40){ say(`<b>Too short (${Math.round(sec)} seconds).</b> Few cells take up the plasmid. Try the heat shock again.`, "bad"); return; }
        if (sec > 50){ say(`<b>Too long (${Math.round(sec)} seconds).</b> The cells are damaged or killed. Try the heat shock again.`, "bad"); return; }
        say(`<b>${Math.round(sec)} seconds. Nice timing!</b> The quick heat shock helps the plasmid get into the cells.`, "good"); stepDone(); return;
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
        if (sec > 75){ both("ice"); S.bathT = null; say("<b>Too long (75 seconds).</b> The cells are damaged or killed. Try the heat shock again.", "bad"); draw(); } }
      requestAnimationFrame(tick); };
    S = fresh(); say("Tap an item, then tap where it goes. You can also drag it.", ""); draw(); requestAnimationFrame(tick);
  };
})();
