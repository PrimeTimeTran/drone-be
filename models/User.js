const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    trim: true,
    type: String,
  },
  last_name: {
    trim: true,
    type: String,
  },
  email: {
    trim: true,
    type: String,
    unique: true,
    required: true,
  },
  password: {
    trim: true,
    minlength: 6,
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.virtual("questions", {
  ref: "Question",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("quizzes", {
  ref: "Quiz",
  localField: "_id",
  foreignField: "user",
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
