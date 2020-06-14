<template>
  <div>
    <input
      type="number"
      :value="answer"
      @input="onAnswer(parseInt($event.target.value))"
    />
  </div>
</template>

<script>
export default {
  name: "NumericView",
  props: ["question", "answer", "onAnswer"],
};
</script>
