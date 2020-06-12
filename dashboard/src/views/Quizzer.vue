<template>
  <div class="container">
    <h2>{{ quiz.name }}</h2>
    <div v-for="(question, i) in quiz.questions">
      <p class="big-type">{{ question.question }}</p>
      <ol class="options" type="A">
        <li
          v-for="(option, j) in question.options"
          v-bind:key="j"
          @click="selectOption(i, j)"
          :class="{ selected: selected[i] == j }"
        >
          <span class="option">{{
            String.fromCharCode("A".charCodeAt(0) + j)
          }}</span>
          <span class="option-value">{{ option }}</span>
        </li>
      </ol>
    </div>
    <button class="primary" style="margin-bottom: 20px;" @click="submitQuiz">
      Submit
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      quiz: {
        name: "",
        questions: [],
      },
      selected: [],
      quiz_id: this.$route.params.quiz_id,
      course_id: this.$route.params.course_id,
    };
  },
  mounted() {
    axios
      .get(`/api/courses/${this.course_id}/quiz/${this.quiz_id}`)
      .then(({ data }) => {
        this.quiz = data;
        this.selected = Array(data.questions.length).fill(-1);
      });
  },
  methods: {
    selectOption(questionIndex, optionIndex) {
      if (this.selected[questionIndex] == optionIndex) {
        // already selected
        this.$set(this.selected, questionIndex, -1);
      } else {
        this.$set(this.selected, questionIndex, optionIndex);
      }
    },
    submitQuiz() {
      axios.post(`/api/courses/${this.course_id}/quiz/submit`, {
        quiz_id: this.quiz_id,
        answers: this.selected,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles/include/_vars";
.options {
  list-style-type: none;
  padding: 0;
  li {
    background-color: #fff;
    padding: 15px 20px;
    border-bottom: 1px solid #ddd;
    &.selected {
      background-color: #d6eed4;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
.option {
  background-color: $tealBlue;
  color: #fff;
  padding: 10px;
  display: inline-block;
  width: 38px;
  height: 38px;
  text-align: center;
  border-radius: 100%;
  margin-right: 15px;
}
</style>
