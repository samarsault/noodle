//
// Quizing Platform
// (Promise based)
//
const Quiz = require("../models/Page/Quiz");
const QuizAttempt = require("../models/Page/QuizAttempt");

exports.evaluate = async function (attempt) {
  try {
    const { questions } = await Quiz.findOne({ _id: attempt.quiz_id }).select(
      "questions"
    );
    const correctAnswers = questions.map((q) => q.answer);
    const attemptAnswers = attempt.answers;
    let score = 0;
    for (let i = 0; i < attemptAnswers.length; i++) {
      if (attemptAnswers[i] && attemptAnswers[i] === correctAnswers[i]) score++;
    }
    return QuizAttempt.create({
      ...attempt,
      ...{ score },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

// @returns Promise
exports.addQuestion = function (quizId, questionId) {
  return Quiz.update(
    {
      _id: quizId,
    },
    {
      $push: {
        questions: questionId,
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

exports.getById = async function (quiz_id) {
  const quiz = await Quiz.findOne({
    _id: quiz_id,
  });
  return quiz;
};
