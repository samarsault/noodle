//
// Courses API
// TODO: Ensure Auth
//
const express = require("express");

const router = express.Router();

const courseApiRouter = require("./course");
const isRegisteredForCourse = require("../../middleware/isRegistered");
const { user, course } = require("../../features");

router.use(
  "/courses/:course_id",
  (req, res, next) => {
    req.course_id = req.params.course_id;
    return next();
  },
  isRegisteredForCourse,
  courseApiRouter
);

router.get("/dashboard", async function (req, res) {
  const dashboard = await user.service.getDashboard(req.user._id);
  return res.json(dashboard);
});

router.get("/courseId", async function (req, res) {
  try {
    const { _id } = await course.service.getIdByName(req.query.name);
    return res.send(_id);
  } catch (e) {
    return res.send("");
  }
});

router.get("/user", async function (req, res) {
  return res.json(req.user);
});

module.exports = router;
