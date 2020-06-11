/*
 * Numeric Questions
 */
const { Schema } = require('mongoose');
const Question = require('.');
const Options = require('./Options');

const NumericSchema =  new Schema({
  // Numeric Answer
  answer: {
    type: Number,
    required: true
  },
  // Permitted error range
  // Everything from [answer - error, answer + error] will be considered
  // correct
  error: {
		type: Number,    
		defualt: 0
  }
}, Options);

module.exports = Question.discriminator('Numeric', NumericSchema);
