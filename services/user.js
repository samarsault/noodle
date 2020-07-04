const { User, Course } = require("../models");
const calcCurDate = require("../util/calcCurDate");

exports.get = async function (user_id) {
  const user = await User.findOne({ _id: user_id });
  return user;
};

exports.updateInfo = async function (user_id, updateObject) {
  return User.updateOne(
    {
      _id: user_id,
    },
    updateObject
  );
};

exports.getDashboard = async function (user_id) {
  const user = await User.findOne({ _id: user_id });

  const coursePromises = user.courses.map(async (course_id) => {
    const course = await Course.findOne({ _id: course_id }).select(
      "name coverImage instructors offerYear offerSem"
    );

    // TODO: Use courseController method

    // Intructor Id to Name
    const instructors = await Promise.all(
      course.instructors.map(async (instructor_id) => {
        const { name } = await User.findOne({ _id: instructor_id }).select(
          "name"
        );
        return name;
      })
    );

    const instructor_index = course.instructors.findIndex((x) =>
      x.equals(user_id)
    );

    // Is an instructor for the course
    if (instructor_index !== -1)
      return {
        ...course.toObject(),
        instructors,
        isAdmin: true,
      };

    return { ...course.toObject(), instructors };
  });

  const courses = await Promise.all(coursePromises);
  return {
    courses,
    curDate: calcCurDate(),
  };
};

exports.updateAccess = async function (user_id, role, instructor_for) {
  const user = await User.findOneAndUpdate({ _id: user_id }, { role });

  // Update role as instructor
  if (instructor_for) {
    await Course.updateOne(
      {
        name: instructor_for,
      },
      {
        $addToSet: {
          instructors: user._id,
        },
      }
    );
  }
};

exports.search = function (query) {
  if (!query) return [];

  const re = new RegExp(`${query}.*`, "i");
  re.ignoreCase = true;

  return User.find({
    $or: [{ name: re }, { email: re }],
  })
    .select("name email")
    .limit(5);
};

exports.searchPaginated = function (query, pageNumber) {
  let searchObject = {};
  const page = pageNumber || 1;

  if (query) {
    const re = new RegExp(`${query}.*`, "i");
    re.ignoreCase = true;
    searchObject = { name: re };
  }

  return User.paginate(searchObject, {
    page,
    limit: 10,
  });
};
