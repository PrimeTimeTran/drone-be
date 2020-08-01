const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    score: Number,
    user: {
      ref: "User",
      type: mongoose.Types.ObjectId,
    },
    questions: [
      {
        ref: "Question",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
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
