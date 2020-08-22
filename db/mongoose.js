const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI_ATLAS, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));