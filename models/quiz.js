const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    user: {
      ref: "User",
      type: mongoose.Types.ObjectId,
    },
    score: Number,
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
