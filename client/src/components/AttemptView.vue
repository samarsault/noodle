<template>
  <table>
    <thead>
      <tr>
        <th>User</th>
        <th>Attempted</th>
        <th>Correct</th>
        <th>Total Questions</th>
        <th>Score</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="attempt in attempts"
        :key="attempt._id"
        @click="reviewAttempt(attempt._id)"
      >
        <td>{{ attempt.user.name }}</td>
        <td>{{ quiz.questions.length - attempt.unansweredQs }}</td>
        <td>{{ attempt.correctQs }}</td>
        <td>{{ quiz.questions.length }}</td>
        <td>{{ attempt.score }}</td>
        <td>{{ attempt.time }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    attempts: Array,
    quiz: Object,
  },
  methods: {
    reviewAttempt(id) {
      const course_id = this.$route.params.course_id;
      this.$router.push({
        path: `/dashboard/course/${course_id}/review/${id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
tr {
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: rgba($green, 0.11);
  }
}
</style>
