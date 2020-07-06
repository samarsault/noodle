const path = require("path");

module.exports = {
  publicPath: "/dashboard",
  // API Server
  devServer: {
    proxy: "http://localhost:3000",
  },
  chainWebpack: (config) => {
    //this path is specific to my project
    config.resolve.alias.set("server", path.resolve("../server"));
  },
  css: {
    loaderOptions: {
      sass: {
        // changed to prependData, starting sass-loader 8
        data: `@import "~server/styles/include/_vars.scss";`,
      },
    },
  },
};
