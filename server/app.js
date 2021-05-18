const express = require("express");
const path = require("path");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const config = require("./config");
// fallback to index.html for vue

// Custom
const googleAuth = require("./features/auth/googleAuth");

// Middleware
const isAuth = require("./middleware/isAuth");

// Routes
const authRouter = require("./routes/auth");
const coursesRouter = require("./routes/courses");
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");
const publicRouter = require("./routes/public");

const app = express();

mongoose.set("useCreateIndex", true);
mongoose.connect(config.mongo.uri, { useNewUrlParser: true });

if (process.env.NODE_ENV !== "test") app.use(logger("dev"));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Initialize Google Auth
googleAuth(passport);
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/public", publicRouter);
app.use("/auth", authRouter);
app.use("/courses", isAuth, coursesRouter); // handle course registration
app.use("/admin", isAuth, adminRouter);
app.use("/upload", express.static(path.join(__dirname, "features", "upload")));
// API
app.use("/api", isAuth, apiRouter);

if (process.env.NODE_ENV !== "production") {
  // error handler
  // https://github.com/samarsault/noodle/issues/67
  // eslint-disable-next-line
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
      error: err.message,
    });
  });
}
// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404).send("404");
});

module.exports = app;
