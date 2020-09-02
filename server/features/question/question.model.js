/*
 * Basic Question Type
 * This can be derived using discriminators to create different
 * types of questions
 */
const { model, Schema } = require("mongoose");
const { r_string } = require("../shared/schemaTypes");
const Options = require("../shared/typeDiscriminator");

module.exports = model(
  "Question",
  new Schema(
    {
      question: r_string,
      answer: {
        type: Schema.Types.Mixed,
        // For some questions, answers can be subjective
        // required: true,
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
      parent: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        default: null,
      },
      // Group the question belongs to
      group: {
        type: String,
        default: "default",
      },
    },
    Options
  ),
  "questionbank"
);
