//
// Sets up connection with MongoDB
// and populates some basic data
//
const mongoose = require("mongoose");
const { User, Course } = require("../features/models");

async function populateDB() {
  const student = await User.create({
    name: "Dummy User",
    email: "student@bpgc-cte.org",
    oauth_id: "2034102512",
  });

  const instructor = await User.create({
    name: "Instroctor",
    email: "instructor@bpgc-cte.org",
    oauth_id: "8823421",
  });

  const admin = await User.create({
    name: "Admin",
    email: "admin@bpgc-cte.org",
    oauth_id: "88234211214",
    role: "admin",
  });

  const course = await Course.create({
    name: "Dummy Course",
    subtitle: new Array(10).join("Dummy....."),
    description: new Array(58).join("Long Description."),
    handout: "/something.pdf",
    coverImage: "/something.png",
    // topics: [ 'Introduction', 'Endnotes'],
    instructors: [instructor._id],
  });

  return {
    student,
    admin,
    instructor,
    course,
  };
}
module.exports = {
  beforeEach: async () => {
    await User.deleteMany();
    await Course.deleteMany();
    return populateDB();
  },
  beforeAll: async () => {
    mongoose.set("useCreateIndex", true);
    mongoose.connect(global.MONGO_URL, {
      dbName: global.MONGO_DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  afterAll: async () => {
    mongoose.connection.close();
  },
};
