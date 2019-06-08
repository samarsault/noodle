//
// Server rendered pages
//
const express = require('express');
const router = express.Router();

const { User, Course } = require('../models');

// Home Page
router.get('/', function(req, res, next) {
	res.render('index', { title: 'CTE' });
});

// Courses Page
router.get('/courses', function(req, res) {
	Course.find({ }, function (err, courses) {
		res.render('catalog', {
			courses
		})
	})
})

// Course Page
router.get('/courses/:course_id/view', function (req, res, next) {
	// TODO: check user enrolled
	Course.findOne({ _id: req.params.course_id }, (err, course) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.render('course',  { course });
	})
});

module.exports = router;
