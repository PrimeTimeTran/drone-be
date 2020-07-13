const express = require("express");
const router = express.Router();
const Questions = require("../models/Questions");

//getting all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Questions.find();
    res.json(questions);
  } catch (err) {
    res.status(500)({ message: err.message });
  }
});

// Show my questions only
router.get("/me", async (req, res) => {
  try {
    const questions = await Questions.find().or([
      { user: req.user._id },
      { free: true },
    ]);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Deleting one of my questions
router.delete("/me/:id", getQuestions, async (req, res) => {
  try {
    const deletedQuestions = await res.questions.remove();
    res.json(deletedQuestions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Creating one questions
router.post("/", async (req, res) => {
  const questions = new Questions({
    user: req.user._id,
    question: req.body.question,
    optionA: req.body.optionA,
    optionB: req.body.optionB,
    optionC: req.body.optionC,
    optionD: req.body.optionD,
    answer: req.body.answer,
  });
  try {
    const newQuestions = await questions.save();
    res.status(201).json(newQuestions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Updating one question
router.patch("/:id", getQuestions, async (req, res) => {
  if (req.body.question != null) {
    res.questions.question = req.body.question;
  }
  if (req.body.optionA != null) {
    res.questions.optionA = req.body.optionA;
  }
  if (req.body.optionB != null) {
    res.questions.optionB = req.body.optionB;
  }
  if (req.body.optionC != null) {
    res.questions.optionC = req.body.optionC;
  }
  if (req.body.optionD != null) {
    res.questions.optionD = req.body.optionD;
  }
  if (req.body.answer != null) {
    res.questions.answer = req.body.answer;
  }
  try {
    const updatedQuestions = await res.questions.save();
    res.json(updatedQuestions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getQuestions(req, res, next) {
  try {
    questions = await Questions.findById(req.params.id);
    if (questions === null) {
      return res.status(404).json({ message: "Cannot find questions" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.questions = questions;
  next();
}

const mySet = [
  {
    question: "What temperature does water boil at?",
    optionA: "50 degrees Celcius",
    optionB: "25 degrees Celcius",
    optionC: "100 degrees Celcius",
    optionD: "150 degrees Celcius",
    answer: "100 degrees Celcius",
  },

  {
    question: "Who wrote Julius Caesar, Macbeth and Hamlet?",
    optionA: "Wole Soyinka",
    optionB: "William Shakespeare",
    optionC: "Ngozi Chimamanda Adichie",
    optionD: "Dan Brown",
    answer: "William Shakespeare",
  },

  {
    question: "What did the crocodile swallow in Peter Pan?",
    optionA: "A Book",
    optionB: "A Computer",
    optionC: "A pair of shoes",
    optionD: "Alarm Clock",
    answer: "Alarm Clock",
  },

  {
    question: "Which is the only mammal that can’t jump?",
    optionA: "Dog",
    optionB: "Elephant",
    optionC: "Goat",
    optionD: "Lion",
    answer: "Elephant",
  },

  {
    question: "Who lived at 221B, Baker Street, London?",
    optionA: "Tony Stark",
    optionB: "Morgan Freeman",
    optionC: "Sherlock Holmes",
    optionD: "Samuel L. Jackson",
    answer: "Sherlock Holmes",
  },

  {
    question: "What colour is a panda?",
    optionA: "Green and Yellow",
    optionB: "Blue and Red",
    optionC: "Green and White",
    optionD: "Black and White",
    answer: "Black and White",
  },

  {
    question: "Where is the smallest bone in the human body?",
    optionA: "The Chest",
    optionB: "The Ear",
    optionC: "The Legs",
    optionD: "The Hands",
    answer: "The Ear",
  },

  {
    question: "What does the roman numeral C represent?",
    optionA: "100",
    optionB: "10",
    optionC: "10,000",
    optionD: "1,000,000",
    answer: "100",
  },

  {
    question: "What takes place in Hong Kong's Happy Valley?",
    optionA: "Chicken Wrestling",
    optionB: "Horse racing",
    optionC: "Street Racing",
    optionD: "Arm Wrestling",
    answer: "Horse racing",
  },

  {
    question: "Who painted the Mona Lisa?",
    optionA: "Alexander Graham Bell",
    optionB: "Sir Isaac Newton",
    optionC: "Leonardo Da Vinci",
    optionD: "Albert Einstein",
    answer: "Leonardo Da Vinci",
  },

  {
    question: "What’s the most important book in the Moslem religion?",
    optionA: "The Koran",
    optionB: "The Dictionary",
    optionC: "The Bible",
    optionD: "The Chemistry text Book",
    answer: "The Koran",
  },

  {
    question: "What’s the capital of Ethiopia?",
    optionA: "Cape Town",
    optionB: "San Francisco",
    optionC: "Abuja",
    optionD: "Syndey",
    answer: "Addis Ababa",
  },

  {
    question: "How many squares are there on a chess board?",
    optionA: "128",
    optionB: "64",
    optionC: "32",
    optionD: "256",
    answer: "64",
  },

  {
    question: "Who invented the electric light bulb?",
    optionA: "Tom Cruise",
    optionB: "Barack Obama",
    optionC: "Wole Soyinka",
    optionD: "Thomas Edison",
    answer: "Thomas Edison",
  },

  {
    question: "What are the first three words of the bible?",
    optionA: "be with everyone",
    optionB: "Again Jesus asked",
    optionC: "In the beginning",
    optionD: "At that time",
    answer: "In the beginning",
  },
];

router.get("/importdefault", async (req, res, next) => {
  try {
    const go = await mySet.map(
      async (el) =>
        await Questions.create({
          ...el,
          free: true,
          // user: "your admin id"
        })
    );
    const results = await Promise.all(go);
    return res.status(201).json(results);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
// what s wrong
// yeah I can show you a couple of things
//getting one questions
router.get("/:id", getQuestions, (req, res) => {
  res.json(res.questions);
});

module.exports = router;
