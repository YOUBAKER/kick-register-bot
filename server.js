const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const messages = [];

app.get("/", (req, res) => {
  res.send("Kick Register Bot Running");
});

app.post("/attendance", (req, res) => {
  const { username, text } = req.body;

  console.log("MESSAGE:", username, text);

  messages.push({
    username,
    text,
    timestamp: Date.now()
  });

  res.json({
    ok: true
  });
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});