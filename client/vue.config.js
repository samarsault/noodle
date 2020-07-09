module.exports = {
  // publicPath: "/dashboard",
  // API Server
  devServer: {
    proxy: "http://localhost:3000",
  },
  css: {
    loaderOptions: {
      sass: {
        // changed to prependData, starting sass-loader 8
        data: `@import "@/styles/include/_vars.scss";`,
      },
    },
  },
};
