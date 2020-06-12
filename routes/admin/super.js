//
// Super Admin Actions
//
const express = require("express");
const upload = require("../../middleware/upload");
const response = require("../../util/response");
const courseService = require("../../services/course");
const userService = require("../../services/user");

const router = express.Router();

router.post(
  "/addCourse",
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "handout",
      maxCount: 1,
    },
  ]),
  async function (req, res) {
    if (!req.files || !req.files.coverImage[0] || !req.files.handout)
      return res.json(response.error("Insufficent fields"));

    try {
      // Create Course
      const courseObject = {
        ...req.body,
        handout: `/uploads/${req.files.handout[0].filename}`,
        coverImage: `/uploads/${req.files.coverImage[0].filename}`,
      };
      await courseService.create(courseObject);

      return res.json(response.success());
    } catch (e) {
      if (process.env.NODE_ENV !== "production")
        return res.json(response.error(e.message));

      return res.json(response.error());
    }
  }
);

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

router.get("/courses/search", async function (req, res) {
  const courses = await courseService.search(req.query.q);
  return res.json(courses);
});

//
// Upgrade Access Level of User
//
router.post("/users/updateAccess", async function (req, res) {
  const { user_id, role, instructor_for } = req.body;

  if (user_id && role) {
    if (role === "instructor" && !instructor_for)
      return res.json(response.error("Instructor role requires a course."));

    await userService.updateAccess(user_id, role, instructor_for);

    return res.redirect("/dashboard/admin?success=1");
  }

  return res.redirect("/dashboard/admin?success=0");
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
