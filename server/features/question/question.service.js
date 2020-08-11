/*
 * Question Bank Service
 */
const Question = require("./question.model");
const { MCQ, Numeric, NoBody } = require("./types");
const { Quiz } = require("../models");

const QuestionModels = {
  MCQ,
  Numeric,
  NoBody,
};

//
// Return questions in proper format (legacy)
//
exports.resolve = function (questions) {
  const promises = questions.map(async (q) => {
    if (q.type === "NoBody") {
      const parts = await Question.find({ parent: q._id });
      return { ...q, questions: parts };
    }
    return q;
  });
  return Promise.all(promises);
};

exports.getAll = async function (course, group = "default") {
  const questions = await Question.find({ course, group, parent: null }).lean();
  return this.resolve(questions);
};

exports.getGroups = function (course) {
  return Question.find({ course }).distinct("group");
};

exports.deleteGroup = function (course, group) {
  return Question.deleteMany({ course, group });
};

exports.moveGroup = function (course, group1, group2) {
  return Question.updateMany({ course, group: group1 }, { group: group2 });
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
