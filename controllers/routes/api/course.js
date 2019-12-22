//
// API for a
// Registered Course User
//
const express = require('express');
const router = express.Router();
const { Course, Resource } = require('../../models');
const { Quiz } = require('../../models/Quiz');

// Get Course Meta
router.get('/view', async function (req, res, next) {
	const course = await Course.findOne({
		_id: req.course_id
	});

	return res.json(course);
});

router.get('/view/:prop', async function (req, res, next) {
	if (req.course_id && req.params.prop) {
		const toSelect = req.params.prop.replace(',', ' ')
		const course = await Course.findOne({
			_id: req.course_id
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
router.get('/resources', async function (req, res, next) {

	const course_id = req.course_id;
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

router.get('/quiz', async function(req, res) {
	const quizzes = await Quiz.find({
		course: req.course_id
	}).select('name');
	return res.json(quizzes)
})

router.get('/quiz/:quiz_id', async function (req, res) {
	const quiz = await Quiz.findOne({
		_id: req.params.quiz_id
	})
	return res.json(quiz);
})

module.exports = router;
