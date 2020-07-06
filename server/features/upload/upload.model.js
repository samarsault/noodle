//
// DataStore for Instructor
// File Uploads
//
const { model, Schema } = require("mongoose");
const { r_string } = require("../shared/schemaTypes");

module.exports = model(
  "Uploads",
  new Schema({
    // derived filename
    name: r_string,
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    // Which instructor uploaded the material
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    url: r_string,
  }),
  "uploads"
);
