<template>
  <div class="mainWrapper">
    <div class="content" v-if="true">
      <div class="heading">
        <input
          type="text"
          :value="`${course.name}
          (${course.offerYear} - ${course.offerSem})`"
          :disabled="!isEdit"
          :class="{ 'no-edit': !isEdit, edit: isEdit, h1ify: true }"
        />
        <div class="buttons">
          <button @click="toggleEdit()" v-if="!isEdit">
            Edit
          </button>
          <button @click="toggleEdit()" v-if="isEdit">
            Save
          </button>
          <button class="error" @click="delCourse(course._id)">
            Delete
          </button>
          <router-link to="/admin/cmgt" tag="button">View All</router-link>
        </div>
      </div>

      <img :src="course.coverImage" :alt="course.name" class="courseImage" />

      <div class="info">
        <h4>
          <b>
            Summary
          </b>
        </h4>
        <textarea
          name="summary"
          placeholder="Course summary in 200-250 characters"
          :val="course.summary"
          minlength="200"
          maxlength="250"
          v-model="course.summary"
          :disabled="!isEdit"
          :class="{ 'no-edit': !isEdit, edit: isEdit }"
        >
        </textarea>
        <h4>
          <b>
            Description
          </b>
        </h4>
        <textarea
          name="description"
          rows="12"
          placeholder="Detailed description in 800-1000 characters."
          minlength="800"
          maxlength="1000"
          v-model="course.description"
          :disabled="!isEdit"
          :class="{ 'no-edit': !isEdit, edit: isEdit }"
        />
        <h4>
          <b>
            Instructors
          </b>
        </h4>
        <p>
          {{ course.instructors }}
        </p>
        <button>
          Handout
        </button>
      </div>
    </div>
    <div v-if="false">
      <div class="heading">
        <h3>
          {{ course.name }}
          ({{ course.offerYear }} - {{ course.offerSem }})
        </h3>
        <div class="buttons">
          <button @click="toggleEdit()" v-if="isEdit">
            Save
          </button>
          <button class="error" @click="delCourse(course._id)">
            Delete
          </button>
          <button>
            View All
          </button>
        </div>
      </div>

      //FORM BEGINS

      <form
        method="post"
        action="/admin/super/addCourse"
        enctype="multipart/form-data"
        v-on:keydown.enter="formEnter"
      >
        <label for="name">Name</label>
        <input type="text" name="name" v-model="course.name" />

        <input
          type="number"
          name="offerYear"
          placeholder="Year"
          v-model="course.offerYear"
        />
        <input
          type="number"
          name="offerSem"
          placeholder="Semester"
          v-model="course.offerSem"
        />

        <label for="instructors">Instructors</label>

        <UserInput v-model="instructors" />
        <input type="hidden" name="instructors" v-model="instructorStr" />

        <label for="coverImage">Cover Image</label>
        <input type="file" name="coverImage" accept="image/png, image/jpeg" />

        <label for="handout">Handout:</label>
        <input type="file" name="handout" />

        <button class="primary">Add Course</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Magnify from "vue-material-design-icons/Magnify";
import FilterVariant from "vue-material-design-icons/FilterVariant";
import Card from "../../../components/Card";

const emailExtract = /<(.*)>/;

export default {
  components: {
    FilterVariant,
    Magnify,
    Card,
  },
  data() {
    return {
      course: null,
      isEdit: false,
    };
  },
  async mounted() {
    console.log("Wassup!");
    console.log(this.$route.params.course_id);
    this.course = (
      await axios.get(`/admin/super/courses/${this.$route.params.course_id}`)
    ).data;
    console.log(this.course);
  },
  methods: {
    toggleEdit() {
      this.isEdit = !this.isEdit;
    },
    async delCourse(id) {
      console.log("hittn frontend del");
      const res = (
        await axios.put(`/admin/super/courses/${this.$route.params.course_id}`)
      ).data;
      console.log(res);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/home/think__tech/Desktop/cte/styles/include/vars";

form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 40px;
  padding-right: 200px;
  padding-left: 200px;
}

.mainWrapper {
  display: grid;
}
.content {
  padding: 40px;
  padding-right: 200px;
  padding-left: 200px;
}
.heading {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
}

.buttons {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  // margin: 5px;
}
.courseImage {
  padding: 20px;
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

.no-edit {
  width: 100%;
  padding: 0px;
  color: inherit;
  margin: 0px;
  background-color: inherit;
}

.edit {
  width: 100%;
  padding: 0px;
  color: inherit;
  margin: 0px;
}

label {
  display: block;
  margin: 10px 0;
}
</style>
