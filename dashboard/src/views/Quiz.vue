<template>
  <div class="container">
    <h2>{{ quiz.name }}</h2>
    <div v-for="question in quiz.questions" :key="question._id">
      <div v-html="question.question" />
    </div>
    <router-link :to="`/course/${course_id}/Quizzer/${quiz._id}`">
      <button class="primary">Attempt</button>
    </router-link>
    <button class="secondary" @click="edit">Edit</button>
    <div v-if="editing">
      <h3>Questions</h3>
      <button>Add Question</button>
      <div
        v-for="question in availableQuestions"
        :key="question._id"
        style="display: flex; align-items: center;"
      >
        <div v-html="question.question" />
        <a href="#" @click="addToQuiz(question)">Add</a>
      </div>
    </div>
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
      availableQuestions: [],
      editing: false,
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
      });
  },
  methods: {
    edit() {
      this.editing = true;
      if (this.availableQuestions.length === 0) {
        axios
          .get(`/api/courses/${this.course_id}/questions`)
          .then(({ data }) => {
            this.availableQuestions = data;
          });
      }
    },
    async addToQuiz(question) {
      await axios.post(`/admin/courses/${this.course_id}/quiz/update`, {
        type: "add",
        data: question._id,
        quiz_id: this.quiz_id,
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
