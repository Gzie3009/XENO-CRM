const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.protect = async (req, res, next) => {
  let token;
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Not authorized. Please log in.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) throw new Error("User not found");

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    res.status(401).json({
      success: false,
      error: "Session expired. Please log in again.",
    });
  }
};
