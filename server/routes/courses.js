//
// Courses API
//
const express = require("express");

const router = express.Router();

const { course: courseService } = require("../features/services");

router.get("/all", async (req, res) => {
  const courses = await courseService.getAll();
  return res.json(courses);
});

module.exports = router;
