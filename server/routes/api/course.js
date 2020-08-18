//
// API for a
// Registered Course User
//
const express = require("express");

const router = express.Router();
const { course, page, quiz, question } = require("../../features");
const { CoursePage } = require("../../features/models");

router.get("/", async function (req, res) {
  const courseView = await course.service.get(req.course_id);
  return res.status(200).json(courseView);
});

router.get("/pages", async function (req, res) {
  // const parent = req.query.parent || null;
  // const pages = await page.service.getAll(req.course_id, parent);
  const info = await page.service.skeleton(req.course_id);
  return res.json(info);
});

router.get("/pages/:id", async function (req, res) {
  const pageInfo = await CoursePage.findOne({
    _id: req.params.id,
  });
  // Resolve module pages
  if (pageInfo.type === "Module") {
    const pages = await page.service.getAll(req.course_id, pageInfo._id);
    return res.json(pages);
  }
  return res.json(pageInfo);
});

// router.get("/module/:id", async function (req, res) {
//   const module = await page.service
//     .get("Module", req.params.id)
//     .populate("pages");
//   return res.json(module);
// });

router.get("/questions", async function (req, res) {
  const list = await question.service.getAll(req.course_id, req.query.group);
  return res.json(list);
});

router.get("/questions/groups", async function (req, res) {
  const list = await question.service.getGroups(req.course_id);
  return res.json(list);
});

router.get("/quiz", async function (req, res) {
  const quizzes = await quiz.service.get(req.course_id);
  return res.json(quizzes);
});

router.get("/quiz/review/:attempt_id", async function (req, res) {
  const { attempt_id } = req.params;
  const quizAttempt = await quiz.service.reviewAttempt(attempt_id);
  return res.status(200).json(quizAttempt);
});

// note: sends answer as well
router.get("/quiz/:quiz_id", async function (req, res) {
  const quizInfo = await quiz.service.getById(req.params.quiz_id);
  return res.json(quizInfo);
});

router.get("/quiz/:quiz_id/attempt", async function (req, res) {
  const quizAttempt = await quiz.service.getUserAttempt(
    req.params.quiz_id,
    req.user._id
  );
  return res.status(200).json(quizAttempt);
});
router.post("/quiz/attempt", async function (req, res) {
  const quizAttempt = await quiz.service.attempt({
    user_id: req.user._id,
    quiz_id: req.body.quiz_id,
  });
  return res.status(200).json(quizAttempt);
});

router.post("/quiz/submit", async function (req, res) {
  const QA = await quiz.service.evaluate(req.body);
  return res.status(200).json(QA);
});

module.exports = router;
