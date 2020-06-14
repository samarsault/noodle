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
    </div>
    <div class="courses">
      <Card v-for="course in courses" :key="course._id" :course="course" />
    </div>
    <router-view :key="$route.path" />
    <!-- <EditCourse /> -->
  </div>
</template>

<script>
import axios from "axios";
import Magnify from "vue-material-design-icons/Magnify";
import FilterVariant from "vue-material-design-icons/FilterVariant";
import Card from "../../../components/Card";
import EditCourse from "./EditCourse";

export default {
  components: {
    FilterVariant,
    Magnify,
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
    console.log(this.$router);
    console.log("Wassup!");
    this.courses = (await axios.get("/admin/super/courses/all")).data;
    console.log(this.courses);
  },
  methods: {
    editCourse() {
      console.log("pushed me");
    },
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
@import "/home/think__tech/Desktop/cte/styles/include/vars";

.mainWrapper {
  display: grid;
}
.header {
  display: flex;
  grid-row: 3;
  align-items: center;
  justify-content: center;
}
.courses {
  grid-row: 4;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
