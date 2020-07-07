//
// A multi-part question
// Comprises multiple pages
//
const { Schema } = require("mongoose");
const Question = require("../question.model");
const Options = require("../../shared/typeDiscriminator");

const MultiPart = new Schema(
  {
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  Options
);

module.exports = Question.discriminator("MultiPart", MultiPart);
