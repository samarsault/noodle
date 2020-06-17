<template>
  <div class="mainWrapper">
    <div class="header">
      <input type="text" placeholder="Search by Name" v-model="searchField" />
      <button @click="search()">
        <Magnify />
      </button>
      <button @click="filter()">
        <FilterVariant />
      </button>
      <router-link
        :to="`/admin/cmgt/add`"
        tag="button"
        style="display: inline-flex;"
      >
        <Plus /> Add Course</router-link
      >
    </div>
    <div class="courses">
      <Card v-for="course in courses" :key="course._id" :course="course" />
    </div>
    <div class="not-found" v-if="courses.length == 0">
      <img src="/images/empty.png" />
      <h4>We looked every where but couldn't find your course, try checking the spelling :D</h4>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Magnify from "vue-material-design-icons/Magnify";
import FilterVariant from "vue-material-design-icons/FilterVariant";
import Plus from "vue-material-design-icons/Plus";
import Card from "../../../components/Card";
import EditCourse from "./EditCourse";
import { mutations } from "../../../utils/store";
export default {
  components: {
    FilterVariant,
    Magnify,
    Plus,
    Card,
    EditCourse,
  },
  data() {
    return {
      courses: [],
      searchField: "",
    };
  },
  async mounted() {
    this.setLoading(true);
    console.log(this.$router);
    console.log("Wassup!");
    this.courses = (await axios.get("/admin/super/courses/all")).data;
    console.log(this.courses);
    this.setLoading(false);
  },
  methods: {
    ...mutations,
    async search() {
      if (!this.searchField) {
        console.log("I am here!!");
        this.courses = (await axios.get("/admin/super/courses/all")).data;
        console.log(this.courses);
      } else {
        this.courses = (
          await axios.get(`/admin/super/courses/search/?q=${this.searchField}`)
        ).data;
        console.log(this.courses);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../../styles/include/vars";

.mainWrapper {
  display: grid;
}
.header {
  display: flex;
  grid-row: 1;
  align-items: center;
  justify-content: center;
}
.courses {
  grid-row: 2;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
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
