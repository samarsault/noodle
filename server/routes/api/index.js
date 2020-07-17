//
// Courses API
// TODO: Ensure Auth
//
const express = require("express");

const router = express.Router();

const courseApiRouter = require("./course");
const isRegisteredForCourse = require("../../middleware/isRegistered");
const { course, user } = require("../../features");

router.post("/courses/:course_id/register", async function (req, res) {
  // TODO: check if toobject required

  if (!req.user)
    return res.json({
      success: false,
    });
  // User.
  const user_id = req.user._id;

  await course.service.register(user_id, req.params.course_id);

  return res.json({
    success: true,
  });
});

router.use(
  "/courses/:course_id",
  (req, res, next) => {
    req.course_id = req.params.course_id;
    return next();
  },
  isRegisteredForCourse,
  courseApiRouter
);

router.get("/user", async function (req, res) {
  return res.status(200).json(req.user);
});

router.get("/user/courses", async function (req, res) {
  const courses = await user.service.getCourses(req.user._id);
  return res.status(200).json(courses);
});

module.exports = router;
