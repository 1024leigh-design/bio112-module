/* Virtual Lab core: hub, routing, station tabs, Learn/Test, Mistakes, Problems, Vocab, and the
   "20 minutes on the clock" activity. Lab content lives in labs/labNN-*.js (one file per lab).
   Learn/Test follows the Unit-2 metab.js pattern: Learn shows everything; Test turns key terms into
   typed blanks with Check, Hint, and Move on (Move on reveals the answer). */
(function(){
  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;"})[c]);
  const $ = id => document.getElementById(id);
  const TABS = [["learn", "Learn"], ["practice", "Practice the procedure"], ["mistakes", "Mistakes"], ["problems", "Problems"]];

  const V = window.VLAB = {
    labs:{}, sims:{}, problems:{}, vocab:[], clock:null, mode:"learn", esc,
    add(lab){ this.labs[lab.n] = lab; },
    shuffle(a, R){ a = a.slice(); R = R || Math.random; for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(R() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
    pick(a, R){ return a[Math.floor((R || Math.random)() * a.length)]; },
    toast(t){ const el = $("toast"); el.textContent = t; el.classList.add("show"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 2600); }
  };

  /* ---------- figures from data ---------- */
  V.fig = spec => {
    if (!spec) return "";
    const A = window.ART;
    switch (spec.type){
      case "field": return A.field(spec, spec.cap);
      case "tube": return A.tube(spec);
      case "plate": return A.plate(Object.assign({}, spec, spec.scatter ? {colonies:spec.scatter.reduce((a, s) => a.concat(A.scatter.apply(null, s)), []).map(c => Object.assign(c, {glow:!!spec.glow}))} : {}));
      case "slide": return A.slide(spec.smear, spec.cap);
      case "arr": return A.arrangement(spec.shape, spec.arr, spec.color, spec.seed);
      case "microscope": return A.microscope(true);
      case "plasmid": return A.plasmid(A.PLASMID.map(p => p.id));
    }
    return "";
  };
  V.figs = list => list && list.length ? `<div class="fig">${list.map(s => `<figure>${V.fig(s)}${s.cap ? `<figcaption>${s.cap}</figcaption>` : ""}</figure>`).join("")}</div>` : "";
  V.todo = t => `<div class="todo" role="note">TODO for the instructor: ${t}</div>`;

  /* ---------- answer matching ---------- */
  const norm = s => String(s).toLowerCase().replace(/[µμ]/g, "u").replace(/₂/g, "2").replace(/°/g, "").replace(/[^a-z0-9.]/g, "").replace(/\.$/, "");
  function lev(a, b){ const m = a.length, n = b.length, d = []; for (let i = 0; i <= m; i++) d[i] = [i]; for (let j = 0; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[m][n]; }
  V.matches = (alts, val) => { const v = norm(val); if (!v) return false; return alts.some(a => { a = norm(a); return a === v || (a.length >= 5 && /[a-z]/.test(a) && lev(a, v) <= 1); }); };

  /* numbers: 1.4e10, 1.4 x 10^10, 1.4×10^10, 10^-7, 1/100, 0.01, 140,000 */
  V.parseNum = str => {
    let s = String(str).trim().toLowerCase().replace(/,/g, "").replace(/\s+/g, "").replace(/−/g, "-").replace(/[×*]/g, "x");
    if (!s) return NaN;
    let m = s.match(/^(-?[\d.]+)\/([\d.]+)$/); if (m) return +m[1] / +m[2];
    m = s.match(/^1\/10\^?\(?(-?\d+)\)?$/); if (m) return Math.pow(10, -m[1]);
    m = s.match(/^10\^\(?([-+]?\d+)\)?$/); if (m) return Math.pow(10, +m[1]);
    m = s.match(/^(-?[\d.]+)(?:x10\^?\(?([-+]?\d+)\)?|e([-+]?\d+))$/); if (m) return +m[1] * Math.pow(10, +(m[2] || m[3]));
    if (/^-?[\d.]+$/.test(s)) return +s;
    return NaN;
  };
  V.sci = (x, sig) => {
    if (x === 0) return "0";
    const e = Math.floor(Math.log10(Math.abs(x))), m = +(x / Math.pow(10, e)).toFixed(sig === undefined ? 2 : sig);
    if (e >= -2 && e <= 4) return String(+x.toPrecision(4));
    return `${m} × 10<sup>${e}</sup>`;
  };

  /* ---------- multiple choice helper (used by Mistakes and sims) ---------- */
  V.mc = (host, q, onDone) => {
    const order = q.keep ? q.opts.map((_, i) => i) : V.shuffle(q.opts.map((_, i) => i));
    host.innerHTML = `<p class="q"><b>${q.q}</b></p><div class="opts">${order.map(i => `<button type="button" class="opt" data-i="${i}">${q.opts[i]}</button>`).join("")}</div>
      <div class="checkrow"><button type="button" class="btn ghost small" data-moveon>Move on</button></div><div class="fb" aria-live="polite"></div>`;
    const fb = host.querySelector(".fb");
    const finish = (revealed) => {
      host.querySelectorAll(".opt").forEach(b => { b.disabled = true; if (+b.dataset.i === q.a) b.classList.add("right"); });
      host.querySelector("[data-moveon]").hidden = true;
      fb.className = "fb " + (revealed ? "warn" : "good");
      fb.innerHTML = (revealed ? "Here's the answer. " : "Yes! ") + `<span style="font-weight:400">${q.why || ""}</span>`;
      if (onDone) onDone(!revealed);
    };
    host.querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => {
      if (+b.dataset.i === q.a) finish(false);
      else { b.classList.add("wrong"); b.disabled = true; fb.className = "fb bad"; fb.textContent = (q.wrong && q.wrong[+b.dataset.i]) || "Not quite. Try another answer, or tap Move on."; }
    }));
    host.querySelector("[data-moveon]").addEventListener("click", () => finish(true));
  };

  /* ---------- state ---------- */
  const store = { get(k){ try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v){ try { localStorage.setItem(k, v); } catch (e) {} } };
  const testState = {};   // per lab: {res:{key:"correct"|"revealed"}}
  let route = {view:"hub"};

  /* ---------- Learn tab ---------- */
  function learnItems(lab){
    const out = [];
    lab.learn.forEach((sec, si) => sec.items.forEach((it, ii) => { if (typeof it === "string") sec.items[ii] = it = {t:it}; out.push({si, ii, it}); }));
    return out;
  }
  const BLANK = /\[\[([^\]]+)\]\]/g;
  function renderLearn(host, lab){
    const test = V.mode === "test";
    const st = testState[lab.n] || (testState[lab.n] = {res:{}});
    const all = learnItems(lab);
    const blanksOf = (it, si, ii) => { const out = []; let m, k = 0; BLANK.lastIndex = 0; while ((m = BLANK.exec(it.t))){ out.push({key:`${si}.${ii}.${k++}`, alts:m[1].split("|")}); } return out; };
    const curIdx = test ? all.findIndex(x => blanksOf(x.it, x.si, x.ii).some(b => !st.res[b.key])) : -1;
    const done = test && curIdx === -1;
    const fill = (t, si, ii, isCur) => { let k = 0; return t.replace(BLANK, (m, inner) => {
      const key = `${si}.${ii}.${k++}`, alts = inner.split("|"), show = alts[0];
      if (!test || st.res[key]) return `<strong class="term ${test ? st.res[key] : ""}">${show}</strong>`;
      if (!isCur) return `<strong class="term">?</strong>`;
      return `<input class="blank" data-key="${key}" size="${Math.max(4, show.replace(/<[^>]+>/g, "").length + 1)}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Fill in the blank">`; }); };

    let html = test ? `<p class="modetip">Test mode: type the missing word in each box, then tap <b>Check</b>. Stuck? Tap <b>Hint</b> or <b>Move on</b>.</p>` : "";
    let hiddenFrom = curIdx === -1 ? Infinity : curIdx + 1, pos = 0;
    lab.learn.forEach((sec, si) => {
      const firstPos = pos;
      if (firstPos >= hiddenFrom){ pos += sec.items.length; return; }
      html += `<section class="lsec"><h2>${sec.h}</h2>${sec.lead ? `<p class="lead">${sec.lead}</p>` : ""}<ol class="litems ${sec.kind === "steps" ? "steps" : "facts"}"${sec.kind === "steps" ? "" : ' role="list"'}>`;
      sec.items.forEach((it, ii) => {
        const p = pos++;
        if (p >= hiddenFrom) return;
        const isCur = p === curIdx;
        html += `<li class="${isCur ? "cur" : ""}"><div class="body">${fill(it.t, si, ii, isCur)}${it.why ? `<span class="why"><b>Why:</b> ${it.why}</span>` : ""}
          ${isCur ? `<div class="checkrow"><button type="button" class="btn small" data-act="check">Check</button><button type="button" class="btn hint small" data-act="hint">Hint</button><button type="button" class="btn ghost small" data-act="moveon">Move on</button></div><div class="fb" id="lfb" aria-live="polite"></div>` : ""}</div></li>`;
      });
      html += `</ol>`;
      if (pos <= hiddenFrom) html += V.figs(sec.figs) + (sec.todo ? V.todo(sec.todo) : "");
      html += `</section>`;
    });
    if (test && !done) html += `<p class="locked">More steps show up after you finish this one.</p>`;
    if (done) html += `<div class="msg good" style="margin-top:18px"><b>Station complete!</b> You filled in every blank for Lab ${lab.n}.</div><div class="btnrow" style="margin-top:10px"><button type="button" class="btn ghost" data-act="restart">Start over</button></div>`;
    host.innerHTML = html;

    const fb = host.querySelector("#lfb");
    const inputs = () => [...host.querySelectorAll("input.blank")];
    const keyAlts = key => { const x = all.find(a => key.startsWith(`${a.si}.${a.ii}.`)); return blanksOf(x.it, x.si, x.ii).find(b => b.key === key).alts; };
    const advance = msg => { renderLearn(host, lab); const f = host.querySelector("#lfb"); const nxt = host.querySelector("input.blank");
      if (f && msg) { f.className = "fb good"; f.textContent = msg; }
      if (nxt) nxt.focus({preventScroll:false}); else if (!host.querySelector(".cur")) V.toast("Lab " + lab.n + " station complete!"); };
    function check(){
      let wrong = 0, empty = 0;
      inputs().forEach(inp => { if (!inp.value.trim()){ empty++; wrong++; return; }
        if (V.matches(keyAlts(inp.dataset.key), inp.value)) st.res[inp.dataset.key] = "correct";
        else { wrong++; inp.classList.remove("wrong"); void inp.offsetWidth; inp.classList.add("wrong"); } });
      if (wrong){ inputs().filter(i => st.res[i.dataset.key]).forEach(i => { const s = document.createElement("strong"); s.className = "term correct"; s.textContent = keyAlts(i.dataset.key)[0]; i.replaceWith(s); });
        fb.className = "fb bad"; fb.textContent = empty === wrong ? "Type an answer in each box, or tap Move on to see it." : "Not quite yet. Try again, tap Hint, or tap Move on to see the answer."; return; }
      advance(V.pick(["Correct!", "Nailed it!", "Yes! Great job.", "Exactly right!"]));
    }
    function hint(){
      inputs().forEach(inp => { const w = keyAlts(inp.dataset.key)[0].replace(/<[^>]+>/g, ""), lvl = Math.min((+inp.dataset.hint || 0) + 1, Math.max(1, Math.ceil(w.length / 2)));
        inp.dataset.hint = lvl; if (inp.classList.contains("wrong")) inp.value = ""; inp.placeholder = w.slice(0, lvl) + w.slice(lvl).replace(/[^\s-]/g, "_"); inp.size = Math.max(inp.size, w.length + 1); });
      fb.className = "fb warn"; fb.textContent = "Hint: the first letters are shown. Each line is one letter. Tap Hint again for more.";
    }
    function moveOn(){ inputs().forEach(inp => { if (!st.res[inp.dataset.key]) st.res[inp.dataset.key] = "revealed"; }); advance(""); const f = host.querySelector("#lfb"); if (f){ f.className = "fb warn"; f.textContent = "That answer is shown in orange above. Keep going!"; } }
    host.querySelectorAll("[data-act]").forEach(b => b.addEventListener("click", () => ({check, hint, moveon:moveOn, restart:() => { testState[lab.n] = {res:{}}; renderLearn(host, lab); }})[b.dataset.act]()));
    inputs().forEach(inp => { inp.addEventListener("keydown", e => { if (e.key === "Enter"){ e.preventDefault(); check(); } }); inp.addEventListener("input", () => inp.classList.remove("wrong")); });
  }

  /* ---------- Practice tab ---------- */
  function renderActs(host, list){
    host.innerHTML = list.map((a, i) => `<section class="act"><h2>${a.title}</h2>${a.prompt ? `<p class="lead">${a.prompt}</p>` : ""}<div data-host="${i}"></div>${a.todo ? V.todo(a.todo) : ""}</section>`).join("");
    list.forEach((a, i) => { const h = host.querySelector(`[data-host="${i}"]`); const fn = V.sims[a.sim]; if (fn) fn(h, a); else h.textContent = "Missing activity: " + a.sim; });
  }

  /* ---------- Mistakes tab ---------- */
  function renderMistakes(host, lab){
    const M = lab.mistakes;
    host.innerHTML = `<section class="act"><h2>Pick a mistake</h2><p class="lead">${M.prompt || "Tap a mistake. See what it does to the result. Then explain why."}</p>
      <div class="cards" id="mlist">${M.items.map((m, i) => `<button type="button" class="card" data-i="${i}">${m.name}</button>`).join("")}</div><div id="mbody"></div></section>`;
    const body = host.querySelector("#mbody");
    host.querySelectorAll("#mlist .card").forEach(b => b.addEventListener("click", () => {
      host.querySelectorAll("#mlist .card").forEach(x => x.classList.toggle("sel", x === b));
      const m = M.items[+b.dataset.i];
      body.innerHTML = `<div class="compare">${m.wrong ? `<figure>${V.fig(m.wrong)}<figcaption class="wrongcap">With the mistake</figcaption></figure>` : ""}${m.right ? `<figure>${V.fig(m.right)}<figcaption class="rightcap">Done correctly</figcaption></figure>` : ""}</div>
        <div class="msg bad"><b>What you see:</b> ${m.see}</div><div class="act" style="margin-top:12px" id="mq"></div>`;
      V.mc(body.querySelector("#mq"), {q:m.q || "Why did this happen?", opts:m.opts, a:m.a, why:m.why});
    }));
  }

  /* ---------- Problems tab ---------- */
  function renderProblems(host, lab){
    host.innerHTML = lab.problems.map((p, i) => `<section class="act"><h2>${p.title}</h2>${p.prompt ? `<p class="lead">${p.prompt}</p>` : ""}<div data-p="${i}"></div>${p.todo ? V.todo(p.todo) : ""}</section>`).join("");
    lab.problems.forEach((p, i) => {
      const h = host.querySelector(`[data-p="${i}"]`);
      if (p.sim){ V.sims[p.sim](h, p); return; }
      runProblems(h, p);
    });
  }
  function runProblems(host, cfg){
    let right = 0, tries = 0;
    const gens = [].concat(cfg.gen);
    function next(){
      const P = V.problems[V.pick(gens)](Math.random, cfg);
      host.innerHTML = `<div class="prob"><div class="score">Right: ${right} of ${tries}</div><div class="q">${P.q}</div>${P.fig ? `<div class="probfig">${P.fig}</div>` : ""}
        ${P.fields.map((f, k) => f.kind === "choice"
          ? `<div data-f="${k}"><div class="opts">${f.opts.map(o => `<button type="button" class="opt" data-v="${esc(o)}">${o}</button>`).join("")}</div></div>`
          : `<div class="inrow" data-f="${k}"><label for="pf${k}">${f.label}</label><input id="pf${k}" class="num" inputmode="${f.kind === "text" ? "text" : "decimal"}" autocomplete="off">${f.unitOpts ? `<select class="num" aria-label="Units">${["Pick units"].concat(f.unitOpts).map(u => `<option>${u}</option>`).join("")}</select>` : f.unit ? `<span>${f.unit}</span>` : ""}</div>`).join("")}
        ${P.note ? `<p class="lead">${P.note}</p>` : ""}
        <div class="btnrow"><button type="button" class="btn" data-a="check">Check</button><button type="button" class="btn ghost" data-a="moveon">Move on</button><button type="button" class="btn ghost" data-a="new" hidden>New problem</button></div>
        <div class="fb" aria-live="polite"></div><div class="sol" hidden></div></div>`;
      const fb = host.querySelector(".fb"), sol = host.querySelector(".sol");
      host.querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => { b.parentNode.querySelectorAll(".opt").forEach(x => x.classList.toggle("sel", x === b)); }));
      let counted = false;
      const grade = () => P.fields.every((f, k) => {
        const row = host.querySelector(`[data-f="${k}"]`);
        if (f.kind === "choice"){ const s = row.querySelector(".opt.sel"); return s && s.dataset.v === String(f.ans); }
        const inp = row.querySelector("input"), sel = row.querySelector("select");
        let ok;
        if (f.kind === "text") ok = V.matches([].concat(f.ans), inp.value);
        else { const v = V.parseNum(inp.value); ok = isFinite(v) && Math.abs(v - f.ans) <= Math.abs(f.ans) * (f.tol === undefined ? .011 : f.tol) + 1e-12; }
        const unitOk = !sel || sel.value === f.unitAns;
        inp.classList.toggle("ok", ok); inp.classList.toggle("no", !ok);
        if (sel){ sel.classList.toggle("ok", unitOk); sel.classList.toggle("no", !unitOk); }
        return ok && unitOk;
      });
      const reveal = (good) => {
        if (!counted){ tries++; if (good) right++; counted = true; }
        host.querySelector(".score").textContent = `Right: ${right} of ${tries}`;
        P.fields.forEach((f, k) => { const row = host.querySelector(`[data-f="${k}"]`);
          if (f.kind === "choice") row.querySelectorAll(".opt").forEach(b => { b.disabled = true; if (b.dataset.v === String(f.ans)) b.classList.add("right"); else if (b.classList.contains("sel")) b.classList.add("wrong"); });
          else { const inp = row.querySelector("input"); if (!good){ inp.value = f.show || String(f.ans); inp.classList.add("ok"); inp.classList.remove("no"); const sel = row.querySelector("select"); if (sel){ sel.value = f.unitAns; sel.classList.add("ok"); sel.classList.remove("no"); } } inp.readOnly = true; } });
        sol.hidden = false; sol.innerHTML = `<b>Worked solution</b>${P.sol}`;
        host.querySelector('[data-a="check"]').hidden = true; host.querySelector('[data-a="moveon"]').hidden = true;
        const nb = host.querySelector('[data-a="new"]'); nb.hidden = false; nb.focus({preventScroll:true});
      };
      host.querySelector('[data-a="check"]').addEventListener("click", () => {
        if (grade()){ fb.className = "fb good"; fb.textContent = V.pick(["Correct!", "Nailed it!", "Yes! Great work."]); reveal(true); }
        else { if (!counted){ tries++; counted = true; host.querySelector(".score").textContent = `Right: ${right} of ${tries}`; }
          fb.className = "fb bad"; fb.textContent = P.hint || "Not quite yet. Check your work and try again, or tap Move on to see the solution."; }
      });
      host.querySelector('[data-a="moveon"]').addEventListener("click", () => { fb.className = "fb warn"; fb.textContent = "Here's the answer and how to get it."; reveal(false); });
      host.querySelector('[data-a="new"]').addEventListener("click", next);
      host.querySelectorAll("input.num").forEach(i => i.addEventListener("keydown", e => { if (e.key === "Enter") host.querySelector('[data-a="check"]').click(); }));
    }
    next();
  }

  /* ---------- hub ---------- */
  function tagsOf(lab){ return TABS.filter(([k]) => lab[k]).map(([k]) => k); }
  function renderHub(app){
    const labs = Object.keys(V.labs).map(Number).sort((a, b) => a - b).map(n => V.labs[n]);
    const pill = {learn:["Learn", ""], practice:["Practice", "p"], mistakes:["Mistakes", "m"], problems:["Problems", "q"]};
    app.innerHTML = `<header class="hero"><div class="eyebrow">BIO 112 Lab · Practicum 1 review</div><h1>Virtual Lab 🔬</h1><p>Walk through Labs 1 to 15. Practice each procedure, see what goes wrong, and solve practice problems.</p></header>
      <div class="modes"><div><b>Learn</b>Every step and answer is shown.</div><div><b>Test</b>Key words become blanks. Type the answer, then tap Check.</div></div>
      <h2 class="sech">Lab stations</h2>
      <div class="stations">${labs.map(l => `<a class="station" href="#lab${l.n}"><span class="pic">${window.ART.icon(l.n)}</span><span class="snum">Lab ${l.n}</span><span class="t">${l.title}</span><span class="pills">${tagsOf(l).map(k => `<span class="pill ${pill[k][1]}">${pill[k][0]}</span>`).join("")}</span></a>`).join("")}</div>
      <h2 class="sech">Timing practice</h2>
      <a class="feature" href="#clock"><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="34" r="25" fill="var(--surface-2)" stroke="var(--arrow)" stroke-width="4"/><path d="M32 34V19M32 34l10 7" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/><rect x="26" y="3" width="12" height="6" rx="2" fill="var(--arrow)"/></svg><div><h3>20 minutes on the clock</h3><p>Which procedures fit in a 20 minute lab? Find the slowest step.</p></div></a>`;
    $("crumb").textContent = "Practicum 1 review";
    document.title = "Virtual Lab";
  }

  /* ---------- station ---------- */
  function renderStation(app, n, tab){
    const lab = V.labs[n]; if (!lab){ location.hash = ""; return; }
    const tabs = TABS.filter(([k]) => lab[k]);
    if (!lab[tab]) tab = "learn";
    const prev = V.labs[n - 1], next = V.labs[n + 1];
    app.innerHTML = `<div class="mhead"><div class="mbadge">${n}</div><div><div class="eyebrow">Lab ${n}</div><h1>${lab.title}</h1></div></div>
      <div class="tabs" role="tablist" aria-label="Station tabs">${tabs.map(([k, t]) => `<button type="button" role="tab" aria-selected="${k === tab}" class="${k === tab ? "on" : ""}" data-tab="${k}">${t}</button>`).join("")}</div>
      <div class="panel" id="tabbody" role="tabpanel"></div>
      <nav class="stepnav" aria-label="Other stations">${prev ? `<a href="#lab${n - 1}"><small>Previous station</small><b>Lab ${n - 1}: ${prev.title}</b></a>` : `<a href="#"><small>Back to</small><b>Lab Bench</b></a>`}${next ? `<a class="next" href="#lab${n + 1}"><small>Next station</small><b>Lab ${n + 1}: ${next.title}</b></a>` : `<a class="next" href="#clock"><small>Next</small><b>20 minutes on the clock</b></a>`}</nav>`;
    app.querySelectorAll("[data-tab]").forEach(b => b.addEventListener("click", () => { location.hash = `lab${n}/${b.dataset.tab}`; }));
    const body = $("tabbody");
    if (tab === "learn") renderLearn(body, lab);
    else if (tab === "practice") renderActs(body, lab.practice);
    else if (tab === "mistakes") renderMistakes(body, lab);
    else renderProblems(body, lab);
    $("crumb").textContent = `Lab ${n}: ${lab.title}`;
    document.title = `Lab ${n}: ${lab.title} | Virtual Lab`;
  }

  /* ---------- 20 minutes on the clock ---------- */
  function renderClock(app){
    const C = V.clock;
    app.innerHTML = `<div class="mhead"><div class="mbadge">⏱</div><div><div class="eyebrow">Lab Bench activity</div><h1>20 minutes on the clock</h1></div></div>
      <div class="panel"><p class="lead">${C.prompt}</p><div class="msg warn"><b>Remember:</b> ${C.reminder}</div><div id="crows" style="margin-top:14px"></div>${C.todo ? V.todo(C.todo) : ""}</div>
      <nav class="stepnav"><a href="#lab15"><small>Previous station</small><b>Lab 15: ${V.labs[15] ? V.labs[15].title : ""}</b></a><a class="next" href="#"><small>Back to</small><b>Lab Bench</b></a></nav>`;
    const rows = app.querySelector("#crows");
    rows.innerHTML = C.items.map((it, i) => `<div class="clockrow"><h3>${it.name}</h3><span class="time">${it.time}</span>
      <div class="btnrow"><button type="button" class="opt" data-i="${i}" data-v="yes">Fits in 20 minutes</button><button type="button" class="opt" data-i="${i}" data-v="no">Does not fit</button></div><div class="fb" data-fb="${i}"></div><div data-slow="${i}"></div></div>`).join("");
    rows.querySelectorAll(".opt[data-v]").forEach(b => b.addEventListener("click", () => {
      const i = +b.dataset.i, it = C.items[i], fb = rows.querySelector(`[data-fb="${i}"]`);
      rows.querySelectorAll(`.opt[data-i="${i}"]`).forEach(x => x.classList.remove("sel", "right", "wrong"));
      const said = b.dataset.v === "yes";
      if (it.fits === null || it.fits === undefined){ b.classList.add("sel"); fb.className = "fb warn"; fb.innerHTML = `Your instructor will confirm this one. <span style="font-weight:400">${it.why}</span>`; }
      else if (said === it.fits){ b.classList.add("right"); fb.className = "fb good"; fb.innerHTML = `Yes! <span style="font-weight:400">${it.why}</span>`; }
      else { b.classList.add("wrong"); fb.className = "fb bad"; fb.innerHTML = `Not quite. <span style="font-weight:400">${it.why}</span>`; }
      const sh = rows.querySelector(`[data-slow="${i}"]`);
      if (it.slow && !sh.innerHTML){ sh.className = "act"; V.mc(sh, it.slow); }
    }));
    $("crumb").textContent = "20 minutes on the clock";
    document.title = "20 minutes on the clock | Virtual Lab";
  }

  /* ---------- vocab ---------- */
  function setupVocab(){
    const dlg = $("vocabDlg"), list = $("vocabList"), find = $("vocabFind");
    const draw = () => { const q = find.value.trim().toLowerCase();
      const rows = V.vocab.filter(([t, d]) => !q || t.toLowerCase().includes(q) || d.toLowerCase().includes(q));
      list.innerHTML = rows.length ? rows.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join("") : `<div><dd>No match. Try a shorter word.</dd></div>`; };
    $("vocabBtn").addEventListener("click", () => { find.value = ""; draw(); if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", ""); find.focus(); });
    $("vocabClose").addEventListener("click", () => dlg.close ? dlg.close() : dlg.removeAttribute("open"));
    dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
    find.addEventListener("input", draw);
  }

  /* ---------- routing + mode ---------- */
  function parse(){
    const h = location.hash.replace(/^#/, "");
    let m = h.match(/^lab(\d+)(?:\/(\w+))?$/);
    if (m) return {view:"lab", n:+m[1], tab:m[2] || "learn"};
    if (h === "clock") return {view:"clock"};
    return {view:"hub"};
  }
  function render(keepScroll){
    route = parse();
    const app = $("app");
    if (route.view === "lab") renderStation(app, route.n, route.tab);
    else if (route.view === "clock") renderClock(app);
    else renderHub(app);
    if (!keepScroll) window.scrollTo(0, 0);
  }
  function setMode(m){
    V.mode = m; store.set("vlab-mode", m);
    document.querySelectorAll(".seg [data-mode]").forEach(b => b.setAttribute("aria-checked", String(b.dataset.mode === m)));
    document.body.classList.toggle("testing", m === "test");
  }
  V.boot = () => {
    setMode(store.get("vlab-mode") === "test" ? "test" : "learn");
    document.querySelectorAll(".seg [data-mode]").forEach(b => b.addEventListener("click", () => {
      if (V.mode === b.dataset.mode) return;
      setMode(b.dataset.mode); render(true);
      V.toast(b.dataset.mode === "test" ? "Test mode: fill in the blanks." : "Learn mode: everything is shown.");
    }));
    setupVocab();
    window.addEventListener("hashchange", () => render(false));
    render(false);
  };
})();
