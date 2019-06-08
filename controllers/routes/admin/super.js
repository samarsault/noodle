//
// Super Admin Actions
//
const express = require('express');
const upload = require('./upload');
const response = require('../../util/response');
const { User, Course } = require('../../models');

const router = express.Router();

router.post('/add', upload.fields([{
	name: 'coverImage',
	maxCount: 1
}, {
	name: 'handout',
	maxCount: 1
}]), function (req, res) {
	if (!req.files || !req.files['coverImage'][0] || !req.files['handout'])
		return res.json(response.error('Insufficent fields'));

	const {
		name,
		description,
		offerYear,
		offerSem
	} = req.body;

	let course = new Course({
		name,
		description,
		handout: `/uploads/${req.files['handout'][0].filename}`,
		coverImage: `/uploads/${req.files['coverImage'][0].filename}`,
		offerYear,
		offerSem
	});

	course.save((err) => {
		if (!err) {
			res.send(response.success())
		} else {
			res.send(response.error('Database error'));
		}
	})
});

// TODO: Efficiency
router.get('/users', async function (req, res) {
	const users = await User.find({});
	return res.json(users);
})

router.get('/users/search', async function(req, res) {
	const users = await User.find(req.query);
	return res.json(users);
})

//
// Upgrade Access Level of User
//
router.post('/users/updateAccess', async function (req, res) {
	const { role, instructor_for } = req.body;

	if (!role) {
		if (role === 'instructor' && !instructor_for)
			return res.json(response.error('Instructor role requires a course.'))

		await User.updateOne({
			role,
			instructor_for
		});

		return res.json(response.success('Updated Role'))
	}

	return res.json(
		response.error('role not specified')
	);
})

module.exports = router;
