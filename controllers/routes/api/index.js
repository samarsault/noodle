//
// Courses API
// TODO: Ensure Auth
//
const express = require('express');
const router = express.Router();

const courseApiRouter = require('./course');
const isRegisteredForCourse = require('../../middleware/isRegistered');
const { User, Course } = require('../../models');

router.use('/courses/:course_id', (req, res, next) => {
	req.course_id = req.params.course_id;
	return next();
}, isRegisteredForCourse, courseApiRouter);

//Current Date Calculation
const calcDate = require('../../util/calcDate')


// Get User Details
router.get('/dashboard', async function(req, res) {
	const user_id = req.session.passport.user;
  const user = await User.findOne({ _id: user_id })

	const coursePromises = user.courses.map( async (course_id) => {
    const course = await Course.findOne({ _id: course_id }).select("name coverImage instructors offerYear offerSem")

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


	const courses = await Promise.all(coursePromises);
	return res.json(courses);
})

router.get('/courseId', async function (req, res) {
	try {
		const { _id } = await Course.findOne({ name: req.query.name }).select('');
		return res.send(_id);
	} catch (e) {
		return res.send('');
	}
})

router.get('/user', async function(req, res) {
	const user = await User.findOne({ _id: req.session.passport.user }).select('name email role');
	return res.json(user);
});

module.exports = router;
