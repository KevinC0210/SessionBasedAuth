const express = require("express");
const path = require("path");
const users = require("../database");
const authentificationCheck = require("../authentification_check");

var router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ session: req.session });
});

router.get("/restricted", (req, res) => {
  if (authentificationCheck.checkAuthenticatedUser(req)) {
    res.status(200).json({ authorized: true, userid: req.session.userid });
  } else {
    res.status(403).json({ authorized: false });
  }
});

router.get("/admin", (req, res) => {
  if (authentificationCheck.checkAuthenticatedAdmin(req)) {
    res.status(200).json({ authorized: true });
  } else {
    res.status(403).json({ authorized: false });
  }
});

router.get("/login", (req, res) => {
  res.status(200).json({ session: req.session });
});

router.post("/login", (req, res) => {
  const user = users.find(
    (u) => u.id === req.body.userid && u.password === req.body.password
  );
  if (user) {
    var currentSession = req.session;
    currentSession.userid = user.id;
    currentSession.admin = user.admin;
    return res.status(200).json({ session: req.session });
  } else {
    res.status(401);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ loggedIn: false });
});

module.exports = router;
