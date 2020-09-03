//
// Verify the user is authenticated
//
const jwt = require("jsonwebtoken");
const { User } = require("../features/models");

module.exports = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { user_id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      _id: user_id,
    }).select("email role bits_id phone courses");

    if (!user) {
      throw new Error("No user with the given id");
    }

    req.user = user;

    return next();
  } catch (e) {
    // TODO: Register on auth
    // if (req.originalUrl.match("/api")) {
    return res.status(401).json({
      error: "Not authorized",
      location: "/auth",
    });

    // TODO:
    // redirect to page user was on after login
  }
};
