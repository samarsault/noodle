//
// Quizing Platform
// (Promise based)
//
const { QnA, Quiz, QuizAttempt } = require('../models/Quiz');

// @returns Promise
exports.createQuiz = function (name, course, questions) {
	return Quiz.create({
		name,
		course,
		questions,
	});
};

exports.deleteQuiz = function (_id, name) {
	// name just for safety
	return Quiz.deleteOne({
		_id,
		name,
	});
};

exports.evaluate = async function (attempt) {
	try {
		const { questions } = await Quiz.findOne({ _id: attempt.quiz_id }).select(
			'questions'
		);
		const correctAnswers = questions.map((q) => q.answer);
		const attemptAnswers = attempt.answers;
		let score = 0;
		for (let i = 0; i < attemptAnswers.length; i++) {
			if (attemptAnswers[i] && attemptAnswers[i] === correctAnswers[i]) score++;
		}
		await QuizAttempt.create({
			...attempt,
			...{ score },
		});
	} catch (error) {
		console.log(error);
	}
};

// @returns Promise
exports.addQuestion = function (quizId, QnA) {
	return Quiz.update(
		{
			_id: quizId,
		},
		{
			$push: {
				questions: QnA,
			},
		}
	);
};

exports.updateQuestion = function (questionId, newQnA) {
	return Quiz.updateOne(
		{
			'questions._id': questionId,
		},
		{
			$set: {
				'questions.$.question': newQnA.question,
				'questions.$.options': newQnA.options,
				'questions.$.answer': newQnA.answer,
			},
		}
	);
};

exports.deleteQuestion = function (quizId, questionId) {
	return Quiz.updateOne(
		{
			_id: quizId,
		},
		{
			$pull: {
				questions: {
					_id: questionId,
				},
			},
		}
	);
};

exports.get = async function (course_id) {
	const quizzes = await Quiz.find({
		course: course_id,
	}).select('name');

	return quizzes;
};

exports.getById = async function (quiz_id) {
	const quiz = await Quiz.findOne({
		_id: quiz_id,
	});
	return quiz;
};
