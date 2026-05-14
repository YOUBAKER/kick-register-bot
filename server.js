const express = require("express");
const cors = require("cors");
const { createClient } = require("@retconned/kick-js");

const app = express();

app.use(cors());
app.use(express.json());

const messages = [];

app.get("/", (req, res) => {
  res.send("Kick Register Bot Running");
});

app.post("/attendance", (req, res) => {
  const { username, text } = req.body;

  messages.push({
    username,
    text,
    timestamp: Date.now()
  });

  console.log("MANUAL:", username, text);

  res.json({ ok: true });
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

const CHANNEL_NAME = "lucywuw";

async function startKickBot() {
  try {
    const client = createClient(CHANNEL_NAME, {
      logger: true,
      readOnly: true
    });

    console.log("Listening to Kick chat...");

    client.on("ChatMessage", (msg) => {
      const username = msg.sender?.username;
      const text = msg.content;

      if (!username || !text) return;

      console.log(username, text);

      if (text.trim().toLowerCase() === "!7adher") {
        messages.push({
          username,
          text,
          timestamp: Date.now()
        });

        console.log("REGISTERED:", username);
      }
    });
  } catch (err) {
    console.error("Kick connection error:", err);
  }
}

startKickBot();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});