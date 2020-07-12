const express = require("express");
const { course: courseService } = require("../features/services");

const router = express.Router();

router.get("/courses", async (req, res) => {
  const courses = await courseService.getAll();
  return res.json(courses);
});

router.post("/register/:course_id", async function (req, res) {
  // TODO: check if toobject required

  const { course_id } = req.params;
  if (!req.user)
    return res.json({
      success: false,
    });
  // User.
  const user_id = req.user._id;

  await courseService.register(user_id, course_id);

  return res.json({
    success: true,
  });
});

module.exports = router;
