<template>
  <div>
    <b>Answer:</b>
    <input
      type="number"
      :value="answer"
      step="any"
      @input="onAnswer(parseFloat($event.target.value))"
    />
    <div v-if="review">
      <p v-if="question.answer == answer" class="ans-box green">
        Correct Answer: {{ question.answer }}
      </p>
      <p v-else class="ans-box red">Wrong Answer, Try Again</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NumericView",
  props: ["question", "answer", "onAnswer", "review"],
};
</script>
