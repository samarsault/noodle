/*
 * Question Bank Service
 */
const Page = require("./page.model");
const Article = require("./article.model");
const { Quiz } = require("../models");
const Module = require("./module.model");

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
