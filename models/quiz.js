const mongoose = require("mongoose");

const questionSchema = require('../models/question').questionSchema

const quizSchema = new mongoose.Schema(
  {
    score: Number,
    user: {
      ref: "User",
      type: mongoose.Types.ObjectId,
    },
    questions: [questionSchema]
  },
  {
    timestamps: true,
  }
);

quizSchema.methods.toJSON = function () {
  const quiz = this.toObject();
  delete quiz.user;
  return quiz;
};

module.exports = mongoose.model("Quiz", quizSchema);
