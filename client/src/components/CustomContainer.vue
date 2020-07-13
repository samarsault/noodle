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
        courses: this.courses,
        course: this.course,
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
    async getCourse() {
      if (this.access && this.access.includes("course")) {
        const course_id = this.$route.params.course_id;
        if (!course_id) return null;
        const { data } = await axios.get(`/public/courses/${course_id}`);
        return data;
      }
      return null;
    },
    dispatchAction(action) {
      if (action === "logout") localStorage.clear();
    },
  },
  async mounted() {
    this.courses = await this.getCourses();
    this.course = await this.getCourse();
  },
};
</script>
