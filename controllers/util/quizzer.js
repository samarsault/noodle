//
// Quizing Platform
// (Promise based)
//
const { QnA, Quiz, QuizAttempt } = require('../models/Quiz');

// @returns Promise
function createQuiz(name, course, questions) {
		return Quiz.create({
			name,
			course,
			questions
		})
}
function deleteQuiz(_id, name) {
	// name just for safety
	return Quiz.deleteOne({
		_id,
		name
	});
}

async function evaluate(attempt) {
	try {
		const { questions } = await Quiz.findOne({ _id: attempt.quiz_id }).select('questions')
		const correctAnswers = questions.map(q => q.answer);
		const attemptAnswers = attempt.answers;
		let score = 0
		for (let i = 0;i < attemptAnswers.length;i++) {
			if (
				attemptAnswers[i] && 
				(attemptAnswers[i] == correctAnswers[i])
			)
				score++;
		}
		await QuizAttempt.create({
			...attempt,
			...{ score }
		})
	} catch (error) {
		console.log(error);
	}
}

// @returns Promise
function addQuestion(quizId, QnA) {
	 return Quiz.update(
		{
			_id: quizId
		},
		{
			'$push': {
				questions: QnA
			}
		}
	)
}

function updateQuestion(questionId, newQnA) {
	return Quiz.updateOne(
		{
			'questions._id' : questionId
		},
		{
			'$set': {
				'questions.$.question': newQnA.question,
				'questions.$.options': newQnA.options,
				'questions.$.answer': newQnA.answer
			}
		}
	)
}

function deleteQuestion(quizId, questionId) {
	return Quiz.updateOne(
		{
			_id: quizId
		},
		{
			'$pull': {
				questions: {
					_id: questionId
				}
			}
		}
	)
}
function attemptQuiz (quizId, userId, answers) {

}

module.exports = {
	createQuiz,
	deleteQuiz,
	addQuestion,
	updateQuestion,
	deleteQuestion,
	attemptQuiz,
	evaluate
}
