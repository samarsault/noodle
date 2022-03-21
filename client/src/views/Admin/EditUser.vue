<template>
  <div v-if="user">
    <div class="header">
      <div>
        <h2>{{ user.name }}</h2>
        <p style="color: #999;">{{ user.email }}</p>
        <p style="color: #999;">{{ user.bits_id }}</p>
        <p style="color: #999;">{{ user.phone }}</p>
        <p>
          {{ pseudoUser.role | title }}
          <a href="#" @click="alterAccess">
            {{ pseudoUser.role === "student" ? "Upgrade" : "Downgrade" }}
          </a>
        </p>
      </div>

      <div class="buttons">
        <router-link to="/admin/umgt" tag="button">Back</router-link>
      </div>
    </div>
    <div class="content">
      <h4>
        Registered Courses
      </h4>
      <!-- <Students/> -->
      <div style="display: flex; flex-wrap: wrap;">
        <CourseCard
          v-for="course in courses"
          :key="course._id"
          :course="course"
        >
          <template slot="action">
            <button class="error" @click="dereg(course.name)">
              Deregister
            </button>
          </template>
        </CourseCard>
        <div v-if="!courses.length">
          None.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CourseCard from "@/components/CourseCard.vue";
import { getters } from '../../utils/store';
export default {
  data() {
    return {
      pseudoUser: null,
      courses: [],
    };
  },
  filters: {
    title: (str) => {
      return `${str[0].toUpperCase()}${str
        .toLowerCase()
        .substr(1, str.length - 1)}`;
    },
  },
  components: {
    CourseCard,
  },
  async mounted() {
    this.pseudoUser = (
      await axios.get(
        `/admin/super/users/searchById/?q=${this.$route.params.user_id}`
      )
    ).data;
    const courses = this.pseudoUser.courses.map(async (course_id) => {
      return (await axios.get(`/admin/super/courses/${course_id}`)).data;
    });
    this.courses = await Promise.all(courses);
  },
  methods: {
    ...getters,
    async dereg(courseName) {
      await axios.post("/admin/super/deregister", {
        email: this.pseudoUser.email,
        course: courseName,
      });
      //Refresh the page for new data
      this.user = (
        await axios.get(
          `/admin/super/users/searchById/?q=${this.$route.params.user_id}`
        )
      ).data;
      const courses = this.user.courses.map(async (course_id) => {
        return (await axios.get(`/admin/super/courses/${course_id}`)).data;
      });
      this.courses = await Promise.all(courses);
    },
    async alterAccess() {
      const oppositeRole = this.pseudoUser.role === "admin" ? "student" : "admin";
      try {
        if(this.pseudoUser._id === this.user()._id){
          const confirmation = confirm(
            `Warning! you will be demoted to a ${oppositeRole}?`
          );
          if(!confirmation) return;
        }
        const { status } = await axios.post("/admin/super/users/updateAccess", {
          user_id: this.pseudoUser._id,
          role: oppositeRole,
        });
        if (status !== 200) throw new Error("Error updating access level");
        this.pseudoUser.role = oppositeRole;
      } catch (err) {
        alert(err.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.content {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0px;
}
</style>