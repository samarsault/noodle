//
// Quizing Platform
//
const Quiz = require("./quiz.model");
const QuizAttempt = require("./attempt.model");
const { Question } = require("../models");
// TODO: Use alternative
const userService = require("../user/user.service");

function resolveQuestions(questionIds) {
  return Promise.all(
    questionIds.map((id) =>
      Question.findOne({
        _id: id,
      })
    )
  );
}

function getStringTime(ms) {
  const seconds = Math.round(ms / 1000);
  if (seconds > 60) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  return `${seconds} s`;
}

function resolveAttempts(attempts) {
  return Promise.all(
    attempts.map(async (attempt) => {
      const user = await userService.get(attempt.user_id);
      const time = getStringTime(attempt.end - attempt.start);
      return {
        ...attempt.toObject(),
        user,
        time,
      };
    })
  );
}

exports.getUserAttempt = async function (quiz_id, user_id) {
  const attempts = await QuizAttempt.find({
    quiz_id,
    user_id,
  });
  return resolveAttempts(attempts);
};

exports.getAttempts = async function (quiz_id) {
  const attempts = await QuizAttempt.find({
    quiz_id,
  });
  return resolveAttempts(attempts);
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
