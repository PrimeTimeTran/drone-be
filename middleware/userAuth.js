const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  )
    return res.status(401).json({ status: "fail", message: "Unauthorized" });

  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) throw new Error("Unauthorized");
    req.user = user;
  } catch (err) {
    return res.status(401).json({ status: "fail", message: err.message });
  }
  next();
};
