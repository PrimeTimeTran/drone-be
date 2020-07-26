const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const router = express.Router();

const auth = require("../middleware/userAuth");

// Must use this syntax because userAuth middleware already requires User.
// Thus, schema is already registered.
const User = mongoose.model("User");

router.post("", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ token });
  } catch (e) {
    console.log(e);
    res.status(404).send({ error: "Bad Request" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const passwordCorrect = bcrypt.compareSync(password, user.password);
    if (passwordCorrect) {
      const token = await user.generateAuthToken();
      res.json({ token });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(400).json({ error: "Email not found" });
  }
});

router.get("/check-email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.query.email });
    if (user) {
      res.status(200).json({ emailFound: true });
    } else {
      res.status(201).json({ emailFound: false, message: 'Not found' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Bad Request" });
  }
});

router.get("/me", auth, (req, res) => {
  res.status(200).json({ status: "success", data: req.user });
});

module.exports = router;
