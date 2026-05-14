const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let messages = []; // This stores the "!7adher" list

app.get("/", (req, res) => res.send("Registration Backend is Online! ✅"));

// The Bot on your PC will send data here
app.post("/attendance", (req, res) => {
  const { username, text } = req.body;
  messages.push({ username, text, timestamp: new Date() });
  console.log(`Saved user: ${username}`);
  res.json({ ok: true });
});

// Visit this link to see the list
app.get("/messages", (req, res) => res.json(messages));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));