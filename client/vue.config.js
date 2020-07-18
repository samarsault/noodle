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
      "noodle-flavour",
      path.resolve("..", noodleConfig.flavour)
    );
  },
  css: {
    loaderOptions: {
      sass: {
        // Inserts SCSS variables in all styles
        // changed to prependData, starting sass-loader 8
        data: `@import "~noodle-flavour/styles/include/_vars.scss";`,
      },
    },
  },
};
