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
  optionD: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  owner: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  }
});

module.exports = {
  questionSchema,
  question: mongoose.model("Question", questionSchema),
}