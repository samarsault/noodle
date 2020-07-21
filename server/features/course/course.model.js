const { model, Schema } = require("mongoose");
const { r_string } = require("../shared/schemaTypes");

const CourseSchema = new Schema({
  name: r_string,
  subtitle: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 250,
  },
  coverImage: r_string,
  isArchived: {
    type: Boolean,
    default: false,
  },
  instructors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  created: {
    type: Date,
    default: Date.now(),
  },
});

// Enable searching using $text
CourseSchema.index({ name: "text" });

module.exports = model("Course", CourseSchema, "courses");
