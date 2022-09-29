const db = require("../database/db.js");

const insert_user = db.prepare(`
  INSERT INTO users (email, hash)
  VALUES ($email, $hash)
  RETURNING id
`);

function createUser(email, hash) {
  return insert_user.get({ email, hash });
}

module.exports = { createUser };
