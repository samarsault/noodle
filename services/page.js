/*
 * Question Bank Service
 */
const Page = require("../models/CoursePage");
const Article = require("../models/Page/Article");
const Quiz = require("../models/Page/Quiz");

const PageModels = {
  Article,
  Quiz,
};
// console.log(Question.discriminators)

exports.getAll = function (course) {
  return Page.find({ course });
};

exports.create = function (type, pageObject) {
  console.log(type, pageObject);
  if (PageModels[type]) return PageModels[type].create(pageObject);
  return null;
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
