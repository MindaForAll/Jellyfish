const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected ! !"))

  const userSchema = new mongoose.Schema({
    username: String,
    walletAddress: String,
    createdAt: { type: Date, default: Date.now }
  });

  const User = mongoose.model("User", userSchema);

  app.post("/register", async (req, res) => {
    const { username, walletAddress } = req.body;

    const existingUser = await User.findOne({ walletAddress });
  if (existingUser) {
    return res.status(400).send("Wallet address already registered.");
  }

  const newUser = new User({ username, walletAddress });
  await newUser.save();

  res.status(201).send("User registered successfully");
});

app.get("/", (req, res) => {
    res.send("Backend server is working ! !");
  });

  const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
