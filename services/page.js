/*
 * Question Bank Service
 */
const Page = require("../models/CoursePage");
const Article = require("../models/Page/Article");
const Quiz = require("../models/Page/Quiz");
const Module = require("../models/Page/Module");

const PageModels = {
  Article,
  Module,
  Quiz,
};
// console.log(Question.discriminators)

exports.getAll = function (course, level) {
  const parent = level || null;
  return Page.find({ course, parent });
};

exports.get = function (type, _id) {
  return PageModels[type].findOne({ _id });
};

exports.create = function (type, pageObject) {
  if (PageModels[type]) return PageModels[type].create(pageObject);
  return Page.create(pageObject);
};

exports.update = function (pageId, updateObject) {
  if (!updateObject.type) throw new Error("No type specified.");

  const { type } = updateObject;
  if (PageModels[type])
    return PageModels[type].updateOne(
      {
        _id: pageId,
      },
      {
        $set: updateObject,
      }
    );

  return null;
};

exports.delete = function (questionId) {
  return Page.deleteOne({
    _id: questionId,
  });
};
