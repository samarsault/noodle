<template>
  <div>
    <QuestionView
      v-for="(part, index) in question.questions"
      :key="part._id"
      :question="part"
      :answer="answer ? answer[index] : null"
      :onAnswer="(ans) => setAnswer(index, ans)"
      :review="review"
    />
  </div>
</template>

<script>
export default {
  name: "MultiPartView",
  props: ["question", "answer", "onAnswer", "review"],
  components: {
    // Needs to be imported dynamically
    // https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
    QuestionView: () => import("../View"),
  },
  methods: {
    setAnswer(index, ans) {
      const arr = [...this.answer];
      arr[index] = ans;
      this.onAnswer(arr);
    },
  },
};
</script>
