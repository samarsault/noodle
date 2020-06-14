/*
 * Tests for quizzing framework
 */

const basicData = require("./data/basic");
const quizService = require("../services/quiz");
const Quiz = require("../models/Page/Quiz");
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
  it("Evaluates a quiz properly", async (done) => {
    const evaluation = await quizService.evaluate({
      quiz_id: data.quiz._id,
      answers: [5],
      user_id: data.student._id,
    });
    expect(evaluation.score).toBe(1);
    const evaluation2 = await quizService.evaluate({
      quiz_id: data.quiz._id,
      answers: [3],
      user_id: data.student._id,
    });
    expect(evaluation2.score).toBe(0);
    done();
  });
});

afterAll(basicData.afterAll);
