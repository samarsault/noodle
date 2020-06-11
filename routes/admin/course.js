//
// Course Admin Actions
// Course_id: req.course_id
//
const express = require('express');
const router = express.Router();
const courseService = require('../../services/course');
const questionService = require('../../services/questions');
const response = require('../../util/response');
const quizzer = require('../../services/quiz');
const upload = require('../../middleware/upload');
const { Uploads, CoursePage } = require('../../models');

//
// Fetch students registered to course
//
router.get('/students', async function (req, res) {
	const users = await courseService.getRegistered(req.course_id);
	if (users)
		return res.json(users);
	return res.status(500);
});

router.get('/students/download', async function (req, res) {
	res.setHeader('Content-disposition', 'attachment; filename=export.csv');
	res.setHeader('Content-type', 'text/csv');

	const registeredCSV = await courseService.getRegisteredCSV(req.course_id);

	return res.send(registeredCSV);
});

// Add a resource to course
router.post('/upload', upload.single('res'), async function (req, res) {
	if (!req.file && !link)
			return res.status(400).send('Missing');

	const url = req.file ? `/uploads/${req.file.filename}` : link;
	// History of uploads
	const upload = await Uploads.create({
		name: req.file.originalname,
		course: req.course_id,
		user: req.session.passport.user,
		url
	})
	res.send({ name: upload.name, url });
});

router.post('/questions', async function(req, res) {
	const question = await questionService.create(req.body.type, req.body);
	return res.json(question);
});
router.delete('/questions/:id', async function(req, res) {
	const q = await questionService.delete(req.params.id);
	return res.json(q);
});

router.put('/questions/:id', async function(req, res) {
	console.log(req.body);
	let q = {};
	try {
		q = await questionService.update(req.params.id, req.body);
	} catch (e) {
		throw e;
	}
	return res.json(q);
});

router.post('/page/create', async function (req, res) {
	const coursePage = await CoursePage.create({
		name: req.body.name,
		course: req.course_id
	});
	return res.send(coursePage);
})

router.post('/page/save', async function (req, res) {
	await CoursePage.updateOne({
		_id: req.body._id
	}, {
		doc: req.body.doc
	});
	return res.send({
		success: true
	});
})
// Initialize Quiz Creation
router.post('/quiz/init', async function(req, res, next) {
	const { name } = req.body;
	try {
		const quiz = await quizzer.createQuiz(name, req.course_id, [])
		return res.json({
			success: true,
			quiz
		})
	} catch (e) {
		return res.json({
			success: false
		})
	}
})

router.post('/quiz/destroy', async function(req, res, next) {
	const { _id, name } = req.body;
	try {
		await quizzer.deleteQuiz(_id, name);
		return res.json({
			success: true
		})
	} catch (e) {
		return res.json({
			success: false
		})
	}
})

//
router.post('/quiz/update', async function(req, res, next) {
	const { quiz_id, question_id, type, data } = req.body;
	try {
		if (type == 'add') {
			await quizzer.addQuestion(quiz_id, data)
		}
		else if (type == 'update') {
			await quizzer.updateQuestion(question_id, data)
		}
		else if (type == 'delete') {
			await quizzer.deleteQuestion(quiz_id, question_id)
		}
		else {
			return res.json({
				success: false,
				message: 'Invalid/Blank operation type'
			})
		}
		return res.json(
			{ success: true}
		)
	} catch (e) {
		return res.json({
			success: false
		})
	}

})

module.exports = router;
