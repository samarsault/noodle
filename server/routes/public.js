const express = require("express");
const { course: courseService } = require("../features/services");

const router = express.Router();

router.get("/courses", async (req, res) => {
  const courses = await courseService.getAll();
  return res.json(courses);
});

module.exports = router;
