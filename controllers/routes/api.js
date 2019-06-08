//
// Courses API
// TODO: Ensure Auth
//
const express = require('express');
const router = express.Router();

const { User, Course, Resource } = require('../models');

// Get User Details
router.get('/dashboard', async function(req, res) {
	console.log(`Dashboard for ${req.session.passport.user}`)
	const user = await User.findOne({ _id: req.session.passport.user })
	// res.json(user);
	const coursePromises = user.courses.map( async (course_id) => {
		const course = await Course.findOne({ _id: course_id }).select("name coverImage instructors")
		if (course._id.equals(user.instructor_for))
			return Object.assign({}, course.toObject(), { isAdmin: true })
		return course;
	});

	Promise.all(coursePromises)
		.then((courses) => {
			res.json({
				user,
				courses
			})
		})
})

// Get Course Meta
router.get('/courses/:course_id/view', function(req, res, next) {
	// TODO: check user enrolled
	Course.findOne({ _id: req.params.course_id }, (err, course) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.json(course);
	})
});

router.get('/courses/:course_id/view/:prop', async function (req, res, next) {
	if (req.params.course_id && req.params.prop) {
		const toSelect = req.params.prop.replace(',', ' ')
		const course = await Course.findOne({
			_id: req.params.course_id
		}).select(toSelect);

		return res.json(course);
	} else {
		return res.status(500).send('Bad request');
	}
});

//
// Get Resources for a course
// Response Format:
// {
//	<topic>: [ <resource1>, <resource2>, ... ]
// }
//
router.get('/courses/:course_id/resources', async function (req, res, next) {
	// TODO: Check user registered for the course
	const course_id = req.params.course_id;
	const resources = await Resource.find({
		course: course_id
	});

	const responseObject = {}

	for (const resource of resources) {
		if (!responseObject[resource.topic]) {
			responseObject[resource.topic] = [];
		}
		responseObject[resource.topic].push(resource);
	}

	return res.json(responseObject);
});

module.exports = router;
