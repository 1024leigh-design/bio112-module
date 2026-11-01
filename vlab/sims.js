/* Virtual Lab practice activities. Each sim is VLAB.sims.name(host, spec). The spec comes from a lab data file. */
(function(){
  const V = window.VLAB, A = window.ART, esc = V.esc;
  const msg = (el, html, cls) => { el.className = "msg " + (cls || ""); el.innerHTML = html; };

  /* ---------- put the steps in order ---------- */
  V.sims.order = (host, spec) => {
    let placed = 0, pool;
    const start = () => { placed = 0; do { pool = V.shuffle(spec.steps.map((t, i) => ({t, i}))); } while (spec.steps.length > 2 && pool[0].i === 0 && pool[1].i === 1); draw(); };
    function draw(note, cls){
      const left = pool.filter(p => p.i >= placed);
      host.innerHTML = `<ol class="orderlist">${spec.steps.slice(0, placed).map(t => `<li>${t}</li>`).join("")}${placed < spec.steps.length ? `<li class="empty">Tap the step that comes next.</li>` : ""}</ol>
        ${left.length ? `<div class="lbl">Steps left: ${left.length}</div><div class="cards">${left.map(p => `<button type="button" class="card" data-i="${p.i}">${p.t}</button>`).join("")}</div>` : `<div class="btnrow"><button type="button" class="btn ghost" data-restart>Start over</button></div>`}
        <div class="msg" aria-live="polite"></div>`;
      const m = host.querySelector(".msg");
      if (note) msg(m, note, cls);
      host.querySelectorAll(".card").forEach(b => b.addEventListener("click", () => {
        if (+b.dataset.i === placed){
          placed++;
          if (placed === spec.steps.length) draw(`<b>All ${spec.steps.length} steps in order!</b> ${spec.done || ""}`, "good");
          else draw(spec.whys && spec.whys[placed - 1] ? `<b>Yes!</b> ${spec.whys[placed - 1]}` : "<b>Yes!</b> Keep going.", "good");
        } else { b.classList.remove("nope"); void b.offsetWidth; b.classList.add("nope"); msg(m, "Not yet. What has to happen before that step?", "bad"); }
      }));
      const r = host.querySelector("[data-restart]"); if (r) r.addEventListener("click", start);
    }
    start();
  };

  /* ---------- sort cards into bins ---------- */
  V.sims.sort = (host, spec) => {
    let sel = null, placed = {}, order;
    const start = () => { sel = null; placed = {}; order = V.shuffle(spec.cards.map((_, i) => i)); draw(); };
    function draw(note, cls){
      const left = order.filter(i => placed[i] === undefined);
      host.innerHTML = `${left.length ? `<div class="lbl">Tap a card, then tap the box it goes in. Cards left: ${left.length}</div><div class="cards">${left.map(i => `<button type="button" class="card ${sel === i ? "sel" : ""}" data-c="${i}" aria-pressed="${sel === i}">${spec.cards[i].t}</button>`).join("")}</div>` : ""}
        <div class="bins">${spec.bins.map(b => `<button type="button" class="bin ${sel !== null ? "ready" : ""}" data-b="${b.id}"><b>${b.label}</b><span class="in">${order.filter(i => placed[i] === b.id).map(i => `<span>${spec.cards[i].t}</span>`).join("")}</span></button>`).join("")}</div>
        <div class="msg" aria-live="polite"></div>${!left.length ? `<div class="btnrow" style="margin-top:10px"><button type="button" class="btn ghost" data-restart>Start over</button></div>` : ""}`;
      const m = host.querySelector(".msg");
      if (note) msg(m, note, cls);
      host.querySelectorAll("[data-c]").forEach(b => b.addEventListener("click", () => { sel = +b.dataset.c; draw("Now tap the box it goes in.", ""); }));
      host.querySelectorAll("[data-b]").forEach(b => b.addEventListener("click", () => {
        if (sel === null){ msg(m, "Tap a card first.", "warn"); return; }
        const c = spec.cards[sel];
        if (c.bin === b.dataset.b){ placed[sel] = c.bin; sel = null;
          const left2 = spec.cards.length - Object.keys(placed).length;
          draw(left2 ? `<b>Yes!</b> ${c.why || ""}` : `<b>All sorted!</b> ${c.why || ""} ${spec.done || ""}`, "good"); }
        else msg(m, `Not that box. ${c.hint || "Read the card again."}`, "bad");
      }));
      const r = host.querySelector("[data-restart]"); if (r) r.addEventListener("click", start);
    }
    start();
  };

  /* ---------- step-by-step stain (pick the reagent, then the time) ---------- */
  V.sims.stain = (host, spec) => {
    let org = null, i = 0, colors = {}, log = [], timePick = false;
    const seeds = {};
    function fieldFor(){
      const o = spec.orgs.find(x => x.id === org);
      const c = colors[o.type] || "unstained";
      return A.field({seed:seeds[org] || (seeds[org] = 11 + spec.orgs.indexOf(o) * 7), groups:[{shape:o.shape, arr:o.arr || "single", color:c, n:o.n || 9}]}, "Slide under oil immersion");
    }
    function draw(note, cls){
      if (!org){
        host.innerHTML = `<div class="lbl">Pick a smear to stain</div><div class="cards">${spec.orgs.map(o => `<button type="button" class="card" data-o="${o.id}">${o.name}</button>`).join("")}</div>${spec.startNote ? `<p class="lead" style="margin-top:10px">${spec.startNote}</p>` : ""}`;
        host.querySelectorAll("[data-o]").forEach(b => b.addEventListener("click", () => { org = b.dataset.o; i = 0; colors = {}; log = []; timePick = false; draw(spec.startMsg || "Your smear is heat fixed and ready. Pick the first reagent.", ""); }));
        return;
      }
      const o = spec.orgs.find(x => x.id === org), st = spec.steps[i], done = i >= spec.steps.length;
      host.innerHTML = `<div class="simgrid"><div><div class="svgbox">${fieldFor()}</div><p class="lead" style="text-align:center;margin-top:6px">${o.name}</p></div>
        <div><div class="lbl">${done ? "Finished" : `Step ${i + 1} of ${spec.steps.length}`}</div>
          ${done ? "" : timePick ? `<p><b>${st.label}:</b> how long?</p><div class="cards">${st.times.map(t => `<button type="button" class="card" data-t="${esc(t)}">${t}</button>`).join("")}</div>`
            : `<p><b>What comes next?</b></p><div class="palette">${spec.palette.map(r => `<button type="button" class="reag" data-r="${r.id}"><i style="background:${r.c}"></i>${r.label}</button>`).join("")}</div>`}
          <div class="msg" aria-live="polite"></div>
          ${log.length ? `<div class="lbl">Done so far</div><ol class="donelist">${log.map(l => `<li>${l}</li>`).join("")}</ol>` : ""}
          <div class="btnrow" style="margin-top:12px"><button type="button" class="btn ghost small" data-new>Pick a different smear</button></div></div></div>`;
      const m = host.querySelector(".msg");
      if (note) msg(m, note, cls);
      if (done) msg(m, `<b>Done!</b> ${spec.result[org]}`, "good");
      host.querySelector("[data-new]").addEventListener("click", () => { org = null; draw(); });
      host.querySelectorAll("[data-r]").forEach(b => b.addEventListener("click", () => {
        if (b.dataset.r !== st.r){ msg(m, (spec.distract && spec.distract[b.dataset.r]) || `Not yet. ${st.hint || "Check the protocol order."}`, "bad"); return; }
        if (st.times){ timePick = true; draw(`<b>Yes:</b> ${st.label}.`, "good"); return; }
        apply();
      }));
      host.querySelectorAll("[data-t]").forEach(b => b.addEventListener("click", () => {
        if (b.dataset.t !== st.time){ msg(m, st.timeWhy || "Not that time. Check the protocol.", "bad"); return; }
        apply();
      }));
    }
    function apply(){
      const st = spec.steps[i];
      if (st.show) Object.assign(colors, st.show);
      log.push(st.label + (st.time ? `, ${st.time}` : ""));
      i++; timePick = false;
      draw(`<b>Done:</b> ${st.label}${st.time ? ` for ${st.time}` : ""}. ${st.why || ""}`, "good");
    }
    draw();
  };

  /* ---------- a short set of multiple choice questions ---------- */
  V.sims.quiz = (host, spec) => {
    let right = 0, done = 0;
    host.innerHTML = `<div class="score" id="qzScore">Right on the first try: 0 of ${spec.qs.length}</div>` + spec.qs.map((q, i) => `<div class="act" style="margin-top:12px" data-q="${i}"></div>`).join("");
    spec.qs.forEach((q, i) => { let missed = false; const h = host.querySelector(`[data-q="${i}"]`);
      V.mc(h, Object.assign({}, q, {q:`${i + 1}. ${q.q}`}), ok => { done++; if (ok && !missed) right++; host.querySelector("#qzScore").textContent = `Right on the first try: ${right} of ${spec.qs.length}`; });
      h.addEventListener("click", e => { if (e.target.closest(".opt.wrong")) missed = true; }); });
  };

  /* ---------- Lab 1: microscope parts ---------- */
  V.sims.scope = host => {
    const test = V.mode === "test";
    const P = A.SCOPE_PARTS;
    let order = V.shuffle(P.map(p => p.id)), qi = 0, first = 0, missed = false;
    host.innerHTML = `<p class="modetip">${test ? "<b>Test mode:</b> find each part on the microscope." : "<b>Learn mode:</b> tap any part to see its name and job. Switch to <b>Test</b> at the top for the label quiz."}</p>
      <div class="simgrid"><div class="svgbox">${A.microscope(!test)}</div><div><div class="msg" id="scopeInfo" aria-live="polite"></div><div class="btnrow" style="margin-top:10px" id="scopeBtns"></div></div></div>`;
    const info = host.querySelector("#scopeInfo"), svg = host.querySelector("svg");
    const clear = () => svg.querySelectorAll(".part").forEach(g => g.classList.remove("sel", "flash"));
    const ask = () => {
      missed = false;
      if (qi >= order.length){ msg(info, `<b>Finished!</b> ${first} of ${order.length} right on the first try.`, "good");
        host.querySelector("#scopeBtns").innerHTML = `<button type="button" class="btn ghost" id="again">Start over</button>`;
        host.querySelector("#again").addEventListener("click", () => { order = V.shuffle(order); qi = 0; first = 0; host.querySelector("#scopeBtns").innerHTML = ""; ask(); }); return; }
      msg(info, `<b>Find the: ${P.find(p => p.id === order[qi]).name}</b><br>Tap it on the microscope. (${qi + 1} of ${order.length})`, "");
    };
    svg.querySelectorAll(".part").forEach(g => { g.setAttribute("tabindex", "0"); g.setAttribute("role", "button"); g.setAttribute("aria-label", test ? "Microscope part" : P.find(p => p.id === g.dataset.part).name); });
    const hit = g => {
      const p = P.find(x => x.id === g.dataset.part);
      if (!test){ clear(); g.classList.add("sel"); msg(info, `<b>${p.name}</b><br>${p.job}`, ""); return; }
      if (qi >= order.length) return;
      if (p.id === order[qi]){ clear(); g.classList.add("flash"); if (!missed) first++; msg(info, `<b>Yes! ${p.name}.</b> ${p.job}`, "good"); qi++; setTimeout(() => { clear(); ask(); }, 1400); }
      else { missed = true; msg(info, `That is the ${p.name.toLowerCase()}. Try again.`, "bad"); }
    };
    svg.addEventListener("click", e => { const g = e.target.closest(".part"); if (g) hit(g); });
    svg.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && e.target.closest(".part")){ e.preventDefault(); hit(e.target.closest(".part")); } });
    if (test) ask(); else msg(info, "Tap any part of the microscope.", "");
  };

  /* ---------- Lab 1: move the slide, watch the image ---------- */
  V.sims.slidemove = host => {
    let ox = 0, oy = 0, goal;
    const DIRS = {left:"LEFT", right:"RIGHT", up:"UP", down:"DOWN"};
    const newGoal = () => { goal = V.pick(Object.keys(DIRS).filter(d => d !== goal)); ox = 0; oy = 0; };
    newGoal();
    host.innerHTML = `<p class="msg" id="smGoal"></p><div class="simgrid" style="margin-top:12px">
      <div><div class="lbl">The slide on the stage (drag it)</div><div class="svgbox"><svg id="smStage" viewBox="0 0 200 150" role="img" aria-label="Slide on the stage"></svg></div>
        <div class="btnrow" style="margin-top:8px" aria-label="Move the slide"><button type="button" class="btn ghost small" data-d="-1,0">Slide left</button><button type="button" class="btn ghost small" data-d="1,0">Slide right</button><button type="button" class="btn ghost small" data-d="0,-1">Slide up</button><button type="button" class="btn ghost small" data-d="0,1">Slide down</button></div></div>
      <div><div class="lbl">What you see in the ocular</div><div class="svgbox"><svg id="smView" viewBox="0 0 200 200" role="img" aria-label="View through the ocular"></svg></div></div></div>
      <div class="msg" id="smMsg" aria-live="polite"></div><div class="btnrow" style="margin-top:10px"><button type="button" class="btn ghost" id="smNew">New challenge</button></div>`;
    const stage = host.querySelector("#smStage"), view = host.querySelector("#smView"), m = host.querySelector("#smMsg");
    let solved = false;
    function draw(){
      msg(host.querySelector("#smGoal"), `<b>Goal:</b> move the <b>image</b> to the <b>${DIRS[goal]}</b> side of the view.`, "");
      stage.innerHTML = `<rect x="0" y="0" width="200" height="150" fill="#2f3b52" rx="10"/><circle cx="100" cy="75" r="16" fill="#f6d36b" opacity=".5"/>
        <g transform="translate(${ox} ${oy})"><rect x="30" y="52" width="140" height="46" rx="3" fill="#dceef7" stroke="#8fb0c8" stroke-width="2"/><text x="100" y="86" font-size="34" font-weight="700" text-anchor="middle" fill="#14223a">e</text></g>`;
      const ix = 100 - ox * 1.8, iy = 100 - oy * 1.8;
      view.innerHTML = `<circle cx="100" cy="100" r="97" fill="#15171d"/><circle cx="100" cy="100" r="90" fill="#f7f4ee"/><clipPath id="smc"><circle cx="100" cy="100" r="90"/></clipPath>
        <g clip-path="url(#smc)"><text x="0" y="0" font-size="80" font-weight="700" text-anchor="middle" fill="#14223a" transform="translate(${ix} ${iy + 28}) rotate(180 0 -28)">e</text></g>`;
      const hitGoal = {left:ix < 62, right:ix > 138, up:iy < 62, down:iy > 138}[goal];
      if (hitGoal && !solved){ solved = true;
        const moved = {left:"RIGHT", right:"LEFT", up:"DOWN", down:"UP"}[goal];
        msg(m, `<b>Yes!</b> You moved the slide <b>${moved}</b>, and the image moved <b>${DIRS[goal]}</b>. The light path crosses, so the image moves the opposite way. The "e" also looks upside down and reversed.`, "good"); }
    }
    const move = (dx, dy) => { ox = Math.max(-30, Math.min(30, ox + dx)); oy = Math.max(-26, Math.min(26, oy + dy)); draw(); };
    let drag = null;
    const pt = e => { const p = stage.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(stage.getScreenCTM().inverse()); };
    stage.addEventListener("pointerdown", e => { drag = pt(e); try { stage.setPointerCapture(e.pointerId); } catch (_) {} });
    stage.addEventListener("pointermove", e => { if (!drag) return; const p = pt(e); move(p.x - drag.x, p.y - drag.y); drag = p; });
    stage.addEventListener("pointerup", () => { drag = null; });
    host.querySelectorAll("[data-d]").forEach(b => b.addEventListener("click", () => { const [dx, dy] = b.dataset.d.split(",").map(Number); move(dx * 8, dy * 8); }));
    host.querySelector("#smNew").addEventListener("click", () => { newGoal(); solved = false; m.innerHTML = ""; m.className = "msg"; draw(); });
    draw();
  };

  /* ---------- Lab 2: calibrate the ocular micrometer ---------- */
  V.sims.micrometer = host => {
    const PAIRS = [[2, 5], [3, 5], [4, 5], [3, 4], [5, 8], [3, 8], [7, 10]];
    let pair, po = 22, ps, sx, phase, x0 = 60;
    const W = 640;
    function newRound(){ pair = V.pick(PAIRS); ps = po * pair[1] / pair[0]; sx = x0 + ps * (.3 + Math.random() * .4); phase = 1; draw(); }
    function svgBody(){
      let s = `<rect width="${W}" height="190" fill="#f7f4ee" rx="10"/>`;
      s += `<text x="${W - 12}" y="16" font-size="14" font-weight="700" fill="#14223a" text-anchor="end">Ocular ruler (does not move)</text><text x="12" y="184" font-size="14" font-weight="700" fill="#1b4f8a">Stage micrometer (1 space = 10 µm)</text>`;
      for (let k = 0; k * po + x0 <= W - 10; k++){ const x = x0 + k * po, long = k % 5 === 0;
        s += `<line x1="${x}" y1="${long ? 34 : 50}" x2="${x}" y2="100" stroke="#14223a" stroke-width="${long ? 2.4 : 1.6}"/>`;
        if (long) s += `<text x="${x}" y="30" font-size="12" text-anchor="middle" fill="#14223a">${k}</text>`;
        if (phase === 2) s += `<rect class="part" data-k="${k}" x="${x - po / 2}" y="30" width="${po}" height="72" fill="transparent"/>`; }
      for (let k = -12; k < 40; k++){ const x = sx + k * ps; if (x < 4 || x > W - 4) continue;
        s += `<line x1="${A.f1(x)}" y1="100" x2="${A.f1(x)}" y2="${k % 5 === 0 ? 166 : 150}" stroke="#1b4f8a" stroke-width="2"/>`; }
      if (phase >= 2) s += `<text x="${x0}" y="122" font-size="15" font-weight="700" text-anchor="middle" fill="#1f8a55">A</text><circle cx="${x0}" cy="100" r="5" fill="#1f8a55"/>`;
      if (phase >= 3){ const xb = x0 + pair[1] * po; s += `<text x="${xb}" y="122" font-size="15" font-weight="700" text-anchor="middle" fill="#1f8a55">B</text><circle cx="${xb}" cy="100" r="5" fill="#1f8a55"/>`; }
      return s;
    }
    function draw(note, cls){
      host.innerHTML = `<div class="svgbox"><svg id="mmSvg" viewBox="0 0 ${W} 190" role="img" aria-label="Ocular ruler over a stage micrometer">${svgBody()}</svg></div>
        ${phase === 1 ? `<label class="slider"><b>Move the stage micrometer</b><input type="range" id="mmSlide" min="${x0 - ps}" max="${x0 + ps}" step="0.5" value="${sx}"></label>` : ""}
        <div class="msg" id="mmMsg" aria-live="polite"></div><div id="mmQ"></div>
        <div class="btnrow" style="margin-top:10px"><button type="button" class="btn ghost" id="mmNew">New slide</button></div>`;
      const m = host.querySelector("#mmMsg");
      msg(m, note || ["", "<b>Step 1:</b> drag the stage ruler (or use the slider) until a stage line sits exactly on ocular line <b>0</b>. That is point A.", "<b>Step 2:</b> find point B. Tap the next ocular line where a stage line matches it exactly.", ""][phase], cls || "");
      host.querySelector("#mmNew").addEventListener("click", newRound);
      const svg = host.querySelector("#mmSvg");
      if (phase === 1){
        const sl = host.querySelector("#mmSlide");
        const setSx = v => { sx = v; const near = Math.round((x0 - sx) / ps); const lx = sx + near * ps; if (Math.abs(lx - x0) < 2.5){ sx = x0 - near * ps; phase = 2; draw("<b>Point A is set!</b> A stage line now sits exactly on ocular line 0. <b>Step 2:</b> tap the next ocular line where the lines match again (point B).", "good"); return true; } svg.innerHTML = svgBody(); return false; };
        sl.addEventListener("input", () => setSx(+sl.value));
        let drag = null;
        const pt = e => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
        svg.addEventListener("pointerdown", e => { drag = pt(e).x; try { svg.setPointerCapture(e.pointerId); } catch (_) {} });
        svg.addEventListener("pointermove", e => { if (drag === null) return; const x = pt(e).x; const nv = Math.max(x0 - ps, Math.min(x0 + ps, sx + x - drag)); drag = x; if (setSx(nv)) drag = null; else sl.value = sx; });
        svg.addEventListener("pointerup", () => { drag = null; });
      }
      if (phase === 2){
        svg.addEventListener("click", e => { const r = e.target.closest("[data-k]"); if (!r) return; const k = +r.dataset.k;
          if (k === pair[1]){ phase = 3; draw(`<b>Point B!</b> Ocular line ${k} matches a stage line exactly.`, "good"); ask(); }
          else if (k > 0 && k % pair[1] === 0) msg(m, "Those lines match too, but it is not the <b>next</b> match after A. Look closer to A.", "warn");
          else msg(m, "Look closely. Those two lines do not line up exactly. Try another one.", "bad"); });
      }
      if (phase === 3) ask();
    }
    function ask(){
      const q = host.querySelector("#mmQ"); if (q.innerHTML) return;
      const v10 = 10 * pair[0] / pair[1];
      q.innerHTML = `<div class="act" style="margin-top:12px"><div class="prob">
        <div class="inrow"><label for="mo">Ocular spaces between A and B:</label><input id="mo" class="num" inputmode="decimal"></div>
        <div class="inrow"><label for="ms">Stage spaces between A and B:</label><input id="ms" class="num" inputmode="decimal"></div>
        <div class="inrow"><label for="mv">µm per ocular space at 10x:</label><input id="mv" class="num" inputmode="decimal"></div>
        <div class="inrow"><label for="mh">µm per ocular space at 100x:</label><input id="mh" class="num" inputmode="decimal"></div>
        <div class="btnrow"><button type="button" class="btn" id="mmCheck">Check</button><button type="button" class="btn ghost" id="mmMove">Move on</button></div><div class="fb"></div><div class="sol" hidden></div></div></div>`;
      const ans = {mo:pair[1], ms:pair[0], mv:v10, mh:v10 / 10};
      const sol = `<ol><li>Count the spaces from A to B: <b>${pair[1]}</b> ocular spaces and <b>${pair[0]}</b> stage spaces.</li><li>Stage distance = ${pair[0]} × 10 µm = <b>${pair[0] * 10} µm</b>.</li><li>µm per ocular space at 10x = ${pair[0] * 10} µm ÷ ${pair[1]} = <b>${+v10.toFixed(3)} µm</b>.</li><li>At 100x: ${+v10.toFixed(3)} ÷ 10 = <b>${+(v10 / 10).toFixed(4)} µm</b>.</li></ol>`;
      const fb = q.querySelector(".fb"), sb = q.querySelector(".sol");
      q.querySelector("#mmCheck").addEventListener("click", () => {
        let bad = 0; Object.keys(ans).forEach(k => { const inp = q.querySelector("#" + k), v = V.parseNum(inp.value), ok = Math.abs(v - ans[k]) <= Math.abs(ans[k]) * .011; inp.classList.toggle("ok", ok); inp.classList.toggle("no", !ok); if (!ok) bad++; });
        if (bad){ fb.className = "fb bad"; fb.textContent = `${bad} answer${bad > 1 ? "s" : ""} not right yet. Count again, or tap Move on.`; }
        else { fb.className = "fb good"; fb.textContent = "All correct! Your ocular micrometer is calibrated."; sb.hidden = false; sb.innerHTML = "<b>Worked solution</b>" + sol; }
      });
      q.querySelector("#mmMove").addEventListener("click", () => { Object.keys(ans).forEach(k => { const inp = q.querySelector("#" + k); inp.value = +ans[k].toFixed(4); inp.classList.add("ok"); inp.classList.remove("no"); }); fb.className = "fb warn"; fb.textContent = "Here are the answers."; sb.hidden = false; sb.innerHTML = "<b>Worked solution</b>" + sol; });
    }
    newRound();
  };

  /* ---------- Lab 11: motility tube ---------- */
  V.sims.motility = (host, spec) => {
    let stage, org;
    const ORGS = spec.orgs;
    const start = () => { stage = 0; org = V.pick(ORGS); draw(); };
    function draw(){
      const growth = stage >= 2 ? (org.motile ? "motile" : "nonmotile") : stage === 1 ? "stab" : "";
      host.innerHTML = `<div class="simgrid"><div class="svgbox" style="max-width:220px;margin:0 auto">${A.tube({kind:"semisolid", medium:"#f4ecd2", growth, label:"Motility tube", capc:"#3f7bd1"})}</div><div id="motQ"></div></div>`;
      const q = host.querySelector("#motQ");
      if (stage === 0) V.mc(q, spec.stabQ, ok => { setTimeout(() => { stage = 1; draw(); }, 900); });
      else if (stage === 1) V.mc(q, spec.incQ, ok => { setTimeout(() => { stage = 2; draw(); }, 900); });
      else {
        q.innerHTML = `<p><b>After incubation: is this organism motile or nonmotile?</b></p><div class="opts"><button type="button" class="opt" data-m="1">Motile</button><button type="button" class="opt" data-m="0">Nonmotile</button></div><div class="msg"></div><div class="btnrow" style="margin-top:10px"><button type="button" class="btn ghost" id="motNew">Try another tube</button></div>`;
        const m = q.querySelector(".msg");
        q.querySelectorAll("[data-m]").forEach(b => b.addEventListener("click", () => {
          const ok = (b.dataset.m === "1") === org.motile;
          b.classList.add(ok ? "right" : "wrong");
          msg(m, (ok ? "<b>Yes!</b> " : "<b>Not quite.</b> ") + org.why, ok ? "good" : "bad");
        }));
        q.querySelector("#motNew").addEventListener("click", start);
      }
    }
    start();
  };

  /* ---------- Lab 13: draw a streak pattern ---------- */
  V.sims.streak = (host, spec) => {
    let pat = spec.patterns[0], lines = [], cur = null;
    host.innerHTML = `<div class="cards" id="stPats">${spec.patterns.map((p, i) => `<button type="button" class="card ${i ? "" : "sel"}" data-p="${i}">${p.name}</button>`).join("")}</div>
      <p class="msg" id="stHow"></p>
      <div class="simgrid" style="margin-top:12px"><div><div class="lbl">Your plate (draw with your mouse or finger)</div><div class="svgbox"><svg id="stSvg" viewBox="0 0 200 200" role="img" aria-label="Plate to draw on"></svg></div>
        <div class="btnrow" style="margin-top:8px"><button type="button" class="btn ghost small" id="stClear">Clear plate</button><button type="button" class="btn small" id="stShow">Compare to the example</button></div></div>
        <div id="stEx"></div></div>`;
    const svg = host.querySelector("#stSvg"), ex = host.querySelector("#stEx");
    const base = A.plate({}).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
    const draw = () => { svg.innerHTML = base + lines.map(l => `<polyline points="${l.map(p => p.join(",")).join(" ")}" fill="none" stroke="#1683cc" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join(""); };
    const setPat = i => { pat = spec.patterns[i]; host.querySelectorAll("[data-p]").forEach(b => b.classList.toggle("sel", +b.dataset.p === i)); msg(host.querySelector("#stHow"), `<b>${pat.name}:</b> ${pat.how}`, ""); lines = []; ex.innerHTML = ""; draw(); };
    const pt = e => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform(svg.getScreenCTM().inverse()); return [A.f1(q.x), A.f1(q.y)]; };
    svg.addEventListener("pointerdown", e => { e.preventDefault(); cur = [pt(e)]; lines.push(cur); try { svg.setPointerCapture(e.pointerId); } catch (_) {} });
    svg.addEventListener("pointermove", e => { if (!cur) return; const p = pt(e), l = cur[cur.length - 1]; if (Math.hypot(p[0] - l[0], p[1] - l[1]) > 2){ cur.push(p); draw(); } });
    svg.addEventListener("pointerup", () => { cur = null; });
    host.querySelectorAll("[data-p]").forEach(b => b.addEventListener("click", () => setPat(+b.dataset.p)));
    host.querySelector("#stClear").addEventListener("click", () => { lines = []; draw(); });
    host.querySelector("#stShow").addEventListener("click", () => {
      ex.innerHTML = `<div class="lbl">Example: ${pat.name}</div><div class="svgbox">${A.plate({extra:example(pat.id)})}</div><div class="msg"><b>Check yourself:</b> ${pat.check}</div>`;
    });
    const example = id => A.streakEx(id);
    setPat(0);
  };

  /* ---------- Lab 13: pick a colony, subculture, Gram stain ---------- */
  V.sims.pick = (host, spec) => {
    let plates, temp = "rt", chosen = null, day = 1;
    const ORG = spec.orgs, TWO = Object.keys(ORG).some(k => ORG[k].colony37), TEMPS = TWO ? {rt:"Room temperature plate", "37":"37°C plate"} : {rt:"Your plate (room temperature for 1 day, then 37°C)"};
    const colorOf = (o, t) => t === "37" && ORG[o].colony37 ? ORG[o].colony37 : ORG[o].colony;
    const nameOf = (o, t) => t === "37" && ORG[o].colonyName37 ? ORG[o].colonyName37 : ORG[o].colonyName;
    function layout(seed){
      const R = A.rng(seed), cols = [];
      // area 1 (top left): crowded, every organism mixed together
      for (let k = 0; k < 46; k++){ const x = 40 + R() * 62, y = 40 + R() * 46; cols.push({x, y, r:3 + R() * 2.4, org:V.pick(Object.keys(ORG), R), crowd:true}); }
      // later areas: fewer colonies with more space; the last area is well isolated
      const iso = [[150, 70], [168, 100], [136, 112], [120, 150], [92, 166], [70, 140], [146, 150], [160, 128]];
      const orgs = V.shuffle(Object.keys(ORG).concat(Object.keys(ORG), Object.keys(ORG)), R);
      iso.forEach((p, k) => cols.push({x:p[0] + (R() - .5) * 6, y:p[1] + (R() - .5) * 6, r:3.6 + R() * 1.6, org:orgs[k], crowd:false}));
      cols.forEach((c, k) => { c.id = k; });
      return cols;
    }
    function build(){ const s0 = Math.floor(Math.random() * 1e6); plates = {rt:layout(s0), "37":layout(s0 + 17)}; chosen = null; day = 1; }
    function plateSVG(){
      const cols = plates[temp];
      const hits = cols.map(c => `<circle class="part" data-col="${c.id}" cx="${A.f1(c.x)}" cy="${A.f1(c.y)}" r="${A.f1(c.r + (c.crowd ? 1 : 5))}" fill="transparent"/>`).join("");
      return A.plate({colonies:cols.map(c => Object.assign({}, c, {c:colorOf(c.org, temp), mark:chosen && chosen.id === c.id})), extra:hits, label:TEMPS[temp]});
    }
    function draw(){
      const cols = plates[temp];
      let right = "";
      if (day === 1) right = `<p><b>Pick a colony:</b> tap one colony to pick with a sterile needle. You will subculture it to a slant.</p>${chosen ? `<div class="msg">You picked a <b>${nameOf(chosen.org, temp)}</b> colony${chosen.crowd ? " from a crowded area" : ""}.</div><div class="btnrow" style="margin-top:10px"><button type="button" class="btn" id="pkGo">Subculture to a slant, then Gram stain</button></div>` : ""}`;
      else {
        const orgs = chosen.crowd ? [...new Set(cols.filter(c => c.crowd && Math.hypot(c.x - chosen.x, c.y - chosen.y) < 12).map(c => c.org).concat(chosen.org))] : [chosen.org];
        if (chosen.crowd && orgs.length < 2) orgs.push(Object.keys(ORG).find(k => k !== chosen.org));
        const groups = orgs.map(k => ({shape:ORG[k].shape, arr:"single", color:ORG[k].gram, n:orgs.length > 1 ? 6 : 10}));
        right = `<p><b>Gram stain of your slant</b></p><div class="svgbox" style="max-width:260px">${A.field({seed:chosen.id + 3, groups}, "Gram stain of the slant")}</div><div id="pkQ" style="margin-top:10px"></div>`;
        setTimeout(() => {
          const pure = orgs.length === 1;
          V.mc(host.querySelector("#pkQ"), {q:"Is your slant a pure culture?", opts:["Yes, pure: one cell type", "No, contaminated: more than one cell type"], a:pure ? 0 : 1, keep:true,
            why:pure ? `One cell type: ${ORG[orgs[0]].cells} (<i>${ORG[orgs[0]].name}</i>). You picked an isolated colony.` : `More than one cell type: ${orgs.map(k => ORG[k].cells).join(" and ")}. Colonies in a crowded area touch each other, so the needle picked up more than one kind of cell. Pick an isolated colony next time.`});
          host.querySelector("#pkQ").insertAdjacentHTML("afterend", `<div class="btnrow" style="margin-top:10px"><button type="button" class="btn ghost" id="pkNew">New plates</button></div>`);
          host.querySelector("#pkNew").addEventListener("click", () => { build(); draw(); });
        });
      }
      const tabs = day === 1 && TWO ? `<div class="btnrow" style="margin-bottom:8px">${Object.keys(TEMPS).map(t => `<button type="button" class="opt ${t === temp ? "sel" : ""}" data-temp="${t}" aria-pressed="${t === temp}">${TEMPS[t]}</button>`).join("")}</div>` : `<div class="lbl">${TEMPS[temp]}</div>`;
      host.innerHTML = `<div class="simgrid"><div>${tabs}<div class="svgbox">${plateSVG()}</div></div><div>${right}</div></div>`;
      host.querySelectorAll("[data-temp]").forEach(b => b.addEventListener("click", () => { temp = b.dataset.temp; chosen = null; draw(); }));
      const svg = host.querySelector(".svgbox svg");
      if (day === 1){
        svg.addEventListener("click", e => { const t = e.target.closest("[data-col]"); if (!t) return; chosen = cols[+t.dataset.col]; draw(); });
        const go = host.querySelector("#pkGo"); if (go) go.addEventListener("click", () => { day = 3; draw(); });
      }
    }
    build(); draw();
  };

  /* ---------- Lab 14: virtual serial dilution ---------- */
  V.sims.dilution = (host, spec) => {
    const T = spec.tubes; // [{name, water, add, from}]
    let step = 1, N0, counts, chosen = null, marks;
    const totals = []; T.reduce((acc, t, i) => { const d = acc * t.add / (t.water + t.add); totals[i] = d; return d; }, 1);
    const fmt = d => `10<sup>${Math.round(Math.log10(d))}</sup>`;
    function newCulture(){ N0 = (2.1 + Math.random() * 7.6) * 1e9; counts = totals.map(d => Math.round(N0 * d * 0.1)); marks = {}; chosen = null; }
    newCulture();
    function draw(){
      let h = `<div class="lbl">Step ${step} of 4</div>`;
      if (step === 1){
        h += `<p>Fill in the volumes for each tube. Then tap <b>Check</b>.</p><div class="tablewrap"><table class="dtable"><thead><tr><th>Tube</th><th>Sterile water (mL)</th><th>Transfer in (mL)</th><th>From</th></tr></thead><tbody>
          ${T.map((t, i) => `<tr><td><b>${t.name}</b></td><td><input data-w="${i}" inputmode="decimal" aria-label="Tube ${t.name} water"></td><td><input data-a="${i}" inputmode="decimal" aria-label="Tube ${t.name} transfer"></td><td>${t.from}</td></tr>`).join("")}</tbody></table></div>
          <div class="btnrow" style="margin-top:10px"><button type="button" class="btn" id="dlCheck">Check</button><button type="button" class="btn ghost" id="dlMove">Move on</button></div><div class="msg" id="dlMsg"></div>`;
      } else if (step === 2){
        h += `<div class="tablewrap"><table class="dtable"><thead><tr><th>Tube</th><th>Volumes</th><th>Dilution factor</th><th>Total dilution</th></tr></thead><tbody>${T.map((t, i) => `<tr><td><b>${t.name}</b></td><td>${t.water} mL + ${t.add} mL</td><td>${t.add}/${+(t.water + t.add).toFixed(1)} = 1/${Math.round((t.water + t.add) / t.add)}</td><td>${fmt(totals[i])}</td></tr>`).join("")}</tbody></table></div>
          <p style="margin-top:12px">Now plate from each tube. Set the micropipette.</p>
          <div class="inrow"><label for="dlUl">Volume to plate (µL):</label><input id="dlUl" class="num" inputmode="decimal"></div>
          <div class="inrow" style="margin-top:8px"><label for="dlMl">That is how many mL?</label><input id="dlMl" class="num" inputmode="decimal"></div>
          <div class="btnrow" style="margin-top:10px"><button type="button" class="btn" id="dlCheck">Check</button><button type="button" class="btn ghost" id="dlMove">Move on</button></div><div class="msg" id="dlMsg"></div>`;
      } else if (step === 3){
        h += `<p>After incubation at 37°C. Mark each plate: can you count it, or is it TNTC (more than 200 colonies)?</p><div class="plates">${T.map((t, i) => `<figure>${plateFor(i, false)}<figcaption><b>${t.name}</b> (${fmt(totals[i])})</figcaption>
          <div class="btnrow" style="justify-content:center"><button type="button" class="opt" data-i="${i}" data-v="c">Count</button><button type="button" class="opt" data-i="${i}" data-v="t">TNTC</button></div></figure>`).join("")}</div><div class="msg" id="dlMsg"></div>`;
      } else {
        const d = totals[chosen];
        h += `<p>Tap each colony on plate <b>${T[chosen].name}</b> to count it. Tap again to unmark.</p><div class="simgrid"><div class="svgbox bigplate">${plateFor(chosen, true)}</div>
          <div><p class="counter" aria-live="polite">Marked: <span id="dlN">${Object.keys(marks).length}</span></p>
          <div class="inrow"><label for="dlC">Colonies on plate ${T[chosen].name}:</label><input id="dlC" class="num" inputmode="numeric"></div>
          <div class="inrow" style="margin-top:8px"><label for="dlCells">Cells/mL in the original culture:</label><input id="dlCells" class="num" inputmode="decimal" placeholder="like 2.5 x 10^9"></div>
          <div class="btnrow" style="margin-top:10px"><button type="button" class="btn" id="dlCheck">Check</button><button type="button" class="btn ghost" id="dlMove">Move on</button></div><div class="msg" id="dlMsg"></div><div class="sol" hidden id="dlSol"></div>
          <div class="btnrow" style="margin-top:10px"><button type="button" class="btn ghost" id="dlNew">New culture</button></div></div></div>`;
      }
      host.innerHTML = h;
      wire();
    }
    const colPos = {};
    function plateFor(i, big){
      const n = counts[i];
      if (n > 200) return A.plate({colonies:A.scatter(Math.min(420, n), i + 1, "white", 1.4, 2.4), label:`Plate ${T[i].name}: too many colonies to count`});
      if (!colPos[i + ":" + n]){ const R = A.rng(i * 97 + n), pts = [];
        let guard = 0; while (pts.length < n && guard++ < 20000){ const a = R() * 6.28, rr = Math.sqrt(R()) * 76, x = 100 + Math.cos(a) * rr, y = 100 + Math.sin(a) * rr; if (pts.every(p => Math.hypot(p.x - x, p.y - y) > 8.5)) pts.push({x, y, r:2.6 + R() * 1.2, c:"white"}); }
        colPos[i + ":" + n] = pts; }
      const pts = colPos[i + ":" + n];
      if (!big) return A.plate({colonies:pts, label:`Plate ${T[i].name}`});
      return A.plate({colonies:pts.map((p, k) => Object.assign({}, p, {mark:!!marks[k]})), extra:pts.map((p, k) => `<circle class="part" data-k="${k}" cx="${A.f1(p.x)}" cy="${A.f1(p.y)}" r="5" fill="transparent"/>`).join(""), label:`Plate ${T[i].name} to count`});
    }
    function wire(){
      const m = host.querySelector("#dlMsg");
      if (step === 1){
        const check = reveal => { let bad = 0;
          T.forEach((t, i) => { const w = host.querySelector(`[data-w="${i}"]`), a = host.querySelector(`[data-a="${i}"]`);
            if (reveal){ w.value = t.water; a.value = t.add; }
            const okw = Math.abs(V.parseNum(w.value) - t.water) < 1e-6, oka = Math.abs(V.parseNum(a.value) - t.add) < 1e-6;
            w.classList.toggle("ok", okw); w.classList.toggle("no", !okw); a.classList.toggle("ok", oka); a.classList.toggle("no", !oka); if (!okw || !oka) bad++; });
          if (bad) msg(m, `${bad} tube${bad > 1 ? "s are" : " is"} not right yet. ${spec.hint1}`, "bad");
          else { step = 2; draw(); msg(host.querySelector("#dlMsg"), reveal ? "Here are the volumes. Read the dilution table, then set the pipette." : "<b>All six tubes are right!</b> Each tube's dilution factor and total dilution are in the table.", reveal ? "warn" : "good"); } };
        host.querySelector("#dlCheck").addEventListener("click", () => check(false));
        host.querySelector("#dlMove").addEventListener("click", () => check(true));
      } else if (step === 2){
        const check = reveal => { const ul = host.querySelector("#dlUl"), ml = host.querySelector("#dlMl");
          if (reveal){ ul.value = 100; ml.value = 0.1; }
          const a = Math.abs(V.parseNum(ul.value) - 100) < 1e-6, b = Math.abs(V.parseNum(ml.value) - .1) < 1e-6;
          ul.classList.toggle("ok", a); ul.classList.toggle("no", !a); ml.classList.toggle("ok", b); ml.classList.toggle("no", !b);
          if (a && b){ step = 3; draw(); msg(host.querySelector("#dlMsg"), "<b>Plated 100 µL (0.1 mL) from each tube</b> with a spreader dipped in isopropanol and flamed between plates. Incubated at 37°C.", "good"); }
          else msg(m, "Not yet. Our protocol plates 100 µL. To change µL to mL, divide by 1000.", "bad"); };
        host.querySelector("#dlCheck").addEventListener("click", () => check(false));
        host.querySelector("#dlMove").addEventListener("click", () => check(true));
      } else if (step === 3){
        const said = {};
        host.querySelectorAll("[data-v]").forEach(b => b.addEventListener("click", () => {
          const i = +b.dataset.i, tntc = counts[i] > 200, ok = (b.dataset.v === "t") === tntc;
          host.querySelectorAll(`[data-i="${i}"]`).forEach(x => x.classList.remove("right", "wrong"));
          b.classList.add(ok ? "right" : "wrong");
          if (ok) said[i] = true; else delete said[i];
          if (!ok){ msg(m, tntc ? `Plate ${T[i].name} has more than 200 colonies. Write TNTC (or >200) and do not use it.` : `Plate ${T[i].name} has 200 or fewer colonies, so you can count it.`, "bad"); return; }
          if (Object.keys(said).length === T.length){
            const ok2 = T.map((_, k) => k).filter(k => counts[k] <= 200 && counts[k] > 0);
            msg(m, `<b>All marked!</b> Pick a countable plate to count:</b><br><span class="btnrow" style="display:inline-flex">${ok2.map(k => `<button type="button" class="btn small" data-pick="${k}">Count plate ${T[k].name}</button>`).join("")}</span>`, "good");
            host.querySelectorAll("[data-pick]").forEach(p => p.addEventListener("click", () => { chosen = +p.dataset.pick; marks = {}; step = 4; draw(); }));
          } else msg(m, tntc ? `Yes, plate ${T[i].name} is TNTC.` : `Yes, you can count plate ${T[i].name}.`, "good");
        }));
      } else wire4();
    }
    function wire4(){
      const svg = host.querySelector(".bigplate svg");
      if (!svg._wired){ svg._wired = true; svg.addEventListener("click", e => { const t = e.target.closest("[data-k]"); if (!t) return; const k = +t.dataset.k; if (marks[k]) delete marks[k]; else marks[k] = 1; host.querySelector(".bigplate").innerHTML = plateFor(chosen, true); host.querySelector("#dlN").textContent = Object.keys(marks).length; wire4(); }); }
      const cBtn = host.querySelector("#dlCheck"); if (cBtn._wired) return; cBtn._wired = true;
      const m = host.querySelector("#dlMsg"), sol = host.querySelector("#dlSol"), d = totals[chosen], n = counts[chosen];
      const solution = c => `<b>Worked solution</b><ol><li>Colonies counted: <b>${c}</b> CFU on plate ${T[chosen].name}.</li><li>Total dilution of tube ${T[chosen].name}: <b>${fmt(d)}</b>.</li><li>Volume plated: 100 µL = <b>0.1 mL</b>.</li><li>cells/mL = ${c} ÷ (${fmt(d)} × 0.1 mL) = <b>${V.sci(c / (d * .1))} cells/mL</b>.</li></ol>`;
      cBtn.addEventListener("click", () => {
        const c = V.parseNum(host.querySelector("#dlC").value), cells = V.parseNum(host.querySelector("#dlCells").value);
        if (!isFinite(c)){ msg(m, "Type how many colonies you counted.", "warn"); return; }
        if (Math.abs(c - n) > Math.max(2, n * .03)){ msg(m, `Count again. Your count is off by more than a couple of colonies. Tap each colony once.`, "bad"); return; }
        const want = c / (d * .1);
        if (isFinite(cells) && Math.abs(cells - want) <= want * .02){ msg(m, `<b>Correct!</b> About ${V.sci(want)} cells/mL in the original culture.`, "good"); sol.hidden = false; sol.innerHTML = solution(c); }
        else msg(m, "Your count is good. The cells/mL is not right yet. Use: CFUs ÷ (total dilution × volume plated in mL).", "bad");
      });
      host.querySelector("#dlMove").addEventListener("click", () => { msg(m, `This plate has <b>${n}</b> colonies.`, "warn"); sol.hidden = false; sol.innerHTML = solution(n); });
      host.querySelector("#dlNew").addEventListener("click", () => { newCulture(); step = 3; draw(); });
    }
    draw();
  };

  /* ---------- Lab 15: micropipette simulator ---------- */
  V.sims.pipette = (host, spec) => {
    let target, st, k, fault = null;
    const STEPS = [{done:"Set the volume"}].concat(spec.steps);
    const start = () => { target = V.pick(spec.volumes); st = {vol:spec.startVol, locked:false, tip:"none", plunger:0, fill:0}; k = 0; fault = null; draw(); };
    function draw(note, cls){
      const S = STEPS[k];
      const view = fault ? Object.assign({}, st, fault.state) : st;
      let right;
      if (k === 0) right = `<p><b>Task: move ${target} µL.</b> First, set the volume.</p><div class="btnrow">${[-100, -10, -1, 1, 10, 100].map(d => `<button type="button" class="btn ghost small" data-dv="${d}">${d > 0 ? "+" : ""}${d}</button>`).join("")}</div><div class="btnrow" style="margin-top:10px"><button type="button" class="btn" id="ppSet">The dial is set</button></div>`;
      else if (k >= STEPS.length) right = `<div class="msg good"><b>Done!</b> You moved ${target} µL the right way.</div><div class="btnrow" style="margin-top:10px"><button type="button" class="btn" id="ppAgain">New task</button></div>`;
      else if (fault) right = `<div class="msg bad"><b>${fault.title}</b><br>${fault.text}</div><div class="btnrow" style="margin-top:10px"><button type="button" class="btn" id="ppRetry">Try that step again</button></div>`;
      else right = `<p><b>Task: move ${target} µL.</b></p><p>${S.prompt}</p><div class="opts">${V.shuffle(S.choices.map((c, i) => i)).map(i => `<button type="button" class="opt" data-c="${i}">${S.choices[i].label}</button>`).join("")}</div>`;
      host.innerHTML = `<div class="simgrid"><div class="svgbox" style="max-width:240px;margin:0 auto;color:var(--ink)">${A.pipette(view)}</div><div>${right}<div class="msg" id="ppMsg" aria-live="polite"></div>
        ${k > 0 ? `<div class="lbl">Done so far</div><ol class="donelist">${STEPS.slice(0, k).map(s => `<li>${s.done}</li>`).join("")}</ol>` : ""}</div></div>`;
      const m = host.querySelector("#ppMsg");
      if (note) msg(m, note, cls); else m.className = "msg";
      host.querySelectorAll("[data-dv]").forEach(b => b.addEventListener("click", () => { st.vol = Math.max(0, Math.min(1000, st.vol + +b.dataset.dv)); draw(); }));
      const set = host.querySelector("#ppSet"); if (set) set.addEventListener("click", () => { if (st.vol === target){ k = 1; draw(`<b>Set to ${target} µL.</b>`, "good"); } else msg(m, `The dial reads ${st.vol} µL. Set it to exactly ${target} µL.`, "bad"); });
      const again = host.querySelector("#ppAgain"); if (again) again.addEventListener("click", start);
      const retry = host.querySelector("#ppRetry"); if (retry) retry.addEventListener("click", () => { fault = null; draw(); });
      host.querySelectorAll("[data-c]").forEach(b => b.addEventListener("click", () => {
        const c = S.choices[+b.dataset.c];
        if (c.ok){ Object.assign(st, S.state || {}); k++; draw(`<b>Yes!</b> ${S.why || ""}`, "good"); }
        else { const fs = Object.assign({}, c.state || {}); if (fs.drift) { fs.vol = target + fs.drift; delete fs.drift; } fault = {title:c.title, text:c.text, state:fs}; draw(); }
      }));
    }
    start();
  };

  /* ---------- Lab 15: pGLO plate predictor ---------- */
  V.sims.predictor = (host, spec) => {
    let cells = null, plate = null, g = null, gl = null;
    const PLATES = ["LB", "LB/amp", "LB/amp/ara", "LB/ara", "LB/tet", "LB/tet/ara"];
    function answer(){
      const amp = /amp/.test(plate), tet = /tet/.test(plate), ara = /ara/.test(plate), plus = cells === "+pGLO";
      if (tet) return {g:"none", gl:"none", why:spec.why.tet};
      if (!plus) return amp ? {g:"none", gl:"none", why:spec.why.minusAmp} : {g:"lawn", gl:"none", why:spec.why.minusLB};
      if (amp) return ara ? {g:"colonies", gl:"all", why:spec.why.plusAmpAra} : {g:"colonies", gl:"none", why:spec.why.plusAmp};
      return ara ? {g:"lawn", gl:"some", why:spec.why.plusAra} : {g:"lawn", gl:"none", why:spec.why.plusLB};
    }
    function plateArt(a){
      if (a.g === "none") return A.plate({uv:true, label:"No growth"});
      if (a.g === "lawn") return A.plate({uv:true, lawn:true, colonies:a.gl === "some" ? A.scatter(14, 4, "white", 3, 5).map(c => Object.assign(c, {glow:true})) : [], label:"Lawn"});
      return A.plate({uv:true, colonies:A.scatter(18, 7, "white", 3.5, 6).map(c => Object.assign(c, {glow:a.gl === "all"})), label:"Colonies"});
    }
    function draw(){
      const btns = (key, list, cur) => `<div class="btnrow">${list.map(v => `<button type="button" class="opt ${cur === v ? "sel" : ""}" data-${key}="${v}">${v}</button>`).join("")}</div>`;
      host.innerHTML = `<div class="lbl">1. Which cells?</div>${btns("cells", ["+pGLO", "-pGLO"], cells)}
        <div class="lbl">2. Which plate?</div>${btns("plate", PLATES, plate)}
        <div class="lbl">3. Predict growth</div>${btns("g", ["none", "colonies", "lawn"], g)}
        <div class="lbl">4. Predict glow under UV</div>${btns("gl", ["none", "some", "all"], gl)}
        <div class="btnrow" style="margin-top:12px"><button type="button" class="btn" id="prCheck">Check</button></div><div id="prOut"></div>`;
      ["cells", "plate", "g", "gl"].forEach(key => host.querySelectorAll(`[data-${key}]`).forEach(b => b.addEventListener("click", () => {
        if (key === "cells") cells = b.dataset[key]; else if (key === "plate") plate = b.dataset[key]; else if (key === "g") g = b.dataset[key]; else gl = b.dataset[key]; draw(); })));
      host.querySelector("#prCheck").addEventListener("click", () => {
        const out = host.querySelector("#prOut");
        if (!cells || !plate || !g || !gl){ out.innerHTML = `<div class="msg warn">Pick an answer in all <b>four</b> rows first.</div>`; return; }
        const a = answer(), okG = a.g === g, okL = a.gl === gl;
        out.innerHTML = `<div class="simgrid" style="margin-top:12px"><div class="svgbox" style="max-width:260px">${plateArt(a)}</div><div><div class="msg ${okG && okL ? "good" : "bad"}"><b>${okG && okL ? "Your prediction is right!" : "Not quite."}</b><br>
          ${cells} on ${plate}: growth <b>${a.g}</b>, glow <b>${a.gl}</b>.</div><p style="margin-top:10px">${a.why}</p></div></div>`;
      });
    }
    draw();
  };

  /* ---------- Lab 15: label the plasmid map ---------- */
  V.sims.plasmid = (host, spec) => {
    let placed = [], sel = null;
    const labels = V.shuffle(spec.parts.map((p, i) => i));
    function draw(note, cls){
      const left = labels.filter(i => !placed[i]);
      host.innerHTML = `<div class="simgrid"><div><div class="svgbox">${A.plasmid(A.PLASMID.map((p, i) => placed[i] ? spec.parts[i].label : null), sel)}</div>
        <div class="lbl">What each number does</div><ol class="donelist">${spec.parts.map(p => `<li>${p.job}</li>`).join("")}</ol></div>
        <div>${left.length ? `<div class="lbl">Tap a label, then tap its number on the map</div><div class="cards">${left.map(i => `<button type="button" class="card ${sel === i ? "sel" : ""}" data-l="${i}">${spec.parts[i].label}</button>`).join("")}</div>` : `<div class="btnrow"><button type="button" class="btn ghost" id="plAgain">Start over</button></div>`}
        <div class="msg" aria-live="polite"></div>
        ${placed.some(Boolean) ? `<div class="lbl">Labeled</div><ul class="donelist">${spec.parts.map((p, i) => placed[i] ? `<li><b>${p.label}:</b> ${p.job}</li>` : "").join("")}</ul>` : ""}</div></div>`;
      const m = host.querySelector(".msg"); if (note) msg(m, note, cls);
      host.querySelectorAll("[data-l]").forEach(b => b.addEventListener("click", () => { sel = +b.dataset.l; draw("Now tap a number on the map.", ""); }));
      host.querySelector("svg").addEventListener("click", e => { const s = e.target.closest("[data-slot]"); if (!s) return; const i = +s.dataset.slot;
        if (sel === null){ msg(m, "Tap a label first.", "warn"); return; }
        if (placed[i]) return;
        if (i === sel){ placed[i] = true; sel = null; draw(placed.filter(Boolean).length === spec.parts.length ? "<b>All five parts labeled!</b>" : `<b>Yes!</b> ${spec.parts[i].label}: ${spec.parts[i].job}`, "good"); }
        else msg(m, `Not that spot. ${spec.parts[sel].label}: ${spec.parts[sel].job} Find that job in the list.`, "bad"); });
      const ag = host.querySelector("#plAgain"); if (ag) ag.addEventListener("click", () => { placed = []; sel = null; draw(); });
    }
    draw();
  };

  /* ---------- Lab 15: fluorescence energy diagram ---------- */
  V.sims.energy = (host, spec) => {
    let placed = [null, null], sel = null;
    const TOK = {up:spec.up, down:spec.down};
    function draw(note, cls){
      const left = ["down", "up"].filter(t => !placed.includes(t));
      host.innerHTML = `<div class="simgrid"><div><div class="svgbox">${A.energy(placed, sel !== null)}</div><div class="btnrow" style="justify-content:space-around;margin-top:6px"><b>Box 1: Excitation</b><b>Box 2: Emission</b></div></div>
        <div>${left.length ? `<div class="lbl">Tap an arrow, then tap a box</div><div class="cards">${left.map(t => `<button type="button" class="card ${sel === t ? "sel" : ""}" data-t="${t}">${TOK[t]}</button>`).join("")}</div>` : ""}
        <div class="msg" aria-live="polite"></div><div id="enQ" style="margin-top:10px"></div></div></div>`;
      const m = host.querySelector(".msg"); if (note) msg(m, note, cls);
      host.querySelectorAll("[data-t]").forEach(b => b.addEventListener("click", () => { sel = b.dataset.t; draw("Now tap Box 1 or Box 2 on the diagram.", ""); }));
      host.querySelector("svg").addEventListener("click", e => { const s = e.target.closest("[data-slot]"); if (!s) return; const i = +s.dataset.slot;
        if (!sel){ msg(m, "Tap an arrow first.", "warn"); return; }
        const want = i === 0 ? "up" : "down";
        if (sel === want){ placed[i] = sel; sel = null; draw(i === 0 ? spec.upWhy : spec.downWhy, "good"); }
        else msg(m, i === 0 ? "Box 1 is excitation: the electron gains energy." : "Box 2 is emission: the electron loses energy.", "bad"); });
      if (placed[0] && placed[1]) V.mc(host.querySelector("#enQ"), spec.q);
    }
    draw();
  };
})();
