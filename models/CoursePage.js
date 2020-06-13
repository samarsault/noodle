const { model, Schema } = require("mongoose");
const { r_string } = require("../util/schemaTypes");
const Options = require("./Page/Options");

const CoursePageSchema = new Schema(
  {
    name: r_string,
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
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
