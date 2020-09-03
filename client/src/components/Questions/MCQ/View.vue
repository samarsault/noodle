<template>
  <div>
    <ol class="options" type="A">
      <li
        v-for="(option, j) in question.options"
        :key="j"
        @click="selectOption(j)"
        :class="{ selected: answer === j }"
      >
        <span class="option">{{
          String.fromCharCode("A".charCodeAt(0) + j)
        }}</span>
        <span class="option-value">{{ option }}</span>
      </li>
    </ol>
    <div v-if="review">
      <p v-if="question.answer == answer" class="ans-box green">
        Correct Option: {{ question.answer | optionify }}
      </p>
      <p v-else class="ans-box red">Wrong Answer</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MCQView",
  props: ["question", "answer", "onAnswer", "review"],
  filters: {
    optionify(index) {
      return String.fromCharCode("A".charCodeAt(0) + index);
    },
  },
  methods: {
    selectOption(index) {
      if (this.review) return;
      this.onAnswer(index);
    },
  },
};
</script>

<style lang="scss" scoped>
.options {
  list-style-type: none;
  padding: 0;
  li {
    background-color: #fff;
    padding: 15px 20px;
    border-bottom: 1px solid #ddd;
    &.selected {
      background-color: #dee2e5;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
.option {
  background-color: $tealBlue;
  color: #fff;
  padding: 10px;
  display: inline-block;
  width: 38px;
  height: 38px;
  text-align: center;
  border-radius: 100%;
  margin-right: 15px;
}
</style>
