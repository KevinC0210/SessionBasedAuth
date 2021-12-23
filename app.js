const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const router = require("./router/router");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3030;

const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
const sessionSecret = uuidv4();

app.use(
  session({
    secret: sessionSecret,
    saveUninitialized: true,
    cookie: { maxAge: oneDayInMilliseconds },
    resave: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.use(cookieParser());

app.use(router);

app.listen(port, () => {
  console.log("Es funktioniert bis hier");
});
