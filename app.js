const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3030;

const user = "admin";
const password = "1234";

const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
//in future need to generate random string for secret
app.use(
  session({
    secret: "secretsessionkey",
    saveUninitialized: true,
    cookie: { maxAge: oneDayInMilliseconds },
    resave: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.use(cookieParser());

var currentSession;

app.get("/", (req, res) => {
  res.sendFile("views/index.html", { root: __dirname });
});

app.get("/restricted", (req, res) => {
  currentSession = req.session;
  if (currentSession.userid) {
    res.sendFile("views/restricted.html", { root: __dirname });
  } else {
    res.sendFile("views/login.html", { root: __dirname });
  }
});

app.post("/login", (req, res) => {
  if (req.body.username == user && req.body.password == password) {
    currentSession = req.session;
    currentSession.userid = req.body.username;
    console.log(req.session);
    res.redirect("/restricted");
  } else {
    res.send("Invalid username or password");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Es funktioniert bis hier");
});
