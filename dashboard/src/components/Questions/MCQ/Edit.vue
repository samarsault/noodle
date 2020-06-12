<template>
  <div>
    <div class="separated-elements">
      <label>Options</label>
      <button class="icon-button" @click="addOption">
        <Plus decorative />
        <span class="icon-left">Add</span>
      </button>
    </div>
    <ol type="A">
      <li v-bind:key="index" v-for="(option, index) in local.options">
        <div class="separated-elements">
          <input
            style="display: inline-block;"
            type="text"
            @input="updateOption(index, $event.target.value)"
            :value="option"
          />
          <button
            class="icon-button"
            style="margin-left: 10px;"
            @click="removeOption(index)"
          >
            <Bin style="color: rgb(221, 39, 39);" />
          </button>
        </div>
      </li>
    </ol>
    <div v-if="local.options.length > 0" style="margin-top: 10px;">
      <label>Correct Option</label>
      <select
        @input="update('answer', parseInt($event.target.value))"
        :value="local.answer"
      >
        <option
          v-bind:key="index"
          v-for="(option, index) in local.options"
          :value="index"
        >
          {{ String.fromCharCode("A".charCodeAt(0) + index) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import Plus from "vue-material-design-icons/PlusCircleOutline";
import Bin from "vue-material-design-icons/TrashCan";

export default {
  name: "MCQEdit",
  components: {
    Plus,
    Bin,
  },
  props: ["value"],
  computed: {
    local() {
      if (!this.value.options) {
        // In this case, a new question is being created, value has the following properties
        // question, course, type. we populate the rest
        return {
          ...this.value,
          options: [],
          answer: -1,
        };
      }
      return this.value;
    },
  },
  methods: {
    update(key, value) {
      this.$emit("input", { ...this.local, [key]: value });
    },
    updateOption(index, val) {
      const newOptions = [...this.local.options];
      newOptions[index] = val;
      this.$emit("input", {
        ...this.local,
        options: newOptions,
      });
    },
    addOption() {
      this.$emit("input", {
        ...this.local,
        options: [
          ...this.local.options,
          `Option ${this.local.options.length + 1}`,
        ],
      });
    },
    removeOption(index) {
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

<style lang="scss" scoped>
textarea,
input[type="text"] {
  border: 1px solid #ddd;
  width: 100%;
}
select {
  display: block;
  width: 100%;
  margin-top: 10px;
}
.separated-elements {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon-button {
  border: 1px solid #ddd;
  padding: 7px 15px;
  margin: 0;
}
ol {
  margin: 0;
}
</style>
