<template>
  <div class="mainWrapper">
    <div class="heading">
      <h2>{{ user.name }} ({{ user.bits_id }})</h2>

      <div class="buttons">
        <a :href="`mailto:${user.email}`"><button>Email</button></a>
        <router-link to="/admin/umgt" tag="button">Back</router-link>
      </div>
    </div>
    <div class="content">
      <h4>
        Registered Courses
      </h4>
      <!-- <Students/> -->
      <ul v-for="course in courses" :key="course">
        <li>
          {{ course.name }}
          <button class="error" @click="dereg(course.name)">Deregister</button>
        </li>
      </ul>
      <div v-if="!courses.length">
        None
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      user: null,
      courses: [],
    };
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
@import "../../../../../styles/include/vars";

.mainWrapper {
  display: flex;
  flex-direction: column;
}

.heading {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
}
.content {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  margin: 0px;
  margin-left: 200px;
  margin-right: 200px;
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
