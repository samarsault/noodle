<template>
  <div>
    <h2>Question Bank</h2>
    <p>You can add questions for later here.</p>
    <QuestionManager :questions="questions" :course_id="course_id" :showAdd="true"/>
  </div>
</template>

<script>
import axios from "axios";
import QuestionManager from "@/components/Questions/Manager";

export default {
  components: {
    QuestionManager,
  },
  data() {
    return {
      course_id: this.$route.params.course_id,
      questions: [],
    };
  },
  mounted() {
    axios.get(`/api/courses/${this.course_id}/questions`).then(({ data }) => {
      this.questions = data;
    });
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
