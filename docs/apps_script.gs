// Paste into Extensions > Apps Script in your Google Sheet, change TOKEN, then Deploy > New deployment > Web app.
const TOKEN = 'CHANGE-THIS-TO-A-LONG-RANDOM-WORD';

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.token !== TOKEN) return out({ ok: false });
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (d.kind === 'signup') {
    ss.getSheetByName('Signups').appendRow([new Date(), d.name, d.email, d.role, d.note, d.feedback]);
  } else if (d.kind === 'poll') {
    ss.getSheetByName('Poll').appendRow([new Date(), d.answer]);
  }
  return out({ ok: true });
}

function doGet(e) {
  if (e.parameter.token !== TOKEN) return out({ ok: false });
  const rows = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Poll').getDataRange().getValues().slice(1);
  return out({ ok: true, yes: rows.filter(r => r[1] === 'yes').length, total: rows.length });
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
