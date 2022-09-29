const express = require("express");
const cookieParser = require("cookie-parser");
const home = require("./routes/home.js");
const signup = require("./routes/sign-up.js");
const login = require("./routes/log-in.js");
const logout = require("./routes/log-out.js");
const confessions = require("./routes/confessions.js");
const { getSession, removeSession } = require("./model/session.js");

const server = express();

server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(sessions);
server.get("/", home.get);
server.get("/sign-up", signup.get);
server.post("/sign-up", express.urlencoded({ extended: false }), signup.post);
server.get("/log-in", login.get);
server.post("/log-in", express.urlencoded({ extended: false }), login.post);
server.post("/log-out", logout.post);
server.get("/confessions/:user_id", confessions.get);

// server.get("/product/:id", product.get);
// server.get("/search", search.get);
// server.get("/new", add.get);
// server.post("/new", express.urlencoded({ extended: false }), add.post);

function sessions(req, res, next) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  if (session) {
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
