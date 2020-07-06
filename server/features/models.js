//
// Index of all models
//

const User = require("./user/user.model");
const Course = require("./course/course.model");
const CoursePage = require("./pages/page.model");
const Uploads = require("./upload/upload.model");
const Quiz = require("./quiz/quiz.model");
const QuizAttempt = require("./quiz/attempt.model");
const Question = require("./question/question.model");

module.exports = {
  User,
  Course,
  CoursePage,
  Uploads,
  Question,
  Quiz,
  QuizAttempt,
};
