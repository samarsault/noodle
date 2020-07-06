<template>
  <div class="mainWrapper">
    <div class="header">
      <input
        type="text"
        placeholder="Search by Name"
        v-model="searchField"
        v-on:keydown.enter="search()"
      />
      <button @click="search()" type="submit" ref="submitBtn">
        <Magnify />
      </button>
      <button @click="showAlert">
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
    <div v-if="showRes" class="showing-res">
      Showing results for {{ searchField }}
    </div>
    <div class="courses">
      <Card v-for="course in courses" :key="course._id" :course="course" />
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
import FilterVariant from "vue-material-design-icons/FilterVariant";
import Plus from "vue-material-design-icons/Plus";
import Card from "../../../components/Card";
import { mutations } from "../../../utils/store";

export default {
  components: {
    FilterVariant,
    Magnify,
    Plus,
    Card,
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
        this.courses = (await axios.get("/admin/super/courses/all")).data;
        this.showRes = false;
      } else {
        this.courses = (
          await axios.get(`/admin/super/courses/search/?q=${this.searchField}`)
        ).data;
        console.log(this.courses);
        this.showRes = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
  grid-row: 3;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}
.showing-res {
  grid-row: 2;
  display: flex;
  justify-content: center;
  align-items: center;
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
