<template>
  <v-select
    :options="courseOptions"
    @search="searchCourses"
    v-on:input="changed"
  />
</template>

<script>
import axios from "axios";
import vSelect from "vue-select";

export default {
  props: {
    value: {},
  },
  data() {
    return {
      courseOptions: [],
    };
  },
  components: {
    vSelect,
  },
  async mounted() {
    this.courseOptions = await this.fetchOptions("");
  },
  methods: {
    async fetchOptions(search) {
      const { data } = await axios.get(`/public/courses/search?q=${search}`);
      return data.map((x) => x.name);
    },
    async searchCourses(search, loading) {
      if (!search) return;
      loading(true);
      this.courseOptions = await this.fetchOptions(search);
      loading(false);
    },
    changed(value) {
      this.$emit("input", value);
    },
  },
};
</script>
