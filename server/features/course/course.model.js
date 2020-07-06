const { model, Schema } = require("mongoose");
const { r_string, r_num } = require("../shared/schemaTypes");

const CourseSchema = new Schema({
  name: r_string,
  subtitle: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 800,
    maxlength: 1000,
  },
  handout: r_string,
  coverImage: r_string,
  offerYear: r_num,
  offerSem: r_num,
  instructors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

// Enable searching using $text
CourseSchema.index({ name: "text" });

module.exports = model("Course", CourseSchema, "courses");
