const express = require("express");

const router = express.Router();

const Question = require("../models/question").question;
const auth = require("../middleware/userAuth");

const csv = require("csv-parser");
const fs = require("fs");

router.get("/mine", auth, async (req, res) => {
  try {
    const questions = await Question.find({ owner: req.user._id });
    const otherQuestions = await Question.find({ owner: null });
    res.json(questions.concat(otherQuestions));
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

router.get("/quiz", async (req, res) => {
  try {
    // const offset = Math.floor(Math.random() * 120) + 1;
    // const questions = await Question.find().skip(offset).limit(30);
    const questions = await Question.aggregate().sample(30)
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

router.put("/:id", async (req, res) => {
  const question = await Question.findByIdAndUpdate(
    { _id: req.params.id },
    {
      ...req.body,
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.status(201).json(result);
      }
    }
  );
});

router.get("/delete-all", async (req, res) => {
  await Question.remove({}, () => {
    console.log("Removed all questions");
  });
  res.status(201).json({ message: "success!  " });
});

module.exports = router;
