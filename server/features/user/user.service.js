const { User, Course } = require("../models");
const calcCurDate = require("../../util/calcCurDate");

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
  const user = await User.findOne({ _id: user_id }, "courses").populate({
    path: "courses",
    select: "name coverImage instructors offerYear offerSem",
    populate: {
      path: "instructors",
      select: "name",
    },
  });

  for (const course of user.courses) {
    if (course.instructors.find((x) => x._id === user_id)) {
      course.isAdmin = true;
    }
    course.instructors = [...course.instructors.map((x) => x.name)];
  }

  return {
    courses: user.courses,
    curDate: calcCurDate(),
  };
};

exports.updateAccess = async function (user_id, role, instructor_for) {
  // TODO: depreciated
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
