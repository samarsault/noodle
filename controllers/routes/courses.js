//
// Courses API
// TODO: Ensure Auth
//
const express = require('express');
const router = express.Router();

const { User } = require('../models');

// Get Course Students
router.get('/:course_id/students', function (req, res, next) {
	User.find({ courses: req.params.course_id, role: 'student' }, { courses: 0 }, function (err, users) {
		if (err)
			res.status(500).send(err);
		res.json(users);
	})	
});

// Register User for course
router.get('/:course_id/register', async function (req, res) {
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


function ensureAuthenticated (req,res,next) {
	if (req.isAuthenticated()) 
		return next();
	res.redirect('/');
}

module.exports = router;
