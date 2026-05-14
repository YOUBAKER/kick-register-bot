const express = require("express");
const cors = require("cors");
const { createClient } = require("@retconned/kick-js");

const app = express();
app.use(cors());
app.use(express.json());

const CHANNEL_NAME = "lucywuw";
let messages = [];

// --- THE WEB SERVER PART ---
app.get("/", (req, res) => res.send("Bot & Backend are Live! 🚀"));

app.get("/messages", (req, res) => res.json(messages));

// Local route to add messages manually if needed
app.post("/attendance", (req, res) => {
  const { username, text } = req.body;
  messages.push({ username, text, timestamp: new Date() });
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// --- THE KICK BOT PART ---
async function startKickBot() {
  try {
    const client = createClient(CHANNEL_NAME, { logger: true, readOnly: true });
    console.log("👂 Bot is now listening to Kick...");

    client.on("ChatMessage", async (msg) => {
      const username = msg.sender?.username;
      const text = msg.content;

      if (text?.trim().toLowerCase() === "!7adher") {
        console.log("REGISTERED:", username);
        messages.push({ username, text, timestamp: new Date() });
      }
    });
  } catch (err) {
    console.error("KICK CONNECTION ERROR:", err.message);
  }
}

// Start the bot after the server is up
startKickBot();