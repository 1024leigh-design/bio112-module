/* Virtual Lab drawing kit. Everything is simple inline SVG drawn here: no outside images.
   Colors follow the lab results: gram positive purple, gram negative pink, acid-fast fuchsia,
   non-acid-fast blue, spores green. */
(function(){
  const A = {};
  const f1 = n => Math.round(n * 10) / 10;
  let uid = 0;
  A.uid = p => (p || "a") + (++uid);
  A.rng = seed => { let s = (seed >>> 0) || 1; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; };
  A.f1 = f1;

  A.COL = {
    purple:"#5a2a98", pink:"#e46a9a", blue:"#2f63c4", fuchsia:"#e0157f", green:"#2a9d4a", red:"#c9302c",
    clear:"#f6f3ea", unstained:"#e6e0d2", dark:"#3b2a55", yellow:"#f2c230", white:"#fbfaf3"
  };
  const col = c => A.COL[c] || c;

  /* ---------------- cells ---------------- */
  const DIM = {coccus:{w:10, h:10}, rod:{w:18, h:7}, longrod:{w:26, h:8}, shortrod:{w:12, h:7}, taper:{w:19, h:6}, spiral:{w:26, h:6}, spore:{w:6, h:4.4}};
  A.DIM = DIM;
  function cell(shape, x, y, a, c, o){
    o = o || {};
    const sc = o.sc || 1, sx = o.sx || 1, sy = o.sy || 1;
    const fill = col(c), stroke = c === "clear" ? "none" : c === "unstained" ? "#b9b09b" : "rgba(0,0,0,.28)";
    const tr = `transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)}) scale(${f1(sc * sx * 100) / 100} ${f1(sc * sy * 100) / 100})"`;
    let s;
    if (shape === "coccus") s = `<circle r="5" fill="${fill}" stroke="${stroke}" stroke-width=".8"/>`;
    else if (shape === "spore") s = `<ellipse rx="3.2" ry="2.3" fill="${col(o.sporeCol || "green")}" stroke="rgba(0,0,0,.3)" stroke-width=".6"/>`;
    else if (shape === "taper") s = `<path d="M-9.5,0 Q-6,-3.2 0,-3.2 Q6,-3.2 9.5,0 Q6,3.2 0,3.2 Q-6,3.2 -9.5,0 Z" fill="${fill}" stroke="${stroke}" stroke-width=".8"/>`;
    else if (shape === "spiral") s = `<path d="M-13,0 q3.25,-6 6.5,0 t6.5,0 t6.5,0 t6.5,0" fill="none" stroke="${fill === col("clear") ? "#f6f3ea" : fill}" stroke-width="3.2" stroke-linecap="round"/>`;
    else { const d = DIM[shape] || DIM.rod; s = `<rect x="${-d.w / 2}" y="${-d.h / 2}" width="${d.w}" height="${d.h}" rx="${d.h / 2}" fill="${fill}" stroke="${stroke}" stroke-width=".8"/>`; }
    if (o.spore && shape !== "coccus") s += `<ellipse cx="${(DIM[shape] || DIM.rod).w * .22}" rx="3" ry="2.3" fill="${col("green")}" stroke="rgba(0,0,0,.3)" stroke-width=".5"/>`;
    return `<g ${tr}>${s}</g>`;
  }
  A.cell = cell;

  /* positions of the cells in one group, around (0,0), before rotation */
  function arrPts(shape, arr, R){
    const d = DIM[shape] || DIM.rod, w = shape === "coccus" ? 9.4 : d.w + .6, h = d.h + 1;
    const line = n => Array.from({length:n}, (_, i) => [(i - (n - 1) / 2) * w, shape === "coccus" ? (R() - .5) * 2.4 : (R() - .5) * 1.6, 0]);
    switch (arr){
      case "pairs": return line(2);
      case "chains": return line(5 + Math.floor(R() * 3));
      case "clusters": { const pts = [[0, 0, 0]]; const n = 7 + Math.floor(R() * 4);
        for (let k = 1; k < n; k++){ const ang = R() * Math.PI * 2, rr = 7 + R() * 9; pts.push([Math.cos(ang) * rr, Math.sin(ang) * rr, 0]); } return pts; }
      case "tetrads": return [[-4.7, -4.7, 0], [4.7, -4.7, 0], [-4.7, 4.7, 0], [4.7, 4.7, 0]];
      case "sarcinae": return [[-1.3, -8.3, 0, 1], [8.1, -8.3, 0, 1], [-1.3, 1.1, 0, 1], [8.1, 1.1, 0, 1], [-4.7, -4.7, 0], [4.7, -4.7, 0], [-4.7, 4.7, 0], [4.7, 4.7, 0]];
      case "palisades": { const n = 4 + Math.floor(R() * 2); return Array.from({length:n}, (_, i) => [(R() - .5) * 3, (i - (n - 1) / 2) * h, (R() - .5) * 10]); }
      default: return [[0, 0, 0]];
    }
  }
  A.group = (shape, arr, x, y, ang, c, R, o) => {
    o = o || {};
    const rad = ang * Math.PI / 180, cs = Math.cos(rad), sn = Math.sin(rad);
    return arrPts(shape, arr, R).map(p => {
      const px = x + p[0] * cs - p[1] * sn, py = y + p[0] * sn + p[1] * cs;
      const cc = p[3] ? (c === "clear" ? "#d9d5c9" : shade(col(c), -.25)) : c;
      const co = Object.assign({}, o, {spore:o.sporeFrac ? R() < o.sporeFrac : false});
      if (o.distort === "warp"){ co.sx = .7 + R() * .5; co.sy = .5 + R() * .7; }
      if (o.distort === "shrink"){ co.sc = .6; co.sx = .9 + R() * .2; co.sy = .7 + R() * .3; }
      return cell(shape, px, py, ang + p[2] + (shape === "coccus" ? 0 : (R() - .5) * 6), cc, co);
    }).join("");
  };
  function shade(hex, k){ if (hex[0] !== "#") return hex; const n = parseInt(hex.slice(1), 16), ch = s => Math.max(0, Math.min(255, Math.round(((n >> s) & 255) * (1 + k)))); return "#" + [16, 8, 0].map(s => ch(s).toString(16).padStart(2, "0")).join(""); }
  A.shade = shade;

  /* A microscope field.
     spec: {bg:"light"|"dark", seed, groups:[{shape, arr, color, n, sporeFrac}], distort, thick, empty, label} */
  A.field = (spec, label) => {
    spec = spec || {};
    const R = A.rng(spec.seed || 7), id = A.uid("fc");
    const bg = spec.bg === "dark" ? "#2d2a30" : "#f7f4ee";
    let body = "";
    const placed = [];
    const spot = () => { let best = null;
      for (let t = 0; t < 40; t++){ const ang = R() * Math.PI * 2, rr = Math.sqrt(R()) * 74, x = 100 + Math.cos(ang) * rr, y = 100 + Math.sin(ang) * rr;
        const dmin = placed.reduce((m, p) => Math.min(m, Math.hypot(p[0] - x, p[1] - y)), 999);
        if (!best || dmin > best[2]) best = [x, y, dmin]; if (dmin > 34) break; }
      placed.push(best); return best; };
    if (spec.empty){
      for (let k = 0; k < 5; k++){ const p = spot(); body += `<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(1 + R() * 1.5)}" fill="#cfc8b8"/>`; }
    } else {
      if (spec.thick){
        const tc = col(spec.thick);
        body += `<ellipse cx="96" cy="104" rx="62" ry="50" fill="${tc}" opacity=".55"/><ellipse cx="110" cy="92" rx="40" ry="34" fill="${shade(tc, -.35)}" opacity=".7"/>`;
        for (let k = 0; k < 90; k++){ const ang = R() * 6.28, rr = Math.sqrt(R()) * 58; body += cell((spec.groups && spec.groups[0] && spec.groups[0].shape) || "coccus", 100 + Math.cos(ang) * rr, 100 + Math.sin(ang) * rr * .85, R() * 180, shade(tc, -.2)); }
      }
      (spec.groups || []).forEach(g => {
        for (let k = 0; k < (g.n || 8); k++){ const p = spot();
          body += A.group(g.shape, g.arr || "single", p[0], p[1], R() * 180, g.color, R, {sporeFrac:g.sporeFrac, distort:spec.distort}); }
      });
    }
    return `<svg viewBox="0 0 200 200" role="img" aria-label="${esc(label || "Microscope field")}"><defs><clipPath id="${id}"><circle cx="100" cy="100" r="90"/></clipPath><radialGradient id="${id}v"><stop offset=".75" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient></defs>
      <circle cx="100" cy="100" r="97" fill="#15171d"/><circle cx="100" cy="100" r="90" fill="${bg}"/><g clip-path="url(#${id})">${body}</g><circle cx="100" cy="100" r="90" fill="url(#${id}v)"/></svg>`;
  };

  /* one arrangement, big, for the "name the arrangement" drill */
  A.arrangement = (shape, arr, c, seed) => {
    const R = A.rng(seed || 3);
    let body = "";
    const spots = [[62, 66], [140, 60], [100, 138], [52, 150], [150, 146]];
    spots.slice(0, 3).forEach(p => { body += A.group(shape, arr, p[0], p[1], R() * 160, c, R); });
    return `<svg viewBox="0 0 200 200" role="img" aria-label="Cells for you to name"><circle cx="100" cy="100" r="97" fill="#15171d"/><circle cx="100" cy="100" r="90" fill="#f7f4ee"/><g transform="translate(100 100) scale(1.55) translate(-100 -100)">${body}</g></svg>`;
  };

  /* ---------------- tubes ---------------- */
  /* spec: {kind:"broth"|"slant"|"semisolid", medium, cloudy, growth:"motile"|"nonmotile"|"stab", cap, label} */
  A.tube = spec => {
    spec = spec || {};
    const id = A.uid("tb"), med = spec.medium || "#efe3bd";
    const body = `M24,26 L24,170 A16,16 0 0 0 56,170 L56,26`;
    let fill = "";
    if (spec.kind === "slant") fill = `<path d="M24,80 L56,118 L56,200 L24,200 Z" fill="${med}"/>` + (spec.cloudy ? `<path d="M24,80 L56,118 L56,124 L24,86 Z" fill="${spec.cloudy}"/>` : "");
    else if (spec.kind === "empty") fill = "";
    else fill = `<rect x="20" y="${spec.kind === "semisolid" ? 56 : 60}" width="40" height="150" fill="${med}"/>`;
    if (spec.kind === "broth" && spec.cloudy) fill += `<rect x="20" y="60" width="40" height="150" fill="${spec.cloudy}" opacity=".55"/>` + Array.from({length:26}, (_, k) => { const R = A.rng(k + 3); return `<circle cx="${f1(26 + R() * 28)}" cy="${f1(66 + R() * 118)}" r="1.1" fill="#fff" opacity=".6"/>`; }).join("");
    if (spec.kind === "semisolid"){
      const top = 56, end = top + (176 - top) * 2 / 3;
      if (spec.growth === "motile"){
        fill += `<path d="M40,${top} C26,${top + 30} 22,${end - 20} 24,${end + 30} L56,${end + 30} C58,${end - 20} 54,${top + 30} 40,${top} Z" fill="#d23b3b" opacity=".28"/>
          <path d="M40,${top} C30,${top + 30} 28,${end - 10} 30,${end + 14} L50,${end + 14} C52,${end - 10} 50,${top + 30} 40,${top} Z" fill="#d23b3b" opacity=".35"/>
          <line x1="40" y1="${top}" x2="40" y2="${end}" stroke="#b42424" stroke-width="3"/>`;
      } else if (spec.growth === "nonmotile"){
        fill += `<line x1="40" y1="${top}" x2="40" y2="${end}" stroke="#b42424" stroke-width="3.2" stroke-linecap="round"/>`;
      } else if (spec.growth === "stab"){
        fill += `<line x1="40" y1="${top}" x2="40" y2="${end}" stroke="#9a907a" stroke-width="1.6" stroke-dasharray="3 2"/>`;
      }
    }
    return `<svg viewBox="0 0 80 210" role="img" aria-label="${esc(spec.label || "Test tube")}"><defs><clipPath id="${id}"><path d="${body} Z"/></clipPath></defs>
      <g clip-path="url(#${id})"><rect x="20" y="20" width="40" height="190" fill="#f4f8fb" opacity=".6"/>${fill}</g>
      <path d="${body}" fill="none" stroke="#8b93a3" stroke-width="2.6"/>
      <rect x="18" y="8" width="44" height="20" rx="4" fill="${spec.capc || "#8b93a3"}"/>
      ${spec.text ? `<text x="40" y="22" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">${esc(spec.text)}</text>` : ""}</svg>`;
  };

  /* ---------------- plates ---------------- */
  /* spec: {agar, colonies:[{x,y,r,c,glow}], lawn, uv, streak, label, n (random colonies), seed} */
  A.plate = spec => {
    spec = spec || {};
    const id = A.uid("pl"), uv = !!spec.uv;
    const agar = uv ? "#24224a" : (spec.agar || "#efdba6");
    let inner = "";
    if (spec.lawn){
      const lc = uv ? (spec.lawnGlow ? "#7dffa0" : "#4a4870") : (spec.lawn === true ? "#fbf3dc" : spec.lawn);
      inner += `<circle cx="100" cy="100" r="80" fill="${lc}" opacity="${uv && !spec.lawnGlow ? .8 : .9}"/>`;
      const R = A.rng(spec.seed || 5);
      for (let k = 0; k < 70; k++){ const a = R() * 6.28, rr = Math.sqrt(R()) * 78; inner += `<circle cx="${f1(100 + Math.cos(a) * rr)}" cy="${f1(100 + Math.sin(a) * rr)}" r="${f1(2 + R() * 2)}" fill="${uv ? (spec.lawnGlow && R() < .5 ? "#b8ffc9" : "#3b3960") : "#fff"}" opacity=".5"/>`; }
    }
    (spec.colonies || []).forEach(c => {
      const glow = uv && c.glow;
      const fill = uv ? (glow ? "#8dffad" : "#4c4a72") : col(c.c || "white");
      if (glow) inner += `<circle cx="${f1(c.x)}" cy="${f1(c.y)}" r="${f1(c.r * 2)}" fill="#6dff95" opacity=".25"/>`;
      inner += `<circle cx="${f1(c.x)}" cy="${f1(c.y)}" r="${f1(c.r)}" fill="${fill}" stroke="${uv ? "none" : "rgba(0,0,0,.22)"}" stroke-width=".8"${c.id !== undefined ? ` data-col="${c.id}"` : ""}/>`;
      if (c.mark) inner += `<circle cx="${f1(c.x)}" cy="${f1(c.y)}" r="${f1(c.r + 2.6)}" fill="none" stroke="#1683cc" stroke-width="2"/>`;
    });
    if (spec.extra) inner += spec.extra;
    return `<svg viewBox="0 0 200 200" role="img" aria-label="${esc(spec.label || "Petri plate")}"><defs><clipPath id="${id}"><circle cx="100" cy="100" r="86"/></clipPath></defs>
      ${uv ? `<rect width="200" height="200" rx="18" fill="#120f2a"/>` : ""}
      <circle cx="100" cy="100" r="95" fill="${uv ? "#2c2958" : "#e3e7ee"}" stroke="${uv ? "#4b4790" : "#aab3c2"}" stroke-width="2.5"/>
      <circle cx="100" cy="100" r="86" fill="${agar}"/><g clip-path="url(#${id})">${inner}</g>
      <path d="M48,44 A70,70 0 0 1 112,22" fill="none" stroke="#fff" stroke-width="4" opacity="${uv ? .12 : .45}" stroke-linecap="round" pointer-events="none"/></svg>`;
  };
  /* random colonies inside a plate */
  A.scatter = (n, seed, c, rmin, rmax) => {
    const R = A.rng(seed || 9), out = [];
    for (let k = 0; k < n; k++){ const a = R() * 6.28, rr = Math.sqrt(R()) * 76; out.push({x:100 + Math.cos(a) * rr, y:100 + Math.sin(a) * rr, r:(rmin || 2.2) + R() * ((rmax || 4) - (rmin || 2.2)), c:c || "white"}); }
    return out;
  };

  /* ---------------- slide ---------------- */
  A.slide = (smear, label) => `<svg viewBox="0 0 240 90" role="img" aria-label="${esc(label || "Glass slide")}"><rect x="6" y="14" width="228" height="62" rx="5" fill="#dceef7" stroke="#8fb0c8" stroke-width="2"/><rect x="10" y="18" width="46" height="54" rx="3" fill="#f3f1ea" opacity=".9"/>
    <circle cx="150" cy="45" r="22" fill="none" stroke="#9aa7b5" stroke-width="1.5" stroke-dasharray="4 3"/>${smear ? `<ellipse cx="150" cy="45" rx="17" ry="14" fill="${col(smear)}" opacity=".75"/>` : ""}</svg>`;

  /* ---------------- microscope ---------------- */
  A.SCOPE_PARTS = [
    {id:"ocular", name:"Ocular (eyepiece)", job:"The lens you look through. It magnifies 10x."},
    {id:"nosepiece", name:"Revolving nosepiece", job:"Holds the objectives. Turn it to click a different objective into place."},
    {id:"objectives", name:"Objectives", job:"4x scanning, 10x low power, 40x high-dry, 100x oil immersion."},
    {id:"stage", name:"Stage", job:"The flat platform that holds the slide."},
    {id:"mech", name:"Mechanical stage control", job:"Knobs that move the slide left, right, forward, and back."},
    {id:"condenser", name:"Condenser", job:"Focuses the light onto the specimen."},
    {id:"iris", name:"Iris diaphragm", job:"Part of the condenser. Opens and closes to change how much light reaches the specimen."},
    {id:"coarse", name:"Coarse focus knob", job:"The big knob. Moves the stage a lot. Use it on low power only."},
    {id:"fine", name:"Fine focus knob", job:"The small knob. Moves the stage a little. The only focus knob to use on 100x."},
    {id:"light", name:"Light source", job:"The lamp in the base that sends light up through the specimen."},
    {id:"voltage", name:"Voltage control", job:"Sets how bright the lamp is. Turn it to the lowest setting before you turn the lamp off."}
  ];
  A.microscope = showLabels => {
    const lab = (x, y, t, anchor) => showLabels ? `<text x="${x}" y="${y}" font-size="13" font-weight="700" fill="currentColor" text-anchor="${anchor || "start"}">${t}</text>` : "";
    const lead = (x1, y1, x2, y2) => showLabels ? `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="1" opacity=".5"/>` : "";
    return `<svg viewBox="-80 0 480 440" role="img" aria-label="Brightfield microscope" style="color:var(--ink)">
      <g class="part" data-part="voltage"><rect x="74" y="402" width="28" height="16" rx="4" fill="#1c2232"/><circle cx="88" cy="410" r="5" fill="#f2b134"/></g>
      <path d="M60,430 L300,430 Q312,430 307,418 L292,392 Q288,386 278,386 L82,386 Q72,386 68,392 L53,418 Q48,430 60,430 Z" fill="#56647c"/>
      <g class="part" data-part="light"><ellipse cx="170" cy="386" rx="30" ry="7" fill="#f6d36b" stroke="#c9a23a" stroke-width="1.5"/></g>
      <path d="M250,388 C300,360 316,300 306,240 C298,196 280,164 252,138 L226,160 C250,182 264,210 272,244 C280,296 270,346 232,382 Z" fill="#6d7b97"/>
      <path d="M150,96 L248,96 Q258,96 258,106 L258,132 Q258,142 248,142 L196,142 L196,152 L162,152 L162,142 L150,142 Q140,142 140,132 L140,106 Q140,96 150,96 Z" fill="#6d7b97"/>
      <g class="part" data-part="ocular"><g transform="rotate(-24 170 98)"><rect x="152" y="36" width="24" height="62" rx="4" fill="#2f3b52"/><rect x="148" y="30" width="32" height="13" rx="5" fill="#151a24"/></g><g transform="rotate(-24 206 98)"><rect x="190" y="40" width="24" height="58" rx="4" fill="#2f3b52"/><rect x="186" y="34" width="32" height="13" rx="5" fill="#151a24"/></g></g>
      <g class="part" data-part="nosepiece"><path d="M150,152 L208,152 L216,168 L142,168 Z" fill="#b5bfcd" stroke="#5d6676" stroke-width="1.2"/></g>
      <g class="part" data-part="objectives">
        <rect x="146" y="168" width="14" height="22" rx="2" fill="#d9443a"/><rect x="164" y="168" width="14" height="30" rx="2" fill="#f2c94c"/><rect x="182" y="168" width="14" height="36" rx="2" fill="#3f7bd1"/><rect x="200" y="168" width="12" height="40" rx="2" fill="#f4f4f4" stroke="#8b93a3"/></g>
      <g class="part" data-part="stage"><rect x="96" y="226" width="186" height="14" rx="3" fill="#2f3b52"/><rect x="132" y="218" width="110" height="8" rx="1.5" fill="#d6ebf5" stroke="#8fb0c8"/></g>
      <g class="part" data-part="mech"><rect x="236" y="240" width="9" height="30" rx="3" fill="#2a3244"/><circle cx="240.5" cy="276" r="7" fill="#1c2232"/><circle cx="240.5" cy="292" r="6" fill="#1c2232"/></g>
      <g class="part" data-part="condenser"><rect x="160" y="242" width="46" height="24" rx="4" fill="#b5bfcd" stroke="#5d6676" stroke-width="1.2"/><ellipse cx="183" cy="243" rx="15" ry="3" fill="#cfe6f5"/></g>
      <g class="part" data-part="iris"><rect x="154" y="268" width="58" height="11" rx="5" fill="#c9a24a" stroke="#8a6d1a" stroke-width="1"/><rect x="210" y="271" width="26" height="5" rx="2.5" fill="#c9a24a"/><circle cx="238" cy="273.5" r="5" fill="#8a6d1a"/></g>
      <g class="part" data-part="coarse"><circle cx="300" cy="316" r="28" fill="#2f3b52" stroke="#151a24" stroke-width="1.5"/></g>
      <g class="part" data-part="fine"><circle cx="300" cy="316" r="13" fill="#a8b8d2" stroke="#5d6676" stroke-width="1.5"/></g>
      ${lead(150, 50, 70, 46)}${lab(68, 50, "Ocular", "end")}
      ${lead(144, 160, 70, 140)}${lab(68, 144, "Nosepiece", "end")}
      ${lead(150, 194, 70, 190)}${lab(68, 194, "Objectives", "end")}
      ${lead(98, 232, 70, 232)}${lab(68, 236, "Stage", "end")}
      ${lead(160, 256, 70, 270)}${lab(68, 274, "Condenser", "end")}
      ${lead(156, 276, 70, 308)}${lab(68, 312, "Iris diaphragm", "end")}
      ${lead(170, 392, 130, 360)}${lab(128, 356, "Light", "end")}
      ${lead(80, 410, 40, 400)}${lab(38, 404, "Voltage", "end")}
      ${lead(245, 250, 314, 200)}${lab(316, 198, "Mech. stage", "start")}
      ${lead(328, 316, 340, 268)}${lab(354, 262, "Coarse", "end")}
      ${lead(300, 316, 340, 368)}${lab(354, 382, "Fine", "end")}
    </svg>`;
  };

  /* ---------------- micropipette ---------------- */
  /* st: {plunger:0|1|2, vol, locked, tip:"none"|"firm"|"loose", fill:0..1, drip, inside, label} */
  A.pipette = st => {
    const pd = [0, 16, 30][st.plunger || 0];
    const v = String(Math.round(st.vol || 0)).padStart(4, "0");
    const tip = st.tip === "none" ? "" : `<path d="M70,${st.tip === "loose" ? 252 : 244} L90,${st.tip === "loose" ? 252 : 244} L82,322 L78,322 Z" fill="#f2f4f7" stroke="#9aa3b2" stroke-width="1.5" opacity=".95"/>`;
    const liquid = st.tip !== "none" && st.fill > 0 ? `<path d="M${f1(78 - 2 * st.fill)},${f1(322 - 50 * st.fill)} L${f1(82 + 2 * st.fill)},${f1(322 - 50 * st.fill)} L82,322 L78,322 Z" fill="#4c8fd6"/>` : "";
    const drip = st.drip ? `<path d="M90,280 q4,8 0,12 q-4,-4 0,-12 Z M70,300 q4,8 0,12 q-4,-4 0,-12 Z" fill="#4c8fd6"/>` : "";
    const inside = st.inside ? `<rect x="66" y="180" width="28" height="40" fill="#4c8fd6" opacity=".7"/>` : "";
    return `<svg viewBox="0 0 160 340" role="img" aria-label="${esc(st.label || "Micropipette")}">
      <rect x="72" y="${8 + pd}" width="16" height="22" rx="4" fill="#3f4cc0"/><rect x="77" y="${28 + pd}" width="6" height="${16 - pd > 0 ? 16 - pd : 2}" fill="#8b93a3"/>
      <rect x="58" y="44" width="44" height="194" rx="12" fill="#e8ecf2" stroke="#8b93a3" stroke-width="2"/>${inside}
      <rect x="64" y="84" width="32" height="40" rx="4" fill="#1c2232"/><text x="80" y="110" font-size="13" font-family="monospace" font-weight="700" fill="#7dffa0" text-anchor="middle">${v}</text>
      <text x="80" y="140" font-size="10" font-weight="700" fill="#53657b" text-anchor="middle">µL</text>
      <rect x="46" y="150" width="68" height="14" rx="5" fill="${st.locked ? "#1f8a55" : "#8b93a3"}"/><text x="80" y="161" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">${st.locked ? "LOCKED" : "UNLOCKED"}</text>
      <rect x="100" y="60" width="14" height="40" rx="4" fill="#8b93a3"/>
      <path d="M64,238 L96,238 L92,${st.tip === "none" ? 262 : 250} L68,${st.tip === "none" ? 262 : 250} Z" fill="#c7ced9"/>
      ${tip}${liquid}${drip}
      <text x="16" y="${22 + pd}" font-size="11" font-weight="700" fill="currentColor">${["rest", "1st stop", "2nd stop"][st.plunger || 0]}</text></svg>`;
  };

  /* ---------------- pGLO plasmid map ---------------- */
  A.PLASMID = [
    {id:"ori", a0:200, a1:245, c:"#1683cc"},
    {id:"bla", a0:265, a1:330, c:"#c43a2b"},
    {id:"araC", a0:28, a1:88, c:"#a96c05"},
    {id:"pBAD", a0:88, a1:104, c:"#5a2a98"},
    {id:"GFP", a0:104, a1:168, c:"#1f8a55"}
  ];
  A.plasmid = (placed, slotPick) => {
    const cx = 170, cy = 150, R = 86;
    const pt = (a, rr) => [cx + Math.cos((a - 90) * Math.PI / 180) * rr, cy + Math.sin((a - 90) * Math.PI / 180) * rr];
    const arc = (a0, a1, rr) => { const [x0, y0] = pt(a0, rr), [x1, y1] = pt(a1, rr); return `M${f1(x0)},${f1(y0)} A${rr},${rr} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f1(x1)},${f1(y1)}`; };
    /* double-stranded DNA: two strands with "rungs" between them */
    let s = `<circle cx="${cx}" cy="${cy}" r="${R + 7}" fill="none" stroke="#7d8da1" stroke-width="2.5"/><circle cx="${cx}" cy="${cy}" r="${R - 7}" fill="none" stroke="#7d8da1" stroke-width="2.5"/>`;
    for (let a = 0; a < 360; a += 6){ const [x0, y0] = pt(a, R - 6), [x1, y1] = pt(a, R + 6); s += `<line x1="${f1(x0)}" y1="${f1(y0)}" x2="${f1(x1)}" y2="${f1(y1)}" stroke="#b9c3cf" stroke-width="1.5"/>`; }
    const DIR = {ori:0, bla:1, araC:-1, pBAD:0, GFP:1};
    A.PLASMID.forEach((p, i) => {
      s += `<path d="${arc(p.a0, p.a1, R)}" fill="none" stroke="${p.c}" stroke-width="16" stroke-linecap="butt"/>`;
      const d = DIR[p.id];
      if (d){ const a = d > 0 ? p.a1 : p.a0, t = (a - 90) * Math.PI / 180, [x, y] = pt(a, R), tx = -Math.sin(t) * d, ty = Math.cos(t) * d, nx = Math.cos(t), ny = Math.sin(t);
        s += `<path d="M${f1(x + nx * 13)},${f1(y + ny * 13)} L${f1(x + tx * 14)},${f1(y + ty * 14)} L${f1(x - nx * 13)},${f1(y - ny * 13)} Z" fill="${p.c}"/>`; }
      const mid = (p.a0 + p.a1) / 2, [lx, ly] = pt(mid, R + 46), [ix, iy] = pt(mid, R + 10);
      s += `<line x1="${f1(ix)}" y1="${f1(iy)}" x2="${f1(lx)}" y2="${f1(ly)}" stroke="${p.c}" stroke-width="1.6"/>`;
      const got = placed && placed[i];
      s += `<g class="part" data-slot="${i}"><rect x="${f1(lx - 36)}" y="${f1(ly - 15)}" width="72" height="30" rx="15" fill="${got ? p.c : "var(--surface)"}" stroke="${p.c}" stroke-width="2.5" ${slotPick === i ? 'stroke-dasharray="5 3"' : ""}/>
        <text x="${f1(lx)}" y="${f1(ly + 5)}" font-size="15" font-weight="700" text-anchor="middle" fill="${got ? "#fff" : p.c}">${got ? esc(got) : (i + 1)}</text></g>`;
    });
    s += `<text x="${cx}" y="${cy + 2}" font-size="22" font-weight="800" text-anchor="middle" fill="currentColor">pGLO</text><text x="${cx}" y="${cy + 22}" font-size="13" text-anchor="middle" fill="currentColor">plasmid (circular DNA)</text>`;
    return `<svg viewBox="0 0 340 300" role="img" aria-label="pGLO plasmid map" style="color:var(--ink)">${s}</svg>`;
  };

  /* ---------------- fluorescence energy diagram ---------------- */
  A.energy = (placed, pick) => {
    const slot = (i, x) => {
      const got = placed[i];
      if (got === "up") return `<g class="part" data-slot="${i}"><line x1="${x}" y1="206" x2="${x}" y2="66" stroke="#5a2a98" stroke-width="5"/><path d="M${x - 9},78 L${x},58 L${x + 9},78 Z" fill="#5a2a98"/></g>`;
      if (got === "down") return `<g class="part" data-slot="${i}"><line x1="${x}" y1="92" x2="${x}" y2="194" stroke="#1f8a55" stroke-width="5"/><path d="M${x - 9},190 L${x},210 L${x + 9},190 Z" fill="#1f8a55"/></g>`;
      return `<g class="part" data-slot="${i}"><rect x="${x - 26}" y="90" width="52" height="96" rx="10" fill="var(--surface)" stroke="#1683cc" stroke-width="2.5" stroke-dasharray="${pick ? "6 4" : "0"}"/><text x="${x}" y="144" font-size="26" font-weight="700" text-anchor="middle" fill="#1683cc">?</text></g>`;
    };
    return `<svg viewBox="0 0 360 260" role="img" aria-label="Energy diagram for fluorescence" style="color:var(--ink)">
      <line x1="60" y1="210" x2="330" y2="210" stroke="currentColor" stroke-width="3"/><text x="54" y="215" font-size="14" font-weight="700" text-anchor="end" fill="currentColor">Low</text>
      <line x1="60" y1="62" x2="330" y2="62" stroke="currentColor" stroke-width="3"/><line x1="60" y1="76" x2="330" y2="76" stroke="currentColor" stroke-width="1.5" opacity=".6"/><line x1="60" y1="90" x2="330" y2="90" stroke="currentColor" stroke-width="1.5" opacity=".6"/>
      <text x="54" y="67" font-size="14" font-weight="700" text-anchor="end" fill="currentColor">High</text>
      <text x="195" y="236" font-size="14" text-anchor="middle" fill="currentColor">Ground state</text><text x="195" y="50" font-size="14" text-anchor="middle" fill="currentColor">Excited state</text>
      <path d="M150,64 l8,6 l-8,6 l8,6 l-8,6" fill="none" stroke="#a96c05" stroke-width="2.5"/><text x="165" y="110" font-size="13" fill="#a96c05">loses some</text><text x="165" y="125" font-size="13" fill="#a96c05">energy</text>
      ${slot(0, 110)}${slot(1, 270)}</svg>`;
  };

  /* ---------------- hub icons ---------------- */
  A.icon = n => {
    const sv = b => `<svg viewBox="0 0 80 80" aria-hidden="true">${b}</svg>`;
    const mini = s => s.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
    const wrap = (svg, sc, dx, dy) => `<g transform="translate(${dx || 0} ${dy || 0}) scale(${sc})">${mini(svg)}</g>`;
    switch (n){
      case 1: return sv(`<path d="M20,70 L60,70 L56,62 L24,62 Z" fill="#56647c"/><path d="M48,62 C60,54 60,36 48,22 L42,26 C50,36 50,50 42,60 Z" fill="#6d7b97"/><rect x="28" y="18" width="12" height="18" fill="#6d7b97"/><rect x="24" y="5" width="9" height="15" rx="2" fill="#2f3b52" transform="rotate(-25 28 12)"/><rect x="26" y="38" width="16" height="5" fill="#9aa5b8"/><rect x="16" y="50" width="34" height="4" rx="1" fill="#2f3b52"/><ellipse cx="34" cy="62" rx="7" ry="2" fill="#f2c94c"/>`);
      case 2: return sv(`<rect x="8" y="26" width="64" height="12" fill="#dceef7" stroke="#8fb0c8"/>${Array.from({length:11}, (_, i) => `<line x1="${10 + i * 6}" y1="26" x2="${10 + i * 6}" y2="${i % 5 ? 32 : 36}" stroke="#2f3b52" stroke-width="1.2"/>`).join("")}<rect x="8" y="44" width="64" height="12" fill="#fff6dc" stroke="#d9b54a"/>${Array.from({length:8}, (_, i) => `<line x1="${10 + i * 8.5}" y1="56" x2="${10 + i * 8.5}" y2="48" stroke="#8a5a00" stroke-width="1.2"/>`).join("")}`);
      case 3: return sv(`<path d="M40,8 C52,26 64,38 64,52 A24,24 0 0 1 16,52 C16,38 28,26 40,8 Z" fill="#cfe9f5" stroke="#4b9cc9" stroke-width="2"/><ellipse cx="34" cy="50" rx="9" ry="5" fill="#9ccf8a"/><circle cx="48" cy="58" r="4" fill="#2f8a6d"/><path d="M42,40 q4,-4 8,0" stroke="#6b4f9e" stroke-width="2" fill="none"/>`);
      case 4: return sv(wrap(A.plate({colonies:A.scatter(9, 4, "white", 3, 6).concat(A.scatter(3, 8, "yellow", 3, 5))}), .4));
      case 5: return sv(wrap(A.field({bg:"dark", seed:5, groups:[{shape:"coccus", arr:"pairs", color:"clear", n:6}, {shape:"rod", arr:"single", color:"clear", n:4}]}), .4));
      case 6: return sv(`<g transform="translate(0 22) scale(.333)">${mini(A.slide("purple"))}</g><g transform="translate(14 54)"><line x1="0" y1="0" x2="40" y2="0" stroke="#9aa3b2" stroke-width="2.5"/><circle cx="45" cy="0" r="5" fill="none" stroke="#9aa3b2" stroke-width="2.5"/></g>`);
      case 7: return sv(wrap(A.field({seed:7, groups:[{shape:"coccus", arr:"clusters", color:"blue", n:3}, {shape:"longrod", arr:"chains", color:"blue", n:2}]}), .4));
      case 8: return sv(wrap(A.field({seed:8, groups:[{shape:"coccus", arr:"clusters", color:"purple", n:3}, {shape:"shortrod", arr:"single", color:"pink", n:7}]}), .4));
      case 9: return sv(wrap(A.field({seed:9, groups:[{shape:"longrod", arr:"single", color:"pink", n:8, sporeFrac:.6}, {shape:"spore", arr:"single", color:"green", n:4}]}), .4));
      case 10: return sv(wrap(A.field({seed:10, groups:[{shape:"taper", arr:"single", color:"fuchsia", n:9}, {shape:"coccus", arr:"clusters", color:"blue", n:2}]}), .4));
      case 11: return sv(`<g transform="translate(4 0) scale(.38)">${mini(A.tube({kind:"semisolid", medium:"#f4ecd2", growth:"nonmotile"}))}</g><g transform="translate(40 0) scale(.38)">${mini(A.tube({kind:"semisolid", medium:"#f4ecd2", growth:"motile"}))}</g>`);
      case 12: return sv(`<g transform="translate(4 0) scale(.38)">${mini(A.tube({kind:"slant", medium:"#efdba6", cloudy:"#fbf3dc"}))}</g><g transform="translate(40 0) scale(.38)">${mini(A.tube({kind:"broth", medium:"#f0e2b4", cloudy:"#e9dcb8"}))}</g><path d="M30,40 L46,40" stroke="#1683cc" stroke-width="3"/><path d="M42,35 L48,40 L42,45" fill="none" stroke="#1683cc" stroke-width="3"/>`);
      case 13: return sv(wrap(A.plate({extra:`<path d="M30,60 l40,-20 M32,70 l40,-20 M36,80 l40,-20 M110,40 l30,30 M112,52 l26,26 M130,110 l-20,40 M120,108 l-20,40" stroke="#fbf3dc" stroke-width="5" stroke-linecap="round"/>`, colonies:[{x:70, y:150, r:5, c:"yellow"}, {x:52, y:132, r:5, c:"white"}, {x:90, y:162, r:4.5, c:"white"}]}), .4));
      case 14: return sv(Array.from({length:4}, (_, i) => `<g transform="translate(${2 + i * 19} 10) scale(.24)">${mini(A.tube({kind:"broth", medium:"#f0e2b4", cloudy:i < 3 ? "#e3d29a" : ""}))}</g>`).join("") + `<text x="40" y="74" font-size="11" font-weight="700" fill="#1683cc" text-anchor="middle">1/10 1/10</text>`);
      case 15: return sv(wrap(A.plate({uv:true, colonies:A.scatter(10, 15, "white", 4, 7).map(c => Object.assign(c, {glow:true}))}), .4));
    }
    return sv("");
  };

  function esc(s){ return String(s).replace(/[&<>"]/g, c => ({"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;"})[c]); }
  A.esc = esc;
  window.ART = A;
})();
