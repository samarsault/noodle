//
// A Module page
// Comprises multiple pages
//
const { Schema } = require("mongoose");
const Page = require("../CoursePage");
const Options = require("./Options");

const ModuleSchema = new Schema(
  {
    children: Number,
  },
  Options
);

module.exports = Page.discriminator("Module", ModuleSchema);
