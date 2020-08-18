<template>
  <div>
    <div v-html="question.question" />
    <MCQ
      v-if="question.type == 'MCQ'"
      :question="question"
      :answer="answer"
      :onAnswer="onAnswer"
      :review="review"
    />
    <Numeric
      v-if="question.type == 'Numeric'"
      :question="question"
      :answer="answer"
      :onAnswer="onAnswer"
      :review="review"
    />
    <MultiPart
      v-if="question.type == 'NoBody'"
      :question="question"
      :answer="answer"
      :onAnswer="onAnswer"
      :review="review"
    />
  </div>
</template>
<script>
//
// One View for all Questions
//
import MCQ from "@/components/Questions/MCQ/View.vue";
import Numeric from "@/components/Questions/Numeric/View.vue";
import MultiPart from "@/components/Questions/MultiPart/View.vue";

export default {
  name: "QuestionView",
  props: ["question", "answer", "onAnswer", "review"],
  components: {
    Numeric,
    MCQ,
    MultiPart,
  },
};
</script>

<style lang="scss">
.ans-box {
  min-width: 360px;
  border-radius: 4px;
  padding: 16px;
  &.green {
    background-color: rgba($green, 0.2);
    border: 1px solid darken($green, 1%);
  }
  &.red {
    background-color: rgba($red, 0.2);
    border: 1px solid darken($red, 1%);
  }
}
</style>
