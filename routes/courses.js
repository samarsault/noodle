//
// Courses API
//
const express = require('express');

const router = express.Router();

const courseService = require('../services/course');
const renderView = require('../util/renderView');

// Current Date Calculator
const calcCurDate = require('../util/calcCurDate');

// Register User for course
router.get('/:course_id/register', async function (req, res) {
	const course = await courseService.getProp(req.params.course_id, 'name');
	return renderView(req, res, 'agreement', {
		hideAgreement: false,
		course,
	});
});

router.post('/:course_id/register', async function (req, res) {
	const { agreement } = req.body;
	const course = await courseService.get(req.params.course_id);
	// TODO: check if toobject required
	const courseObject = course.toObject();
	const curDate = calcCurDate();
	let isArchive = false;

	if (
		courseObject.offerYear < curDate[0] ||
		(course.offerYear === curDate[0] && courseObject.offerSem === 1)
	) {
		isArchive = true;
	}
	if (agreement !== 'yes' && !isArchive)
		return res.status(401).send('Not agreed');

	const { course_id } = req.params;
	// User.
	const user_id = req.session.passport.user;

	await courseService.register(user_id, course_id);

	return res.redirect('/dashboard');
});

module.exports = router;
