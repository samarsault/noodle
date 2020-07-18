<template>
  <div class="container" v-if="course">
    <h1>{{ course.name }}</h1> 
    <div class="course-view ">
      <p>{{ course.description }}</p>
      <img width="480" :src="course.coverImage">
    </div>
    <div style="margin-bottom: 30px">
      <router-link :to="`/dashboard/course/${course._id}`" v-if="courseRegistered">
        <button v-if="courseRegistered" class="primary">Go To Course</button>
      </router-link>
      <button v-else class="primary" @click="register(course._id)">Enroll</button>
    </div>
    <div v-if="handout" class="handout">
      <h2>Curriculum</h2>
      <div v-for="item in Object.keys(handout)" :key="item" class="handout-item">
        <p>{{ item }}</p>
        <ul class="handout-list">
          <li v-for="page in handout[item]" :key="page._id">{{ page.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import courseApi from '@/api/course';
import coursesApi from '@/api/courses';
import { getters } from '@/utils/store'

export default {
  data() {
    return {
      course_id: this.$route.params.course_id,
      course: {},
      handout: null
    }
  },
  computed: {
    ...getters,
    courseRegistered() {
      if (!this.user)
        return false;
      return this.user.courses.includes(this.course._id);
    }
  },
  async created() {
    this.course = await coursesApi.getCourse(this.course_id)
    this.handout = await coursesApi.getHandout(this.course_id);
    if (Object.keys(this.handout).length === 0) 
      this.handout = null;
  },
  methods: {
    async register(course_id) {
      try {
      const registerSuccess = await courseApi(course_id).register();
      if (registerSuccess) {
        this.$router.push({
          path: '/dashboard'
        })
      } else {
        alert('Error registering. Please ensure that you are logged in.')
      }
      } catch(e) {
        alert('Error registering. Please ensure that you are logged in.')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.course-view {
  display: flex;
  > img {
    padding: 20px;
  }
  @media screen and (max-width: 720px) {
    flex-direction: column-reverse;
    > img {
      padding: 0;
    }
  }
}
ul {
  padding: 0;
  list-style-type: none;
}
.handout {
  max-width: 640px;
  p {
    margin-top: 0;
    font-weight: bold;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  &-item {
    background-color: #fff;
    border: 1px solid rgba(33,36,44,0.16);
    border-radius: 4px;
    padding: 20px;
    margin: 10px 0;
  }
}
.handout-list {
  color: rgba($black, 0.7);
  li {
    margin: 10px 0;
  }
}
</style>
