/* Randomized practice problems. Each generator returns {q, fig, fields:[...], sol, hint}.
   These are new practice problems with their own numbers. They are not copied from Practicum 1. */
(function(){
  const V = window.VLAB, A = window.ART, P = V.problems;
  const pick = (a, R) => a[Math.floor(R() * a.length)];
  const r = n => +(+n).toPrecision(6);
  const p10 = e => `10<sup>${e}</sup>`;

  /* ---------- Lab 1: total magnification ---------- */
  P.mag = R => {
    const oc = pick([10, 15], R), ob = pick([4, 10, 40, 100], R), tot = oc * ob;
    if (R() < .7) return {q:`The ocular is <b>${oc}x</b>. The objective is <b>${ob}x</b>. What is the total magnification?`,
      fields:[{label:"Total magnification:", ans:tot, unit:"x"}],
      sol:`<ol><li>Total magnification = ocular × objective.</li><li>${oc} × ${ob} = <b>${tot}x</b>.</li></ol>`,
      hint:"Multiply the ocular by the objective."};
    return {q:`The ocular is <b>${oc}x</b>. The total magnification is <b>${tot}x</b>. Which objective is in place?`,
      fields:[{label:"Objective:", ans:ob, unit:"x"}],
      sol:`<ol><li>Total = ocular × objective, so objective = total ÷ ocular.</li><li>${tot} ÷ ${oc} = <b>${ob}x</b>.</li></ol>`,
      hint:"Divide the total by the ocular."};
  };

  /* ---------- Lab 2: ocular micrometer ---------- */
  function cal(R){
    for (let t = 0; t < 400; t++){
      const s = pick([1, 5, 10], R), o = pick([5, 8, 10, 20, 25, 40, 50], R), v = pick([2.5, 4, 5, 8, 10, 12.5, 15, 20, 25], R), st = v * o / s;
      if (Number.isInteger(st) && st >= 2 && st <= 100 && st !== o) return {s, o, v, st};
    }
    return {s:10, o:10, v:8, st:8};
  }
  function rulerFig(spaces, shape){
    const po = 30, x0 = 30, n = Math.ceil(spaces) + 3;
    let s = `<rect width="${x0 * 2 + n * po}" height="110" fill="#f7f4ee" rx="10"/>`;
    for (let k = 0; k <= n; k++) s += `<line x1="${x0 + k * po}" y1="${k % 5 ? 70 : 60}" x2="${x0 + k * po}" y2="95" stroke="#14223a" stroke-width="${k % 5 ? 1.5 : 2.4}"/>` + (k % 5 ? "" : `<text x="${x0 + k * po}" y="54" font-size="13" text-anchor="middle" fill="#14223a">${k}</text>`);
    const L = spaces * po;
    if (shape === "coccus") s += `<circle cx="${x0 + L / 2}" cy="${80 - L / 2 > 6 ? 80 : 80}" r="${L / 2}" fill="#5a2a98" opacity=".75"/>`;
    else s += `<rect x="${x0}" y="68" width="${L}" height="${Math.max(14, po * .8)}" rx="${Math.max(7, po * .4)}" fill="#5a2a98" opacity=".75"/>`;
    return `<svg viewBox="0 0 ${x0 * 2 + n * po} 110" role="img" aria-label="Cell over the ocular ruler">${s}</svg>`;
  }
  P.cal10 = R => {
    const c = cal(R);
    return {q:`Each stage micrometer space is <b>${c.s} µm</b>. Under the 10x objective, point A and point B are <b>${c.o}</b> ocular spaces apart. The same distance covers <b>${c.st}</b> stage spaces. How many µm is one ocular space at 10x?`,
      fields:[{label:"One ocular space at 10x =", ans:c.v, unit:"µm"}],
      sol:`<ol><li>Stage distance = ${c.st} stage spaces × ${c.s} µm = <b>${c.st * c.s} µm</b>.</li><li>µm per ocular space = ${c.st * c.s} µm ÷ ${c.o} ocular spaces = <b>${c.v} µm</b>.</li></ol>`,
      hint:"First find the stage distance in µm (stage spaces × µm per stage space). Then divide by the ocular spaces."};
  };
  P.to100 = R => {
    const v = pick([2.5, 4, 5, 6, 8, 10, 12.5, 15], R);
    return {q:`At 10x, one ocular space = <b>${v} µm</b>. What is one ocular space under the 100x objective?`,
      fields:[{label:"One ocular space at 100x =", ans:r(v / 10), unit:"µm"}],
      sol:`<ol><li>The 100x objective magnifies 10 times more than the 10x, so each ocular space covers one tenth as much.</li><li>${v} ÷ 10 = <b>${r(v / 10)} µm</b>.</li><li>We do not put the stage micrometer under 100x because it would need oil on it.</li></ol>`,
      hint:"100x calibration = 10x value ÷ 10."};
  };
  P.measure = R => {
    const v = pick([5, 8, 10, 12.5, 15, 20], R), u = v / 10;
    if (R() < .5){
      const k = pick([1, 1.5, 2, 2.5, 3], R);
      return {q:`At 10x, one ocular space = <b>${v} µm</b>. Under 100x, a coccus is <b>${k}</b> ocular spaces across. What is its diameter?`,
        fig:rulerFig(k, "coccus"),
        fields:[{label:"Diameter =", ans:r(k * u), unit:"µm"}],
        sol:`<ol><li>Convert to 100x: ${v} ÷ 10 = <b>${r(u)} µm</b> per ocular space.</li><li>Diameter = ${k} spaces × ${r(u)} µm = <b>${r(k * u)} µm</b>.</li></ol>`,
        hint:"Convert the 10x value to 100x first (divide by 10). Then multiply by the number of spaces."};
    }
    const L = pick([2, 2.5, 3, 4, 5, 6], R), W = pick([.5, 1, 1.5], R);
    return {q:`At 10x, one ocular space = <b>${v} µm</b>. Under 100x, a bacillus is <b>${L}</b> ocular spaces long and <b>${W}</b> ocular spaces wide. Give its length and width.`,
      fig:rulerFig(L, "rod"),
      fields:[{label:"Length =", ans:r(L * u), unit:"µm"}, {label:"Width =", ans:r(W * u), unit:"µm"}],
      sol:`<ol><li>Convert to 100x: ${v} ÷ 10 = <b>${r(u)} µm</b> per ocular space.</li><li>Length = ${L} × ${r(u)} = <b>${r(L * u)} µm</b>.</li><li>Width = ${W} × ${r(u)} = <b>${r(W * u)} µm</b>.</li></ol>`,
      hint:"Convert the 10x value to 100x first (divide by 10). Then multiply each measurement by it."};
  };

  P.fullcal = R => {
    const c = cal(R), u = c.v / 10, k = pick([1, 1.5, 2, 2.5, 3], R);
    return {q:`Each stage space is <b>${c.s} µm</b>. At 10x, point A to point B is <b>${c.o}</b> ocular spaces and <b>${c.st}</b> stage spaces. Under 100x, a coccus covers <b>${k}</b> ocular spaces. Fill in all three.`,
      fig:rulerFig(k, "coccus"),
      fields:[{label:"1. One ocular space at 10x =", ans:c.v, unit:"µm"}, {label:"2. One ocular space at 100x =", ans:r(u), unit:"µm"}, {label:"3. Coccus diameter =", ans:r(k * u), unit:"µm"}],
      sol:`<ol><li>Stage distance: ${c.st} × ${c.s} µm = <b>${c.st * c.s} µm</b>. Divide by ${c.o} ocular spaces = <b>${c.v} µm</b> at 10x.</li><li>100x: ${c.v} ÷ 10 = <b>${r(u)} µm</b>.</li><li>Coccus: ${k} × ${r(u)} = <b>${r(k * u)} µm</b>.</li></ol>`,
      hint:"Go in order. Each answer feeds the next one."};
  };

  /* ---------- Lab 5: name the arrangement ---------- */
  const ARR = [
    ["Diplococci", "coccus", "pairs", "cocci in pairs"], ["Diplobacilli", "rod", "pairs", "rods in pairs"],
    ["Streptococci", "coccus", "chains", "cocci in chains"], ["Streptobacilli", "rod", "chains", "rods in chains"],
    ["Staphylococci", "coccus", "clusters", "cocci in grape-like clusters"], ["Tetrads", "coccus", "tetrads", "cocci in groups of four (a flat square)"],
    ["Sarcinae", "coccus", "sarcinae", "cocci in cubes of eight"], ["Palisades", "rod", "palisades", "rods lined up side by side, like a fence"]];
  P.arr = R => {
    const a = pick(ARR, R);
    return {q:"Name this arrangement.", fig:A.arrangement(a[1], a[2], pick(["purple", "blue", "pink"], R), Math.floor(R() * 1e5)),
      fields:[{kind:"choice", opts:ARR.map(x => x[0]), ans:a[0]}],
      sol:`<p>These are ${a[3]}: <b>${a[0]}</b>. ${a[1] === "coccus" ? "Coccus = sphere." : "Bacillus = rod."}</p>`,
      hint:"First decide: spheres or rods? Then look at how they are grouped."};
  };

  /* ---------- Lab 14: dilutions and plate counts ---------- */
  const PAIRS = [[0.1, 9.9], [1, 9], [0.5, 4.5], [1, 4], [0.2, 9.8], [0.5, 9.5], [1, 99], [0.1, 0.9], [2, 8]];
  P.dilfactor = R => {
    const [a, w] = pick(PAIRS, R), tot = r(a + w), df = a / tot, den = Math.round(tot / a);
    return {q:`You add <b>${a} mL</b> of culture to <b>${w} mL</b> of sterile water. What is the dilution factor for this tube?`,
      fields:[{label:"Dilution factor:", ans:df, show:`1/${den}`}],
      note:"You can type a fraction (like 1/10) or a decimal.",
      sol:`<ol><li>Total volume = ${a} mL + ${w} mL = <b>${tot} mL</b>.</li><li>Dilution factor = volume added ÷ total volume = ${a} ÷ ${tot} = <b>1/${den}</b>.</li></ol>`,
      hint:"Dilution factor = volume added ÷ total volume. Total volume includes what you added."};
  };
  P.totaldil = R => {
    const n = 2 + Math.floor(R() * 3), f = Array.from({length:n}, () => pick([10, 100], R)), tot = f.reduce((a, b) => a * b, 1), e = Math.round(Math.log10(tot));
    const names = "ABCDEF".slice(0, n).split("");
    return {q:`A dilution series has ${n} tubes. The dilution factors are: ${f.map((x, i) => `tube ${names[i]} <b>1/${x}</b>`).join(", ")}. What is the total dilution in tube ${names[n - 1]}?`,
      fields:[{label:"Total dilution:", ans:1 / tot, show:`10^-${e}`}],
      note:"You can type 10^-5, 1/100000, or 0.00001.",
      sol:`<ol><li>Multiply the dilution factors: ${f.map(x => `1/${x}`).join(" × ")}.</li><li>= 1/${tot.toLocaleString("en-US")} = <b>${p10(-e)}</b>.</li></ol>`,
      hint:"Total dilution = multiply the dilution factor of every tube."};
  };
  P.ul2ml = R => {
    if (R() < .6){ const ul = pick([10, 20, 50, 100, 200, 250, 400, 500, 1000], R);
      return {q:`Convert <b>${ul} µL</b> to mL.`, fields:[{label:"Answer:", ans:ul / 1000, unit:"mL"}], sol:`<ol><li>To change µL to mL, divide by 1000.</li><li>${ul} ÷ 1000 = <b>${r(ul / 1000)} mL</b>.</li></ol>`, hint:"Divide µL by 1000."}; }
    const ml = pick([0.05, 0.1, 0.2, 0.25, 0.5, 1], R);
    return {q:`Convert <b>${ml} mL</b> to µL.`, fields:[{label:"Answer:", ans:ml * 1000, unit:"µL"}], sol:`<ol><li>To change mL to µL, multiply by 1000.</li><li>${ml} × 1000 = <b>${r(ml * 1000)} µL</b>.</li></ol>`, hint:"Multiply mL by 1000."};
  };
  /* TODO (instructor): the brief gives only the upper limit (more than 200 = TNTC). It gives no lower limit,
     so these problems never ask students to reject a plate for having too few colonies. */
  P.reliable = R => {
    const good = 40 + Math.floor(R() * 150), e = 4 + Math.floor(R() * 3), names = "CDEF".split("");
    const plates = V.shuffle([
      {d:`Too many colonies to count`, ok:false, why:"More than 200 colonies is TNTC. Do not use it."},
      {d:`About 160 colonies, but many have grown together, so you cannot tell where one ends and the next begins`, ok:false, why:"Merged colonies cannot be counted accurately."},
      {d:`${good} separate colonies`, ok:true, why:"Countable: 200 or fewer, and every colony is separate."},
      {d:`0 colonies`, ok:false, why:"With 0 colonies there is nothing to calculate from."}], R);
    plates.forEach((p, i) => p.n = names[i]);
    const right = plates.find(p => p.ok);
    return {q:`You plated 100 µL from four tubes. Which plate should you use to calculate cells/mL?<ul>${plates.map(p => `<li><b>Plate ${p.n}:</b> ${p.d}</li>`).join("")}</ul>`,
      fields:[{kind:"choice", opts:plates.map(p => `Plate ${p.n}`), ans:`Plate ${right.n}`}],
      sol:`<ul>${plates.map(p => `<li><b>Plate ${p.n}:</b> ${p.why}</li>`).join("")}</ul>`,
      hint:"Rule out TNTC plates and plates you cannot count accurately."};
  };
  P.sci = R => {
    const m = pick([1.2, 2.5, 3.4, 4.75, 5.2, 6.8, 8.1, 9.3], R), e = pick([5, 6, 7, 8, 9, 10], R), n = Math.round(m * Math.pow(10, e));
    if (R() < .5) return {q:`Write <b>${n.toLocaleString("en-US")}</b> in scientific notation.`,
      fields:[{label:"Answer:", ans:n, show:`${m} x 10^${e}`}], note:"Type it like 3.4 x 10^7 or 3.4e7.",
      sol:`<ol><li>Put the decimal after the first digit: <b>${m}</b>.</li><li>Count how many places the decimal moved to the left: <b>${e}</b>.</li><li>Answer: <b>${m} × 10<sup>${e}</sup></b>.</li></ol>`,
      hint:"Move the decimal until one digit is in front of it. Count the moves."};
    return {q:`Write <b>${m} × 10<sup>${e}</sup></b> as a regular number.`,
      fields:[{label:"Answer:", ans:n, show:n.toLocaleString("en-US")}], note:"Commas are OK.",
      sol:`<ol><li>The exponent is ${e}, so move the decimal <b>${e}</b> places to the right.</li><li>Fill empty places with zeros: <b>${n.toLocaleString("en-US")}</b>.</li></ol>`,
      hint:"A positive exponent means move the decimal to the right."};
  };
  P.chain = R => {
    const opts = [[1, 9], [0.1, 9.9], [0.5, 4.5], [1, 99], [0.2, 1.8]], n = 3 + Math.floor(R() * 2);
    const tubes = Array.from({length:n}, () => pick(opts, R)), names = "ABCDE".split("");
    const dfs = tubes.map(([a, w]) => a / (a + w)), tot = dfs.reduce((x, y) => x * y, 1), e = Math.round(-Math.log10(tot));
    const c = 30 + Math.floor(R() * 160), ul = pick([100, 200], R), ml = ul / 1000, cells = c / (tot * ml);
    return {q:`A new dilution series:<ul>${tubes.map(([a, w], i) => `<li>Tube ${names[i]}: <b>${a} mL</b> ${i ? `from tube ${names[i - 1]}` : "of culture"} + <b>${w} mL</b> water</li>`).join("")}</ul>You plate <b>${ul} µL</b> from tube ${names[n - 1]} and count <b>${c}</b> colonies.`,
      fields:[{label:`Total dilution of tube ${names[n - 1]}:`, ans:tot, show:`10^-${e}`}, {label:"cells/mL in the original:", ans:cells, show:V.sci(cells, 3).replace(/<sup>/, "^").replace(/<\/sup>/, "").replace(" × ", " x ")}],
      note:"Type numbers like 10^-5 or 2.5 x 10^9.",
      sol:`<ol>${tubes.map(([a, w], i) => `<li>Tube ${names[i]}: ${a} ÷ (${a} + ${w}) = <b>1/${Math.round((a + w) / a)}</b></li>`).join("")}<li>Multiply them: <b>${p10(-e)}</b>.</li><li>${ul} µL = <b>${ml} mL</b>.</li><li>cells/mL = ${c} ÷ (${p10(-e)} × ${ml}) = <b>${V.sci(cells, 3)} cells/mL</b>.</li></ol>`,
      hint:"Find each tube's dilution factor first (added ÷ total). Then multiply them all."};
  };
  P.expected = R => {
    const m = pick([1.5, 2, 3, 4, 5, 6, 8], R), e = pick([8, 9], R), N = m * Math.pow(10, e), d = pick([5, 6, 7], R), ml = 0.1, col = N * Math.pow(10, -d) * ml;
    if (col > 300 || col < 5) return P.expected(R);
    return {q:`A culture has <b>${m} × 10<sup>${e}</sup> cells/mL</b>. You plate <b>100 µL</b> from a tube with a total dilution of <b>${p10(-d)}</b>. About how many colonies should grow?`,
      fields:[{label:"Colonies:", ans:r(col), tol:.02}],
      note:col > 200 ? "" : "",
      sol:`<ol><li>Rearrange: CFUs = cells/mL × total dilution × mL plated.</li><li>100 µL = <b>0.1 mL</b>.</li><li>${m} × 10<sup>${e}</sup> × ${p10(-d)} × 0.1 = <b>${r(col)}</b> colonies.</li>${col > 200 ? "<li>That is more than 200, so this plate would be <b>TNTC</b>.</li>" : ""}</ol>`,
      hint:"Multiply: cells/mL × total dilution × mL plated."};
  };
  P.cellsml = R => {
    const c = 25 + Math.floor(R() * 170), e = 4 + Math.floor(R() * 5), ul = pick([100, 100, 200, 50], R), ml = ul / 1000;
    const d = Math.pow(10, -e), ans = c / (d * ml);
    return {q:`A plate from a tube with a total dilution of <b>${p10(-e)}</b> has <b>${c}</b> colonies. You plated <b>${ul} µL</b>. How many cells/mL were in the original culture?`,
      fields:[{label:"Answer:", ans, show:`${(ans / Math.pow(10, Math.floor(Math.log10(ans)))).toFixed(3).replace(/\.?0+$/, "")} x 10^${Math.floor(Math.log10(ans))}`, unitOpts:["cells/mL", "cells", "mL", "cells/µL"], unitAns:"cells/mL"}],
      note:"Type numbers like 1.5 x 10^9, 1.5e9, or 1500000000. Then pick the units.",
      sol:`<ol><li>Convert the volume: ${ul} µL ÷ 1000 = <b>${ml} mL</b>.</li><li>cells/mL = CFUs ÷ (total dilution × volume plated in mL).</li><li>= ${c} ÷ (${p10(-e)} × ${ml} mL)</li><li>= <b>${V.sci(ans, 3)} cells/mL</b>.</li></ol>`,
      hint:"cells/mL = CFUs ÷ (total dilution × mL plated). Change µL to mL first."};
  };
})();
