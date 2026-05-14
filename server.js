const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let messages = [];

app.get("/", (req, res) => res.send("Backend is Live! 🚀"));

// This receives the data from your local bot
app.post("/attendance", (req, res) => {
  const { username, text } = req.body;
  console.log("Registered:", username);
  messages.push({ username, text, timestamp: new Date() });
  res.json({ status: "success" });
});

// This shows the list of people
app.get("/messages", (req, res) => res.json(messages));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));