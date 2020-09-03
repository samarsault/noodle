<template>
  <div v-if="course">
    <div class="course-view ">
      <div class="container">
      <div>
        <h2 style="margin-top: 0">{{ course.name }}</h2> 
        <p>{{ course.description }}</p>
        <router-link :to="`/dashboard/course/${course._id}`" v-if="courseRegistered">
          <button class="primary">Go To Course</button>
        </router-link>
        <button v-else class="primary" @click="showTerms = true">Register</button>
        <a v-if="course.handout" :href="course.handout" target="_blank" rel="noopener noreferrer">
          <button v-if="!isEdit" class="secondary">
            Handout
          </button>
        </a>
      </div>
      <img :src="course.coverImage">
      </div>
    </div>
   <div v-if="handout" class="handout container">
      <h2>Topics</h2>
      <div class="handout-items">
        <div v-for="item in handout" :key="item._id" class="handout-item">
          <div class="handout-card">
            <p>{{ item.name }}</p>
            <ul class="handout-list">
              <li v-for="page in item.children" :key="page._id">
                <router-link v-if="courseRegistered" :to="`/dashboard/course/${course._id}/${page.type}/${page._id}`">{{ page.name }}</router-link>
                <span v-else>{{ page.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Terms v-if="showTerms" @ok="register(course._id)" @close="showTerms = false" :name="course.name"/>
  </div>
</template>

<script>
import axios from 'axios';
import courseApi from '@/api/course';
import coursesApi from '@/api/courses';
// import Footer from "./components/Footer.vue"
import { getters } from '@/utils/store'
import Terms from "./components/Terms";

export default {
  data() {
    return {
      course: null,
      course_id: this.$route.params.course_id,
      handout: null,
      showTerms: false
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
  components: {
    Terms
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
  padding: 20px 40px 40px 40px;
  width: 100%;
  // margin-top: 20px;
  background-color: #fff;
  @media screen and (max-width: $burgerToggleWidth) {
    padding: 20px;
  }
}
.course-view > .container{
  display: flex;
  // border: 1px solid rgba(33,36,44,0.16);
  // border-radius: 4px;
  align-items: center;

  > img {
    padding: 20px;
    max-width: 480px;
    flex-shrink: 0; // firefox
  }
  @media screen and (max-width: 1024px) {
    flex-direction: column-reverse;
    > img {
      padding: 0 0 20px 0;
      max-width: 100%;
    }
  }
}
ul {
  padding: 0;
  list-style-type: none;
}
.handout {
  p {
    margin-top: 0;
    font-weight: bold;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  .handout-items {
    display: flex;
    flex-wrap: wrap;
    @media screen and (max-width: 720px) {
      flex-direction: column;
    }
  }
  &-item {
    padding: 10px;
    flex-basis: 50%;
  }
  &-card {
    padding: 20px;
    background-color: #fff;
    border: 1px solid rgba(33,36,44,0.16);
    border-radius: 4px;
    height: 100%;
  }
}
.handout-list {
  color: rgba($black, 0.7);
  li {
    margin: 10px 0;
  }
}
</style>
