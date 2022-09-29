const db = require("../database/db.js");

const select_confessions = db.prepare(/*sql*/ `
  SELECT content, created_at FROM confessions WHERE user_id = ?
`);

function listConfessions(user_id) {
  return select_confessions.all(user_id);
}

module.exports = { listConfessions };
