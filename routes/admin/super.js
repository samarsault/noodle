//
// Super Admin Actions
//
const express = require("express");
const upload = require("../../middleware/upload");
const response = require("../../util/response");
const courseService = require("../../services/course");
const calcCurDate = require("../../util/calcCurDate");

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
      const course = await courseService.create(courseObject);

      return res.redirect(`/admin/cmgt/${course._id}`);
    } catch (e) {
      if (process.env.NODE_ENV !== "production")
        return res.json(response.error(e.message));

      return res.json(response.error(e.message));
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
  const current = calcCurDate();
  const courses = await courseService.getAll(current);
  res.send(courses);
});

router.get("/courses/:course_id", async function (req, res) {
  const course = await courseService.get(req.params.course_id);
  res.send(course);
});

router.post(
  "/courses/update/:course_id",
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
    try {
      // Create Course\
      let courseObject;
      if (req.files.handout && req.files.coverImage) {
        courseObject = {
          ...req.body,
          handout: `/uploads/${req.files.handout[0].filename}`,
          coverImage: `/uploads/${req.files.coverImage[0].filename}`,
        };
      } else if (req.files.coverImage) {
        courseObject = {
          ...req.body,
          coverImage: `/uploads/${req.files.coverImage[0].filename}`,
        };
      } else if (req.files.handout) {
        courseObject = {
          ...req.body,
          handout: `/uploads/${req.files.handout[0].filename}`,
        };
      } else {
        courseObject = {
          ...req.body,
        };
      }
      const course = await courseService.update(
        req.params.course_id,
        courseObject
      );

      return res.status(200).redirect(`/dashboard/admin/cmgt/${course._id}`);
    } catch (e) {
      if (process.env.NODE_ENV !== "production")
        return res.json(response.error(e.message));

      return res.json(response.error(e.message));
    }
  }
);

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
