//
// API for a
// Registered Course User
//
const express = require('express');

const router = express.Router();
const courseService = require('../../services/course');
const quizzer = require('../../services/quiz');
const { CoursePage } = require('../../models');

// Get Course Meta
router.get('/view', async function (req, res) {
	const course = await courseService.get(req.course_id);
	return res.json(course);
});

router.get('/view/:prop', async function (req, res) {
	if (req.course_id && req.params.prop) {
		const toSelect = req.params.prop.replace(',', ' ');
		const course = await courseService.getProp(req.course_id, toSelect);

		return res.json(course);
	}
	return res.status(500).send('Bad request');
});

//
// Get Resources for a course
// Response Format:
// {
//	<topic>: [ <resource1>, <resource2>, ... ]
// }
//
router.get('/resources', async function (req, res) {
	const resources = await courseService.getResources(req.course_id);
	return res.json(resources);
});

router.get('/pages', async function (req, res) {
	const pages = await CoursePage.find({
		course: req.course_id,
	}).select('name');
	return res.send(pages);
});

router.get('/pages/:id', async function (req, res) {
	const page = await CoursePage.findOne({
		_id: req.params.id,
	});
	return res.json(page);
});

router.get('/quiz', async function (req, res) {
	const quizzes = await quizzer.get(req.course_id);
	return res.json(quizzes);
});

// note: sends answer as well
router.get('/quiz/:quiz_id', async function (req, res) {
	const quiz = quizzer.getById(req.params.quiz_id);
	return res.json(quiz);
});

router.post('/quiz/submit', async function (req, res) {
	const user_id = req.user._id;
	const attempt = {
		quiz_id: req.body.quiz_id,
		user_id: user_id.toString(),
		answers: req.body.answers,
	};
	await quizzer.evaluate(attempt);

	return res.json(quiz);
});

module.exports = router;
