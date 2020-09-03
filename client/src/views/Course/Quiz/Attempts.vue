<template>
  <div v-if="attempts">
    <div v-if="attempts.length > 0">
      <h1 style>{{ quiz.name }}</h1>
      <AttemptView :attempts="attempts" :quiz="quiz" />
    </div>
    <div v-else>
      <h1>No one has attempted this quiz yet.</h1>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AttemptView from "@/components/AttemptView";

export default {
  props: {
    onLoad: Function,
  },
  components: {
    AttemptView,
  },
  data() {
    return {
      quiz_id: this.$route.params.quiz_id,
      course_id: this.$route.params.course_id,
      attempts: null,
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
    this.onLoad(null);
  },
};
</script>
