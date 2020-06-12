const { Resource } = require("../models");

exports.create = function (skeleton) {
  return Resource.create(skeleton);
};

exports.delete = function (id) {
  return Resource.deleteOne({
    _id: id,
  });
};
