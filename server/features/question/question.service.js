/*
 * Question Bank Service
 */
const Question = require("./question.model");
const { MCQ, Numeric, MultiPart } = require("./types");

const QuestionModels = {
  MCQ,
  Numeric,
  MultiPart,
};
// console.log(Question.discriminators)

exports.getAll = function (course, group = "default") {
  return Question.find({ course, group }).populate("questions");
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
