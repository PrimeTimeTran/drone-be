const express = require("express");
const users = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middleware/userAuth");
const User = require("../models/User");

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today,
  };
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + "Registered!" });
            })
            .catch((err) => {
              res.status(400).json({ error: err });
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.status(400).send("error:" + err);
    });
});

users.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    const passwordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (passwordCorrect) {
      const payload = {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 1440,
      });
      res.json({ data: token });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(400).json({ error: "Email not found" });
  }
});

users.get("/me", auth, (req, res) => {
  res.status(200).json({ status: "success", data: req.user });
});

module.exports = users;
