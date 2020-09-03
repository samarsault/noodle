//
// Check User is registered for course
//
const { User } = require("../features/models");

module.exports = async function (req, res, next) {
  const { course_id } = req;
  const user_id = req.user._id;

  const count = await User.countDocuments({ _id: user_id, courses: course_id });

  if (count > 0) return next();

  // Not registered for course
  return res.status(401).send("Unauthorized");
};
