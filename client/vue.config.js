const path = require("path");
const noodleConfig = require("../noodle.config");

module.exports = {
  // API Server
  devServer: {
    proxy: "http://localhost:3000",
  },
  chainWebpack: (config) => {
    // Move one up as noodle.config.js resides one folder up
    config.resolve.alias.set(
      "noodle-adapter",
      path.resolve("..", noodleConfig.adapter)
    );
  },
  css: {
    loaderOptions: {
      sass: {
        // Inserts SCSS variables in all styles
        // changed to prependData, starting sass-loader 8
        data: `@import "@/styles/include/_vars.scss";`,
      },
    },
  },
};
