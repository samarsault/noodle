//
// API for a
// Registered Course User
//
const express = require('express');
const router = express.Router();
const { Course, Resource } = require('../../models');

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
