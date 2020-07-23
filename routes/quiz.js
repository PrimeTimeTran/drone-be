const express = require("express");

const router = express.Router();

const Quiz = require("../models/quiz");

router.get("/", async (req, res) => {
  const quizzes = await Quiz.find({ user: req.user._id });
  res.json(quizzes);
});

router.post("/", async (req, res) => {
  const quiz = new Quiz({
    ...req.body,
    user: req.user._id,
  });
  await quiz.save();
  quiz.execPopulate();
  res.json(quiz);
});

module.exports = router;
