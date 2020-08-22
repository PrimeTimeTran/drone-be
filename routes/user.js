const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const router = express.Router();

const auth = require("../middleware/userAuth");

const {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  accountDeletionFollowupEmail,
} = require("../emails/account");

// Must use this syntax because userAuth middleware already requires User.
// Thus, schema is already registered.
const User = mongoose.model("User");

router.post("", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    sendWelcomeEmail(user.email, user.first_name);
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
      const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET, {
        expiresIn: "7 days",
      });
      sendPasswordResetEmail(
        user.email,
        process.env.FRONTEND_HOST + "update-password/" + token
      );
      res.status(200).json({ emailFound: true });
    } else {
      res.status(201).json({ emailFound: false, message: "Not found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Bad Request" });
  }
});

router.get("/me", auth, (req, res) => {
  res.status(200).json({ status: "success", data: req.user });
});

router.post("/password/:token", async (req, res) => {
  const token = req.params.token
  const decoded = jwt.verify(token, process.env.SECRET);
  const user = await User.findOne({ _id: decoded._id });
  if (user) {
    console.log({user, password: req.body.password})
    user.password = req.body.password
    await user.save()
    res.status(200).json({ status: "success"});
  } else  {
    res.status(404).json({ status: "Failure"});
  }
});

module.exports = router;
