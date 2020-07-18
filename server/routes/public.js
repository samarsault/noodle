const express = require("express");
const { course: courseService } = require("../features/services");

const router = express.Router();

router.get("/courses", async (req, res) => {
  const courses = await courseService.getAll();
  return res.json(courses);
});

router.get("/courses/search", async function (req, res) {
  const courses = await courseService.search(req.query.q);
  return res.json(courses);
});

router.get("/course/:course_id", async (req, res) => {
  const { course_id } = req.params;
  const course = await courseService.get(course_id);
  return res.json(course);
});

router.get("/course/:course_id/handout", async (req, res) => {
  if (!req.params.course_id) return res.status(400).json({});
  const tree = await courseService.pageTree(req.params.course_id);
  return res.status(200).json(tree);
});

module.exports = router;
