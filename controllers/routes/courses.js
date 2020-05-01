//
// Courses API
//
const express = require('express');
const router = express.Router();

const renderView = require('../util/renderView');
const { User, Course } = require('../models');

// Current Date Calculator
const calcDate = require('../util/calcDate')

// Register User for course
router.get('/:course_id/register', async function (req, res) {
	const course = await Course.findOne({ _id: req.params.course_id }).select('name');
	return renderView(req, res, 'agreement', {
		hideAgreement: false,
		course
	});
});

router.post('/:course_id/register', async function (req, res) {
	const { agreement } = req.body;
	const course = await Course.findOne({_id: req.params.course_id});
  const courseObject = course.toObject();
  const curDate = calcDate(Date.now());
	let isArchive = false;
  if(courseObject.offerYear < curDate[0] || (course.offerYear===curDate[0] && courseObject.offerSem===1)){
	  isArchive = true;
  }
	if (agreement !== "yes" && isArchive!==true)
		return res.status(401).send('Not agreed');

	const course_id = req.params.course_id;
	// User.
	const user_id = req.session.passport.user;

	await User.updateOne(
		{ _id: user_id },
		{ $addToSet: { courses: course_id } },
		function (err) {
			if (err)
				console.log (err)
		}
	)

	return res.redirect('/dashboard');
});

module.exports = router;
