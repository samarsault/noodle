const { model, Schema } = require("mongoose");
const { r_string } = require("../util/schemaTypes");

const CoursePageSchema = new Schema({
  name: r_string,
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  doc: {
    type: String,
    default: "",
  },
});

// Enable searching using $text
CoursePageSchema.index({ name: "text" });

module.exports = model("CoursePage", CoursePageSchema, "coursepages");
