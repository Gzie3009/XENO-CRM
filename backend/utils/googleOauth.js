const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage" // Special redirect for auth code flow
);

exports.googleLogin = async (code) => {
  const { tokens } = await client.getToken(code);

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, name, picture, sub: googleId } = ticket.getPayload();

  console.log(ticket.getPayload());

  let user = await User.findOne({ $or: [{ googleId }, { email }] });

  if (!user) {
    user = await User.create({
      googleId,
      email,
      name,
      avatar: picture,
    });
  } else if (!user.googleId) {
    user.googleId = googleId;
    await user.save();
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return { user, token };
};
