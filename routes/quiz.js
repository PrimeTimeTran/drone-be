const express = require("express");

const router = express.Router();

const Quiz = require("../models/quiz");
const Question = require("../models/question").question;

router.get("/", async (req, res) => {
  const quizzes = await Quiz.find({ user: req.user._id });
  for (const quiz of quizzes) {
    const questions = await Question.find();
    quiz.questions = questions;
  }
  res.json(quizzes);
});

router.post("/", async (req, res) => {
  const quiz = new Quiz({
    ...req.body,
    user: req.user._id,
  });
  await quiz.save();
  res.json(quiz);
});

module.exports = router;
