const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

require("./db/mongoose");
const userRouter = require("./routes/user");
const questionRouter = require("./routes/question");

dotenv.config();

const app = express();
const auth = require("./middleware/userAuth");

const router = new express.Router();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(router);

app.use("/users", userRouter);
app.use("/questions", auth, questionRouter);

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
