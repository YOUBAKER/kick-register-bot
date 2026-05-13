const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Kick Register Bot Running");
});

app.post("/attendance", (req, res) => {
  const { username, text } = req.body;

  console.log("MESSAGE:", username, text);

  res.json({
    ok: true,
    username,
    text
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});