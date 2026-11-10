/* BIO 112 class leaderboard: Google Apps Script backend.
   Paste this whole file into Extensions > Apps Script in a Google Sheet,
   then deploy it as a web app (see SETUP.md).

   Stores: time, game, nickname, score, details, claim code.
   The public board (doGet) shows nickname, best score, and date only.
   Claim codes stay in the Sheet, where only the Sheet's owner can see them. */

var SHEET_NAME = "Scores";
/* highest believable score per game; anything above is rejected */
var MAX_SCORE = {collector: 2000, mystery: 100000, disease: 100000};

function sheet_(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh){
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(["Time", "Game", "Nickname", "Score", "Details", "Claim code"]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* trims, removes < >, and stops Sheets from treating text as a formula */
function clean_(value, maxLen){
  var s = String(value == null ? "" : value).replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLen);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

/* GET ?game=collector&n=10  ->  {ok, top: [{name, score, date}]}  (best score per nickname) */
function doGet(e){
  var game = clean_(e.parameter.game, 30);
  var n = Math.min(50, Number(e.parameter.n) || 10);
  var rows = sheet_().getDataRange().getValues().slice(1).filter(function(r){ return r[1] === game; });
  var best = {};
  rows.forEach(function(r){
    var key = String(r[2]).toLowerCase();
    if (!best[key] || Number(r[3]) > Number(best[key][3])) best[key] = r;
  });
  var tz = Session.getScriptTimeZone();
  var top = Object.keys(best).map(function(k){ return best[k]; })
    .sort(function(a, b){ return Number(b[3]) - Number(a[3]); })
    .slice(0, n)
    .map(function(r){ return {name: String(r[2]).replace(/^'/, ""), score: Number(r[3]), date: Utilities.formatDate(new Date(r[0]), tz, "MMM d")}; });
  return json_({ok: true, top: top});
}

/* POST {game, name, score, details}  ->  {ok, code} */
function doPost(e){
  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var d = JSON.parse(e.postData.contents);
    var game = clean_(d.game, 30), name = clean_(d.name, 20), score = Number(d.score);
    if (!game || !name || !isFinite(score) || score < 0 || score > (MAX_SCORE[game] || 100000)){
      return json_({ok: false, error: "invalid"});
    }
    var code = Utilities.getUuid().replace(/-/g, "").slice(0, 6).toUpperCase();
    sheet_().appendRow([new Date(), game, name, Math.round(score), clean_(d.details, 200), code]);
    return json_({ok: true, code: code});
  } catch (err) {
    return json_({ok: false, error: "bad request"});
  } finally {
    lock.releaseLock();
  }
}
