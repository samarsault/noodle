//
// Quizing Platform
// (Promise based)
//
const Quiz = require("../models/Page/Quiz");
const QuizAttempt = require("../models/Page/QuizAttempt");
const Question = require("../models/Question");

function resolveQuestions(questionIds) {
  return Promise.all(
    questionIds.map((id) =>
      Question.findOne({
        _id: id,
      })
    )
  );
}

exports.evaluate = async function (attempt) {
  try {
    const { questions: questionIds } = await Quiz.findOne({
      _id: attempt.quiz_id,
    }).select("questions");
    const questions = await resolveQuestions(questionIds);
    const correctAnswers = questions.map((q) => q.answer);
    const attemptAnswers = attempt.answers;
    let score = 0;
    for (let i = 0; i < attemptAnswers.length; i++) {
      if (attemptAnswers[i] && attemptAnswers[i] === correctAnswers[i]) {
        score += questions[i].points;
      }
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
  return Quiz.updateOne(
    {
      _id: quizId,
    },
    {
      $addToSet: {
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
        questions: questionId,
      },
    }
  );
};

exports.getById = async function (quiz_id) {
  const quiz = await Quiz.findOne({
    _id: quiz_id,
  });
  const questions = await resolveQuestions(quiz.questions);
  return {
    ...quiz.toObject(),
    questions,
  };
};
