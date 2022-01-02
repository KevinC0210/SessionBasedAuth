const express = require("express");
const path = require("path");
const users = require("../database");
const authentificationCheck = require("../authentification_check");

var router = express.Router();

router.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../views", "index.html"));
});

router.get("/restricted", (req, res) => {
  if (authentificationCheck.checkAuthenticatedUser(req)) {
    res
      .status(200)
      .sendFile(path.join(__dirname, "../views", "restricted.html"));
  } else {
    res.redirect(401, "/login");
  }
});

router.get("/admin", (req, res) => {
  if (authentificationCheck.checkAuthenticatedAdmin(req)) {
    res.status(200).sendFile(path.join(__dirname, "../views", "admin.html"));
  } else {
    res.status(401).send("You are not authorized!");
  }
});

router.get("/login", (req, res) => {
  if (authentificationCheck.checkAuthenticatedUser(req)) {
    res.status(200).send("You are already logged in!");
  } else {
    res.status(200).sendFile(path.join(__dirname, "../views", "login.html"));
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
    res.redirect(200, "/");
  } else {
    res.status(401).send("Invalid username or password");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect(200, "/");
});

module.exports = router;
