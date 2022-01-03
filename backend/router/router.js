const express = require("express");
const path = require("path");
const users = require("../database");
const authentificationCheck = require("../authentification_check");

var router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ session: req.session });
});

router.get("/restricted", (req, res) => {
  console.log(req.session);
  if (authentificationCheck.checkAuthenticatedUser(req)) {
    res.status(200).json({ authenticated: true, userid: req.session.userid });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

router.get("/admin", (req, res) => {
  if (authentificationCheck.checkAuthenticatedAdmin(req)) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

router.get("/login", (req, res) => {
  if (authentificationCheck.checkAuthenticatedUser(req)) {
    res.status(200).json({ userid: req.session.userid, loggedIn: true });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

router.post("/login", (req, res) => {
  const user = users.find(
    (u) => u.id === req.body.userid && u.password === req.body.password
  );
  if (user) {
    var currentSession = req.session;
    currentSession.userid = user.id;
    currentSession.admin = user.admin;
    return res.status(200).json({ userid: req.session.userid });
  } else {
    res.status(401);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ loggedIn: false });
});

module.exports = router;
