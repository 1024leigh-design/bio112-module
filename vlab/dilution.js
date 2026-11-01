/* Lab 14 calculators: total dilution (pick a tube) and the CFU estimate.
   Every number in the equation is color matched to the picture it came from, with arrows. */
(function(){
  const V = window.VLAB, A = window.ART, f1 = A.f1;
  const T = (x, y, s, o) => { o = o || {}; return `<text x="${f1(x)}" y="${f1(y)}" font-size="${o.fs || 15}" font-weight="${o.w || 700}" fill="${o.c || "currentColor"}" text-anchor="${o.a || "middle"}">${s}</text>`; };
  const COL = ["#1683cc", "#c2185b", "#1f8a55", "#a96c05", "#5a2a98", "#e4572e"];
  const NAMES = "ABCDEF".split("");
  const PROTOCOL = [[0.1, 9.9], [0.1, 9.9], [1, 9], [1, 9], [1, 9], [1, 9]];
  const PAIRS = [[1, 9], [0.1, 9.9], [0.5, 4.5], [1, 99], [0.2, 1.8], [1, 4]];
  const randTubes = () => Array.from({length:6}, () => V.pick(PAIRS));
  const den = ([a, w]) => Math.round((a + w) / a);
  const p10 = n => { const e = Math.log10(n); return Math.abs(e - Math.round(e)) < 1e-9 ? Math.round(e) : null; };
  /* "10^-5" in SVG text, or 1/N when it is not a power of 10 */
  const supSVG = (base, e, fs) => `${base}<tspan dy="${-fs * .45}" font-size="${f1(fs * .7)}">${e}</tspan><tspan dy="${fs * .45}"> </tspan>`;
  const dilSVG = (d, fs) => { const e = p10(1 / d); return e !== null ? supSVG("10", -e, fs) : `1/${Math.round(1 / d).toLocaleString("en-US")}`; };
  const dilHTML = d => { const e = p10(1 / d); return e !== null ? `10<sup>${-e}</sup>` : `1/${Math.round(1 / d).toLocaleString("en-US")}`; };
  const arrowTo = (x1, y1, x2, y2, c) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 9, mx = (x1 + x2) / 2;
    return `<path d="M${f1(x1)},${f1(y1)} C${f1(x1)},${f1((y1 + y2) / 2)} ${f1(x2)},${f1((y1 + y2) / 2)} ${f1(x2)},${f1(y2 - 4)}" fill="none" stroke="${c}" stroke-width="2.5" stroke-dasharray="5 4"/><path d="M${f1(x2)},${f1(y2)} l-6,-10 l12,0 Z" fill="${c}"/>`; };
  const tubeAt = (x, y, cloudy, sc) => `<g transform="translate(${f1(x - 40 * sc)} ${y}) scale(${sc})">${A.tube({kind:"broth", medium:"#f3e9c7", cloudy:cloudy ? "#e3d29a" : ""}).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</g>`;
  const challengeUI = id => `<label class="switch"><input type="checkbox" id="${id}"> Challenge mode: random volumes</label>`;

  /* ================= total dilution ================= */
  V.sims.dilchain = host => {
    let tubes = PROTOCOL, k = 2, step = 0, challenge = false;
    host.innerHTML = `<div class="eqctrl"><span><b>Pick a tube:</b></span><div class="tubepick" id="dcPick"></div></div>
      <div class="eqctrl" style="margin-top:8px">${challengeUI("dcCh")}</div>
      <div class="eqwrap"><div class="svgscroll"><svg id="dcSvg" viewBox="0 0 680 330" role="img" aria-label="Dilution series with the total dilution equation"></svg></div>
      <div class="msg" id="dcCap" style="width:100%"></div>
      <div class="eqctrl"><button type="button" class="btn" id="dcNext">Next step</button><button type="button" class="btn ghost" id="dcAll">Show all</button><button type="button" class="btn ghost" id="dcReset">Start over</button></div></div>`;
    const svg = host.querySelector("#dcSvg"), cap = host.querySelector("#dcCap");
    const totals = () => tubes.reduce((acc, t, i) => { acc.push((i ? acc[i - 1] : 1) / den(t)); return acc; }, []);
    function draw(){
      host.querySelector("#dcPick").innerHTML = NAMES.map((n, i) => `<button type="button" class="opt ${i === k ? "sel" : ""}" data-k="${i}" aria-pressed="${i === k}">${n}</button>`).join("");
      host.querySelectorAll("#dcPick [data-k]").forEach(b => b.addEventListener("click", () => { k = +b.dataset.k; step = 0; draw(); }));
      const tot = totals(), n = k + 1, X = i => 40 + (i + 1) * 92;
      let o = tubeAt(40, 38, true, .42) + T(40, 150, "Culture", {fs:12});
      tubes.forEach((t, i) => { const x = X(i), on = i <= k, shown = i < step;
        o += `<g opacity="${on ? 1 : .3}">` + tubeAt(x, 38, i < 3, .42);
        o += `<path d="M${X(i - 1) + 14},34 Q${(X(i - 1) + x) / 2},4 ${x - 14},34" fill="none" stroke="${on ? "#53657b" : "#9aa7b5"}" stroke-width="2"/><path d="M${x - 14},34 l-9,-4 l3,9 Z" fill="${on ? "#53657b" : "#9aa7b5"}"/>`;
        o += T((X(i - 1) + x) / 2, 14, t[0] + " mL", {fs:12, c:"#53657b"}) + T(x, 34, NAMES[i], {fs:16});
        o += T(x, 140, t[1] + " mL water", {fs:11, w:400});
        o += `<rect x="${x - 34}" y="152" width="68" height="28" rx="14" fill="${on ? (shown ? COL[i] : "var(--surface-2)") : "var(--surface-2)"}" stroke="${on ? COL[i] : "#9aa7b5"}" stroke-width="2"/>` + T(x, 171, on && shown ? "1/" + den(t) : "?", {fs:14, c:on && shown ? "#fff" : on ? COL[i] : "#9aa7b5"});
        o += `</g>`; });
      /* equation */
      const fw = 76, startX = 340 - (n - 1) * fw / 2;
      o += T(Math.max(20, startX - 54), 240, `Tube ${NAMES[k]} =`, {fs:16, a:"end"});
      for (let i = 0; i < n; i++){ const fx = startX + i * fw;
        if (i < step){ o += arrowTo(X(i), 182, fx, 220, COL[i]) + T(fx, 242, "1/" + den(tubes[i]), {fs:20, c:COL[i]}); }
        else o += `<rect x="${fx - 26}" y="222" width="52" height="28" rx="8" fill="none" stroke="#9aa7b5" stroke-dasharray="4 3"/>`;
        if (i < n - 1) o += T(fx + fw / 2, 242, "×", {fs:20}); }
      if (step > n){ o += T(340, 300, `= 1/${Math.round(1 / tot[k]).toLocaleString("en-US")}  =  `, {fs:22, a:"end", c:"#1f8a55"}) + `<text x="350" y="300" font-size="26" font-weight="800" fill="#1f8a55">${dilSVG(tot[k], 26)}</text>`; }
      svg.innerHTML = o;
      /* caption */
      let c;
      if (step === 0) c = `<b>Tube ${NAMES[k]}</b> went through <b>${n}</b> tube${n > 1 ? "s" : ""}. Tap <b>Next step</b> to find each dilution factor.`;
      else if (step <= n){ const t = tubes[step - 1]; c = `<b style="color:${COL[step - 1]}">Tube ${NAMES[step - 1]}:</b> ${t[0]} mL added + ${t[1]} mL water = <b>${+(t[0] + t[1]).toFixed(2)} mL total</b>. Dilution factor = ${t[0]} ÷ ${+(t[0] + t[1]).toFixed(2)} = <b>1/${den(t)}</b>.`; }
      else { const es = tubes.slice(0, n).map(t => p10(den(t))); const allP = es.every(e => e !== null);
        c = `<b>Multiply them.</b> Total dilution of tube ${NAMES[k]} = <b>${dilHTML(tot[k])}</b>.` + (allP ? ` Shortcut: add the exponents: ${es.map(e => "-" + e).join(" + ")} = <b>-${es.reduce((a, b) => a + b, 0)}</b>.` : ""); }
      cap.innerHTML = c;
      host.querySelector("#dcNext").disabled = step > n;
    }
    host.querySelector("#dcNext").addEventListener("click", () => { step++; draw(); });
    host.querySelector("#dcAll").addEventListener("click", () => { step = k + 2; draw(); });
    host.querySelector("#dcReset").addEventListener("click", () => { step = 0; if (challenge) tubes = randTubes(); draw(); });
    host.querySelector("#dcCh").addEventListener("change", e => { challenge = e.target.checked; tubes = challenge ? randTubes() : PROTOCOL; step = 0; draw(); });
    draw();
  };

  /* ================= CFU estimate ================= */
  V.sims.cfucalc = host => {
    let tubes = PROTOCOL, k = 4, step = 0, challenge = false, ul = 100, N0;
    const newCulture = () => { N0 = (2.1 + Math.random() * 7.6) * 1e9; };
    newCulture();
    host.innerHTML = `<div class="eqctrl"><span><b>Plate from tube:</b></span><div class="tubepick" id="cfPick"></div></div>
      <div class="eqctrl" style="margin-top:8px">${challengeUI("cfCh")}<button type="button" class="btn ghost small" id="cfNew">New culture</button></div>
      <div class="eqwrap"><div class="svgscroll"><svg id="cfSvg" viewBox="0 0 680 350" role="img" aria-label="Plate, tube, and pipette feeding the cells per mL equation"></svg></div>
      <div class="result" id="cfRes"></div><div class="msg" id="cfCap" style="width:100%"></div>
      <div class="eqctrl"><button type="button" class="btn" id="cfNext">Next step</button><button type="button" class="btn ghost" id="cfAll">Show all</button><button type="button" class="btn ghost" id="cfReset">Start over</button></div></div>`;
    const svg = host.querySelector("#cfSvg"), cap = host.querySelector("#cfCap"), res = host.querySelector("#cfRes");
    const C1 = "#c2185b", C2 = "#1683cc", C3 = "#a96c05";
    const posCache = {};
    function plateFor(n, key){
      if (n > 200) return A.plate({colonies:A.scatter(380, 7, "white", 1.4, 2.2)});
      if (!posCache[key]){ const R = A.rng(n * 31 + 7), pts = []; let g = 0; while (pts.length < n && g++ < 20000){ const a = R() * 6.28, rr = Math.sqrt(R()) * 76, x = 100 + Math.cos(a) * rr, y = 100 + Math.sin(a) * rr; if (pts.every(p => Math.hypot(p.x - x, p.y - y) > 7.5)) pts.push({x, y, r:2.8, c:"white"}); } posCache[key] = pts; }
      return A.plate({colonies:posCache[key]});
    }
    function draw(){
      host.querySelector("#cfPick").innerHTML = NAMES.map((n, i) => `<button type="button" class="opt ${i === k ? "sel" : ""}" data-k="${i}" aria-pressed="${i === k}">${n}</button>`).join("");
      host.querySelectorAll("#cfPick [data-k]").forEach(b => b.addEventListener("click", () => { k = +b.dataset.k; step = 0; draw(); }));
      const tot = tubes.reduce((acc, t, i) => { acc.push((i ? acc[i - 1] : 1) / den(t)); return acc; }, [])[k];
      const ml = ul / 1000, n = Math.round(N0 * tot * ml), tntc = n > 200, none = n < 1;
      let o = `<g transform="translate(60 6) scale(.62)">${plateFor(n, k + ":" + n).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</g>`;
      o += T(122, 150, `Plate ${NAMES[k]}`, {fs:15, c:C1}) + T(122, 170, tntc ? "TNTC (more than 200)" : `${n} colonies`, {fs:15, c:C1});
      o += tubeAt(340, 18, true, .5) + T(340, 150, `Tube ${NAMES[k]}`, {fs:15, c:C2}) + `<text x="340" y="170" font-size="15" font-weight="700" fill="${C2}" text-anchor="middle">total ${dilSVG(tot, 15)}</text>`;
      o += `<g transform="translate(520 20) scale(1.7)">${A.ico("pipette").replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</g>` + T(570, 150, `Plated ${ul} µL`, {fs:15, c:C3}) + T(570, 170, `= ${ml} mL`, {fs:15, c:C3});
      if (tntc || none){ svg.innerHTML = o + T(340, 260, tntc ? "Too many to count. Pick a more dilute tube." : "No colonies to count. Pick a less dilute tube.", {fs:18, c:"#c43a2b"});
        res.innerHTML = ""; cap.innerHTML = tntc ? `<b>Plate ${NAMES[k]} is TNTC.</b> More than 200 colonies: write "TNTC" and do not use it. Try a tube further down the series.` : `<b>Plate ${NAMES[k]} has no colonies.</b> Try a tube earlier in the series.`;
        host.querySelector("#cfNext").disabled = true; return; }
      host.querySelector("#cfNext").disabled = step >= 5;
      o += T(250, 268, "cells/mL =", {fs:20, a:"end"});
      o += `<line x1="270" y1="262" x2="560" y2="262" stroke="currentColor" stroke-width="3"/>`;
      if (step >= 1) o += arrowTo(122, 180, 415, 220, C1) + T(415, 248, String(n), {fs:26, c:C1}); else o += `<rect x="385" y="222" width="60" height="32" rx="8" fill="none" stroke="#9aa7b5" stroke-dasharray="4 3"/>`;
      if (step >= 2) o += arrowTo(340, 180, 350, 278, C2) + `<text x="350" y="304" font-size="24" font-weight="700" fill="${C2}" text-anchor="middle">${dilSVG(tot, 24)}</text>`; else o += `<rect x="318" y="278" width="64" height="32" rx="8" fill="none" stroke="#9aa7b5" stroke-dasharray="4 3"/>`;
      o += T(418, 304, "×", {fs:22});
      if (step >= 3) o += arrowTo(570, 180, 490, 278, C3) + T(490, 304, `${ml} mL`, {fs:22, c:C3}); else o += `<rect x="456" y="278" width="70" height="32" rx="8" fill="none" stroke="#9aa7b5" stroke-dasharray="4 3"/>`;
      if (step >= 4) o += `<text x="415" y="340" font-size="17" font-weight="700" fill="#53657b" text-anchor="middle">bottom: ${dilSVG(tot, 17)} × ${ml} = ${dilSVG(tot * ml, 17)}</text>`;
      svg.innerHTML = o;
      const ans = n / (tot * ml);
      res.innerHTML = step >= 5 ? `= ${V.sci(ans, 2)} cells/mL` : "";
      cap.innerHTML = [
        `Plate ${NAMES[k]} is countable. Tap <b>Next step</b> to build the equation.`,
        `<b style="color:${C1}">Colonies (CFUs) go on top:</b> ${n}, counted on plate ${NAMES[k]}.`,
        `<b style="color:${C2}">Total dilution goes on the bottom:</b> tube ${NAMES[k]} is ${dilHTML(tot)}. (Find it on the Total dilution tab.)`,
        `<b style="color:${C3}">Volume plated goes on the bottom too, in mL:</b> ${ul} µL ÷ 1000 = ${ml} mL.`,
        `<b>Multiply the bottom first:</b> ${dilHTML(tot)} × ${ml} = ${dilHTML(tot * ml)}.`,
        `<b>Divide:</b> ${n} ÷ ${dilHTML(tot * ml)} = <b>${V.sci(ans, 2)} cells/mL</b>. Do not forget the units!`][step];
    }
    host.querySelector("#cfNext").addEventListener("click", () => { step++; draw(); });
    host.querySelector("#cfAll").addEventListener("click", () => { step = 5; draw(); });
    host.querySelector("#cfReset").addEventListener("click", () => { step = 0; draw(); });
    host.querySelector("#cfNew").addEventListener("click", () => { newCulture(); if (challenge){ tubes = randTubes(); ul = V.pick([50, 100, 200]); } step = 0; draw(); });
    host.querySelector("#cfCh").addEventListener("change", e => { challenge = e.target.checked; tubes = challenge ? randTubes() : PROTOCOL; ul = challenge ? V.pick([50, 100, 200]) : 100; newCulture(); step = 0; draw(); });
    draw();
  };

  /* one tube: where the dilution factor comes from */
  A.figs.dfone = sp => {
    const a = sp.a, w = sp.w, tot = +(a + w).toFixed(2), d = Math.round(tot / a), C = sp.c || "#1683cc";
    let o = tubeAt(50, 20, true, .38) + T(50, 120, `${a} mL`, {fs:15, c:C}) + T(50, 138, "added", {fs:12, w:400});
    o += `<path d="M70,50 Q110,20 150,50" fill="none" stroke="${C}" stroke-width="3"/><path d="M150,50 l-10,-3 l4,9 Z" fill="${C}"/>`;
    o += tubeAt(175, 20, false, .38) + T(175, 120, `${w} mL`, {fs:15, c:"#53657b"}) + T(175, 138, "water", {fs:12, w:400});
    o += T(255, 76, "=", {fs:24}) + T(330, 66, `${tot} mL`, {fs:18}) + T(330, 88, "total", {fs:13, w:400});
    o += `<line x1="70" y1="166" x2="330" y2="166" stroke="currentColor" stroke-width="0"/>`;
    o += T(150, 186, `${a}`, {fs:22, c:C}) + `<line x1="118" y1="196" x2="182" y2="196" stroke="currentColor" stroke-width="2.5"/>` + T(150, 220, `${tot}`, {fs:22});
    o += T(225, 206, "=", {fs:24}) + T(300, 210, `1/${d}`, {fs:30, c:"#1f8a55"});
    o += `<path d="M50,146 Q60,170 112,182" fill="none" stroke="${C}" stroke-width="2" stroke-dasharray="4 3"/><path d="M330,96 Q330,180 186,214" fill="none" stroke="#53657b" stroke-width="2" stroke-dasharray="4 3"/>`;
    return `<svg viewBox="0 0 400 236" role="img" aria-label="${a} mL into ${w} mL water gives a 1/${d} dilution" style="color:var(--ink)">${o}</svg>`;
  };
})();
