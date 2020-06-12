//
// Configure app wrt environment
//
const mongoose = require("mongoose");
const logger = require("morgan");

const getDBConfig = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return "cte";
    case "test":
      return "cte-test";
    default:
      return "cte-dev";
  }
};

module.exports = (app) => {
  const dbURL = `mongodb://localhost:27017/${getDBConfig()}`;
  mongoose.set("useCreateIndex", true);
  mongoose.connect(dbURL, { useNewUrlParser: true });

  if (process.env.NODE_ENV != "test") app.use(logger("dev"));
};
