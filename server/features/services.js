//
// Index of all services
//

const user = require("./user/user.service");
const course = require("./course/course.service");
const page = require("./pages/page.service");
const { upload, s3Uploader } = require("./upload/upload.service");
const quiz = require("./quiz/quiz.service");
const question = require("./question/question.service");

module.exports = {
  user,
  course,
  page,
  upload,
  s3Uploader,
  question,
  quiz,
};
