//
// Course Service Test
//
const basicData = require("./data/basic");
const courseService = require("../services/course");
const { User } = require("../models");

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
    expect(courseInfo).toEqual(
      expect.objectContaining({
        course: real,
        isArchive: false,
        isReg: false,
      })
    );
    await courseService.register(data.student._id, data.course._id);
    const customCourseInfo = await courseService.getCourseView(
      data.course._id,
      data.student._id
    );
    expect(customCourseInfo).toEqual(
      expect.objectContaining({
        course: real,
        isArchive: false,
        isReg: true,
      })
    );
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
    const summary = await courseService.getProp(data.course._id, "summary");
    expect(summary).toStrictEqual(
      expect.objectContaining({ summary: data.course.summary })
    );
    done();
  });

  it("Get past courses successfully", async (done) => {
    const demoDates = [
      [2019, 1],
      [2019, 2],
      [2016, 1],
      [2016, 2],
      [2040, 1],
      [2040, 2],
    ];
    const checkCorrectness = async (date) => {
      const demoCourse = data.course.toObject();
      [demoCourse.offerYear, demoCourse.offerSem] = date;
      demoCourse.name = "Thing";
      const histCourse = await courseService.create(demoCourse);
      let histCourses = await courseService.getFromHistory(date);
      histCourses = histCourses.map((c) => c.toObject());
      expect(histCourses).toEqual(
        expect.arrayContaining([histCourse.toObject()])
      );
    };

    const checkEmpty = async (date) => {
      const coursesEmpty = await courseService.getFromHistory(date);
      expect(coursesEmpty).toEqual(expect.arrayContaining([]));
    };

    // Get courses which exist
    await checkCorrectness(demoDates[1]);
    await checkCorrectness(demoDates[0]);

    // Extreme Past should be empty
    await checkEmpty(demoDates[2]);
    await checkEmpty(demoDates[3]);

    // Future should be empty
    await checkEmpty(demoDates[4]);
    await checkEmpty(demoDates[5]);

    done();
  });

  it("Get Archives successfully", (done) => {
    const archivesAsExpected = (want, got) => {
      expect(want).toEqual(
        got.map((stamp) => expect.objectContaining({ stamp }))
      );
    };

    let archives = courseService.getArchives([2017, 1], [2019, 2]);
    let expected = ["2017-1", "2017-2", "2018-1", "2018-2", "2019-1"];
    archivesAsExpected(archives, expected);

    archives = courseService.getArchives([2017, 2], [2019, 1]);
    expected = ["2017-2", "2018-1", "2018-2"];
    archivesAsExpected(archives, expected);

    archives = courseService.getArchives([2017, 2], [2019, 2]);
    expected = ["2017-2", "2018-1", "2018-2", "2019-1"];
    archivesAsExpected(archives, expected);

    archives = courseService.getArchives([2017, 1], [2019, 1]);
    expected = ["2017-1", "2017-2", "2018-1", "2018-2"];
    archivesAsExpected(archives, expected);

    archives = courseService.getArchives([2017, 2], [2017, 1]);
    expect(archives).toEqual([]);

    archives = courseService.getArchives([2017, 1], [2017, 1]);
    expect(archives).toEqual([]);

    archives = courseService.getArchives([2017, 2], [2017, 2]);
    expect(archives).toEqual([]);

    archives = courseService.getArchives([2017, 1], [2017, 2]);
    expect(archives).toEqual([
      expect.objectContaining({
        stamp: "2017-1",
      }),
    ]);

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
    const course = await courseService.create(data.course);
    const real = data.course;
    real._id = null;
    course._id = null;
    expect(course.toObject()).toStrictEqual(real.toObject());
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
      await courseService.create(newCourse);
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
    expect(names).toEqual(expect.arrayContaining(["Course1", "course1"]));
    // Not more than 5
    names = await courseService.search("o");
    expect(names.length).toEqual(5);

    done();
  });

  it("Delete a course", async (done) => {
    const newCourse = await courseService.create(data.course);
    await courseService.del(newCourse._id);
    const course = await courseService.get(newCourse._id);
    expect(course).toBeNull();
    done();
  });
});
afterAll(basicData.afterAll);
