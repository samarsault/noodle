const { model, Schema } = require('mongoose');
const { r_string, r_num } = require('../util/schemaTypes');

const CourseSchema = new Schema({
  name: r_string,
  summary: {
    type: String,
    required: true,
    minlength: 200,
    maxlength: 250
  },
  description: {
    type: String,
    required: true,
    minlength: 800,
    maxlength: 1000
  },
  handout: r_string,
  coverImage: r_string,
  offerYear: r_num,
  offerSem: r_num,
  topics: [
    { type: String }
  ],
  instructors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    }
  ]
});

// Enable searching using $text
CourseSchema.index({ name: 'text' })

module.exports = model('Course', CourseSchema, 'courses');
