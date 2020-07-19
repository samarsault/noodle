//
// Course Admin Actions
// Course_id: req.course_id
//
const express = require("express");

const router = express.Router();
const {
  course: courseService,
  question: questionService,
  page: pageService,
  quiz: quizzer,
  upload,
  s3Uploader,
} = require("../../features/services");
const { Uploads } = require("../../features/models");

//
// Fetch students registered to course
//
router.get("/students", async function (req, res) {
  const users = await courseService.getRegistered(req.course_id);
  if (users) return res.json(users);
  return res.status(500);
});

router.get("/students/download", async function (req, res) {
  res.setHeader("Content-disposition", "attachment; filename=export.csv");
  res.setHeader("Content-type", "text/csv");

  const registeredCSV = await courseService.getRegisteredCSV(req.course_id);

  return res.send(registeredCSV);
});

// Add a resource to course
router.post("/upload", upload.fields([{ name: "content" }]), async function (
  req,
  res
) {
  if (!req.files) return res.status(400).send("Missing");
  const url = await s3Uploader(req, res);
  const file = req.files.content[0];
  // History of uploads
  const uploadEntry = await Uploads.create({
    name: file.originalname,
    course: req.course_id,
    user: req.user,
    url,
  });
  return res.send({ name: uploadEntry.name, url });
});

router.post("/questions", async function (req, res) {
  const question = await questionService.create(req.body.type, req.body);
  return res.json(question);
});
router.delete("/questions/:id", async function (req, res) {
  const q = await questionService.delete(req.params.id);
  return res.json(q);
});

router.put("/questions/:id", async function (req, res) {
  const q = await questionService.update(req.params.id, req.body);
  return res.json(q);
});

router.post("/page", async function (req, res) {
  const page = await pageService.create(req.body.type, req.body);
  return res.json(page);
});

router.put("/page/:id", async function (req, res) {
  await pageService.update(req.params.id, req.body);
  return res.send({
    success: true,
  });
});

router.delete("/page/:id", async function (req, res) {
  try {
    await pageService.delete(req.params.id);
    return res.status(200).send("OK");
  } catch (e) {
    throw new Error(e.message);
  }
});

router.get("/quiz/:id/attempts", async function (req, res) {
  const quiz_id = req.params.id;
  const attempts = await quizzer.getAttempts(quiz_id);
  return res.status(200).json(attempts);
});
//
router.post("/quiz/update", async function (req, res) {
  const { quiz_id, question_id, type, data } = req.body;
  try {
    if (type === "add") {
      await quizzer.addQuestion(quiz_id, data);
    } else if (type === "update") {
      await quizzer.updateQuestion(question_id, data);
    } else if (type === "delete") {
      await quizzer.deleteQuestion(quiz_id, question_id);
    } else {
      return res.json({
        success: false,
        message: "Invalid/Blank operation type",
      });
    }
    return res.json({ success: true });
  } catch (e) {
    return res.json({
      success: false,
    });
  }
});

module.exports = router;
