//
// Server rendered pages
//
const express = require('express');
const router = express.Router();

const { User, Course } = require('../models');

// Home Page
router.get('/', function(req, res, next) {
	res.render('index', { title: 'CTE', signedIn: req.isAuthenticated() });
});

router.get('/team', function(req, res) {
	return res.render('team');
})

// Courses Page
router.get('/courses', function(req, res) {
	Course.find({ }, function (err, courses) {
		res.render('catalog', {
			courses,
			signedIn: req.isAuthenticated()
		})
	})
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

  res.render(
    'course',  
		{
			course: courseObject,
			signedIn: req.isAuthenticated()
		},
  );

});

module.exports = router;
