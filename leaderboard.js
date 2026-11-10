/* =====================================================================
   BIO 112 shared leaderboard

   Scores are saved to a Google Sheet that the instructor owns, through a
   small Google Apps Script web app (see leaderboard/SETUP.md).
   - Saving is always optional. Only a nickname, the score and the date
     are stored. No accounts, no Canvas, no tracking.
   - Each save returns a secret claim code. Codes never appear on the
     public board; only the instructor sees them in the Sheet. A student
     who wants extra credit shows the instructor their code.

   Until URL below is filled in, every game still works and simply shows
   "The class leaderboard isn't turned on yet."
   ===================================================================== */
(function(){
  "use strict";
  var URL = "https://script.google.com/macros/s/AKfycbzy0Uunj9GLfymzj1S7cRxeBLmvZ9rVjKBwvK6x6HGskgvdNBJSD-d_G-Jt1YuR-nEKcg/exec";   /* Apps Script web app (see leaderboard/SETUP.md) */

  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"}[c]; }); }
  function withTimeout(p, ms){ return Promise.race([p, new Promise(function(_, rej){ setTimeout(function(){ rej(new Error("timeout")); }, ms); })]); }

  var LB = {
    ready: function(){ return !!URL; },
    /* text/plain body = no CORS preflight, which Apps Script can't answer */
    submit: function(game, name, score, details){
      return withTimeout(fetch(URL, {method: "POST", body: JSON.stringify({game: game, name: name, score: score, details: details || ""})}).then(function(r){ return r.json(); }), 15000);
    },
    top: function(game, n){
      return withTimeout(fetch(URL + "?game=" + encodeURIComponent(game) + "&n=" + (n || 10)).then(function(r){ return r.json(); }), 15000);
    },

    /* Drop-in panel: LB.widget(element, {game, title, score: function(){ return {score, details}; }}) */
    widget: function(el, opt){
      var saved = null;
      el.classList.add("lbw");
      function table(rows){
        if (!rows.length) return '<p class="lbw-note">No scores yet. Be the first! 🏆</p>';
        return '<table class="lbw-table"><thead><tr><th>#</th><th>Name</th><th>Score</th><th>Date</th></tr></thead><tbody>' +
          rows.map(function(r, i){ return "<tr><td>" + (i < 3 ? ["🥇", "🥈", "🥉"][i] : i + 1) + "</td><td>" + esc(r.name) + "</td><td><b>" + esc(r.score) + "</b></td><td>" + esc(r.date || "") + "</td></tr>"; }).join("") + "</tbody></table>";
      }
      function load(){
        var box = el.querySelector(".lbw-board");
        if (!LB.ready()){ box.innerHTML = '<p class="lbw-note">The class leaderboard isn\'t turned on yet.</p>'; return; }
        box.innerHTML = '<p class="lbw-note">Loading…</p>';
        LB.top(opt.game, 10).then(function(d){ box.innerHTML = d && d.ok ? table(d.top || []) : '<p class="lbw-note">Couldn\'t load the leaderboard.</p>'; })
          .catch(function(){ box.innerHTML = '<p class="lbw-note">Couldn\'t load the leaderboard. Check your connection.</p>'; });
      }
      function render(){
        var sc = opt.score();
        var h = '<h3 class="lbw-h">🏆 ' + esc(opt.title || "Class leaderboard") + "</h3>";
        if (saved){
          h += '<div class="lbw-saved"><b>Saved! 🎉</b> Your secret claim code: <span class="lbw-code">' + esc(saved) + '</span><br><small>Write it down. If you want extra credit, show this code to your instructor. Nobody else can see it.</small></div>';
        } else if (LB.ready()){
          h += '<p class="lbw-note">Totally optional: save your score (<b>' + esc(sc.score) + '</b>) under any nickname. Only the nickname, score, and date are saved.</p>' +
            '<div class="lbw-form"><input type="text" class="lbw-name" maxlength="20" placeholder="Nickname (no real name needed)" aria-label="Nickname" autocomplete="off"><button type="button" class="lbw-save">Save my score</button></div><p class="lbw-msg" role="status"></p>';
        }
        h += '<div class="lbw-board"></div>';
        el.innerHTML = h;
        var btn = el.querySelector(".lbw-save");
        if (btn) btn.addEventListener("click", function(){
          var name = el.querySelector(".lbw-name").value.trim(), msg = el.querySelector(".lbw-msg"), s2 = opt.score();
          if (!name){ msg.textContent = "Type a nickname first."; return; }
          if (!(s2.score > 0)){ msg.textContent = "Earn some points first!"; return; }
          btn.disabled = true; msg.textContent = "Saving…";
          LB.submit(opt.game, name, s2.score, s2.details).then(function(d){
            if (d && d.ok){ saved = d.code; render(); }
            else { btn.disabled = false; msg.textContent = "That didn't save. Try a different nickname."; }
          }).catch(function(){ btn.disabled = false; msg.textContent = "Couldn't reach the leaderboard. Try again in a minute."; });
        });
        load();
      }
      LB.refresh = render;
      render();
    }
  };
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
