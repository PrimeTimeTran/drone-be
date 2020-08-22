const express = require("express");

const router = express.Router();

const Question = require("../models/question").question;
const getQuestions = require("../middleware/questions");

const csv = require("csv-parser");
const fs = require("fs");

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/", async (req, res) => {
  const question = new Question({
    ...req.body,
    owner: req.user._id,
  });
  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get("/me", async (req, res) => {
  try {
    const offset = Math.floor(Math.random() * 130) + 1;
    const questions = await Question.find();
    // const questions = await Question.find().skip(offset).limit(20)
    if (questions) {
      res.json(questions);
    } else {
      const allQuestions = Question.find().res.json(allQuestions);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const question = await Question.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!question) return res.status(404).send();

    res.status(201).send(question);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// router.patch("/:id", getQuestions, async (req, res) => {
//   if (req.body.question != null) {
//     res.questions.question = req.body.question;
//   }
//   if (req.body.optionA != null) {
//     res.questions.optionA = req.body.optionA;
//   }
//   if (req.body.optionB != null) {
//     res.questions.optionB = req.body.optionB;
//   }
//   if (req.body.optionC != null) {
//     res.questions.optionC = req.body.optionC;
//   }
//   if (req.body.optionD != null) {
//     res.questions.optionD = req.body.optionD;
//   }
//   if (req.body.answer != null) {
//     res.questions.answer = req.body.answer;
//   }
//   try {
//     const updatedQuestions = await res.questions.save();
//     res.json(updatedQuestions);
//   } catch (e) {
//     res.status(400).json({ message: e.message });
//   }
// });

router.get("/generate", async (req, res, next) => {
  try {
    const questions = [];
    fs.createReadStream(__dirname + "/data.csv")
      .pipe(csv())
      .on("data", async (data) => {
        const answer = "option" + data.answer.toUpperCase();
        const question = await Question.create({
          ...data,
          free: true,
          answer: data[answer],
        });
        questions.push(question);
      })
      .on("end", async () => {
        const results = await Promise.all(questions);
        return res.status(201).json(results);
      });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// router.get("/:id", getQuestions, (req, res) => {
//   res.json(res.questions);
// });

router.put("/:id", async (req, res) => {
  const question = await Question.findByIdAndUpdate(
    { _id: req.params.id },
    {
      ...req.body,
    },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.status(201).json(result);
      }
    }
  );
});

module.exports = router;
