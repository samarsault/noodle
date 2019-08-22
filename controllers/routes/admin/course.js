//
// Course Admin Actions
// Course_id: req.course_id
//
const express = require('express');
const router = express.Router();
const { User, Course, Resource } = require('../../models');
const response = require('../../util/response');
const upload = require('./upload');

//
// Fetch students registered to course
//
router.get('/students', async function (req, res) {
	const users = await User.find({
		courses: req.course_id,
		role: 'student'
	});
	if (users)
		return res.json(users);
	return res.status(500);
});

router.get('/students/download', async function (req, res) {
	const users = await User.find({
		courses: req.course_id,
		// role: 'student'
	});

	res.setHeader('Content-disposition', 'attachment; filename=export.csv');
	res.setHeader('Content-type', 'text/csv');

	// properties to send
	const props = ['name', 'email', 'phone', 'bits_id']

	// Write CSV Header
	res.write(props.join(','));

	for (const user of users) {
		const dataArr = [];

		for (const prop of props) {
			if (!user[prop])
				dataArr.push(' ')
			else
				dataArr.push(user[prop]);
		}

		res.write(dataArr.join(','));
	}

	res.end();
})

// Add a resource to course
router.post('/resource/add', upload.single('res'), function (req, res) {
	const { name, topic, description, link } = req.body;

	if (!req.file && !link)
			return res.status(400).send('Missing');

	const url = req.file ? `/uploads/${req.file.filename}` : link;
		
	let resource = new Resource({
		name,
		topic,
		description,
		course: req.course_id,
		url
	});

	resource.save((err) => {
		if (!err) {
			res.redirect(`/dashboard/admin/${req.course_id}`)
			// res.send(response.success('Added'))
		} else {
			res.send(response.error(err.message))
		}
	});
});

// Delete a resource from course
router.post('/resource/remove', function (req, res, next) {
	Resource.deleteOne({
		_id: req.body.id
	}, function (err) {
		if (!err) {
			res.send({
				success: true
			})
		} else {
			res.send({
				success: false,
				error: err,
				body: req.body
			})
		}
	})
});

module.exports = router;
