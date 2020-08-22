const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  user: {
    ref: "User",
    type: mongoose.Types.ObjectId,
  },
  free: {
    type: Boolean,
    default: false,
  },
  question: {
    type: String,
    required: true,
  },
  optionA: {
    type: String,
    required: true,
  },
  optionB: {
    type: String,
    required: true,
  },
  optionC: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  photo_url: {
    type: String
  },
  subtitle: {
    type: String
  },
  owner: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz"
    }
  ]
});

module.exports = {
  questionSchema,
  question: mongoose.model("Question", questionSchema),
}