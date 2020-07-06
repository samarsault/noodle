const { Schema } = require("mongoose");
const Page = require("./page.model");
const Options = require("../shared/typeDiscriminator");

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
