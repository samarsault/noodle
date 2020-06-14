//
// Server rendered pages
//
const express = require("express");

const router = express.Router();

const renderView = require("../util/renderView");
const courseService = require("../services/course");

// Current Date Calculation
const calcCurDate = require("../util/calcCurDate");

async function renderCourses(req, res, period) {
  const courses = await courseService.getFromHistory(period);

  renderView(req, res, "catalog", {
    courses,
  });
}
// Home Page
router.get("/", function (req, res) {
  return renderView(req, res, "index", { title: "CTE" });
});

// Team
router.get("/team", function (req, res) {
  return renderView(req, res, "team");
});

// FAQ
router.get("/faq", function (req, res) {
  // eslint-disable-next-line
  const faq = require("../faq");
  const topics = Object.keys(faq);
  return renderView(req, res, "faq", { faq, topics });
});

router.get("/courses/search/", async function (req, res) {
  const courses = await courseService.search(req.query.q);
  res.send(courses);
});

router.get("/courses/all", async function (req, res) {
  const current = calcCurDate();
  const courses = await courseService.getFromHistory(current);
  res.send(courses);
});

// Courses Page
router.get("/courses", async function (req, res) {
  const current = calcCurDate();
  await renderCourses(req, res, current);
});

router.get("/terms", function (req, res) {
  return renderView(req, res, "agreement", { hideAgreement: true });
});

// Course Page
router.get("/courses/:course_id/view", async function (req, res) {
  let course;
  if (req.isAuthenticated()) {
    course = await courseService.getCourseView(
      req.params.course_id,
      req.session.passport.user
    );
  } else {
    course = await courseService.getCourseView(req.params.course_id, null);
  }
  renderView(req, res, "course", course);
});

// Archives
router.get("/archives", function (req, res) {
  const start = [2019, 1];
  const end = calcCurDate();
  const periods = courseService.getArchives(start, end);
  renderView(req, res, "archives", {
    periods,
  });
});

router.get("/archives/:year/:sem", async function (req, res) {
  const year = parseInt(req.params.year);
  const sem = parseInt(req.params.sem);

  if (!Number.isNaN(year) && !Number.isNaN(sem)) {
    const period = [year, sem];
    await renderCourses(req, res, period);
  }
  // TODO: Render error view
});

router.get("/loginError", function (req, res) {
  return renderView(req, res, "error", {
    title: "Error Signing you Up",
    message: "Please ensure you are using your BITS Mail to Sign Up",
  });
});

module.exports = router;
