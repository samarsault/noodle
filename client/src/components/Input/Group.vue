<template>
  <v-select :options="groups" v-on:input="changed" :value="selectedValue" />
</template>

<script>
import axios from "axios";
import vSelect from "vue-select";

export default {
  props: {
    value: {},
    course_id: String,
    onChange: Function,
  },
  computed: {
    selectedValue() {
      if (typeof this.value == "undefined") return this.groups[0];
      return this.value;
    },
  },
  async mounted() {
    const { data } = await axios.get(
      `/api/courses/${this.course_id}/questions/groups`
    );
    this.groups = data;
    // First change, default property
    this.onChange(this.selectedValue);
  },
  data() {
    return {
      groups: [],
    };
  },
  methods: {
    changed(value) {
      this.$emit("input", value);
      this.onChange(value);
    },
  },
  components: {
    vSelect,
  },
};
</script>
