const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

dotenv.config();

require("./db/mongoose");

const userRouter = require("./routes/user");
const quizRouter = require("./routes/quiz");
const questionRouter = require("./routes/question");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const router = new express.Router();

app.use(router);

app.use("/users", userRouter);

const auth = require("./middleware/userAuth");
app.use("/questions", auth, questionRouter);
app.use("/quizzes", auth, quizRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
