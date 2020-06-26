//
// API for a
// Registered Course User
//
const express = require("express");

const router = express.Router();
const courseService = require("../../services/course");
const pageService = require("../../services/page");
const quizzer = require("../../services/quiz");
const questions = require("../../services/questions");
const { CoursePage } = require("../../models");

// Get Course Meta
router.get("/view", async function (req, res) {
  const course = await courseService.get(req.course_id);
  return res.json(course);
});

router.get("/view/:prop", async function (req, res) {
  if (req.course_id && req.params.prop) {
    const toSelect = req.params.prop.replace(",", " ");
    const course = await courseService.getProp(req.course_id, toSelect);

    return res.json(course);
  }
  return res.status(500).send("Bad request");
});

//
// Get Resources for a course
// Response Format:
// {
//	<topic>: [ <resource1>, <resource2>, ... ]
// }
//
router.get("/resources", async function (req, res) {
  const resources = await courseService.getResources(req.course_id);
  return res.json(resources);
});

router.get("/pages", async function (req, res) {
  const parent = req.query.parent || null;
  const pages = await pageService.getAll(req.course_id, parent);
  return res.json(pages);
});

router.get("/pages/:id", async function (req, res) {
  const page = await CoursePage.findOne({
    _id: req.params.id,
  });
  // Resolve module pages
  if (page.type === "Module") {
    const pages = await pageService.getAll(req.course_id, page._id);
    return res.json(pages);
  }
  return res.json(page);
});

router.get("/module/:id", async function (req, res) {
  const module = await pageService
    .get("Module", req.params.id)
    .populate("pages");
  return res.json(module);
});

router.get("/questions", async function (req, res) {
  const list = await questions.getAll(req.course_id);
  return res.json(list);
});

router.get("/quiz", async function (req, res) {
  const quizzes = await quizzer.get(req.course_id);
  return res.json(quizzes);
});

// note: sends answer as well
router.get("/quiz/:quiz_id", async function (req, res) {
  const quiz = await quizzer.getById(req.params.quiz_id);
  return res.json(quiz);
});

router.post("/quiz/attempt", async function (req, res) {
  const quizAttempt = await quizzer.attempt({
    user_id: req.user._id,
    quiz_id: req.body.quiz_id,
  });
  return res.status(200).json(quizAttempt);
});

router.post("/quiz/submit", async function (req, res) {
  const QA = await quizzer.evaluate(req.body);

  return res.status(200).json(QA);
});

module.exports = router;
