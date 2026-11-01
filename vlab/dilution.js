/* Lab 14 calculators: total dilution (pick a tube) and the CFU estimate, plus the exponent review.
   Every number in an equation sits straight below the picture it came from, with a matching color and arrow. */
(function(){
  const V = window.VLAB, A = window.ART, f1 = A.f1;
  const T = (x, y, s, o) => { o = o || {}; return `<text x="${f1(x)}" y="${f1(y)}" font-size="${o.fs || 15}" font-weight="${o.w || 700}" fill="${o.c || "currentColor"}" text-anchor="${o.a || "middle"}">${s}</text>`; };
  const COL = ["#1683cc", "#c2185b", "#1f8a55", "#a96c05", "#5a2a98", "#e4572e"];
  const NAMES = "ABCDEF".split("");
  const PROTOCOL = [[0.1, 9.9], [0.1, 9.9], [1, 9], [1, 9], [1, 9], [1, 9]];
  const PAIRS = [[1, 9], [0.1, 9.9], [0.5, 4.5], [1, 99], [0.2, 1.8], [1, 4]];
  const randTubes = () => Array.from({length:6}, () => V.pick(PAIRS));
  const den = ([a, w]) => Math.round((a + w) / a);
  const tot = t => +(t[0] + t[1]).toFixed(2);
  const fmt = n => n.toLocaleString("en-US");
  const p10 = n => { const e = Math.log10(n); return Math.abs(e - Math.round(e)) < 1e-9 ? Math.round(e) : null; };
  const supSVG = (base, e, fs) => `${base}<tspan dy="${f1(-fs * .45)}" font-size="${f1(fs * .7)}">${e}</tspan><tspan dy="${f1(fs * .45)}"> </tspan>`;
  const dilSVG = (d, fs) => { const e = p10(1 / d); return e !== null ? supSVG("10", -e, fs) : `1/${fmt(Math.round(1 / d))}`; };
  const dilHTML = d => { const e = p10(1 / d); return e !== null ? `10<sup>${-e}</sup>` : `1/${fmt(Math.round(1 / d))}`; };
  /* a straight down arrow, ending just above y2 */
  const down = (x, y1, y2, c) => `<line x1="${f1(x)}" y1="${f1(y1)}" x2="${f1(x)}" y2="${f1(y2 - 9)}" stroke="${c}" stroke-width="2.5" stroke-dasharray="5 4"/><path d="M${f1(x)},${f1(y2)} l-6,-10 l12,0 Z" fill="${c}"/>`;
  const slot = (x, y, w) => `<rect x="${f1(x - w / 2)}" y="${f1(y - 24)}" width="${w}" height="32" rx="8" fill="none" stroke="#9aa7b5" stroke-dasharray="4 3"/>`;
  const tubeAt = (x, y, cloudy, sc) => `<g transform="translate(${f1(x - 40 * sc)} ${y}) scale(${sc})">${A.tube({kind:"broth", medium:"#f3e9c7", cloudy:cloudy ? "#e3d29a" : ""}).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</g>`;
  const challengeUI = id => `<label class="switch"><input type="checkbox" id="${id}"> Challenge mode: random volumes</label>`;
  const reviewBtn = `<button type="button" class="btn ghost small" data-review="exp">Exponent review</button>`;
  /* scientific notation in HTML with the steps to get there: n x 10^e  ->  m x 10^E */
  const sciSteps = (n, e) => { const digits = String(Math.round(n)).length - 1, m = +(n / Math.pow(10, digits)).toFixed(2);
    return {m, E:e + digits, digits}; };

  /* ================= total dilution ================= */
  V.sims.dilchain = host => {
    let tubes = PROTOCOL, k = 2, step = 0, challenge = false;
    host.innerHTML = `<div class="eqctrl"><span><b>Pick a tube:</b></span><div class="tubepick" id="dcPick"></div></div>
      <div class="eqctrl" style="margin-top:8px">${challengeUI("dcCh")}${reviewBtn}</div>
      <div class="eqwrap"><div class="svgscroll"><svg id="dcSvg" viewBox="0 0 680 330" role="img" aria-label="Dilution series with the total dilution equation"></svg></div>
      <div class="msg" id="dcCap" style="width:100%"></div>
      <div class="eqctrl"><button type="button" class="btn" id="dcNext">Next step</button><button type="button" class="btn ghost" id="dcAll">Show all</button><button type="button" class="btn ghost" id="dcReset">Start over</button></div></div>`;
    const svg = host.querySelector("#dcSvg"), cap = host.querySelector("#dcCap");
    const totals = () => tubes.reduce((acc, t, i) => { acc.push((i ? acc[i - 1] : 1) / den(t)); return acc; }, []);
    function draw(){
      host.querySelector("#dcPick").innerHTML = NAMES.map((n, i) => `<button type="button" class="opt ${i === k ? "sel" : ""}" data-k="${i}" aria-pressed="${i === k}">${n}</button>`).join("");
      host.querySelectorAll("#dcPick [data-k]").forEach(b => b.addEventListener("click", () => { k = +b.dataset.k; step = 0; draw(); }));
      const tt = totals(), n = k + 1, X = i => 40 + (i + 1) * 92;
      let o = tubeAt(40, 38, true, .42) + T(40, 150, "Culture", {fs:12});
      tubes.forEach((t, i) => { const x = X(i), on = i <= k, shown = i < step;
        o += `<g opacity="${on ? 1 : .3}">` + tubeAt(x, 38, i < 3, .42);
        o += `<path d="M${X(i - 1) + 14},34 Q${(X(i - 1) + x) / 2},4 ${x - 14},34" fill="none" stroke="#53657b" stroke-width="2"/><path d="M${x - 14},34 l-9,-4 l3,9 Z" fill="#53657b"/>`;
        o += T((X(i - 1) + x) / 2, 14, t[0] + " mL", {fs:12, c:"#53657b"}) + T(x, 34, NAMES[i], {fs:16});
        o += T(x, 140, t[1] + " mL water", {fs:11, w:400});
        o += `<rect x="${x - 34}" y="152" width="68" height="28" rx="14" fill="${on && shown ? COL[i] : "var(--surface-2)"}" stroke="${on ? COL[i] : "#9aa7b5"}" stroke-width="2"/>` + T(x, 171, on && shown ? "1/" + den(t) : "?", {fs:14, c:on && shown ? "#fff" : on ? COL[i] : "#9aa7b5"});
        o += `</g>`;
        /* the factor sits straight below its own tube */
        if (on){ if (shown) o += down(x, 184, 222, COL[i]) + T(x, 246, "1/" + den(t), {fs:20, c:COL[i]}); else o += slot(x, 246, 60);
          if (i < k) o += T(x + 46, 246, "×", {fs:22}); } });
      o += T(28, 246, `${NAMES[k]} =`, {fs:17, a:"start"});
      if (step > n) o += T(340, 300, `= 1/${fmt(Math.round(1 / tt[k]))}  =  `, {fs:22, a:"end", c:"#1f8a55"}) + `<text x="350" y="300" font-size="26" font-weight="800" fill="#1f8a55">${dilSVG(tt[k], 26)}</text>`;
      svg.innerHTML = o;
      let c;
      if (step === 0) c = `To reach <b>tube ${NAMES[k]}</b>, the cells go through <b>${n}</b> tube${n > 1 ? "s" : ""}: ${NAMES.slice(0, n).join(", ")}. Each tube dilutes them again. Tap <b>Next step</b> to find each tube's dilution factor.`;
      else if (step <= n){ const i = step - 1, t = tubes[i], from = i ? `tube ${NAMES[i - 1]}` : "the original culture";
        c = `<b style="color:${COL[i]}">Tube ${NAMES[i]}:</b> you moved <b>${t[0]} mL</b> from ${from} into <b>${t[1]} mL</b> of sterile water.<br>
          Total volume = ${t[0]} + ${t[1]} = <b>${tot(t)} mL</b>.<br>
          Dilution factor = volume added ÷ total volume = ${t[0]} ÷ ${tot(t)} = <b>1/${den(t)}</b>.<br>
          So the cells in tube ${NAMES[i]} are <b>${den(t)} times</b> more dilute than in ${from}.`; }
      else { const d = tubes.slice(0, n).map(den), es = d.map(p10), allP = es.every(e => e !== null), big = Math.round(1 / tt[k]);
        c = `<b>Multiply all ${n} dilution factors.</b><br>Multiply the bottoms: ${d.join(" × ")} = <b>${fmt(big)}</b>. So the total dilution is <b>1/${fmt(big)}</b>.<br>` +
          (allP ? `${fmt(big)} is a 1 followed by <b>${es.reduce((a, b) => a + b, 0)} zeros</b>, so 1/${fmt(big)} = <b>10<sup>-${es.reduce((a, b) => a + b, 0)}</sup></b>.<br>Shortcut: add the exponents. ${es.map(e => `10<sup>-${e}</sup>`).join(" × ")}: ${es.map(e => "-" + e).join(" + ")} = <b>-${es.reduce((a, b) => a + b, 0)}</b>.`
                : `This is not a power of 10, so you can leave it as 1/${fmt(big)}, or write it as ${V.sci(1 / big, 2)}.`); }
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
  /* Our protocol cultures sit between 1.1 and 1.95 x 10^9 cells/mL, so plates D, E, and F are all countable. */
  V.newCulture = () => (1.1 + Math.random() * .85) * 1e9;
  V.sims.cfucalc = host => {
    let tubes = PROTOCOL, k = 3, step = 0, challenge = false, ul = 100, N0 = V.newCulture();
    host.innerHTML = `<div class="eqctrl"><span><b>Plate from tube:</b></span><div class="tubepick" id="cfPick"></div></div>
      <div class="eqctrl" style="margin-top:8px">${challengeUI("cfCh")}<button type="button" class="btn ghost small" id="cfNew">New culture</button>${reviewBtn}</div>
      <div class="eqwrap"><div class="svgscroll"><svg id="cfSvg" viewBox="0 0 680 330" role="img" aria-label="Plate, tube, and pipette feeding the cells per mL equation"></svg></div>
      <div class="result" id="cfRes"></div><div class="msg" id="cfCap" style="width:100%"></div>
      <div class="eqctrl"><button type="button" class="btn" id="cfNext">Next step</button><button type="button" class="btn ghost" id="cfAll">Show all</button><button type="button" class="btn ghost" id="cfReset">Start over</button></div></div>`;
    const svg = host.querySelector("#cfSvg"), cap = host.querySelector("#cfCap"), res = host.querySelector("#cfRes");
    const C1 = "#c2185b", C2 = "#1683cc", C3 = "#a96c05";
    const XP = 200, XT = 400, XV = 560; /* plate, tube, pipette columns: each number lands straight below its picture */
    const posCache = {};
    function plateFor(n, key){
      if (n > 200) return A.plate({colonies:A.scatter(380, 7, "white", 1.4, 2.2)});
      if (!posCache[key]){ const R = A.rng(n * 31 + 7), pts = []; let g = 0; while (pts.length < n && g++ < 20000){ const a = R() * 6.28, rr = Math.sqrt(R()) * 76, x = 100 + Math.cos(a) * rr, y = 100 + Math.sin(a) * rr; if (pts.every(p => Math.hypot(p.x - x, p.y - y) > 7)) pts.push({x, y, r:2.6, c:"white"}); } posCache[key] = pts; }
      return A.plate({colonies:posCache[key]});
    }
    function draw(){
      host.querySelector("#cfPick").innerHTML = NAMES.map((n, i) => `<button type="button" class="opt ${i === k ? "sel" : ""}" data-k="${i}" aria-pressed="${i === k}">${n}</button>`).join("");
      host.querySelectorAll("#cfPick [data-k]").forEach(b => b.addEventListener("click", () => { k = +b.dataset.k; step = 0; draw(); }));
      const tt = tubes.reduce((acc, t, i) => { acc.push((i ? acc[i - 1] : 1) / den(t)); return acc; }, [])[k];
      const ml = ul / 1000, n = Math.round(N0 * tt * ml), tntc = n > 200, none = n < 1;
      let o = `<g transform="translate(${XP - 62} 4) scale(.62)">${plateFor(n, k + ":" + n).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</g>`;
      o += T(XP, 148, `Plate ${NAMES[k]}`, {fs:15, c:C1}) + T(XP, 168, tntc ? "TNTC (more than 200)" : `${n} colonies`, {fs:15, c:C1});
      o += tubeAt(XT, 12, true, .5) + T(XT, 148, `Tube ${NAMES[k]}`, {fs:15, c:C2}) + `<text x="${XT}" y="168" font-size="15" font-weight="700" fill="${C2}" text-anchor="middle">total ${dilSVG(tt, 15)}</text>`;
      o += `<g transform="translate(${XV - 51} 20) scale(1.7)">${A.ico("pipette").replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</g>` + T(XV, 148, `Plated ${ul} µL`, {fs:15, c:C3}) + T(XV, 168, `= ${ml} mL`, {fs:15, c:C3});
      if (tntc || none){ svg.innerHTML = o + T(340, 250, tntc ? "Too many to count. Pick a more dilute tube." : "No colonies to count. Pick a less dilute tube.", {fs:18, c:"#c43a2b"});
        res.innerHTML = ""; cap.innerHTML = tntc ? `<b>Plate ${NAMES[k]} is TNTC.</b> It has more than 200 colonies, so they run together and cannot be counted accurately. Write "TNTC" and do not use it. Try a tube further down the series.` : `<b>Plate ${NAMES[k]} has no colonies.</b> There is nothing to count. Try a tube earlier in the series.`;
        host.querySelector("#cfNext").disabled = true; return; }
      host.querySelector("#cfNext").disabled = step >= 5;
      /* cells/mL = CFUs ÷ ( total dilution × mL plated ) */
      const ey = 250;
      o += T(XP - 70, ey, "cells/mL =", {fs:19, a:"end"});
      if (step >= 1) o += down(XP, 176, ey - 26, C1) + T(XP, ey, String(n), {fs:26, c:C1}); else o += slot(XP, ey, 64);
      o += T(XP + 62, ey, "÷", {fs:24}) + T(XT - 66, ey, "(", {fs:30, w:400});
      if (step >= 2) o += down(XT, 176, ey - 26, C2) + `<text x="${XT}" y="${ey}" font-size="24" font-weight="700" fill="${C2}" text-anchor="middle">${dilSVG(tt, 24)}</text>`; else o += slot(XT, ey, 70);
      o += T((XT + XV) / 2, ey, "×", {fs:22});
      if (step >= 3) o += down(XV, 176, ey - 26, C3) + T(XV, ey, `${ml} mL`, {fs:22, c:C3}); else o += slot(XV, ey, 80);
      o += T(XV + 58, ey, ")", {fs:30, w:400});
      if (step >= 4){ o += `<path d="M${XT - 60},${ey + 14} Q${(XT + XV) / 2},${ey + 34} ${XV + 52},${ey + 14}" fill="none" stroke="#53657b" stroke-width="2"/>`;
        o += `<text x="${(XT + XV) / 2}" y="${ey + 58}" font-size="18" font-weight="700" fill="#53657b" text-anchor="middle">${dilSVG(tt, 18)} × ${ml} = ${dilSVG(tt * ml, 18)}</text>`; }
      svg.innerHTML = o;
      const ans = n / (tt * ml), eb = p10(1 / (tt * ml)), mlE = p10(1 / ml);
      res.innerHTML = step >= 5 ? `= ${V.sci(ans, 2)} cells/mL` : "";
      let fifth = `<b>Divide:</b> ${n} ÷ ${dilHTML(tt * ml)}.`;
      if (eb !== null){ const s5 = sciSteps(n, eb);
        fifth += `<br>Dividing by 10<sup>-${eb}</sup> is the same as multiplying by 10<sup>${eb}</sup>: ${n} × 10<sup>${eb}</sup> = ${fmt(Math.round(ans))}.<br>`
          + (s5.digits ? `Scientific notation: move the decimal <b>${s5.digits}</b> place${s5.digits > 1 ? "s" : ""} left (${n} becomes ${s5.m}) and add ${s5.digits} to the exponent (${eb} + ${s5.digits} = ${s5.E}).<br>` : "")
          + `Answer: <b>${V.sci(ans, 2)} cells/mL</b>. Do not forget the units!`; }
      else fifth += ` Answer: <b>${V.sci(ans, 2)} cells/mL</b>. Do not forget the units!`;
      cap.innerHTML = [
        `Plate ${NAMES[k]} has ${n} colonies, so you can count it. Tap <b>Next step</b> to build the equation one number at a time.`,
        `<b style="color:${C1}">Step 1: the colonies (CFUs) come first.</b> You counted <b>${n}</b> colonies on plate ${NAMES[k]}. Each colony grew from one live cell (or clump).`,
        `<b style="color:${C2}">Step 2: the total dilution of tube ${NAMES[k]}.</b> It is <b>${dilHTML(tt)}</b>. (See the Total dilution tab.) The cells in tube ${NAMES[k]} are ${fmt(Math.round(1 / tt))} times more dilute than the original culture.`,
        `<b style="color:${C3}">Step 3: the volume you plated, in mL.</b> ${ul} µL ÷ 1000 = <b>${ml} mL</b>.${mlE !== null ? ` As a power of 10, ${ml} = 10<sup>-${mlE}</sup>.` : ""}`,
        `<b>Step 4: multiply the two numbers inside the parentheses first.</b> ${dilHTML(tt)} × ${ml} = <b>${dilHTML(tt * ml)}</b>.${eb !== null && mlE !== null ? ` Add the exponents: -${p10(1 / tt)} + -${mlE} = -${eb}.` : ""}`,
        fifth][step];
    }
    host.querySelector("#cfNext").addEventListener("click", () => { step++; draw(); });
    host.querySelector("#cfAll").addEventListener("click", () => { step = 5; draw(); });
    host.querySelector("#cfReset").addEventListener("click", () => { step = 0; draw(); });
    host.querySelector("#cfNew").addEventListener("click", () => { N0 = V.newCulture(); if (challenge){ tubes = randTubes(); ul = V.pick([50, 100, 200]); N0 = (1 + Math.random() * 9) * 1e9; } step = 0; draw(); });
    host.querySelector("#cfCh").addEventListener("change", e => { challenge = e.target.checked; tubes = challenge ? randTubes() : PROTOCOL; ul = challenge ? V.pick([50, 100, 200]) : 100; N0 = challenge ? (1 + Math.random() * 9) * 1e9 : V.newCulture(); step = 0; draw(); });
    draw();
  };

  /* ================= exponent review ================= */
  const EXP_ITEMS = [["10", 1], ["100", 2], ["1,000", 3], ["10,000", 4], ["100,000", 5], ["1,000,000", 6],
    ["1/10", -1], ["1/100", -2], ["1/1,000", -3], ["1/10,000", -4], ["1/100,000", -5], ["0.1", -1], ["0.01", -2], ["0.001", -3]];
  const zeros = s => s.replace(/0/g, '<b class="z">0</b>');
  V.reviews.exp = {title:"Exponent review", html:`
    <div class="rv"><h3>1. Powers of 10: count the zeros</h3>
      <div class="rvgrid">${[["10", 1], ["100", 2], ["1,000", 3], ["10,000", 4]].map(([s, e]) => `<div><span class="rvbig">${zeros(s)}</span><span>${e} zero${e > 1 ? "s" : ""}</span><span class="rvans">10<sup>${e}</sup></span></div>`).join("")}</div>
      <p>The exponent is the number of zeros after the 1. So 100 = 10<sup>2</sup>.</p></div>
    <div class="rv"><h3>2. "One over" = a negative exponent</h3>
      <div class="rvgrid">${[["1/10", 1], ["1/100", 2], ["1/1,000", 3], ["1/10,000", 4]].map(([s, e]) => `<div><span class="rvbig">${zeros(s)}</span><span>${e} zero${e > 1 ? "s" : ""}</span><span class="rvans">10<sup>-${e}</sup></span></div>`).join("")}</div>
      <p>The minus sign means "one over." 1/100 = 10<sup>-2</sup>. Decimals work too: 0.1 = 10<sup>-1</sup>, 0.01 = 10<sup>-2</sup>.</p></div>
    <div class="rv"><h3>3. Multiplying: add the exponents</h3>
      <p class="rvbig center">10<sup>-2</sup> × 10<sup>-2</sup> = 10<sup>-2 + -2</sup> = 10<sup>-4</sup></p>
      <p>Check it the long way: 1/100 × 1/100 = 1/10,000. That is 4 zeros, so 10<sup>-4</sup>. ✓</p></div>
    <div class="rv"><h3>4. Dividing by 10 to a negative: flip the sign</h3>
      <p class="rvbig center">52 ÷ 10<sup>-8</sup> = 52 × 10<sup>8</sup></p>
      <p>Dividing by a tiny number makes your answer big. That is why cells/mL comes out so large.</p></div>
    <div class="rv"><h3>5. Scientific notation: one digit before the decimal</h3>
      <p class="rvbig center">52 × 10<sup>8</sup> = 5.2 × 10<sup>9</sup></p>
      <p>Move the decimal 1 place to the left (52 becomes 5.2), so add 1 to the exponent (8 becomes 9). The value stays the same.</p></div>
    <div class="rv rvtry"><h3>Try it</h3><div id="rvQ"></div><div class="btnrow" style="justify-content:center;margin-top:10px"><button type="button" class="btn ghost small" id="rvNew">Another one</button></div></div>`,
    init(body){
      const ask = () => { const [s, e] = V.pick(EXP_ITEMS), opts = V.shuffle([...new Set([e, -e, e + 1, e - 1, e > 0 ? e + 2 : e - 2].filter(x => x !== 0))]).slice(0, 4);
        if (!opts.includes(e)) opts[0] = e;
        V.mc(body.querySelector("#rvQ"), {q:`Write <span class="rvbig">${s}</span> as a power of 10.`, opts:opts.map(x => `10<sup>${x}</sup>`), a:opts.indexOf(e), keep:true,
          why:`${s} has ${Math.abs(e)} zero${Math.abs(e) > 1 ? "s" : ""}${e < 0 ? (s.startsWith("0") ? " (count all the zeros, including the one before the decimal)" : " on the bottom") : ""}, so it is 10<sup>${e}</sup>.`}); };
      body.querySelector("#rvNew").addEventListener("click", ask); ask();
    }};

  /* ================= pictures ================= */
  /* one tube: where the dilution factor comes from */
  A.figs.dfone = sp => {
    const a = sp.a, w = sp.w, tt = +(a + w).toFixed(2), d = Math.round(tt / a), C = sp.c || "#1683cc";
    let o = tubeAt(50, 20, true, .38) + T(50, 120, `${a} mL`, {fs:15, c:C}) + T(50, 138, "added", {fs:12, w:400});
    o += `<path d="M70,50 Q110,20 150,50" fill="none" stroke="${C}" stroke-width="3"/><path d="M150,50 l-10,-3 l4,9 Z" fill="${C}"/>`;
    o += tubeAt(175, 20, false, .38) + T(175, 120, `${w} mL`, {fs:15, c:"#53657b"}) + T(175, 138, "water", {fs:12, w:400});
    o += T(255, 76, "=", {fs:24}) + T(330, 66, `${tt} mL`, {fs:18}) + T(330, 88, "total", {fs:13, w:400});
    o += T(150, 186, `${a}`, {fs:22, c:C}) + `<line x1="118" y1="196" x2="182" y2="196" stroke="currentColor" stroke-width="2.5"/>` + T(150, 220, `${tt}`, {fs:22});
    o += T(225, 206, "=", {fs:24}) + T(300, 210, `1/${d}`, {fs:30, c:"#1f8a55"});
    o += `<path d="M50,146 Q60,170 112,182" fill="none" stroke="${C}" stroke-width="2" stroke-dasharray="4 3"/><path d="M330,96 Q330,180 186,214" fill="none" stroke="#53657b" stroke-width="2" stroke-dasharray="4 3"/>`;
    return `<svg viewBox="0 0 400 236" role="img" aria-label="${a} mL into ${w} mL water gives a 1/${d} dilution" style="color:var(--ink)">${o}</svg>`;
  };
  /* one transfer: from one tube into the next */
  A.figs.xfer = sp => {
    const d = Math.round((sp.add + sp.water) / sp.add), C = sp.c || "#1683cc", g = A.seqG, mover = A.seqMover;
    let o = g("sq1", tubeAt(42, 26, true, .4) + T(42, 132, sp.from, {fs:13}) + tubeAt(150, 26, false, .4) + T(150, 132, `Tube ${sp.to}`, {fs:14}) + T(150, 148, `${sp.water} mL water`, {fs:11, w:400}));
    o += g("sq2", `<path d="M62,40 Q100,6 138,40" fill="none" stroke="${C}" stroke-width="3"/><path d="M138,40 l-10,-3 l4,9 Z" fill="${C}"/>` + T(100, 20, `${sp.add} mL`, {fs:14, c:C}));
    o += mover(42, 40, 150, 46, "#d9c58f") + g("sq3", `<rect x="139" y="${sp.cloudy ? 70 : 74}" width="22" height="${sp.cloudy ? 40 : 36}" rx="3" fill="#e3d29a" opacity=".55"/>`);
    o += g("sq4", `<rect x="186" y="62" width="64" height="34" rx="17" fill="${C}"/>` + T(218, 85, `1/${d}`, {fs:16, c:"#fff"}));
    return `<svg class="seq" viewBox="0 0 260 156" role="img" aria-label="Move ${sp.add} mL from ${sp.from} into tube ${sp.to}" style="color:var(--ink)">${o}</svg>`;
  };
})();
