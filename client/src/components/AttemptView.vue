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
      <tr v-for="attempt in attempts" :key="attempt._id">
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
};
</script>
