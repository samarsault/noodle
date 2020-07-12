<template>
  <component :is="page" v-bind="properties" />
</template>

<script>
import { getters } from "../utils/store";
import axios from "axios";

export default {
  props: ["page", "access"],
  data() {
    return {
      courses: [],
      course: null,
    };
  },
  computed: {
    ...getters,
    properties() {
      return {
        user: this.user,
        course_id: this.$route.params.course_id,
        courses: this.courses,
        action: this.dispatchAction,
      };
    },
  },
  methods: {
    async getCourses() {
      if (this.access && this.access.includes("courses")) {
        const { data } = await axios.get("/public/courses");
        return data;
      }
      return [];
    },
    dispatchAction(action) {
      if (action === "logout") localStorage.clear();
    },
  },
  async mounted() {
    this.courses = await this.getCourses();
  },
};
</script>
