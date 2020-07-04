/*
 * Basic Question Type
 * This can be derived using discriminators to create different
 * types of questions
 */
const { model, Schema } = require("mongoose");
const { r_string } = require("../../util/schemaTypes");
const Options = require("./Options");

module.exports = model(
  "Question",
  new Schema(
    {
      question: r_string,
      answer: {
        type: Schema.Types.Mixed,
        required: true,
      },
      course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      points: {
        type: Number,
        default: 1,
      },
      // Group the question belongs to
      group: {
        type: String,
        default: "default",
      },
      // Sub-Parts of the question, if any
      parts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Question",
        },
      ],
    },
    Options
  ),
  "questionbank"
);
