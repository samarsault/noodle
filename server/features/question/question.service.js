/*
 * Question Bank Service
 */
const Question = require("./question.model");
const { MCQ, Numeric } = require("./types");

const QuestionModels = {
  MCQ,
  Numeric,
};
// console.log(Question.discriminators)

exports.getAll = function (course, group = "default") {
  return Question.find({ course, group });
};

exports.getGroups = function (course) {
  return Question.find({ course }).distinct("group");
};

exports.create = function (type, questionObject) {
  if (QuestionModels[type]) return QuestionModels[type].create(questionObject);
  return null;
};

exports.update = function (questionId, updateObject) {
  if (!updateObject.type) throw new Error("No type specified.");

  const { type } = updateObject;
  if (QuestionModels[type])
    return QuestionModels[type].updateOne(
      {
        _id: questionId,
      },
      {
        $set: updateObject,
      }
    );

  return null;
};

exports.delete = function (questionId) {
  return Question.deleteOne({
    _id: questionId,
  });
};

/*
 * Manage parts of a question
 * Methods:
 *    .subparts(question).add(new question)
 *    .parts(question).remove(new question)
 */
exports.parts = function (parent_id) {
  return {
    add(child_id) {
      return Question.updateOne(
        {
          _id: parent_id,
        },
        {
          $push: {
            parts: child_id,
          },
        }
      );
    },
    remove(child_id) {
      return Question.updateOne(
        {
          _id: parent_id,
        },
        {
          $pull: {
            parts: child_id,
          },
        }
      );
    },
  };
};
