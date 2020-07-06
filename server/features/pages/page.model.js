const { model, Schema } = require("mongoose");
const { r_string } = require("../shared/schemaTypes");
const Options = require("../shared/typeDiscriminator");

const CoursePageSchema = new Schema(
  {
    name: r_string,
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "CoursePage",
      default: null,
    },
    created: {
      type: Date,
      default: Date.now(),
    },
  },
  Options
);

// Enable searching using $text
CoursePageSchema.index({ name: "text" });

module.exports = model("CoursePage", CoursePageSchema, "coursepages");
