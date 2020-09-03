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

exports.create = async function (type, pageObject) {
  if (!PageModels[type]) throw new Error("Illegal page type");
  const Model = PageModels[type];
  // assign index
  let index = -1;
  if (pageObject.parent) {
    // it is a child, how many siblings
    index = await Model.count({ parent: pageObject.parent });
  } else if (pageObject.type === "Module") {
    // is a module
    index = await Model.count({ course: pageObject.course });
  } else {
    throw new Error("Unable to compute page index");
  }
  return PageModels[type].create({
    ...pageObject,
    index,
  });
};

//
// Reorder using indexes
//
exports.reorder = async function (items) {
  const updates = items.map((item) =>
    Page.updateOne(
      {
        _id: item._id,
      },
      {
        index: item.index,
      }
    )
  );
  await Promise.all(updates);
};

// [ { name: < >, type: < >, children: [ ... ] }]
//
exports.skeleton = async function (course) {
  const modules = await Module.find({ course, parent: null })
    .sort({
      index: 1,
    })
    .select("name type");
  const info = [];
  for (const module of modules) {
    // eslint-disable-next-line no-await-in-loop
    const children = await Page.find({
      parent: module._id,
    })
      .sort({ index: 1 })
      .select("name type");
    info.push({
      _id: module._id,
      name: module.name,
      children,
    });
  }
  return info;
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

exports.delete = function (pageId) {
  return Page.deleteOne({
    _id: pageId,
  });
};

exports.deleteModule = async function (module_id) {
  // Delete Children
  await Page.deleteMany({
    parent: module_id,
  });
  // Delete Module
  await Page.deleteOne({
    _id: module_id,
  });
};
