const User = require("../models/user");
const { googleLogin } = require("../utils/googleOauth");
const jwt = require("jsonwebtoken");

exports.googleAuth = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res
        .status(400)
        .json({ success: false, error: "ID token required" });
    }

    const { user, token } = await googleLogin(code);

    // Set HTTP-only cookie with expiration
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.PRODUCTION === "true",
      sameSite: process.env.PRODUCTION === "true" ? "None" : "Lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-tokens -googleId");

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
