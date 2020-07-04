//
// Course Service Test
//
const basicData = require("./data/basic");
const userService = require("../services/user");
const courseService = require("../services/course");
const { User, Course } = require("../models");

let data;

beforeAll(basicData.beforeAll);
beforeEach(async () => {
  data = await basicData.beforeEach();
  await courseService.register(data.student._id, data.course._id);
});

describe("User Service", function () {
  it("Shows registered course in dashboard", async (done) => {
    const dashboard = await userService.getDashboard(data.student._id);

    // TODO: Match Course ID
    expect(dashboard.courses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: data.course.name,
          instructors: expect.arrayContaining([data.instructor.name]),
        }),
      ])
    );
    done();
  });

  it("Gets data by user id", async (done) => {
    const user = await userService.get(data.student._id);

    expect(user._id).toEqual(data.student._id);
    expect(user.name).toEqual(data.student.name);
    expect(user.email).toEqual(data.student.email);
    expect(user.role).toEqual(data.student.role);

    done();
  });

  it("shows updated info of a user", async (done) => {
    const updateObject = {
      name: "Dummy User",
      oauth_id: "02315364",
      email: "updatedone@bpgc-cte.org",
    };

    const updated = await userService.updateInfo(
      data.student._id,
      updateObject
    );
    const user = await User.findOne({ _id: data.student._id });
    expect(user.courses).toContainEqual(data.course._id);

    const updateArray = Object.keys(updateObject);
    for (field of updateArray) {
      if (user[field] == data.student[field]) {
        updateArray.splice(updateArray.indexOf(field), 1);
      }
    }

    for (field of updateArray) {
      expect(user[field]).toEqual(updateObject[field]);
    }
    done();
  });

  it("checks wether it update access or not", async (done) => {
    // For instructor
    const updateAccessIns = await userService.updateAccess(
      data.student._id,
      "instructor",
      data.course.name
    );
    let user = await User.findOne({ _id: data.student._id });
    const course = await Course.findOne({ _id: data.course._id });
    expect(user.role).toBe("instructor");
    expect(course.instructors).toEqual(
      expect.arrayContaining([data.student._id])
    );

    // For admin
    const updateAccessAdmin = await userService.updateAccess(
      data.student._id,
      "admin"
    );
    user = await User.findOne({ _id: data.student._id });
    expect(user.role).toBe("admin");

    done();
  });

  it("Gets the data of a user successfully", async (done) => {
    const dummy2 = await User.create({
      name: "dummy User",
      email: "student1@bpgc-cte.org",
      oauth_id: "2034102517",
    });

    const name = (item) => item.map((user) => user.name);

    //Nothing Matches
    let search = await userService.search("Magic");
    expect(name(search)).toEqual(expect.arrayContaining([]));
    //Empty String
    search = await userService.search("");
    expect(name(search)).toEqual(expect.arrayContaining([]));
    //Case Insensitive
    search = await userService.search("dummy");
    expect(name(search)).toEqual(
      expect.arrayContaining([data.student.name, dummy2.name])
    );
    //Not more than 5
    search = await userService.search("bpgc");
    expect(name(search).length).not.toBeGreaterThan(5);

    done();
  });

  it("paginate the search result of users", async (done) => {
    const dummy2 = await User.create({
      name: "dummy User",
      email: "student1@bpgc-cte.org",
      oauth_id: "2034102517",
    });

    const name = (item) => item.map((user) => user.name);
    //Nothing Matches
    paginatedSearch = await userService.searchPaginated("Magic");
    expect(name(paginatedSearch.docs)).toEqual(expect.arrayContaining([]));
    //Empty String
    paginatedSearch = await userService.searchPaginated("");
    expect(name(paginatedSearch.docs)).toEqual(expect.arrayContaining([]));
    //Case Insensitive
    paginatedSearch = await userService.searchPaginated("dummy");
    expect(name(paginatedSearch.docs)).toEqual(
      expect.arrayContaining([data.student.name, dummy2.name])
    );
    //page limit set to 10
    paginatedSearch = await userService.searchPaginated("bpgc");
    expect(paginatedSearch.docs.length).not.toBeGreaterThan(10);

    done();
  });
});

afterAll(basicData.afterAll);
