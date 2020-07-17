const user = require('./user');
const course = require('./course');

module.exports = {
  user,
  course,
  courses: {
    type: "array",
    items: {
      $ref: "#/components/schemas/course"
    }
  }
}
