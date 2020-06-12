//
//
const { User, Course, Resource } = require("../models");
const calcCurDate = require("../util/calcCurDate");

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
  return userCourses.find((user_course_id) => user_course_id.equals(course_id));
};

exports.getCourseView = async function (course_id, user_id) {
  const course = await Course.findOne({ _id: course_id });

  const instructorDelegates = course.instructors.map(async (instructor_id) => {
    const user = await User.findOne({ _id: instructor_id }).select("name");
    return user.name;
  });
  let isReg = false;
  if (user_id) {
    isReg = await this.isRegistered(course_id, user_id);
  }
  const instructors = await Promise.all(instructorDelegates);
  const courseObject = course.toObject();
  courseObject.instructors = instructors;
  const curDate = calcCurDate();
  const isArchive =
    courseObject.offerYear < curDate[0] ||
    (course.offerYear === curDate[0] && courseObject.offerSem === 1);

  return {
    course: courseObject,
    isArchive,
    isReg,
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

exports.getFromHistory = function (period) {
  return Course.find({
    offerYear: period[0],
    offerSem: period[1],
  });
};

exports.getArchives = function (start, end) {
  const periods = [];
  const years = end[0] - start[0];
  if (start[0] !== end[0] || start[1] !== end[1]) {
    periods.push({
      stamp: `${start[0]}-${start[1]}`,
      link: `/archives/${start[0]}/${start[1]}`,
    });
    if (start[1] === 1) {
      periods.push({
        stamp: `${start[0]}-${start[1] + 1}`,
        link: `/archives/${start[0]}/${start[1] + 1}`,
      });
    }
  }

  for (let i = 1; i <= years; i++) {
    const period1 = [start[0] + i, 1];
    const period2 = [start[0] + i, 2];
    periods.push({
      stamp: `${period1[0]}-${period1[1]}`,
      link: `/archives/${period1[0]}/${period1[1]}`,
    });
    if (!(period1[0] === end[0] && end[1] === 1)) {
      periods.push({
        stamp: `${period2[0]}-${period2[1]}`,
        link: `/archives/${period2[0]}/${period2[1]}`,
      });
    }
  }
  // remove end, i.e. the curent period
  periods.pop();
  return periods;
};

exports.getResources = async function (course_id) {
  const resources = await Resource.find({
    course: course_id,
  });

  const responseObject = {};

  for (const resource of resources) {
    if (!responseObject[resource.topic]) {
      responseObject[resource.topic] = [];
    }
    responseObject[resource.topic].push(resource);
  }

  return responseObject;
};

exports.getRegistered = function (course_id) {
  return User.find({
    courses: course_id,
    role: "student",
  });
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
  const {
    name,
    summary,
    description,
    offerYear,
    offerSem,
    instructors,
    handout,
    coverImage,
  } = body;

  const instructorsArr = instructors.toString().split(",");

  const course = await Course.create({
    name,
    summary,
    description,
    handout,
    coverImage,
    offerYear,
    offerSem,
  });

  // Update instructor & roles
  const updateDelegates = instructorsArr.map(async (id) => {
    const user = await User.findOne({
      _id: id,
    }).select("role");

    // don't degrede admin
    if (user.role !== "admin") {
      await User.updateOne(
        {
          _id: user._id,
        },
        {
          role: "instructor",
          instructor_for: course._id,
        }
      );
    }

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
  if (!query) return [];

  const re = new RegExp(`${query}.*`, "i");
  re.ignoreCase = true;
  const courses = await Course.find({ name: re }).limit(5);
  const names = courses.map((course) => course.name);

  return names;
};

exports.del = function (course_id) {
  return Course.deleteOne({ _id: course_id });
};
