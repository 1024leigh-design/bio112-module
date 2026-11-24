/* =====================================================================
   BIO 112 shared leaderboard

   Scores are saved to a Google Sheet that the instructor owns, through a
   small Google Apps Script web app (see leaderboard/SETUP.md).
   - Saving is always optional. Only a nickname, the score and the date
     are stored. No accounts, no Canvas, no tracking.
   - Each save returns a secret claim code. Codes never appear on the
     public board; only the instructor sees them in the Sheet. A student
     who wants extra credit shows the instructor their code.

   Apps Script only runs about 30 requests at once for the whole class,
   so this file is careful with it: boards are cached for 30 seconds and
   shared between every table on the page, and a save that fails because
   the script is busy is retried automatically.

   Until URL below is filled in, every game still works and simply shows
   "The class leaderboard isn't turned on yet."
   ===================================================================== */
(function(){
  "use strict";
  var URL = "https://script.google.com/macros/s/AKfycbzy0Uunj9GLfymzj1S7cRxeBLmvZ9rVjKBwvK6x6HGskgvdNBJSD-d_G-Jt1YuR-nEKcg/exec";   /* Apps Script web app (see leaderboard/SETUP.md) */
  var BOARD_TTL = 30000;          /* reuse a loaded board for 30 s */
  var SAVE_TRIES = 4;             /* first try + 3 automatic retries */
  var SAVE_WAIT = [2000, 5000, 10000];

  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"}[c]; }); }
  function withTimeout(p, ms){ return Promise.race([p, new Promise(function(_, rej){ setTimeout(function(){ rej(new Error("timeout")); }, ms); })]); }
  function wait(ms){ return new Promise(function(res){ setTimeout(res, ms); }); }
  /* Apps Script answers errors with an HTML page, so read text and parse it ourselves */
  function getJSON(p){ return p.then(function(r){ return r.text(); }).then(function(t){ try { return JSON.parse(t); } catch (e){ throw new Error("not json"); } }); }
  function newId(){ return Date.now().toString(36) + Math.random().toString(36).slice(2, 10); }

  var boardCache = {};            /* "game|n" -> {t, p} */

  var LB = {
    ready: function(){ return !!URL; },

    /* text/plain body = no CORS preflight, which Apps Script can't answer.
       rid lets the script recognise a retry of a save that already went through. */
    submit: function(game, name, score, details){
      var body = JSON.stringify({game: game, name: name, score: score, details: details || "", rid: newId()});
      function attempt(i){
        return withTimeout(getJSON(fetch(URL, {method: "POST", body: body})), 30000).then(function(d){
          if (d && d.ok) return d;
          if (d && d.error === "busy" && i + 1 < SAVE_TRIES) return wait(SAVE_WAIT[i]).then(function(){ return attempt(i + 1); });
          return d;
        }, function(err){
          if (i + 1 < SAVE_TRIES) return wait(SAVE_WAIT[i]).then(function(){ return attempt(i + 1); });
          throw err;
        });
      }
      return attempt(0).then(function(d){
        if (d && d.ok) Object.keys(boardCache).forEach(function(k){ if (k.indexOf(game + "|") === 0) delete boardCache[k]; });
        return d;
      });
    },

    top: function(game, n){
      var key = game + "|" + (n || 10), hit = boardCache[key];
      if (hit && Date.now() - hit.t < BOARD_TTL) return hit.p;
      var p = withTimeout(getJSON(fetch(URL + "?game=" + encodeURIComponent(game) + "&n=" + (n || 10))), 30000);
      boardCache[key] = {t: Date.now(), p: p};
      p.then(function(d){ if (!(d && d.ok)) delete boardCache[key]; }, function(){ delete boardCache[key]; });
      return p;
    },

    /* Drop-in panel: LB.widget(element, {game, title, score: function(){ return {score, details}; }})
       Options: board: false = save form only (the page shows the table elsewhere with LB.board).
       game and title can be functions (for games with decks).
       LB.refresh() redraws the latest panel with the current score; it never reloads the board. */
    widget: function(el, opt){
      var saved = null;           /* {code, score} after a save */
      var boardHtml = "";
      function gameId(){ return typeof opt.game === "function" ? opt.game() : opt.game; }
      function titleText(){ return typeof opt.title === "function" ? opt.title() : opt.title; }
      el.classList.add("lbw");
      function load(){
        var box = el.querySelector(".lbw-board");
        if (!box) return;
        if (!LB.ready()){ box.innerHTML = boardHtml = '<p class="lbw-note">The class leaderboard isn\'t turned on yet.</p>'; return; }
        if (!boardHtml) box.innerHTML = '<p class="lbw-note">Loading…</p>';
        LB.top(gameId(), 10).then(function(d){
          boardHtml = d && d.ok ? boardTable(d.top || []) : '<p class="lbw-note">Couldn\'t load the leaderboard. It will try again soon.</p>';
          var b = el.querySelector(".lbw-board"); if (b) b.innerHTML = boardHtml;
        }).catch(function(){
          boardHtml = '<p class="lbw-note">Couldn\'t load the leaderboard. Check your connection.</p>';
          var b = el.querySelector(".lbw-board"); if (b) b.innerHTML = boardHtml;
        });
      }
      function render(){
        var sc = opt.score();
        var old = el.querySelector(".lbw-name"), typed = old ? old.value : "", hadFocus = old && document.activeElement === old;
        var busy = el.querySelector(".lbw-save") && el.querySelector(".lbw-save").disabled;
        if (busy) return;         /* a save is in progress; don't wipe it */
        var h = '<h3 class="lbw-h">🏆 ' + esc(titleText() || "Class leaderboard") + "</h3>";
        if (saved){
          h += '<div class="lbw-saved"><b>Saved! 🎉</b> Your secret claim code: <span class="lbw-code">' + esc(saved.code) + '</span><br><small>Write it down. If you want extra credit, show this code to your instructor. Nobody else can see it. The board lists the top 10, one best score per nickname.</small></div>';
        }
        if (LB.ready() && (!saved || sc.score > saved.score)){
          h += '<p class="lbw-note">' + (saved ? "Your score went up! Save it again" : "Totally optional: save your score") + ' (<b>' + esc(sc.score) + '</b>) under any nickname. Only the nickname, score, and date are saved.</p>' +
            '<div class="lbw-form"><input type="text" class="lbw-name" maxlength="20" placeholder="Pick a unique nickname" aria-label="Nickname" autocomplete="off"><button type="button" class="lbw-save">Save my score</button></div><p class="lbw-msg" role="status"></p>';
        }
        if (opt.board !== false) h += '<div class="lbw-board">' + boardHtml + '</div>';
        el.innerHTML = h;
        var input = el.querySelector(".lbw-name");
        if (input){ input.value = typed || (saved && saved.name) || ""; if (hadFocus) input.focus(); }
        var btn = el.querySelector(".lbw-save");
        if (btn) btn.addEventListener("click", function(){
          var name = el.querySelector(".lbw-name").value.trim(), msg = el.querySelector(".lbw-msg"), s2 = opt.score();
          if (!name){ msg.textContent = "Type a nickname first."; return; }
          if (!(s2.score > 0)){ msg.textContent = "Earn some points first!"; return; }
          btn.disabled = true; msg.textContent = "Saving… (this can take a few seconds when the whole class is saving)";
          LB.submit(gameId(), name, s2.score, s2.details).then(function(d){
            btn.disabled = false;
            if (d && d.ok){ saved = {code: d.code, score: s2.score, name: name}; render(); load(); LB.reloadBoards(); }
            else if (d && d.error === "invalid"){ msg.textContent = "The leaderboard turned this score down. Please tell your instructor so they can fix it."; }
            else { msg.textContent = "The leaderboard is really busy right now. Wait a minute and tap Save again."; }
          }).catch(function(){ btn.disabled = false; msg.textContent = "Couldn't reach the leaderboard. Check your Wi-Fi, wait a minute, and tap Save again."; });
        });
      }
      LB.refresh = render;
      render();
      load();
    },

    /* View-only table, always on the page (bottom of each game): LB.board(element, {game, title}).
       game and title can be functions; call LB.reloadBoards() after the deck changes. */
    _boards: [],
    board: function(el, opt){
      function val(x){ return typeof x === "function" ? x() : x; }
      var seq = 0;
      function render(){
        var my = ++seq;
        el.classList.add("lbw");
        el.innerHTML = '<h3 class="lbw-h">🏆 ' + esc(val(opt.title) || "Class leaderboard") + '</h3>' + (opt.note ? '<p class="lbw-note">' + opt.note + "</p>" : "") + '<div class="lbw-board"></div>';
        var box = el.querySelector(".lbw-board");
        if (!LB.ready()){ box.innerHTML = '<p class="lbw-note">The class leaderboard isn\'t turned on yet.</p>'; return; }
        box.innerHTML = '<p class="lbw-note">Loading…</p>';
        LB.top(val(opt.game), 10).then(function(d){ if (my === seq) box.innerHTML = d && d.ok ? boardTable(d.top || []) : '<p class="lbw-note">Couldn\'t load the leaderboard.</p>'; })
          .catch(function(){ if (my === seq) box.innerHTML = '<p class="lbw-note">Couldn\'t load the leaderboard. Check your connection.</p>'; });
      }
      LB._boards.push(render);
      render();
    },
    reloadBoards: function(){ LB._boards.forEach(function(f){ f(); }); }
  };
  function boardTable(rows){
    if (!rows.length) return '<p class="lbw-note">No scores yet. Be the first! 🏆</p>';
    return '<table class="lbw-table"><thead><tr><th>#</th><th>Name</th><th>Score</th><th>Date</th></tr></thead><tbody>' +
      rows.map(function(r, i){ return "<tr><td>" + (i < 3 ? ["🥇", "🥈", "🥉"][i] : i + 1) + "</td><td>" + esc(r.name) + "</td><td><b>" + esc(r.score) + "</b></td><td>" + esc(r.date || "") + "</td></tr>"; }).join("") + "</tbody></table>";
  }
  window.BIO112_LB = LB;

  /* default look; pages can restyle .lbw-* */
  var css = document.createElement("style");
  css.textContent = ".lbw{display:flex;flex-direction:column;gap:10px}.lbw-h{margin:0;font-size:22px}.lbw-note{margin:0;font-size:16px;opacity:.85}" +
    ".lbw-form{display:flex;flex-wrap:wrap;gap:8px}.lbw-name{flex:1 1 200px;font:inherit;font-size:17px;padding:10px 12px;border-radius:12px;border:2px solid #cbd5e1}" +
    ".lbw-save{font:inherit;font-weight:700;font-size:16px;padding:10px 18px;border-radius:999px;border:0;background:#1683cc;color:#fff;cursor:pointer}.lbw-save:disabled{opacity:.5}" +
    ".lbw-msg{margin:0;font-size:15px;min-height:1.2em}.lbw-saved{background:#dcf2e5;border-radius:12px;padding:12px;color:#14223a}.lbw-code{font:700 20px ui-monospace,monospace;letter-spacing:.12em;background:#fff;border-radius:8px;padding:2px 8px}" +
    ".lbw-table{width:100%;border-collapse:collapse;font-size:16px}.lbw-table th,.lbw-table td{padding:7px 8px;text-align:left;border-bottom:1px solid rgba(100,116,139,.3)}.lbw-table th{font-size:13px;text-transform:uppercase;letter-spacing:.05em;opacity:.7}";
  document.head.appendChild(css);
})();
