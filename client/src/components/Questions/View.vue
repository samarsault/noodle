<template>
  <div>
    <div v-html="question.question" />
    <MCQ
      v-if="question.type == 'MCQ'"
      :question="question"
      :answer="answer"
      :onAnswer="onAnswer"
    />
    <Numeric
      v-if="question.type == 'Numeric'"
      :question="question"
      :answer="answer"
      :onAnswer="onAnswer"
    />
    <MultiPart
      v-if="question.type == 'MultiPart'"
      :question="question"
      :answer="answer"
      :onAnswer="onAnswer"
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
  props: ["question", "answer", "onAnswer"],
  components: {
    Numeric,
    MCQ,
    MultiPart,
  },
};
</script>
