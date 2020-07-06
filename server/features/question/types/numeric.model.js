/*
 * Numeric Questions
 */
const { Schema } = require("mongoose");
const Question = require("../question.model");
const Options = require("../../shared/typeDiscriminator");

const NumericSchema = new Schema(
  {
    // Numeric Answer
    answer: {
      type: Number,
      required: true,
    },
    // Permitted error range
    // Everything from [answer - error, answer + error] will be considered
    // correct
    error: {
      type: Number,
      defualt: 0,
    },
  },
  Options
);

module.exports = Question.discriminator("Numeric", NumericSchema);
