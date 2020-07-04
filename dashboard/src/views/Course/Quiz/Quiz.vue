<template>
  <div>
    <h2>{{ quiz.name }}</h2>
    <router-link :to="`/course/${course_id}/Quizzer/${quiz._id}`">
      <button class="primary">Take</button>
    </router-link>
    <div v-if="attempts.length > 0">
      <h3>My Attempts</h3>
      <AttemptView :attempts="attempts" :quiz="quiz" />
    </div>
    <div v-if="isAdmin">
      <h3>Admin</h3>
      <router-link :to="`/course/${course_id}/attempts/${quiz._id}`">
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
      <Modal
        v-if="editing"
        title="Add Question"
        @close="editing = false"
        @ok="editing = false"
      >
        <template slot="body">
          <b>Group</b>
          <GroupInput
            style="margin-top: 10px;"
            :course_id="course_id"
            :onChange="getQuestionsForGroup"
          />
          <div style="min-height: 300px; overflow-y: scroll;">
            <div
              v-for="question in availableQuestions"
              :key="question._id"
              class="flexy"
            >
              <div v-html="question.question" />
              <a href="#" @click="addToQuiz(question)">Add</a>
            </div>
          </div>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "@/components/Dialogs/Modal";
import GroupInput from "@/components/Input/Group";
import QuestionManager from "@/components/Questions/Manager";
import AttemptView from "@/components/AttemptView";

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
    Modal,
    QuestionManager,
    AttemptView,
    GroupInput,
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
    async getQuestionsForGroup(group) {
      const { data } = await axios.get(
        `/api/courses/${this.course_id}/questions`,
        {
          params: {
            group,
          },
        }
      );
      // Filter available questions to hide questions which
      // have already been added
      this.availableQuestions = data.filter((qId) => {
        return !this.quiz.questions.find((x) => x._id == qId._id);
      });
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
