const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router/router");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3030;

const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
const sessionSecret = uuidv4();

app.use(bodyParser.json());

app.use(
  session({
    secret: sessionSecret,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: oneDayInMilliseconds },
    resave: false,
  })
);

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.use(cookieParser());

app.use("/api", router);

app.listen(port, () => {
  console.log("Es funktioniert bis hier");
});
