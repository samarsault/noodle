<template>
  <div>
    <div class="heading">
      <div>
        <h2>{{ user.name }}</h2>
        <p style="color: #999;">{{ user.email }}</p>
        <p style="color: #999;">{{ user.bits_id }}</p>
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
      <CourseCard v-for="course in courses" :key="course._id" :course="course">
        <template slot="action">
          <button class="error" @click="dereg(course.name)">Deregister</button>
        </template>
      </CourseCard>
      <div v-if="!courses.length">
        None
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CourseCard from "@/components/CourseCard.vue";

export default {
  data() {
    return {
      user: null,
      courses: [],
    };
  },
  components: {
    CourseCard,
  },
  async mounted() {
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
  methods: {
    async dereg(courseName) {
      await axios.post("/admin/super/deregister", {
        email: this.user.email,
        course: courseName,
      });

      this.$router.push({ path: `/admin/umgt/${this.user._id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.heading {
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
a {
  text-decoration: none;
  color: inherit;
}
.mainWrapper h2 {
  padding: 0px;
  margin: 0px;
  grid-row: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.h1ify {
  font-size: 200%;
  font-weight: 500;
}
</style>
