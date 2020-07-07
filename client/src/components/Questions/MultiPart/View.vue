<template>
  <div>
    <QuestionView
      v-for="(part, index) in question.questions"
      :key="part._id"
      :question="part"
      :answer="answer[index]"
      :onAnswer="(ans) => setAnswer(index, ans)"
    />
  </div>
</template>

<script>
export default {
  name: "MultiPartView",
  props: ["question", "answer", "onAnswer"],
  components: {
    // Needs to be imported dynamically
    // https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
    QuestionView: () => import("../View"),
  },
  data() {
    return {
      answers: [],
    };
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
