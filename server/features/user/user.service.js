const User = require("./user.model");

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
    select: "name coverImage instructors",
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

  return user.courses;
};

exports.updateAccess = function (user_id, role) {
  return User.updateOne({ _id: user_id }, { role });
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
