<template lang="pug">
section#courses
  .container
    h1 Courses
    .courses
      CourseCard(v-for="course in courses", :course="course", :key="course._id", style="max-height: 400px")
        template(slot='action')
          p(style='margin-top: 0') {{ course.subtitle }}
          router-link(:to="`/course/${course._id}`")
            button.secondary View
</template>
<script>
import coursesApi from '@/api/courses';
import CourseCard from '@/components/CourseCard'

export default {
  components: {
    CourseCard
  },
  data() {
    return {
      courses: []
    }
  },
  async created() {
    this.courses = await coursesApi.getAll();
  },
}
</script>
<style lang="scss">
.courses {
  display: flex;
  button {
    width: 90px;
    margin: 0 auto;
    display: block;
  }
  @media screen and (max-width: 720px) {
    flex-direction: column;
    .card {
      width: calc(100% - 40px);
    }
    img {
      height: 240px !important;
    }
  }
}
</style>
