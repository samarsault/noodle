const { Schema } = require("mongoose");
const Page = require("../CoursePage");
const Options = require("./Options");

const ArticleSchema = new Schema(
  {
    doc: {
      type: String,
      default: "",
    },
  },
  Options
);

module.exports = Page.discriminator("Article", ArticleSchema);
