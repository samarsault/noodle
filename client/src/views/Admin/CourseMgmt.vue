<template>
  <div>
    <div class="header">
      <form
        @submit.prevent="search"
        style="display: flex; align-items: center;"
      >
        <input type="text" placeholder="Search by Name" v-model="searchField" />
        <button class="secondary" type="submit" style="height: 100%;">
          <Magnify />
        </button>
      </form>
      <router-link
        :to="`/admin/cmgt/add`"
        tag="button"
        class="primary"
        style="display: inline-flex;"
      >
        <Plus /> Add Course</router-link
      >
    </div>
    <div v-if="showRes" class="showing-res">
      Showing results for {{ searchField }}
    </div>
    <div class="courses">
      <CourseCard
        v-for="course in courses"
        :key="course._id"
        :course="course"
      />
    </div>
    <div class="not-found" v-if="courses.length == 0">
      <img src="/images/empty.png" />
      <h4>
        We looked every where but couldn't find your course, try checking the
        spelling :D
      </h4>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Magnify from "vue-material-design-icons/Magnify";
import Plus from "vue-material-design-icons/Plus";
import CourseCard from "@/components/CourseCard";
import { mutations } from "@/utils/store";

export default {
  components: {
    Magnify,
    Plus,
    CourseCard,
  },
  data() {
    return {
      courses: [],
      searchField: "",
      showRes: false,
    };
  },
  async mounted() {
    this.setLoading(true);
    this.courses = (await axios.get("/admin/super/courses/all")).data;
    this.setLoading(false);
  },
  methods: {
    ...mutations,
    async search() {
      if (!this.searchField) {
        this.courses = (await axios.get("/admin/super/courses/all")).data;
        this.showRes = false;
      } else {
        this.courses = (
          await axios.get(`/admin/super/courses/search/?q=${this.searchField}`)
        ).data;
        this.showRes = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 100%;
  }
}
.courses {
  display: flex;
  flex-flow: row wrap;
}
.showing-res {
  display: flex;
}
// .not-found {
// 	grid: ;
//   display: inline-block;
//   width: 140px;
//   height: 140px;
//   margin-right: 20px;
//   border-radius: 100%;
// }
</style>
