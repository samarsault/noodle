<template>
  <QuizMaker
    v-if="showMaker"
    :course_id="course_id"
    :quizId="selectedQuizId"
    @close="showMaker = false"
  />
  <div v-else class="container">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(quiz, index) in allQuizes">
          <td>{{ quiz.name }}</td>
          <td>
            <button class="small outline" @click="editQuiz(quiz._id)">
              <Edit />
            </button>
            <button class="small error" @click="deleteQuiz(quiz, index)">
              <Bin />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Edit from "vue-material-design-icons/Pencil";
import Bin from "vue-material-design-icons/TrashCan";
//import QuestionBank from './QuestionBank'

export default {
  components: {
    Edit,
    Bin,
  },
  data() {
    return {
      quizId: null,
      course_id: this.$route.params.course_id,
    };
  },
  methods: {
    editQuiz(id) {
      this.selectedQuizId = id;
      this.showMaker = true;
    },
    getQuizes() {
      axios.get(`/api/courses/${this.course_id}/quiz`).then(({ data }) => {
        this.allQuizes = data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="file"] {
  padding: 20px 0;
}
button {
  margin-top: 10px;
  margin-bottom: 10px;
  &.small {
    padding: 10px;
  }
}
</style>
