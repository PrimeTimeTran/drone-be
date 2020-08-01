const express = require("express");

const router = express.Router();

const Quiz = require("../models/quiz");

router.get("/", async (req, res) => {
  const quizzes = await Quiz.find({ user: req.user._id }).populate('questions');
  res.json(quizzes);
});

router.post("/", async (req, res) => {
  const quiz = await new Quiz({
    questions: req.body.questionIds,
    user: req.user._id,
    score: parseInt(req.body.score),
  });
  await quiz.save();
  res.json(quiz);
});

module.exports = router;
