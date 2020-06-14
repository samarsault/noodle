/*
 * Tests for quizzing framework
 */

const basicData = require("./data/basic");
const quizService = require("../services/quiz");
const Quiz = require("../models/Page/Quiz");
const QuizAttempt = require("../models/Page/QuizAttempt");
const Numeric = require("../models/Question/Numeric");

let data;

beforeAll(basicData.beforeAll);
beforeEach(async () => {
  data = await basicData.beforeEach();
  data.numQuestion = await Numeric.create({
    question: "What's 2 + 3?",
    course: data.course._id,
    answer: 5,
    subparts: [],
  });
  data.quiz = await Quiz.create({
    name: "test quiz",
    course: data.course._id,
    questions: [data.numQuestion._id],
  });
  data.attempt = (
    await QuizAttempt.create({
      user_id: data.student._id,
      quiz_id: data.quiz._id,
    })
  ).toObject();
});
describe("Quiz Access", function () {
  it("Can get quiz questions with type", async (done) => {
    const quiz = await quizService.getById(data.quiz._id);
    expect(quiz.questions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: data.numQuestion._id,
          type: "Numeric",
        }),
      ])
    );
    done();
  });
});

describe("Quiz Attempt", function () {
  it("Creates attempt properly", async (done) => {
    const attempt = await quizService.attempt({
      user_id: data.student._id,
      quiz_id: data.quiz._id,
    });
    expect(attempt.start).toBeDefined();
    expect(attempt.quiz_id).toBe(data.quiz._id);
    done();
  });

  it("Evaluates a quiz properly", async (done) => {
    const evaluation = await quizService.evaluate({
      ...data.attempt,
      answers: [5],
    });
    expect(evaluation.score).toBe(1);
    const evaluation2 = await quizService.evaluate({
      ...data.attempt,
      answers: [3],
    });
    expect(evaluation2.score).toBe(0);
    done();
  });
});

afterAll(basicData.afterAll);
