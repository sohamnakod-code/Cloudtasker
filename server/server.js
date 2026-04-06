const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Correct MongoDB connection (fixed password)
mongoose.connect("mongodb+srv://admin:Soham%400707@cluster0.yzjoylx.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// Note model
const Note = require("./models/Note");

// API routes
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const newNote = new Note(req.body);
  await newNote.save();
  res.json(newNote);
});

// start server
app.listen(5000, () => console.log("Server running"));

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
  
    const hashed = await bcrypt.hash(password, 10);
  
    const user = new User({ email, password: hashed });
    await user.save();
  
    res.json({ message: "User created" });
  });


  
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user) return res.status(400).json("User not found");
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) return res.status(400).json("Wrong password");
  
    const token = jwt.sign({ id: user._id }, "secret123");
  
    res.json({ token });
  });