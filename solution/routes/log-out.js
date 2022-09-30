const { removeSession } = require("../model/session.js");

function post(req, res) {
  const sid = req.session.id;
  removeSession(sid);
  res.clearCookie("sid");
  res.redirect("/");
}

module.exports = { post };
