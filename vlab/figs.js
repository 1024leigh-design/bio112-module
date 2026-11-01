/* Virtual Lab: diagrams for the Learn tabs, plus small icons for step strips.
   All drawn here as simple inline SVG. No outside images. */
(function(){
  const A = window.ART, f1 = A.f1, esc = A.esc;
  const T = (x, y, s, o) => { o = o || {}; return `<text x="${x}" y="${y}" font-size="${o.fs || 15}" font-weight="${o.w || 700}" fill="${o.c || "currentColor"}" text-anchor="${o.a || "middle"}">${s}</text>`; };
  const arrow = (x1, y1, x2, y2, c, w) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 9; c = c || "#1683cc";
    return `<line x1="${x1}" y1="${y1}" x2="${f1(x2 - Math.cos(a) * 4)}" y2="${f1(y2 - Math.sin(a) * 4)}" stroke="${c}" stroke-width="${w || 3}" stroke-linecap="round"/><path d="M${f1(x2)},${f1(y2)} L${f1(x2 - h * Math.cos(a - .45))},${f1(y2 - h * Math.sin(a - .45))} L${f1(x2 - h * Math.cos(a + .45))},${f1(y2 - h * Math.sin(a + .45))} Z" fill="${c}"/>`; };
  const inner = s => s.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  const place = (svg, x, y, sc) => `<g transform="translate(${x} ${y}) scale(${sc})">${inner(svg)}</g>`;
  const wrap = (w, h, body, label) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label || "Diagram")}" style="color:var(--ink)">${body}</svg>`;
  A.arrow = arrow; A.place = place;

  /* ---------------- icons for step strips (60 x 60) ---------------- */
  const ICO = {
    bottle:c => `<rect x="18" y="22" width="24" height="32" rx="5" fill="${c || "#5a2a98"}"/><rect x="22" y="12" width="16" height="11" rx="2" fill="#2f3b52"/><rect x="27" y="3" width="6" height="10" rx="2" fill="#8b93a3"/><rect x="22" y="30" width="16" height="10" rx="2" fill="#fff" opacity=".7"/>`,
    rinse:() => `<path d="M16,24 L44,24 L42,56 L18,56 Z" fill="#cfe9f7" stroke="#6aa9d1" stroke-width="2"/><rect x="18" y="38" width="22" height="16" fill="#6fb6e3"/><path d="M28,24 L30,12 L50,6" fill="none" stroke="#6aa9d1" stroke-width="3"/><path d="M52,10 q3,6 0,9 q-3,-3 0,-9 Z" fill="#6fb6e3"/>`,
    blot:() => `<rect x="10" y="20" width="40" height="28" rx="2" fill="#f3efe2" stroke="#c9bf9e" stroke-width="2" transform="rotate(-8 30 34)"/><rect x="12" y="22" width="40" height="28" rx="2" fill="#fbf8ee" stroke="#c9bf9e" stroke-width="2"/><path d="M18,32 L44,32 M18,40 L38,40" stroke="#e1d9bd" stroke-width="2"/>`,
    flame:() => `<rect x="24" y="36" width="12" height="16" fill="#8b93a3"/><rect x="16" y="50" width="28" height="6" rx="2" fill="#56647c"/><path d="M30,6 C40,18 40,28 30,36 C20,28 20,18 30,6 Z" fill="#4c8fd6"/><path d="M30,16 C35,22 35,28 30,33 C25,28 25,22 30,16 Z" fill="#9fd1f0"/>`,
    scope:() => inner(A.icon(1)).replace(/^/, '<g transform="scale(.75)">') + "</g>",
    timer:t => `<circle cx="30" cy="33" r="21" fill="var(--surface)" stroke="#1683cc" stroke-width="4"/><rect x="25" y="5" width="10" height="6" rx="2" fill="#1683cc"/><text x="30" y="38" font-size="${(t || "").length > 3 ? 11 : 14}" font-weight="700" text-anchor="middle" fill="currentColor">${t || ""}</text>`,
    ice:() => `<path d="M10,26 L50,26 L45,56 L15,56 Z" fill="#dff1fb" stroke="#7fb8d9" stroke-width="2"/><rect x="16" y="18" width="12" height="12" rx="2" fill="#fff" stroke="#9cc6e4" transform="rotate(-12 22 24)"/><rect x="30" y="16" width="12" height="12" rx="2" fill="#fff" stroke="#9cc6e4" transform="rotate(10 36 22)"/><rect x="26" y="8" width="7" height="22" rx="2" fill="#f4f8fb" stroke="#8b93a3"/>`,
    hot:() => `<rect x="6" y="38" width="48" height="14" rx="3" fill="#56647c"/><rect x="10" y="32" width="40" height="7" rx="2" fill="#c9ced6"/><rect x="14" y="27" width="32" height="6" rx="1" fill="#dceef7" stroke="#8fb0c8"/><rect x="22" y="27" width="14" height="5" rx="2" fill="#2a9d4a"/><path d="M18,22 q3,-5 0,-10 M30,22 q3,-5 0,-10 M42,22 q3,-5 0,-10" stroke="#e46a3a" stroke-width="2" fill="none"/>`,
    bath:t => `<rect x="6" y="20" width="48" height="34" rx="4" fill="#cfe9f7" stroke="#6aa9d1" stroke-width="2"/><path d="M6,28 q6,-4 12,0 t12,0 t12,0 t12,0" stroke="#6aa9d1" stroke-width="2" fill="none"/><rect x="27" y="6" width="7" height="30" rx="2" fill="#f4f8fb" stroke="#8b93a3"/><text x="30" y="50" font-size="12" font-weight="700" text-anchor="middle" fill="#14223a">${t || ""}</text>`,
    incub:t => `<rect x="8" y="8" width="44" height="46" rx="4" fill="#e8ecf2" stroke="#8b93a3" stroke-width="2"/><rect x="14" y="14" width="32" height="24" rx="2" fill="#fff" stroke="#b9c0cc"/><path d="M16,30 L44,30" stroke="#b9c0cc"/><text x="30" y="50" font-size="12" font-weight="700" text-anchor="middle" fill="#14223a">${t || "37°C"}</text>`,
    tube:c => place(A.tube({kind:"broth", medium:c || "#f0e2b4"}), 18, 2, .27),
    slant:() => place(A.tube({kind:"slant", medium:"#efdba6", cloudy:"#fbf3dc"}), 18, 2, .27),
    semi:() => place(A.tube({kind:"semisolid", medium:"#f4ecd2", growth:"stab"}), 18, 2, .27),
    plate:() => place(A.plate({colonies:A.scatter(6, 3, "white", 4, 7)}), 3, 3, .27),
    loop:() => `<line x1="8" y1="52" x2="44" y2="16" stroke="#9aa3b2" stroke-width="3"/><circle cx="48" cy="12" r="6" fill="none" stroke="#9aa3b2" stroke-width="3"/><rect x="4" y="48" width="14" height="8" rx="3" fill="#3f4cc0" transform="rotate(-45 11 52)"/>`,
    needle:() => `<line x1="8" y1="52" x2="52" y2="8" stroke="#9aa3b2" stroke-width="3"/><rect x="4" y="48" width="14" height="8" rx="3" fill="#3f4cc0" transform="rotate(-45 11 52)"/>`,
    pipette:() => `<rect x="25" y="2" width="10" height="8" rx="2" fill="#3f4cc0"/><rect x="21" y="10" width="18" height="34" rx="6" fill="#e8ecf2" stroke="#8b93a3" stroke-width="2"/><path d="M25,44 L35,44 L31,58 L29,58 Z" fill="#f2f4f7" stroke="#9aa3b2"/>`,
    slide:c => `<rect x="4" y="20" width="52" height="20" rx="3" fill="#dceef7" stroke="#8fb0c8" stroke-width="2"/>${c ? `<ellipse cx="36" cy="30" rx="9" ry="6" fill="${c}" opacity=".8"/>` : ""}`,
    label:() => `<path d="M8,22 L36,22 L52,32 L36,42 L8,42 Z" fill="#fff6dc" stroke="#d9b54a" stroke-width="2"/><circle cx="40" cy="32" r="3" fill="#d9b54a"/><path d="M14,30 L28,30 M14,35 L24,35" stroke="#8a5a00" stroke-width="2"/>`,
    spread:() => `<path d="M14,8 L22,8 L22,40 L46,40 L46,48 L14,48 Z" fill="#c9ced6" stroke="#8b93a3" stroke-width="2"/>`,
    count:() => place(A.plate({colonies:A.scatter(8, 5, "white", 4, 6).map((c, i) => Object.assign(c, {mark:i < 4}))}), 3, 3, .27),
    calc:() => `<rect x="12" y="6" width="36" height="48" rx="5" fill="#2f3b52"/><rect x="16" y="10" width="28" height="11" rx="2" fill="#7dffa0"/>${[0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${17 + c * 9}" y="${25 + r * 9}" width="7" height="7" rx="1.5" fill="#c9ced6"/>`).join("")).join("")}`,
    uv:() => `<rect x="4" y="4" width="52" height="52" rx="8" fill="#1a1840"/>${[[20, 22], [38, 28], [26, 40], [42, 44]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="#6dff95" opacity=".3"/><circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#8dffad"/>`).join("")}`,
    oil:() => `<path d="M30,8 C40,24 44,32 44,40 A14,14 0 0 1 16,40 C16,32 20,24 30,8 Z" fill="#f2c94c" stroke="#c9a23a" stroke-width="2"/>`,
    toothpick:() => `<line x1="10" y1="50" x2="50" y2="10" stroke="#d9b56a" stroke-width="4" stroke-linecap="round"/>`,
    dry:() => `<path d="M10,22 q8,-8 16,0 t16,0 t16,0 M10,34 q8,-8 16,0 t16,0 t16,0 M10,46 q8,-8 16,0 t16,0 t16,0" stroke="#9aa7b5" stroke-width="3" fill="none"/>`,
    waste:() => `<path d="M14,16 L46,16 L42,54 L18,54 Z" fill="#f4f8fb" stroke="#8b93a3" stroke-width="2"/><rect x="18" y="36" width="24" height="16" fill="#e0157f" opacity=".45"/>`
  };
  A.ico = (name, arg) => `<svg viewBox="0 0 60 60" aria-hidden="true" style="color:var(--ink)">${(ICO[name] || ICO.slide)(arg)}</svg>`;

  /* ---------------- Learn diagrams ---------------- */
  const F = A.figs = {};

  /* Lab 1 */
  F.mag = () => {
    const obj = [[4, "#d9443a", 22], [10, "#f2c94c", 30], [40, "#3f7bd1", 38], [100, "#f4f4f4", 46]];
    let s = "";
    obj.forEach(([o, c, h], i) => { const x = 40 + i * 140;
      s += `<rect x="${x + 30}" y="18" width="26" height="22" rx="3" fill="#2f3b52"/>${T(x + 43, 14, "10x", {fs:13})}${T(x + 72, 66, "×", {fs:20})}
        <rect x="${x + 30}" y="48" width="26" height="${h}" rx="3" fill="${c}" stroke="#8b93a3"/>${T(x + 43, 60 + h, o + "x", {fs:14})}
        ${T(x + 43, 140, "= " + (10 * o) + "x", {fs:22, c:"#1683cc"})}`; });
    return wrap(580, 156, s + T(4, 34, "Ocular", {fs:12, a:"start", w:400}) + T(4, 72, "Objective", {fs:12, a:"start", w:400}), "Total magnification: ocular times objective");
  };
  F.nosepiece = () => {
    const cx = 160, cy = 120, R = 70, pos = {"4x":[200, "#d9443a"], "10x":[290, "#f2c94c"], "40x":[20, "#3f7bd1"], "100x":[110, "#f4f4f4"]};
    let s = `<circle cx="${cx}" cy="${cy}" r="${R + 22}" fill="var(--surface-2)" stroke="#8b93a3" stroke-width="2"/>`;
    Object.keys(pos).forEach(k => { const a = (pos[k][0] - 90) * Math.PI / 180, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
      s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="22" fill="${pos[k][1]}" stroke="#56647c" stroke-width="2"/>${T(f1(x), f1(y + 5), k, {fs:14, c:"#14223a"})}`; });
    const p = (deg, rr) => { const a = (deg - 90) * Math.PI / 180; return [f1(cx + Math.cos(a) * rr), f1(cy + Math.sin(a) * rr)]; };
    const [x0, y0] = p(275, 108), [x1, y1] = p(125, 108);
    s += `<path d="M${x0},${y0} A108,108 0 0 0 ${x1},${y1}" fill="none" stroke="#1f8a55" stroke-width="5"/>` + arrow(+p(132, 108)[0], +p(132, 108)[1], +x1, +y1, "#1f8a55", 5);
    s += `<line x1="${p(20, 70)[0] - 26}" y1="${p(20, 70)[1] - 26}" x2="${p(20, 70)[0] + 26}" y2="${p(20, 70)[1] + 26}" stroke="#c43a2b" stroke-width="5"/>`;
    s += T(330, 70, "Go this way:", {fs:15, a:"start"}) + T(330, 90, "10x, past 4x,", {fs:15, a:"start", w:400}) + T(330, 110, "oil, then 100x", {fs:15, a:"start", w:400}) + T(330, 160, "Never through", {fs:15, a:"start", c:"#c43a2b"}) + T(330, 180, "the 40x", {fs:15, a:"start", c:"#c43a2b"});
    return wrap(470, 240, s, "Turn the nosepiece from 10x past 4x to 100x, never through 40x");
  };
  F.invert = () => {
    const s = `<rect x="10" y="40" width="150" height="70" rx="6" fill="#dceef7" stroke="#8fb0c8" stroke-width="2"/>${T(85, 92, "e", {fs:50, c:"#14223a"})}${T(85, 30, "On the slide", {fs:15})}
      ${arrow(40, 130, 130, 130, "#c2185b", 4)}${T(85, 152, "Move slide right", {fs:14, c:"#c2185b"})}
      <circle cx="300" cy="78" r="58" fill="#f7f4ee" stroke="#15171d" stroke-width="7"/><text x="0" y="0" font-size="56" font-weight="700" fill="#14223a" text-anchor="middle" transform="translate(300 58) rotate(180)">e</text>${T(300, 12, "In the ocular", {fs:15})}
      ${arrow(345, 160, 255, 160, "#1683cc", 4)}${T(300, 182, "Image moves left", {fs:14, c:"#1683cc"})}`;
    return wrap(380, 190, s, "The image is upside down and reversed, and moves the opposite way");
  };
  F.putaway = () => {
    const items = [["slide", "Slide out"], ["timer", "Voltage low, lamp off"], ["scope", "Stage centered, condenser up, 4x in"], ["oil", "Oil off all lenses"], ["label", "Cord, cover, numbered spot"]];
    return items;
  };

  /* Lab 2 */
  F.micrometer = () => {
    const po = 26, ps = po * 5 / 2, x0 = 50;
    let s = "";
    for (let k = 0; k <= 10; k++){ const x = x0 + k * po; s += `<line x1="${x}" y1="${k % 5 ? 46 : 36}" x2="${x}" y2="86" stroke="#14223a" stroke-width="${k % 5 ? 1.6 : 2.4}"/>`; }
    for (let k = -1; k <= 5; k++){ const x = x0 + k * ps; if (x < 10) continue; s += `<line x1="${x}" y1="86" x2="${x}" y2="130" stroke="#1b4f8a" stroke-width="2.4"/>`; }
    const xb = x0 + 5 * po;
    s += `<circle cx="${x0}" cy="86" r="6" fill="#1f8a55"/>${T(x0, 156, "A", {fs:18, c:"#1f8a55"})}<circle cx="${xb}" cy="86" r="6" fill="#1f8a55"/>${T(xb, 156, "B", {fs:18, c:"#1f8a55"})}`;
    s += `<path d="M${x0},26 L${x0},20 L${xb},20 L${xb},26" fill="none" stroke="#14223a" stroke-width="2"/>${T((x0 + xb) / 2, 14, "5 ocular spaces", {fs:14})}`;
    s += `<path d="M${x0},140 L${x0},146 L${xb},146 L${xb},140" fill="none" stroke="#1b4f8a" stroke-width="2"/>${T((x0 + xb) / 2, 172, "2 stage spaces = 2 × 10 µm = 20 µm", {fs:14, c:"#1b4f8a"})}`;
    s += T(340, 60, "Ocular ruler", {fs:14, a:"start"}) + T(340, 116, "Stage micrometer", {fs:14, a:"start", c:"#1b4f8a"});
    s += `<rect x="330" y="132" width="150" height="46" rx="8" fill="var(--surface-2)"/>${T(405, 152, "20 µm ÷ 5 =", {fs:14})}${T(405, 172, "4 µm per space", {fs:15, c:"#1f8a55"})}`;
    return wrap(490, 184, s, "Point A and point B on the ocular and stage rulers");
  };
  F.measure = () => {
    const po = 34;
    const ruler = (x0, y, n) => Array.from({length:n + 1}, (_, k) => `<line x1="${x0 + k * po}" y1="${y}" x2="${x0 + k * po}" y2="${y + (k % 5 ? 14 : 22)}" stroke="#14223a" stroke-width="${k % 5 ? 1.5 : 2.2}"/>`).join("") + `<line x1="${x0}" y1="${y}" x2="${x0 + n * po}" y2="${y}" stroke="#14223a" stroke-width="1.5"/>`;
    let s = ruler(20, 70, 4) + `<circle cx="${20 + po}" cy="52" r="${po}" fill="#5a2a98" opacity=".75"/>` + T(20 + po, 120, "Coccus: diameter = 2 spaces", {fs:14});
    s += ruler(210, 70, 5) + `<rect x="210" y="40" width="${po * 4}" height="${po * .9}" rx="${po * .45}" fill="#5a2a98" opacity=".75"/>` + T(290, 120, "Bacillus: length 4, width about 1", {fs:14});
    return wrap(400, 132, s, "Measuring a coccus and a bacillus with the ocular ruler");
  };

  /* Lab 3: pond water groups */
  F.pond = sp => {
    const k = sp.kind;
    let s;
    if (k === "protozoa") s = `<ellipse cx="80" cy="60" rx="58" ry="28" fill="#eef0e6" stroke="#8a8f7a" stroke-width="2"/>${Array.from({length:30}, (_, i) => { const a = i / 30 * 6.28; return `<line x1="${f1(80 + Math.cos(a) * 58)}" y1="${f1(60 + Math.sin(a) * 28)}" x2="${f1(80 + Math.cos(a) * 66)}" y2="${f1(60 + Math.sin(a) * 33)}" stroke="#8a8f7a" stroke-width="1.2"/>`; }).join("")}<ellipse cx="88" cy="58" rx="12" ry="9" fill="#b9a7d6"/>${arrow(140, 96, 156, 96, "#1683cc", 3)}`;
    else if (k === "algae") s = Array.from({length:5}, (_, i) => `<rect x="${12 + i * 28}" y="40" width="27" height="40" rx="6" fill="#bfe3a8" stroke="#5c9a3c" stroke-width="2"/><ellipse cx="${25 + i * 28}" cy="60" rx="6" ry="13" fill="#4f9d3a"/><circle cx="${25 + i * 28}" cy="60" r="3.5" fill="#6b4f9e"/>`).join("");
    else if (k === "cyano") s = Array.from({length:8}, (_, i) => `<rect x="${8 + i * 18}" y="48" width="17" height="24" rx="6" fill="#4ea79a" stroke="#2f7a6f" stroke-width="1.5"/>`).join("") + T(80, 100, "no nucleus", {fs:13, c:"#2f7a6f"});
    else s = `<path d="M40,30 C70,10 110,20 118,50 C126,80 100,104 80,110 C60,104 34,80 40,30 Z" fill="#f3efe8" stroke="#8a7f6c" stroke-width="2"/><path d="M52,28 q6,-14 12,0 M96,28 q6,-14 12,0" stroke="#8a7f6c" stroke-width="2" fill="none"/><ellipse cx="80" cy="62" rx="16" ry="12" fill="#e2c9a3"/><path d="M70,80 q10,10 20,0" stroke="#b98d55" stroke-width="3" fill="none"/><circle cx="66" cy="44" r="3" fill="#8a7f6c"/><circle cx="94" cy="44" r="3" fill="#8a7f6c"/>`;
    return wrap(170, 120, s, sp.cap || k);
  };

  /* Lab 4: colony count scale */
  F.countscale = () => {
    const rows = [["0", 0], ["+", 6], ["++", 30], ["+++", 75], ["++++", 150]];
    return wrap(600, 160, rows.map(([l, n], i) => place(A.plate({colonies:A.scatter(n, 40 + i, "white", 2.4, 4)}), 10 + i * 118, 0, .5) + T(60 + i * 118, 124, l, {fs:22}) + T(60 + i * 118, 148, ["none", "1 to 10", "11 to 50", "51 to 100", "over 100"][i], {fs:13, w:400})).join(""), "Colony count scale");
  };

  /* Lab 5 */
  F.charge = () => {
    const cell = (x, y) => `<rect x="${x - 40}" y="${y - 18}" width="80" height="36" rx="18" fill="#e9e4d8" stroke="#8a8f7a" stroke-width="2"/>${[-24, -8, 8, 24].map(dx => T(x + dx, y + 6, "−", {fs:18, c:"#c43a2b"})).join("")}`;
    const ion = (x, y, sgn, c) => `<circle cx="${x}" cy="${y}" r="11" fill="${c}"/>${T(x, y + 6, sgn, {fs:16, c:"#fff"})}`;
    let s = `<rect x="0" y="0" width="230" height="170" rx="12" fill="#2d2a30"/>${cell(115, 92)}${ion(40, 40, "−", "#555")}${ion(190, 46, "−", "#555")}${ion(196, 140, "−", "#555")}${ion(30, 140, "−", "#555")}
      ${arrow(60, 56, 44, 44, "#f2b134", 3)}${arrow(172, 58, 186, 48, "#f2b134", 3)}${T(115, 24, "Acidic dye (−): repelled", {fs:14, c:"#fff"})}${T(115, 158, "Background dark, cell clear", {fs:13, c:"#fff", w:400})}`;
    s += `<rect x="250" y="0" width="230" height="170" rx="12" fill="var(--surface-2)"/>${cell(365, 92)}${ion(335, 66, "+", "#2f63c4")}${ion(365, 64, "+", "#2f63c4")}${ion(395, 66, "+", "#2f63c4")}${ion(365, 120, "+", "#2f63c4")}
      ${T(365, 24, "Basic dye (+): attracted", {fs:14})}${T(365, 158, "The cell stains", {fs:13, w:400})}`;
    return wrap(480, 170, s, "Acidic dyes are repelled by negative cells; basic dyes stick to them");
  };
  F.shapes = () => wrap(420, 120,
    `<circle cx="70" cy="50" r="26" fill="#5a2a98"/>${T(70, 104, "Coccus", {fs:16})}<rect x="160" y="34" width="100" height="32" rx="16" fill="#5a2a98"/>${T(210, 104, "Bacillus", {fs:16})}<path d="M300,50 q12,-26 24,0 t24,0 t24,0 t24,0" fill="none" stroke="#5a2a98" stroke-width="10" stroke-linecap="round"/>${T(360, 104, "Spirillum", {fs:16})}`, "Three cell shapes");
  F.arrangements = () => {
    const L = [["Diplococci", "coccus", "pairs"], ["Streptococci", "coccus", "chains"], ["Staphylococci", "coccus", "clusters"], ["Tetrads", "coccus", "tetrads"],
      ["Sarcinae", "coccus", "sarcinae"], ["Diplobacilli", "rod", "pairs"], ["Streptobacilli", "rod", "chains"], ["Palisades", "rod", "palisades"]];
    const R = A.rng(5);
    return wrap(600, 260, L.map(([n, sh, ar], i) => { const x = 75 + (i % 4) * 150, y = 60 + Math.floor(i / 4) * 130;
      return `<rect x="${x - 70}" y="${y - 52}" width="140" height="120" rx="12" fill="var(--surface-2)"/><g transform="translate(${x} ${y}) scale(1.6) translate(${-x} ${-y})">${A.group(sh, ar, x, y, ar === "palisades" ? 0 : 0, "purple", R)}</g>${T(x, y + 58, n, {fs:14})}`; }).join(""), "Eight cell arrangements");
  };

  /* Lab 6 */
  F.smears = () => {
    const slide = (x, lab, water) => `<rect x="${x}" y="40" width="200" height="60" rx="5" fill="#dceef7" stroke="#8fb0c8" stroke-width="2"/><circle cx="${x + 130}" cy="70" r="20" fill="none" stroke="#5a6376" stroke-width="1.5" stroke-dasharray="4 3"/>
      ${water ? `<circle cx="${x + 124}" cy="70" r="7" fill="#9fd1f0"/><circle cx="${x + 137}" cy="72" r="7" fill="#9fd1f0"/>` : `<circle cx="${x + 124}" cy="70" r="7" fill="#e3d29a"/><circle cx="${x + 137}" cy="72" r="7" fill="#e3d29a"/>`}${T(x + 100, 26, lab, {fs:15})}${T(x + 100, 124, water ? "2 loops of water, then a little growth" : "2 loops of broth, no water", {fs:13, w:400})}`;
    return wrap(460, 134, slide(10, "From a broth", false) + slide(250, "From a slant", true), "Smear from a broth versus a slant");
  };
  F.heatfix = () => {
    let s = `<rect x="150" y="104" width="22" height="40" fill="#8b93a3"/><rect x="130" y="140" width="62" height="10" rx="3" fill="#56647c"/><path d="M161,48 C182,74 182,92 161,106 C140,92 140,74 161,48 Z" fill="#4c8fd6"/>`;
    s += `<rect x="60" y="30" width="110" height="24" rx="3" fill="#dceef7" stroke="#8fb0c8" stroke-width="2"/>` + arrow(70, 70, 260, 70, "#c2185b", 4);
    s += T(260, 30, "× 5 passes", {fs:22, c:"#c2185b"}) + T(260, 110, "Always 5.", {fs:15, w:400}) + T(260, 130, "Dry first!", {fs:15, w:400});
    return wrap(330, 156, s, "Heat fix: 5 passes through the flame");
  };

  /* Lab 8 and 10: what each reagent does to each cell type */
  F.stainstrip = sp => {
    const cols = sp.cols, rows = sp.rows, w = 120, h = 108;
    let s = cols.map((c, i) => T(150 + i * w + w / 2, 20, c[0], {fs:14}) + T(150 + i * w + w / 2, 38, c[1] || "", {fs:12, w:400})).join("");
    rows.forEach((r, j) => { s += T(140, 100 + j * h, r.name, {fs:14, a:"end"}) + (r.sub ? T(140, 118 + j * h, r.sub, {fs:12, a:"end", w:400}) : "");
      cols.forEach((c, i) => { const x = 150 + i * w + w / 2, y = 96 + j * h;
        s += `<circle cx="${x}" cy="${y}" r="44" fill="#f7f4ee" stroke="#15171d" stroke-width="5"/>` + A.group(r.shape, r.arr || "single", x - 8, y, r.shape === "coccus" ? 0 : 20, r.colors[i], A.rng(i + j * 7 + 3)) + (r.shape !== "coccus" ? A.group(r.shape, "single", x + 14, y + 20, -30, r.colors[i], A.rng(9)) + A.group(r.shape, "single", x + 10, y - 22, 60, r.colors[i], A.rng(11)) : ""); }); });
    return wrap(150 + cols.length * w, 40 + rows.length * h, s, sp.cap || "What each step does");
  };
  F.kinyounzn = () => {
    const s = `<rect x="0" y="0" width="220" height="170" rx="12" fill="var(--surface-2)"/>${T(110, 26, "Kinyoun (we use this)", {fs:15})}${place(A.ico("bottle", "#e0157f").replace(/aria-hidden="true"/, ""), 60, 36, 1.6)}
      ${T(110, 140, "More concentrated", {fs:14, c:"#c2185b"})}${T(110, 160, "NO heat", {fs:14, c:"#c2185b"})}
      <rect x="240" y="0" width="220" height="170" rx="12" fill="var(--surface-2)"/>${T(350, 26, "Ziehl-Neelsen", {fs:15})}${place(A.ico("hot"), 290, 36, 1.6)}
      ${T(350, 140, "Uses heat (hot plate)", {fs:14})}${T(350, 160, "to drive stain in", {fs:14, w:400})}`;
    return wrap(460, 170, s, "Kinyoun versus Ziehl-Neelsen");
  };

  /* Lab 9 */
  F.spore = () => {
    let s = `<rect x="20" y="96" width="250" height="34" rx="5" fill="#56647c"/>${T(145, 118, "Hot plate: LOW", {fs:14, c:"#fff"})}<rect x="40" y="88" width="210" height="9" fill="#d7dbe2"/>${T(145, 82, "foil", {fs:12, w:400})}
      <rect x="70" y="62" width="150" height="20" rx="3" fill="#dceef7" stroke="#8fb0c8" stroke-width="2"/><ellipse cx="160" cy="66" rx="40" ry="10" fill="#2a9d4a" opacity=".85"/>
      ${place(A.ico("timer", "15 min"), 270, 30, 1.3)}<path d="M100,52 q5,-9 0,-18 M150,52 q5,-9 0,-18 M200,52 q5,-9 0,-18" stroke="#e46a3a" stroke-width="2.5" fill="none"/>
      ${T(145, 20, "Malachite green, kept heating", {fs:15})}`;
    return wrap(360, 140, s, "Slide on foil on a hot plate, flooded with malachite green for 15 minutes");
  };
  F.sporecell = () => {
    const s = `<rect x="40" y="40" width="200" height="70" rx="35" fill="#e46a9a" stroke="#b84a76" stroke-width="2"/><ellipse cx="190" cy="75" rx="26" ry="20" fill="#2a9d4a" stroke="#1b6e33" stroke-width="3"/>
      ${T(110, 82, "vegetative cell", {fs:14, c:"#fff"})}${T(250, 30, "endospore (green)", {fs:14, a:"middle", c:"#1b6e33"})}<ellipse cx="300" cy="80" rx="20" ry="15" fill="#2a9d4a" stroke="#1b6e33" stroke-width="3"/>${T(300, 124, "free spore", {fs:14, c:"#1b6e33"})}
      ${T(140, 134, "Thick spore coat keeps normal stains out", {fs:13, w:400})}`;
    return wrap(340, 140, s, "A vegetative cell with an endospore, and a free spore");
  };

  /* Lab 11 */
  F.stab = () => {
    const top = 56, end = top + (176 - top) * 2 / 3;
    const tube = A.tube({kind:"semisolid", medium:"#f4ecd2", growth:"stab"});
    const s = place(tube, 20, 0, 1) + `<line x1="60" y1="-4" x2="60" y2="${end}" stroke="#56647c" stroke-width="3"/><rect x="54" y="-16" width="12" height="14" rx="3" fill="#3f4cc0"/>`
      + `<path d="M110,${top} L118,${top} L118,${end} L110,${end}" fill="none" stroke="#c2185b" stroke-width="2.5"/>${T(150, (top + end) / 2 + 5, "2/3 down", {fs:16, c:"#c2185b"})}${T(150, (top + end) / 2 + 25, "the center", {fs:14, w:400})}`;
    return `<svg viewBox="0 -20 210 240" role="img" aria-label="Stab 2/3 of the way down the center" style="color:var(--ink)">${s}</svg>`;
  };

  /* Lab 12 */
  F.transfer = () => {
    const s = place(A.tube({kind:"slant", medium:"#efdba6", cloudy:"#fbf3dc"}), 10, 10, .8) + place(A.tube({kind:"broth", medium:"#f3e9c7"}), 230, 10, .8)
      + `<path d="M70,40 C110,0 170,0 210,40" fill="none" stroke="#1683cc" stroke-width="3" stroke-dasharray="6 4"/>` + arrow(196, 28, 212, 42, "#1683cc", 3)
      + `<g transform="translate(118 30)">${inner(A.ico("loop"))}</g>${T(145, 110, "1 loop", {fs:18, c:"#1683cc"})}${T(145, 132, "Flame loop + necks", {fs:13, w:400})}${T(145, 150, "before and after", {fs:13, w:400})}`;
    return wrap(300, 190, s, "One loop from the slant into sterile nutrient broth");
  };

  /* Lab 13 */
  F.rt37 = () => {
    const R = A.rng(13), cols = [];
    for (let i = 0; i < 18; i++){ const a = R() * 6.28, rr = Math.sqrt(R()) * 70, k = i % 3; cols.push({x:100 + Math.cos(a) * rr, y:100 + Math.sin(a) * rr, r:6, c:k === 0 ? "#d23b3b" : k === 1 ? "yellow" : "white"}); }
    return wrap(470, 230, place(A.plate({colonies:cols}), 10, 0, .95) + place(A.ico("incub", "RT"), 230, 50, 1.2) + arrow(310, 86, 352, 86, "#1683cc", 4) + place(A.ico("incub", "37°C"), 360, 50, 1.2)
      + T(105, 218, "One plate", {fs:15}) + T(266, 140, "Room temp", {fs:14}) + T(266, 160, "1 day", {fs:13, w:400}) + T(396, 140, "Then 37°C", {fs:14})
      + T(330, 196, "Red = S. marcescens", {fs:13, c:"#c9302c"}) + T(330, 214, "Yellow = M. luteus, white = B. megaterium", {fs:12, w:400}), "One plate at room temperature for a day, then 37 degrees");
  };
  F.streaks = () => ["quadrant", "radiant", "tstreak", "continuous"].map(id => ({id, svg:A.plate({extra:A.streakEx(id)})}));

  /* Lab 14 */
  F.dilseries = () => {
    const tubes = [["A", "9.9 mL", "0.1 mL", "1/100", "10⁻²"], ["B", "9.9 mL", "0.1 mL", "1/100", "10⁻⁴"], ["C", "9 mL", "1 mL", "1/10", "10⁻⁵"], ["D", "9 mL", "1 mL", "1/10", "10⁻⁶"], ["E", "9 mL", "1 mL", "1/10", "10⁻⁷"], ["F", "9 mL", "1 mL", "1/10", "10⁻⁸"]];
    let s = place(A.tube({kind:"broth", medium:"#e3d29a", cloudy:"#d8c37f"}), 0, 40, .55) + T(22, 172, "Culture", {fs:12});
    tubes.forEach((t, i) => { const x = 80 + i * 96;
      s += place(A.tube({kind:"broth", medium:"#f3e9c7", cloudy:i < 3 ? "#e3d29a" : ""}), x, 40, .55) + T(x + 22, 34, t[0], {fs:18});
      s += arrow(x - 40, 26, x + 6, 50, "#1683cc", 2.5) + T(x - 18, 18, t[2], {fs:12, c:"#1683cc"});
      s += T(x + 22, 172, t[1] + " water", {fs:11, w:400}) + T(x + 22, 192, t[3], {fs:14, c:"#c2185b"}) + T(x + 22, 214, t[4], {fs:16, c:"#1f8a55"}); });
    s += T(4, 192, "Factor:", {fs:12, a:"start", c:"#c2185b"}) + T(4, 214, "Total:", {fs:12, a:"start", c:"#1f8a55"});
    return wrap(660, 224, s, "Serial dilution tubes A to F with volumes, dilution factors, and total dilutions");
  };
  F.dilplates = () => {
    const P = [["C", 10, "TNTC"], ["D", 300, "TNTC (>200)"], ["E", 52, "52: count it"], ["F", 5, "5"]];
    return wrap(520, 170, P.map(([n, c, l], i) => place(A.plate({colonies:c === 10 ? A.scatter(400, 3, "white", 1.4, 2.2) : A.scatter(c, 20 + i, "white", 2.5, 4)}), 10 + i * 128, 0, .55) + T(65 + i * 128, 132, "Plate " + n, {fs:15}) + T(65 + i * 128, 154, l, {fs:13, w:400, c:i === 2 ? "#1f8a55" : "currentColor"})).join(""), "Plates C to F: crowded plates are TNTC");
  };

  /* Lab 15 */
  F.cacl2 = () => {
    let s = `<rect x="10" y="120" width="420" height="28" rx="6" fill="#f6e7c4"/>${Array.from({length:14}, (_, i) => `<circle cx="${24 + i * 30}" cy="134" r="8" fill="#e6b85c"/>${T(24 + i * 30, 139, "−", {fs:13, c:"#7a2e28"})}`).join("")}${T(220, 168, "Cell membrane (negative)", {fs:14})}`;
    s += `<path d="M60,30 C120,10 180,50 240,30 C300,10 360,50 410,30" fill="none" stroke="#1683cc" stroke-width="10" stroke-linecap="round"/>${[80, 140, 200, 260, 320, 380].map(x => T(x, 58, "−", {fs:18, c:"#c43a2b"})).join("")}${T(230, 16, "Plasmid DNA backbone (negative)", {fs:14, c:"#1683cc"})}`;
    s += [70, 130, 190, 250, 310, 370].map(x => `<circle cx="${x + 10}" cy="88" r="13" fill="#1f8a55"/>${T(x + 10, 93, "Ca²⁺", {fs:11, c:"#fff"})}`).join("");
    return wrap(440, 180, s, "Calcium ions shield the negative charges so the plasmid can get close to the cell");
  };
  F.heatshock = () => {
    const P = [["On ice", "0°C", 0, "#9fd1f0", "about 1 hour"], ["Heat shock", "42°C", 42, "#e4572e", "45 seconds"], ["Back on ice", "0°C", 0, "#9fd1f0", "2 to 10 min"], ["Recover in LB", "37°C", 37, "#f2a33a", "1 hour"]];
    const base = 200, w = 132, gap = 14;
    let s2 = P.map(([name, temp, c, col, time], i) => { const x = 20 + i * (w + gap), h = 34 + c * 3;
      return `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" rx="10" fill="${col}"/>${T(x + w / 2, base - h - 12, temp, {fs:20})}${T(x + w / 2, base - 12, name, {fs:14, c:c ? "#fff" : "#14223a"})}${T(x + w / 2, base + 26, time, {fs:15})}`
        + (i ? arrow(x - gap + 2, base - 20, x - 2, base - 20, "#53657b", 2) : ""); }).join("");
    return wrap(20 + 4 * (w + gap), 236, s2 + `<line x1="10" y1="${base}" x2="${4 * (w + gap) + 14}" y2="${base}" stroke="currentColor" stroke-width="2"/>`, "Temperature at each step: ice, 42 degree heat shock, ice, 37 degree recovery");
  };
  F.arac = () => {
    const strand = (y, on) => `<rect x="20" y="${y}" width="120" height="16" rx="4" fill="#a96c05"/>${T(80, y + 12, "araC", {fs:12, c:"#fff"})}<rect x="140" y="${y}" width="40" height="16" fill="#5a2a98"/>${T(160, y + 12, "pBAD", {fs:11, c:"#fff"})}<rect x="180" y="${y}" width="150" height="16" rx="4" fill="${on ? "#1f8a55" : "#9aa7b5"}"/>${T(255, y + 12, "GFP", {fs:12, c:"#fff"})}`;
    let s = T(10, 20, "No arabinose", {fs:15, a:"start"}) + strand(60, false) + `<path d="M140,58 L180,58 L172,38 L148,38 Z" fill="#a96c05"/>${T(160, 32, "AraC blocks", {fs:12, c:"#a96c05"})}`
      + `<ellipse cx="110" cy="44" rx="20" ry="12" fill="#3f7bd1" opacity=".5"/>${T(110, 48, "RNA pol", {fs:10, c:"#fff"})}${T(380, 72, "GFP OFF", {fs:15, c:"#53657b"})}`;
    s += T(10, 130, "With arabinose", {fs:15, a:"start"}) + strand(170, true) + `<circle cx="150" cy="150" r="10" fill="#a96c05"/><polygon points="160,144 170,140 168,152" fill="#e46a3a"/>${T(150, 136, "AraC + arabinose", {fs:11, c:"#a96c05"})}`
      + `<ellipse cx="210" cy="156" rx="22" ry="12" fill="#3f7bd1"/>${T(210, 160, "RNA pol", {fs:10, c:"#fff"})}` + arrow(236, 156, 300, 156, "#3f7bd1", 3) + T(380, 182, "GFP ON", {fs:15, c:"#1f8a55"})
      + `<circle cx="420" cy="176" r="10" fill="#8dffad" stroke="#1f8a55" stroke-width="2"/>`;
    return wrap(450, 200, s, "Without arabinose AraC blocks GFP; with arabinose RNA polymerase transcribes GFP");
  };
  F.pgloplates = () => {
    const P = [
      ["LB", "−pGLO", A.plate({lawn:true, seed:2}), "Lawn"],
      ["LB/amp", "−pGLO", A.plate({}), "No growth"],
      ["LB/amp", "+pGLO", A.plate({colonies:A.scatter(14, 151, "white", 4, 6)}), "White colonies"],
      ["LB/amp/ara", "+pGLO", A.plate({uv:true, colonies:A.scatter(14, 152, "white", 4, 6).map(c => Object.assign(c, {glow:true}))}), "Glow under UV"]];
    return wrap(560, 200, P.map(([pl, ce, svg, r], i) => T(70 + i * 140, 16, pl, {fs:14}) + T(70 + i * 140, 34, ce, {fs:13, w:400, c:ce[0] === "+" ? "#1f8a55" : "#c43a2b"}) + place(svg, 10 + i * 140, 40, .6) + T(70 + i * 140, 184, r, {fs:13})).join(""), "Four pGLO plates and their results");
  };
  F.energyfixed = () => A.energy(["up", "down"], false);
  F.plasmid = () => A.plasmid(A.PLASMID.map(p => p.id === "pBAD" ? "pBAD" : p.id));

  /* streak pattern examples (shared with the streak practice) */
  function zig(x0, y0, x1, y1, n, amp, c){
    const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), px = -dy / L, py = dx / L, pts = [];
    for (let i = 0; i <= n; i++){ const s2 = i % 2 ? amp : -amp; pts.push([f1(x0 + dx * i / n + px * s2), f1(y0 + dy * i / n + py * s2)]); }
    return `<polyline points="${pts.map(p => p.join(",")).join(" ")}" fill="none" stroke="${c || "#1683cc"}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
  }
  const num = (x, y, t) => `<circle cx="${x}" cy="${y}" r="9" fill="#14223a"/><text x="${x}" y="${y + 4.5}" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">${t}</text>`;
  A.streakEx = id => {
    if (id === "quadrant") return zig(32, 92, 92, 32, 10, 12) + zig(84, 36, 166, 92, 10, 11, "#c2185b") + zig(162, 86, 108, 166, 9, 11, "#1f8a55") + zig(114, 160, 46, 128, 8, 10, "#a96c05") + num(52, 52, 1) + num(150, 56, 2) + num(150, 150, 3) + num(60, 150, 4);
    if (id === "tstreak") return `<path d="M16,92 L184,92 M100,92 L100,184" stroke="#53657b" stroke-width="2" stroke-dasharray="6 4"/>` + zig(36, 64, 164, 64, 12, 18) + zig(60, 70, 60, 168, 9, 18, "#c2185b") + zig(66, 160, 150, 120, 8, 14, "#1f8a55") + num(100, 30, 1) + num(28, 130, 2) + num(170, 140, 3);
    if (id === "radiant") return `<line x1="46" y1="44" x2="154" y2="44" stroke="#1683cc" stroke-width="4" stroke-linecap="round"/>` + [-58, -36, -14, 8, 30, 52].map(a => { const r = a * Math.PI / 180; return `<line x1="${f1(100 + Math.sin(r) * 40)}" y1="46" x2="${f1(100 + Math.sin(r) * 140)}" y2="${f1(46 + Math.cos(r) * 130)}" stroke="#c2185b" stroke-width="3" stroke-linecap="round"/>`; }).join("") + num(30, 40, 1) + num(150, 150, 2);
    const pts = []; for (let y = 30, k = 0; y <= 170; y += 14, k++){ const h = Math.sqrt(Math.max(0, 80 * 80 - (y - 100) * (y - 100))) - 6; pts.push([k % 2 ? 100 + h : 100 - h, y]); }
    return `<polyline points="${pts.map(p => p.map(f1).join(",")).join(" ")}" fill="none" stroke="#1683cc" stroke-width="3" stroke-linejoin="round"/>`;
  };
})();
