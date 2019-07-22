//
// Courses API
// TODO: Ensure Auth
//
const express = require('express');
const router = express.Router();

const { User, Course, Resource } = require('../models');

// Get User Details
router.get('/dashboard', async function(req, res) {
	const user_id = req.session.passport.user;
  console.log(`Dashboard for ${user_id}`)

  const user = await User.findOne({ _id: user_id })

	const coursePromises = user.courses.map( async (course_id) => {
    const course = await Course.findOne({ _id: course_id }).select("name coverImage instructors")

    // Intructor Id to Name
    const instructors = await Promise.all(
      course.instructors.map(async user_id => {
        const { name } = await User.findOne({_id:user_id}).select('name')
        return name;
      })
    );

		const instructor_index = course.instructors.findIndex(x => x.equals(user_id));

		// Is an instructor for the course
		if (instructor_index !== -1)
      return Object.assign({}, course.toObject(), { instructors } ,{ isAdmin: true })

		return Object.assign({}, course.toObject(), { instructors });
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
