/*
 * Question Bank Service
 */
const Question = require('../models/Question')
const MCQ = require('../models/Question/MCQ')
const Numeric = require('../models/Question/Numeric')

const QuestionModels = {
  'MCQ': MCQ,
  'Numeric': Numeric
};
// console.log(Question.discriminators)

exports.getAll = function(course) {
	return Question.find({ course });
}

exports.create = function(type, questionObject) {
  if (QuestionModels[type])
    return QuestionModels[type].create(questionObject);
  return null;
}

exports.update = function(questionId, updateObject) {
  if (!updateObject.type)
    throw new Error('No type specified.');

  const type = updateObject.type
  if (QuestionModels[type])
    return QuestionModels[type].updateOne({
      _id: questionId
    }, {
      $set: updateObject
    })

  return null;
}

exports.delete = function(questionId) {
  return Question.deleteOne({
    _id: questionId
  })
}

/*
 * Manage parts of a question 
 * Methods:
 *    .subparts(question).add(new question)
 *    .parts(question).remove(new question)
 */
exports.parts = function(parent_id) {
  return {
    add(child_id) { 
      return Question.updateOne(
        {
          _id: parent_id
        },
        {
          '$push': {
            parts: child_id
          }
        }
      )
    },
    remove(child_id) {
      return Question.updateOne(
        {
          _id: parent_id
        },
        {
          '$pull': {
            parts: child_id
          }
        }
      )
    }
  }
}
