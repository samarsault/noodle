//
// Courses API
//
const express = require('express');
const router = express.Router();

const { User, Course } = require('../models');

// Register User for course
router.get('/:course_id/register', async function (req, res) {
	const course = await Course.findOne({ _id: req.params.course_id }).select('name');
	return res.render('agreement', {
		course
	});
});

router.post('/:course_id/register', async function (req, res) {
	const { agreement } = req.body;
	if (agreement !== "yes")
		return res.status(500).send('Not agreed');

	const course_id = req.params.course_id;
	// User.
	const user_id = req.session.passport.user;

	console.log(`Registering ${user_id}`)
	await User.updateOne(
		{ _id: user_id },
		{ $addToSet: { courses: course_id } },
		function (err) {
			console.log (err)
		}
	)

	res.redirect('/dashboard');
});

module.exports = router;
