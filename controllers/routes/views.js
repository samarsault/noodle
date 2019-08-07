//
// Server rendered pages
//
const express = require('express');
const router = express.Router();
const faq = require('../../faq');

const { User, Course } = require('../models');

function renderView(req, res, name, params) {
	const data = Object.assign({}, { signedIn: req.isAuthenticated() }, params || {});
	return res.render(name, data);
}

// Home Page
router.get('/', function(req, res, next) {
	return renderView(req, res, 'index', { title: 'CTE' })
});

// Team
router.get('/team', function(req, res) {
	return renderView(req, res, 'team');
});

// FAQ
router.get('/faq', function(req, res) {
	const topics = Object.keys(faq);
	return renderView(req, res, 'faq', { faq, topics });
})

// Courses Page
router.get('/courses', async function(req, res) {
	const courses = await Course.find({ });
	const CTE = [], CCE = [];

	courses.forEach(course => {
		if (course.manager && course.manager === 'CCE') {
			CCE.push(course);
		}
		else {
			CTE.push(course);
		}
	});

	renderView(req, res, 'catalog', { 
		CTE,
		CCE
	})
})

router.get('/terms', function (req, res) {
	return renderView(req, res, 'agreement', { hideAgreement: true });
})

// Course Page
router.get('/courses/:course_id/view', async function (req, res, next) {
  const course = await Course.findOne({ _id: req.params.course_id });

  const instructorDelegates = course.instructors.map(async user_id => {
    const user = await User.findOne({ _id: user_id }).select('name');
    return user.name;
  });

  const instructors = await Promise.all(instructorDelegates);
  const courseObject = course.toObject();
  courseObject.instructors = instructors;

	renderView(
		req,
		res,
		'course',
		{ course: courseObject }
	)

});

module.exports = router;
