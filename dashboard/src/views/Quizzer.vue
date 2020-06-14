<template>
  <div class="quiz-container">
    <h1>{{ quiz.name }}</h1>
    <div v-if="started" class="quizzer">
      <div class="quizzer-question">
        <form @submit="nextQuestion">
          <div v-html="activeQuestion.question" />
          <MCQ
            v-if="activeQuestion.type == 'MCQ'"
            :question="activeQuestion"
            :answer="answers[activeIndex]"
            :onAnswer="setAnswer"
          />
          <Numeric
            v-if="activeQuestion.type == 'Numeric'"
            :question="activeQuestion"
            :answer="answers[activeIndex]"
            :onAnswer="setAnswer"
          />
          <button class="primary">
            {{ lastQuestion ? "Finish" : "Next" }}
          </button>
        </form>
      </div>
      <div class="quizzer-panel">
        <p>Time: 19:32</p>
        <div class="quizzer-nav">
          <div
            v-for="n in quiz.questions.length"
            :key="n"
            @click="showQuestion(n - 1)"
            :class="{ marked: answers[n - 1] }"
          >
            {{ n }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Once, you are ready, click below to start the quiz.</p>
      <button class="primary" @click="startQuiz">Start</button>
    </div>
  </div>
</template>

<script>
//
// Responsible for Taking
// Quizes
//
import axios from "axios";
import MCQ from "../components/Questions/MCQ/View.vue";
import Numeric from "../components/Questions/Numeric/View.vue";

export default {
  data() {
    return {
      quiz_id: this.$route.params.quiz_id,
      course_id: this.$route.params.course_id,
      quiz: {
        name: "",
        questions: [],
      },
      started: false,
      answers: [],
      activeIndex: 0,
      activeQuestion: {},
    };
  },
  computed: {
    lastQuestion() {
      return this.activeIndex == this.quiz.questions.length - 1;
    },
  },
  components: {
    MCQ,
    Numeric,
  },
  created() {
    axios
      .get(`/api/courses/${this.course_id}/quiz/${this.quiz_id}`)
      .then(({ data }) => {
        this.quiz = data;
        if (this.answers.length !== this.quiz.questions.length)
          this.answers = new Array(this.quiz.questions.length).fill("");
      });
  },
  methods: {
    startQuiz() {
      this.started = true;
      this.showQuestion(0);
    },
    showQuestion(n) {
      this.activeIndex = n;
      this.activeQuestion = this.quiz.questions[n];
    },
    nextQuestion(e) {
      e.preventDefault();
      if (this.lastQuestion) {
        alert("Submitting for evaluation");
        this.submitQuiz();
      } else {
        this.showQuestion(this.activeIndex + 1);
      }
    },
    submitQuiz() {
      axios
        .post(`/api/courses/${this.course_id}/quiz/submit`, {
          quiz_id: this.quiz_id,
          answers: this.answers,
        })
        .then(({ status, data }) => {
          if (status === 200) {
            alert(`Score: ${data.score}`);
          } else {
            alert("Submission error");
          }
        });
    },
    setAnswer(answer) {
      this.$set(this.answers, this.activeIndex, answer);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles/include/_vars.scss";
.quiz-container {
  max-width: 1024px;
  margin: 20px auto;
}
.quizzer {
  display: flex;
  justify-content: space-around;
  min-height: 400px;
}
.quizzer-question {
  flex-grow: 1;
  margin-right: 25px;
}
.quizzer-nav {
  display: flex;
  > div {
    width: 40px;
    height: 40px;
    background-color: #111;
    color: #fff;
    line-height: 40px;
    text-align: center;
    border-radius: 100%;
    margin: 5px;
    cursor: pointer;
    &.marked {
      background-color: $tealBlue;
    }
  }
}
.quizzer-panel {
  border: 1px solid #ccc;
  padding: 5px 20px;
  height: 100%;
}
</style>
