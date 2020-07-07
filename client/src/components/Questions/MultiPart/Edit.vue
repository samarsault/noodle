<template>
  <div>
    <p>Parts</p>
    <button @click="showQuestionPicker = true">Add</button>
    <QuestionPicker
      v-if="showQuestionPicker"
      @close="showQuestionPicker = false"
      @ok="showQuestionPicker = false"
      :course_id="local.course"
      :onSelect="addQuestion"
      :filter="filterQuestion"
    />
    <div v-for="question in local.questions" :key="question._id">
      <div v-html="question.question" />
    </div>
  </div>
</template>

<script>
import QuestionPicker from "@/components/Questions/Picker";

export default {
  name: "MultiPartEdit",
  components: {
    QuestionPicker,
  },
  props: ["value"],
  data() {
    return {
      showQuestionPicker: false,
    };
  },
  computed: {
    local() {
      if (!this.value.questions) {
        // In this case, a new question is being created, value has the following properties
        // question, course, type. we populate the rest
        return {
          ...this.value,
          questions: [],
        };
      }
      return this.value;
    },
  },
  methods: {
    update(key, value) {
      this.$emit("input", { ...this.local, [key]: value });
    },
    filterQuestion(question) {
      return (
        this.local.questions.findIndex((q) => q._id === question._id) == -1
      );
    },
    addQuestion(question) {
      this.$emit("input", {
        ...this.local,
        questions: [...this.local.questions, question],
      });
    },
    removeQuestion(index) {
      const newOptions = [...this.local.options];
      newOptions.splice(index, 1);
      this.$emit("input", {
        ...this.local,
        options: newOptions,
      });
    },
  },
};
</script>
