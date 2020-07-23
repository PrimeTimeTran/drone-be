async function getQuestions(req, res, next) {
  try {
    questions = await Questions.findById(req.params.id);
    if (questions === null) {
      return res.status(404).json({ message: "Cannot find questions" });
    }
    req.questions = questions
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.questions = questions;
  next();
}

module.exports = getQuestions