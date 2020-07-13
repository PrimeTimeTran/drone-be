var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
const router = new express.Router();
var port = process.env.PORT || 5000;
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const mongoURI = "mongodb://localhost:27017/mernloginreg";

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

var users = require("./routes/UserRoute");
app.use(router);

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
router.use("/users", users);

var QuestionsRoute = require("./routes/QuestionsRoute");
const auth = require("./middleware/userAuth");
app.use("/QuestionsRoute", auth, QuestionsRoute);

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
