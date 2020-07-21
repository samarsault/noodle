//
//
const { User, Course, CoursePage, Uploads } = require("../models");

exports.register = function (user_id, course_id) {
  return User.updateOne(
    { _id: user_id },
    { $addToSet: { courses: course_id } }
  );
};

exports.deregister = async function (user_email, course_name) {
  const { _id } = await Course.findOne({ name: course_name }).select("");
  await User.updateOne(
    {
      email: user_email,
    },
    {
      $pull: {
        courses: _id,
      },
    }
  );
};

exports.isRegistered = async (course_id, user_id) => {
  const userCourses = (await User.findOne({ _id: user_id })).courses;
  return !!userCourses.find((user_course_id) =>
    user_course_id.equals(course_id)
  );
};

exports.getCourseView = async function (course_id) {
  const course = await Course.findOne({ _id: course_id }).populate({
    path: "instructors",
    select: "name",
  });

  const courseObject = course.toObject();

  return {
    ...courseObject,
    instructors: courseObject.instructors.map((x) => x.name),
  };
};

exports.get = function (course_id) {
  return Course.findOne({
    _id: course_id,
  });
};

exports.getIdByName = function (courseName) {
  return Course.findOne({
    name: courseName,
  }).select("");
};

exports.getProp = async function (course_id, toSelect) {
  return Course.findOne(
    {
      _id: course_id,
    },
    { _id: 0, [toSelect]: 1 }
  );
};

exports.getAll = function () {
  return Course.find({
    isArchived: {
      // not equal to true i.e. not a truthy value
      // works for false, undefined etc.
      $ne: true,
    },
  }).limit(10);
};

exports.getArchives = function () {
  return Course.find({
    isArchived: true,
  });
};

exports.getRegistered = function (course_id) {
  return User.find({
    courses: course_id,
    role: "student",
  }).select("-password");
};

exports.getRegisteredCSV = async function (course_id) {
  const users = await this.getRegistered(course_id);
  // properties to send
  const props = ["name", "email", "phone", "bits_id"];

  // Write CSV Header
  let result = `${props.join(",")}\n`;

  for (const user of users) {
    const dataArr = [];

    for (const prop of props) {
      if (!user[prop]) dataArr.push(" ");
      else dataArr.push(user[prop]);
    }

    result += `${dataArr.join(",")}\n`;
  }

  return result;
};

exports.create = async function (body) {
  const { name, subtitle, description, instructors, coverImage } = body;

  const instructorsArr = instructors.toString().split(",");

  const course = await Course.create({
    name,
    subtitle,
    description,
    coverImage,
  });
  // Update instructor & roles

  const updateDelegates = instructorsArr.map(async (email) => {
    const user = await User.findOne({
      email,
    });
    await Course.updateOne(
      {
        _id: course._id,
      },
      {
        $addToSet: {
          instructors: user._id,
        },
      }
    );
  });

  await Promise.all(updateDelegates);
  return Course.findOne({ _id: course._id });
};

exports.search = async function (query) {
  // Send any 5 for an empty query, to give user something to look upon
  if (!query) return Course.find({}).select("name").limit(5);

  const re = new RegExp(`${query}.*`, "i");
  re.ignoreCase = true;
  const courses = await Course.find({ name: re }).select("name").limit(5);
  return courses;
};

exports.del = async function (course_id) {
  let users = await User.find({
    courses: course_id,
  });
  users = users.map(async (user) => {
    return User.updateOne(
      {
        _id: user._id,
      },
      {
        $pull: {
          courses: course_id,
        },
      }
    );
  });
  await Promise.all(users);
  await CoursePage.deleteMany({ course: course_id });
  await Uploads.deleteMany({ course: course_id });
  return Course.deleteOne({ _id: course_id });
};

exports.update = async function (course_id, newCourse) {
  const modCourse = newCourse;

  const { instructors } = modCourse;
  delete modCourse.instructors;

  const course = await Course.findByIdAndUpdate(course_id, modCourse, {
    new: true,
  });
  await Course.updateOne({ _id: course_id }, { instructors: [] });
  if (instructors) {
    const instructorsArr = instructors.toString().split(",");

    const updateDelegates = instructorsArr.map(async (email) => {
      const user = await User.findOne({
        email,
      });
      await Course.updateOne(
        {
          _id: course._id,
        },
        {
          $addToSet: {
            instructors: user._id,
          },
        }
      );
    });
    await Promise.all(updateDelegates);
  }
  return Course.findOne({ _id: course._id });
};

exports.pageTree = async function (course_id) {
  // TODO:
  // Try querying db once, and computing array in memory
  const roots = await CoursePage.find({
    course: course_id,
    parent: null,
  }).select("name parent");
  const graph = {};
  for (const root of roots) {
    // eslint-disable-next-line no-await-in-loop
    const children = await CoursePage.find({
      parent: root._id,
    }).select("name");
    graph[root.name] = children;
  }
  return graph;
};
