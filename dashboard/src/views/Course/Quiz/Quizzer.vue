<template>
  <div class="quiz-container">
    <h1>{{ quiz.name }}</h1>
    <div v-if="started" class="quizzer">
      <div class="quizzer-question">
        <form @submit="nextQuestion">
          <QuestionView
            :question="activeQuestion"
            :answer="answers[activeIndex]"
            :onAnswer="setAnswer"
          />
          <button class="primary">
            {{ lastQuestion ? "Finish" : "Next" }}
          </button>
          <p>Time: {{ times[activeIndex] | stringTime }}</p>
        </form>
      </div>
      <div class="quizzer-panel">
        <p>Time: {{ totalTime | stringTime }}</p>
        <button @click="alert('You can continue anytime in coming 5 days.')">
          Pause
        </button>
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
import QuestionView from "@/components/Questions/View";

export default {
  data() {
    return {
      quiz_id: this.$route.params.quiz_id,
      course_id: this.$route.params.course_id,
      quiz: {
        name: "",
        questions: [],
      },
      totalTime: 0,
      started: false,
      answers: [],
      times: [],
      activeIndex: 0,
      activeQuestion: {},
      attempt: {},
    };
  },
  filters: {
    stringTime: (val) => {
      const base = `${val % 60}s`;
      if (val > 60) return `${Math.floor(val / 60)}m ${base}`;
      return base;
    },
  },
  computed: {
    lastQuestion() {
      return this.activeIndex == this.quiz.questions.length - 1;
    },
  },
  components: {
    QuestionView,
  },
  created() {
    axios
      .get(`/api/courses/${this.course_id}/quiz/${this.quiz_id}`)
      .then(({ data }) => {
        this.quiz = data;
        if (this.answers.length !== this.quiz.questions.length) {
          this.answers = new Array(this.quiz.questions.length).fill("");
          this.times = new Array(this.quiz.questions.length).fill(0);
        }
      });
  },
  methods: {
    startQuiz() {
      axios
        .post(`/api/courses/${this.course_id}/quiz/attempt`, {
          quiz_id: this.quiz_id,
        })
        .then(({ data, status }) => {
          if (status === 200) {
            this.attempt = data;
            this.started = true;
            this.showQuestion(0);
            this.timer = setInterval(this.loopTime, 1000);
          } else {
            alert("Error attempting quiz.");
          }
        });
    },
    loopTime() {
      this.$set(this.times, this.activeIndex, this.times[this.activeIndex] + 1);
      this.totalTime += 1;
    },
    showQuestion(n) {
      this.activeIndex = n;
      this.activeQuestion = this.quiz.questions[n];
    },
    nextQuestion(e) {
      e.preventDefault();
      if (this.lastQuestion) {
        this.submitQuiz();
      } else {
        this.showQuestion(this.activeIndex + 1);
      }
    },
    submitQuiz() {
      clearInterval(this.timer);
      axios
        .post(`/api/courses/${this.course_id}/quiz/submit`, {
          ...this.attempt,
          answers: this.answers,
        })
        .then(({ status }) => {
          if (status === 200) {
            this.$router.push({
              path: `/course/${this.course_id}/Quiz/${this.quiz_id}`,
            });
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
@import "../../../../../styles/include/_vars.scss";
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
