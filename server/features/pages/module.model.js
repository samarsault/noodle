//
// A Module page
// Comprises multiple pages
//
const { Schema } = require("mongoose");
const Page = require("./page.model");
const Options = require("../shared/typeDiscriminator");

const ModuleSchema = new Schema(
  {
    children: Number,
  },
  Options
);

module.exports = Page.discriminator("Module", ModuleSchema);
