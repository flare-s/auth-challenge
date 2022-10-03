const crypto = require("node:crypto");
const db = require("../database/db.js");

const insert_session = db.prepare(/*sql */ `
 INSERT INTO sessions (id, user_id, expires_at)
 VALUES ($id,
  $user_id,
  DATE('now', '+7 days'))
`);

function createSession(user_id) {
  const sid = crypto.randomBytes(18).toString("base64");
  // to-do
  insert_session.run({ id: sid, user_id });
  return sid;
}

const select_session = db.prepare(`
  SELECT id, user_id, expires_at
  FROM sessions WHERE id = ?
`);

function getSession(sid) {
  return select_session.get(sid);
}

const delete_session = db.prepare(`
  DELETE FROM sessions WHERE id = ?
`);

function removeSession(sid) {
  return delete_session.run(sid);
}

module.exports = { createSession, getSession, removeSession };
