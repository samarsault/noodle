<template>
  <div class="quiz-container">
    <h1>{{ quiz.name }}</h1>
    <div class="quizzer">
      <div class="quizzer-question">
        <form @submit="nextQuestion">
          <QuestionView
            :question="activeQuestion"
            :answer="answers[activeIndex]"
            :onAnswer="setAnswer"
            :review="true"
          />
          <button class="primary">
            {{ lastQuestion ? "Done" : "Next" }}
          </button>
          <!-- <p>Time: {{ time[activeIndex] }}</p> -->
        </form>
      </div>
      <div class="quizzer-panel">
        <p align="center">Time: {{ totalTime }}</p>
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
  props: {
    onLoad: Function,
  },
  data() {
    return {
      attempt_id: this.$route.params.attempt_id,
      course_id: this.$route.params.course_id,
      quiz: {
        _id: null,
        name: "",
        questions: [],
      },
      totalTime: 0,
      answers: [],
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
      .get(`/api/courses/${this.course_id}/quiz/review/${this.attempt_id}`)
      .then(({ data }) => {
        this.quiz = {
          name: data.name,
          questions: data.questions,
          _id: data.quiz_id,
        };
        this.totalTime = data.time;
        this.answers = data.answers;
        this.onLoad(null);
        this.showQuestion(0);
      });
  },
  methods: {
    showQuestion(n) {
      this.activeIndex = n;
      this.activeQuestion = this.quiz.questions[n];
    },
    nextQuestion(e) {
      e.preventDefault();
      if (this.lastQuestion) {
        this.$router.push({
          path: `/dashboard/course/${this.course_id}/Quiz/${this.quiz._id}`,
        });
      } else {
        this.showQuestion(this.activeIndex + 1);
      }
    },
    setAnswer(answer) {
      this.$set(this.answers, this.activeIndex, answer);
    },
  },
};
</script>

<style lang="scss" scoped>
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
  padding: 20px;
  height: 100%;
  p {
    margin-top: 0;
  }
}
</style>
