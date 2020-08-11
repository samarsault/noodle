<template>
  <div>
    <h2 style="margin-top: 0;">Question Bank</h2>
    <p>You can add questions for later here.</p>
    <QuestionManager
      :questions="questions"
      :course_id="course_id"
      :showAdd="true"
      :group="group"
      @update="updateQuestion"
    />
  </div>
</template>

<script>
import axios from "axios";
import QuestionManager from "@/components/Questions/Manager";

export default {
  props: {
    onLoad: Function,
  },
  components: {
    QuestionManager,
  },
  data() {
    return {
      course_id: this.$route.params.course_id,
      group: this.$route.params.group,
      questions: [],
    };
  },
  mounted() {
    this.onLoad(null);
    axios
      .get(`/api/courses/${this.course_id}/questions`, {
        params: {
          group: this.group,
        },
      })
      .then(({ data }) => {
        this.questions = data;
      });
  },
  methods: {
    updateQuestion(index, newValue) {
      this.$set(index, newValue);
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
