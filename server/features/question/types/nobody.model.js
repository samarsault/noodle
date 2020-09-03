//
// Question with no body (only question)
//

const { Schema } = require("mongoose");
const Options = require("../../shared/typeDiscriminator");
const Question = require("../question.model");

module.exports = Question.discriminator(
  "NoBody",
  new Schema(
    {
      points: {
        type: Number,
        default: 0,
      },
      answer: {
        type: Schema.Types.Mixed,
        default: null,
      },
    },
    Options
  )
);
