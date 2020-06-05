//
// Courses API
// TODO: Ensure Auth
//
const express = require('express');

const router = express.Router();

const courseApiRouter = require('./course');
const isRegisteredForCourse = require('../../middleware/isRegistered');
const userService = require('../../services/user');
const courseService = require('../../services/course');

router.use(
	'/courses/:course_id',
	(req, res, next) => {
		req.course_id = req.params.course_id;
		return next();
	},
	isRegisteredForCourse,
	courseApiRouter
);

router.get('/dashboard', async function (req, res) {
	const dashboard = await userService.getDashboard(req.session.passport.user);
	return res.json(dashboard);
});

router.get('/courseId', async function (req, res) {
	try {
		const { _id } = await courseService.getIdByName(req.query.name);
		return res.send(_id);
	} catch (e) {
		return res.send('');
	}
});

router.get('/user', async function (req, res) {
	const user = await userService.get(req.session.passport.user);
	return res.json(user);
});

module.exports = router;
