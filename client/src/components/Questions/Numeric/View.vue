<template>
  <div>
    <b>Answer:</b>
    <input
      type="number"
      :value="answer"
      step="any"
      @input="onAnswer(parseFloat($event.target.value))"
    />
  </div>
</template>

<script>
export default {
  name: "NumericView",
  props: ["question", "answer", "onAnswer"],
};
</script>
