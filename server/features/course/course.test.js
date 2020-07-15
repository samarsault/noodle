//
// Course Service Test
//
const basicData = require("@/data");
const courseService = require("./course.service");
const { User, Course } = require("../models");

let data;

beforeAll(basicData.beforeAll);
beforeEach(async () => {
  data = await basicData.beforeEach();
});

describe("Course Service", function () {
  it("Register a user successfully", async (done) => {
    // Call Function
    await courseService.register(data.student._id, data.course._id);

    // Check the database
    const user = await User.findOne({ _id: data.student._id });
    expect(user.courses).toContainEqual(data.course._id);
    done();
  });

  it("Deregister a user successfully", async (done) => {
    await User.updateOne(
      { _id: data.student._id },
      { $addToSet: { courses: data.course._id } }
    );
    await courseService.deregister(data.student.email, data.course.name);
    const user = await User.findOne({ email: data.student.email });
    expect(user.courses).not.toContainEqual(data.course._id);
    done();
  });

  it("Check if a user is registered in a course", async (done) => {
    let isReg = await courseService.isRegistered(
      data.course._id,
      data.student._id
    );
    expect(isReg).toBe(false);
    await User.updateOne(
      { _id: data.student._id },
      { $addToSet: { courses: data.course._id } }
    );
    isReg = await courseService.isRegistered(data.course._id, data.student._id);
    expect(isReg).toBe(true);
    done();
  });

  it("Renders course view appropriately", async (done) => {
    const courseInfo = await courseService.getCourseView(data.course._id);
    const real = data.course.toObject();
    real.instructors = ["Instroctor"];
    expect(courseInfo).toEqual(real);
    done();
  });

  it("Get a course successfully", async (done) => {
    const course = await courseService.get(data.course._id);
    expect(course.toObject()).toStrictEqual(data.course.toObject());
    done();
  });

  it("Get a course by name", async (done) => {
    const course = (
      await courseService.getIdByName(data.course.name)
    ).toObject();
    expect(course).toStrictEqual(data.course.toObject());
    done();
  });

  it("Get props of a Course", async (done) => {
    const subtitle = await courseService.getProp(data.course._id, "subtitle");
    expect(subtitle).toStrictEqual(
      expect.objectContaining({ subtitle: data.course.subtitle })
    );
    done();
  });

  it("Get a registered user successfully", async (done) => {
    await User.updateOne(
      { _id: data.student._id },
      { $addToSet: { courses: data.course._id } }
    );
    let users = await courseService.getRegistered(data.course._id);
    users = users.map((u) => u.toObject());
    const regStudent = data.student;
    regStudent.courses = [data.course._id];
    expect(users).toEqual(expect.arrayContaining([regStudent.toObject()]));
    done();
  });

  it("Get a CSV of reg users successfully", async (done) => {
    await User.updateOne(
      { _id: data.student._id },
      { $addToSet: { courses: data.course._id } }
    );
    const csv = await courseService.getRegisteredCSV(data.course._id);
    const check = csv.split("\n").map((items) => items.split(","));
    expect(check[0]).toEqual(["name", "email", "phone", "bits_id"]);
    expect(check[1]).toEqual(
      expect.arrayContaining([data.student.name, data.student.email])
    );
    done();
  });

  it("Create a course successfully", async (done) => {
    const courseToCreate = data.course;
    courseToCreate.instructors[0] = data.instructor.email;
    courseToCreate._id = null;
    const courseRecieved = await courseService.create(courseToCreate);
    courseRecieved._id = null;

    const courseToExpect = courseToCreate;
    courseToExpect.instructors = [data.instructor._id];
    courseToExpect._id = null;
    expect(courseRecieved.toObject()).toStrictEqual(courseToExpect.toObject());
    done();
  });

  it("Search for courses successfully", async (done) => {
    const newCourses = [
      "Course1",
      "course1",
      "What a Course!",
      "Ok I am out of names",
    ];
    /* eslint-disable no-await-in-loop */
    const c = data.course.toObject();
    for (const course of newCourses) {
      const newCourse = { ...c, name: course };
      newCourse._id = null;
      await Course.create(newCourse);
    }
    /* eslint-enable no-await-in-loop */

    // Nothing Matches
    let names = await courseService.search("Magic");
    expect(names).toEqual(expect.arrayContaining([]));
    // Empty String
    names = await courseService.search("");
    expect(names).toEqual(expect.arrayContaining([]));
    // Case Insenstive
    names = await courseService.search("course1");
    const recievedCourses = names.map((course) => course.toObject());
    const course1 = await Course.findOne({ name: "course1" });
    const Course1 = await Course.findOne({ name: "Course1" });
    expect(recievedCourses).toStrictEqual(
      expect.arrayContaining([Course1.toObject(), course1.toObject()])
    );
    // Not more than 5
    names = await courseService.search("o");
    expect(names.length).toEqual(5);

    done();
  });

  it("Delete a course", async (done) => {
    const newCourse = await Course.create(data.course);
    await courseService.del(newCourse._id);
    const course = await courseService.get(newCourse._id);
    expect(course).toBeNull();
    done();
  });
});
afterAll(basicData.afterAll);
