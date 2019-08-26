const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');
const session = require('cookie-session');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// fallback to index.html for vue

// Custom
const googleAuth = require('./controllers/googleAuth');

// Middleware
const isAuth = require('./controllers/middleware/isAuth');

// Routes
const viewsRouter = require('./controllers/routes/views');
const authRouter = require('./controllers/routes/auth');
const coursesRouter = require('./controllers/routes/courses');
const adminRouter = require('./controllers/routes/admin');
const apiRouter = require('./controllers/routes/api');

// Configure environment variables
require('dotenv').config()

// Connect to database

const dbURL = `mongodb://localhost:27017/${process.NODE_ENV === 'production' ? 'cte' : 'cte-dev'}`
mongoose.set("useCreateIndex", true);
mongoose.connect(dbURL, { useNewUrlParser: true });

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: false, // true = .sass and false = .scss
	sourceMap: true
}));
app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: true
}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(session({
	name: 'session',
	keys: ['!P+@3D7x&rW#G%m' ]
}))

// Initialize Google Auth
googleAuth(passport);

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', viewsRouter);
app.use('/auth', authRouter);
app.use('/courses', isAuth, coursesRouter); // handle course registration
app.use('/admin', isAuth, adminRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// API
app.use('/api', isAuth, apiRouter);
// Admin App
app.use('/dashboard', express.static(path.join(__dirname, 'dashboard', 'dist' )));
app.get('/dashboard/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'dashboard', 'dist', 'index.html'));
})

if (process.env.NODE_ENV !== 'production') {
	// error handler
	app.use(function(err, req, res, next) {
  	// set locals, only providing error in development
  	res.locals.message = err.message;
  	res.locals.error = req.app.get('env') === 'development' ? err : {};

  	// render the error page
  	res.status(err.status || 500);
  	res.json( {
  		error: err.message
  	});
  });
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render('404');
});

module.exports = app;
