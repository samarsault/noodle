<template>
  <div class="container">
    <h2>{{ quiz.name }}</h2>
    <router-link :to="`/course/${course_id}/Quizzer/${quiz._id}`">
      <button class="primary">Attempt</button>
    </router-link>
    <button class="secondary" @click="edit">Add Question</button>
    <QuestionManager
      :questions="quiz.questions"
      :course_id="course_id"
      :onDelete="deleteFromQuiz"
      :showExisting="true"
    />
    <Modal v-if="editing" title="Add Question" @close="editing = false">
      <template slot="body">
        <div
          v-for="question in availableQuestions"
          :key="question._id"
          class="flexy"
        >
          <div v-html="question.question" />
          <a href="#" @click="addToQuiz(question)">Add</a>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "@/components/Dialogs/Modal";
import QuestionManager from "@/components/Questions/Manager";

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
  components: {
    Modal,
    QuestionManager,
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
    async deleteFromQuiz(question) {
      const { data } = await axios.post(
        `/admin/courses/${this.course_id}/quiz/update`,
        {
          type: "delete",
          question_id: question._id,
          quiz_id: this.quiz_id,
        }
      );
      return data.success;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../../styles/include/_vars";
.question {
  background-color: #fff;
  padding: 5px 15px;
  margin: 10px 0;
}
.flexy {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
button.small {
  padding: 10px;
}
</style>
