const { model, Schema } = require("mongoose");
const { r_string } = require("../../util/schemaTypes");

module.exports = model(
  "Quiz",
  new Schema({
    name: r_string,
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    created: Date,
    // type: r_string -> Used to show different icons
  }),
  "quiz"
);
