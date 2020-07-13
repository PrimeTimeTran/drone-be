const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    // required:true,
    ref: "User",
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
});

module.exports = mongoose.model("Question", questionsSchema);
