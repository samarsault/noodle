const { model, Schema } = require("mongoose");

module.exports = model(
  "QuizAttempt",
  new Schema({
    quiz_id: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: [Schema.Types.Mixed],
    score: Number,
    unansweredQs: Number,
    correctQs: Number,
    start: {
      type: Date,
      default: Date.now(),
    },
    end: {
      type: Date,
    },
  }),
  "quizAttempts"
);
