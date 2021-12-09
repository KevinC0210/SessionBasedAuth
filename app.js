const express = require("express");
const app = express();
const port = 3030;

app.get("/", (req, res) => {
  res.send("Session based Auth");
});

app.listen(port, () => {
  console.log("Es funktioniert bis hier");
});
