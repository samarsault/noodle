<template>
  <div class="katex-box">
    <div @click="editing = true">
      <div v-if="value" class="katex" v-html="renderedValue"></div>
      <div v-else>
        <p style="background: #ddd; text-align: center;">
          Click to add expression
        </p>
      </div>
    </div>
    <div v-if="editing && view.editable" class="katex-editing">
      <input
        type="text"
        @paste.stop
        v-model="value"
        placeholder="x^2 + y^2 = r^2"
      />
      <button class="secondary" @click="editing = false">Done</button>
    </div>
  </div>
</template>

<script>
import katex from "katex";
import "katex/dist/katex.min.css";

export default {
  data() {
    return {
      editing: false,
    };
  },
  computed: {
    renderedValue() {
      if (this.value)
        return katex.renderToString(this.value, {
          // doesn't render anything after throwing
          throwOnError: false,
        });
      return null;
    },
    value: {
      get() {
        return this.node && this.node.attrs.value;
      },
      set(value) {
        this.updateAttrs({
          value,
        });
      },
    },
  },
  props: {
    node: {
      type: Object,
    },

    updateAttrs: {
      type: Function,
    },
    view: {
      type: Object,
    },
  },
  methods: {
    showEditor() {
      this.editing = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.katex {
  width: 100%;
  text-align: center;
}
.katex-box {
  position: relative;
}
.katex-editing {
  border-radius: 4px;
  background-color: #eee;
  width: fit-content;
  padding: 0 10px;
  position: absolute;
  bottom: calc(0% - 100%);
  left: 0;
  input[type="text"] {
    background-color: #eee;
    border: 0;
    margin: 5px 0;
  }
  input,
  button {
    display: inline-block;
    padding: 8px;
  }
}
</style>
