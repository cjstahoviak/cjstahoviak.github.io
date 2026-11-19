/**
 * Backend for /2026-friendsgiving.
 *
 * Lives in the "2026 Friendsgiving" Google Sheet (Extensions > Apps Script)
 * and is deployed as a web app (execute as: Me, access: Anyone). This copy
 * is for reference; the deployed copy is the one that runs.
 *
 * Sheet columns: id | name | dish | updated
 *
 * GET   -> { ok, rows: [{ id, name, dish }] }
 * POST  -> same response, after applying one of:
 *   { action: 'add', name, dish }
 *   { action: 'update', id, name, dish }
 *   { action: 'delete', id }
 *
 * The page sends POST bodies as text/plain so the browser skips the CORS
 * preflight, which Apps Script can't answer.
 */

const SHEET_NAME = 'Sheet1';
const MAX_LENGTH = 120;

function doGet() {
  return respond_(function () {});
}

function doPost(e) {
  return respond_(function (sheet) {
    const req = JSON.parse(e.postData.contents);
    if (req.action === 'add') {
      const entry = cleanEntry_(req);
      sheet.appendRow([
        Utilities.getUuid(),
        asText_(entry.name),
        asText_(entry.dish),
        new Date(),
      ]);
      return;
    }
    const row = findRow_(sheet, req.id);
    // Someone else already removed it; the fresh list will show that.
    if (!row) return;
    if (req.action === 'update') {
      const entry = cleanEntry_(req);
      sheet
        .getRange(row, 2, 1, 3)
        .setValues([[asText_(entry.name), asText_(entry.dish), new Date()]]);
    } else if (req.action === 'delete') {
      sheet.deleteRow(row);
    } else {
      throw new Error('Unknown action');
    }
  });
}

/** Runs `change` under a lock, then returns the current rows as JSON. */
function respond_(change) {
  let body;
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    change(sheet);
    SpreadsheetApp.flush();
    body = { ok: true, rows: readRows_(sheet) };
  } catch (err) {
    body = { ok: false, error: String((err && err.message) || err) };
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function readRows_(sheet) {
  const last = sheet.getLastRow();
  if (last < 2) return [];
  const values = sheet.getRange(2, 1, last - 1, 3).getDisplayValues();
  const rows = [];
  values.forEach(function (v, i) {
    const name = v[1].trim();
    const dish = v[2].trim();
    if (!name && !dish) return;
    let id = v[0];
    // Rows typed straight into the sheet have no id yet; give them one.
    if (!id) {
      id = Utilities.getUuid();
      sheet.getRange(i + 2, 1).setValue(id);
    }
    rows.push({ id: id, name: name, dish: dish });
  });
  return rows;
}

function findRow_(sheet, id) {
  const last = sheet.getLastRow();
  if (last < 2 || !id) return 0;
  const ids = sheet.getRange(2, 1, last - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) {
    if (ids[i][0] === id) return i + 2;
  }
  return 0;
}

function cleanEntry_(req) {
  const name = String(req.name || '').trim().slice(0, MAX_LENGTH);
  const dish = String(req.dish || '').trim().slice(0, MAX_LENGTH);
  if (!name || !dish) throw new Error('Name and dish are both required');
  return { name: name, dish: dish };
}

/**
 * The leading apostrophe makes Sheets store the value as plain text, so
 * "=IMPORTXML(...)" is never run as a formula and "1/2 pie" isn't a date.
 */
function asText_(value) {
  return "'" + value;
}
