const { Schema } = require("mongoose");
const CoursePage = require("../pages/page.model");
const Options = require("../shared/typeDiscriminator");

const QuizSchema = new Schema(
  {
    description: {
      type: String,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  Options
);

module.exports = CoursePage.discriminator("Quiz", QuizSchema);
