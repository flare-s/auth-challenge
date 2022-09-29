const express = require("express");
const cookieParser = require("cookie-parser");
const home = require("./routes/home.js");
const signup = require("./routes/sign-up.js");
const { getSession, removeSession } = require("./model/session.js");

const server = express();

server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(sessions);
server.get("/", home.get);
server.get("/sign-up", signup.get);
server.post("/sign-up", express.urlencoded({ extended: false }), signup.post);
// server.get("/product/:id", product.get);
// server.get("/search", search.get);
// server.get("/new", add.get);
// server.post("/new", express.urlencoded({ extended: false }), add.post);

function sessions(req, res, next) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  if (session) {
    console.log(session);
    const expiry = new Date(session.expires_at);
    const today = new Date();
    if (expiry < today) {
      removeSession(sid);
      res.clearCookie("sid");
    } else {
      req.session = session;
    }
  }
  next();
}

module.exports = server;
