const { Schema } = require('mongoose');
const Question = require('.');
const Options = require('./Options');

const MCQSchema =  new Schema({
  options: [ String ],
  // MCQ Mode - index of correct answer/chosen option
  answer: {
    type: Number,
    required: true
  },
}, Options);

module.exports = Question.discriminator('MCQ', MCQSchema);
