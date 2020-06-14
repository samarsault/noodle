//
// Quizing Platform
// (Promise based)
//
const Quiz = require("../models/Page/Quiz");
const QuizAttempt = require("../models/Page/QuizAttempt");
const Question = require("../models/Question");
const userService = require("./user");

function resolveQuestions(questionIds) {
  return Promise.all(
    questionIds.map((id) =>
      Question.findOne({
        _id: id,
      })
    )
  );
}

exports.getAttempts = async function (quiz_id) {
  const attempts = await QuizAttempt.find({
    quiz_id,
  });
  return Promise.all(
    attempts.map(async (attempt) => {
      const user = await userService.get(attempt.user_id);
      return {
        ...attempt.toObject(),
        user,
      };
    })
  );
};

//
// Start a quiz attempt
//
exports.attempt = async function (attempt) {
  const { user_id, quiz_id } = attempt;
  return QuizAttempt.create({
    quiz_id,
    user_id,
    start: Date.now(),
  });
};

//
// attempt: {
//    quiz_id,
//    answers: list of answers,
//    _id: attempt id
// }
exports.evaluate = async function (attempt) {
  try {
    // Calculate Score
    const { questions: questionIds } = await Quiz.findOne({
      _id: attempt.quiz_id,
    }).select("questions");
    const questions = await resolveQuestions(questionIds);
    const correctAnswers = questions.map((q) => q.answer);
    const attemptAnswers = attempt.answers;
    let score = 0;
    let unansweredQs = 0;
    let correctQs = 0;
    for (let i = 0; i < attemptAnswers.length; i++) {
      if (attemptAnswers[i] === "") {
        unansweredQs++;
      } else if (attemptAnswers[i] === correctAnswers[i]) {
        score += questions[i].points;
        correctQs++;
      }
    }
    // Ending
    const end = Date.now();
    await QuizAttempt.updateOne(
      {
        _id: attempt._id,
      },
      {
        answers: attemptAnswers,
        unansweredQs,
        correctQs,
        score,
        end,
      }
    );
    return QuizAttempt.findOne({ _id: attempt._id });
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
