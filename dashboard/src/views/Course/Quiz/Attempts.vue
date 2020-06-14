<template>
  <div>
    <h2>{{ quiz.name }}</h2>
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Attempted</th>
          <th>Correct</th>
          <th>Total Questions</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attempt in attempts" :key="attempt._id">
          <td>{{ attempt.user.name }}</td>
          <td>{{ quiz.questions.length - attempt.unansweredQs }}</td>
          <td>{{ attempt.correctQs }}</td>
          <td>{{ quiz.questions.length }}</td>
          <td>{{ attempt.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      quiz_id: this.$route.params.quiz_id,
      course_id: this.$route.params.course_id,
      attempts: [],
      quiz: {},
    };
  },
  async mounted() {
    const { data } = await axios.get(
      `/admin/courses/${this.course_id}/quiz/${this.quiz_id}/attempts`
    );
    const quiz = await axios.get(
      `/api/courses/${this.course_id}/quiz/${this.quiz_id}`
    );
    this.attempts = data;
    this.quiz = quiz.data;
  },
};
</script>
