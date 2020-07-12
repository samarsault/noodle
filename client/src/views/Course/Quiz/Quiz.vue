<template>
  <div>
    <h2>{{ quiz.name }}</h2>
    <button v-if="isAdmin" class="secondary" @click="saveDescription">
      Save Description
    </button>
    <Editor v-model="quiz.description" :edit="isAdmin" :course_id="course_id" />

    <router-link :to="`/dashboard/course/${course_id}/Quizzer/${quiz._id}`">
      <button class="primary">Attempt Quiz</button>
    </router-link>
    <div v-if="attempts.length > 0">
      <h3>My Attempts</h3>
      <!-- show latest attempt first -->
      <AttemptView :attempts="attempts.slice().reverse()" :quiz="quiz" />
    </div>
    <div v-if="isAdmin">
      <h3>Admin</h3>
      <router-link :to="`/dashboard/course/${course_id}/attempts/${quiz._id}`">
        <button class>View Attempts</button>
      </router-link>
      <button class="secondary" @click="editing = true">Add Question</button>
      <QuestionManager
        style="margin-top: 15px;"
        :questions="quiz.questions"
        :course_id="course_id"
        :onDelete="deleteFromQuiz"
        :showExisting="true"
      />
      <QuestionPicker
        v-if="editing"
        @close="editing = false"
        @ok="editing = false"
        :course_id="course_id"
        :onSelect="addToQuiz"
        :filter="hideAlreadyAdded"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import QuestionManager from "@/components/Questions/Manager";
import QuestionPicker from "@/components/Questions/Picker";
import AttemptView from "@/components/AttemptView";
import Editor from "@/components/Editor";

export default {
  props: {
    isAdmin: Boolean,
  },
  data() {
    return {
      quiz: {
        name: "",
        questions: [],
      },
      attempts: [],
      availableQuestions: [],
      editing: false,
      selected: [],
      quiz_id: this.$route.params.quiz_id,
      course_id: this.$route.params.course_id,
    };
  },
  components: {
    Editor,
    QuestionManager,
    QuestionPicker,
    AttemptView,
  },
  mounted() {
    axios
      .get(`/api/courses/${this.course_id}/quiz/${this.quiz_id}`)
      .then(({ data }) => {
        this.quiz = data;
      });
    axios
      .get(`/api/courses/${this.course_id}/quiz/${this.quiz_id}/attempt`)
      .then(({ data }) => {
        this.attempts = data;
      });
  },
  methods: {
    async addToQuiz(question) {
      const { data } = await axios.post(
        `/admin/courses/${this.course_id}/quiz/update`,
        {
          type: "add",
          data: question._id,
          quiz_id: this.quiz_id,
        }
      );
      if (data.success) this.quiz.questions.push(question);
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
    hideAlreadyAdded(question) {
      return !this.quiz.questions.find((x) => x._id == question._id);
    },
    async saveDescription() {
      const { data } = await axios.put(
        `/admin/courses/${this.course_id}/page/${this.quiz_id}`,
        {
          type: "Quiz",
          description: this.quiz.description,
        }
      );
      if (!data.success) alert("Can't save details");
    },
  },
};
</script>

<style lang="scss" scoped>
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
