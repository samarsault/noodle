//
// Super Admin Actions
//
const express = require("express");
// const response = require("../../util/response");
const {
  course: courseService,
  user: userService,
  upload,
  s3Uploader,
} = require("../../features/services");

const router = express.Router();

router.post(
  "/upload/:fileName",
  upload.fields([{ name: "content" }]),
  async (req, res) => {
    try {
      const files = await s3Uploader(req, res);
      res.send(files);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.post("/addCourse", async function (req, res) {
  try {
    // Create Course
    const course = await courseService.create(req.body);

    return res.redirect(`/admin/cmgt/${course._id}`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// TODO: Efficiency
router.get("/users", async function (req, res) {
  const users = await userService.searchPaginated(
    req.query.query,
    req.query.page
  );
  return res.json(users);
});

router.get("/users/search", async function (req, res) {
  const users = await userService.search(req.query.q);
  return res.json(users);
});

router.get("/students", async function (req, res) {
  const users = await courseService.getRegistered(req.query.course_id);
  if (users) return res.json(users);
  return res.status(500);
});

router.get("/users/searchById", async function (req, res) {
  const user = await userService.get(req.query.q);
  return res.send(user);
});

router.get("/courses/search", async function (req, res) {
  const courses = await courseService.search(req.query.q);
  return res.json(courses);
});

router.get("/courses/all", async function (req, res) {
  const courses = await courseService.getAll();
  res.send(courses);
});

router.get("/courses/:course_id", async function (req, res) {
  const course = await courseService.get(req.params.course_id);
  res.send(course);
});

router.put("/courses/update/:course_id", async function (req, res) {
  try {
    // Update Course
    const course = await courseService.update(req.params.course_id, req.body);
    return res.status(200).send(course);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.delete("/courses/:course_id", async function (req, res) {
  try {
    await courseService.del(req.params.course_id);
    res.send("Deleted Sucessfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
//
// Upgrade Access Level of User
//
router.post("/users/updateAccess", async function (req, res) {
  const { user_id, role } = req.body;

  if (user_id && role) {
    await userService.updateAccess(user_id, role);
    return res.status(200).json({
      success: true,
    });
  }

  return res.status(400).json({ success: false });
});

router.post("/deregister", async function (req, res) {
  try {
    const { email, course } = req.body;
    await courseService.deregister(email, course);
    return res.json({
      success: true,
    });
  } catch (e) {
    return res.json({
      success: false,
    });
  }
});

module.exports = router;
