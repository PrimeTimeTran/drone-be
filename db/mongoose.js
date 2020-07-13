const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/drone-study-guide";

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));