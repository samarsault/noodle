const { Schema } = require("mongoose");
const Page = require("../CoursePage");
const Options = require("./Options");

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

module.exports = Page.discriminator("Quiz", QuizSchema);
