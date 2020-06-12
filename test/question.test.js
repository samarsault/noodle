/*
 * Tests for Question Bank services
 */
const basicData = require("./data/basic");
const questions = require("../services/questions");
const Question = require("../models/Question");
const MCQ = require("../models/Question/MCQ");
const Numeric = require("../models/Question/Numeric");

let data;

const mcqEx = {
  question: "Which of the following equals zero?",
  options: ["2 + 3", "0!", "0 * 3", "0 + 3"],
  answer: 2,
};

beforeAll(basicData.beforeAll);
beforeEach(async () => {
  await Question.deleteMany();
  data = await basicData.beforeEach();
  data.numQuestion = await Numeric.create({
    question: "What's 2 + 3?",
    answer: 5,
    parts: [],
    course: data.course._id,
  });
  mcqEx.course = data.course._id;
});

describe("Question", function () {
  it("Gets questions with type", async (done) => {
    const [Q] = await questions.getAll(data.course._id);
    expect(Q.answer).toBe(5);
    // should include type
    expect(Q.type).toBe("Numeric");
    done();
  });

  it("Creates a generic question", async (done) => {
    const newQ = await questions.create("MCQ", mcqEx);
    // MCQ question is found using base question
    const result = await Question.findOne({ _id: newQ._id });
    expect(newQ.toObject()).toStrictEqual(result.toObject());
    done();
  });

  it("Deletes a question", async (done) => {
    const newQ = await questions.create("MCQ", mcqEx);
    // MCQ question is found using base question
    await questions.delete(newQ._id);
    const Q = await Question.find({ _id: newQ._id });
    expect(Q.length).toBe(0);
    done();
  });

  it("Updates question properly", async (done) => {
    await questions.update(data.numQuestion._id, {
      type: "Numeric",
      answer: 6,
    });
    const { answer } = await Question.findOne({ _id: data.numQuestion._id });
    expect(answer).toBe(6);

    // Test for discriminator properties
    await questions.update(data.numQuestion._id, {
      type: "Numeric",
      error: 3,
    });
    const { error } = await Numeric.findOne({ _id: data.numQuestion._id });
    expect(error).toBe(3);
    done();
  });

  it("Adds a question subpart", async (done) => {
    const newQ = await questions.create("MCQ", mcqEx);
    await questions.parts(data.numQuestion._id).add(newQ._id);
    const numQ = await Question.findOne({ _id: data.numQuestion._id });
    expect(numQ.parts).toContainEqual(newQ._id);
    done();
  });

  it("Removes question subpart", async (done) => {
    const newQ = await questions.create("MCQ", mcqEx);
    await questions.parts(data.numQuestion._id).add(newQ._id);
    const numQi = await Question.findOne({ _id: data.numQuestion._id });
    expect(numQi.parts).toContainEqual(newQ._id);
    await questions.parts(data.numQuestion._id).remove(newQ._id);
    const numQf = await Question.findOne({ _id: data.numQuestion._id });
    expect(numQf.parts).not.toContainEqual(newQ._id);
    done();
  });
});

afterAll(basicData.afterAll);
