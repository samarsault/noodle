<template>
  <div class="mainWrapper">
    <div class="content" v-if="true">
      <div class="heading">
        <div class="buttons">
          <button v-if="isEdit" class="primary" form="addForm">
            Add
          </button>
          <router-link to="/admin/cmgt" tag="button">View All</router-link>
        </div>
      </div>

      <form
			id="addForm"
        method="post"
        action="/admin/super/addCourse"
        enctype="multipart/form-data"
        v-on:keydown.enter="formEnter"
      >
        <label for="name">Name</label>
        <input type="text" name="name" />
        <label>Summary</label>
        <textarea
          name="summary"
          rows="7"
          placeholder="Course summary in 200-250 characters"
          minlength="200"
          maxlength="250"
        />

        <label>Description</label>
        <textarea
          name="description"
          rows="12"
          placeholder="Detailed description in 800-1000 characters."
          minlength="800"
          maxlength="1000"
        />
        <input type="number" name="offerYear" placeholder="Year" />
        <input type="number" name="offerSem" placeholder="Semester" />

        <label for="instructors">Instructors</label>

        <UserInput v-model="instructors" />
        <input type="hidden" name="instructors" v-model="instructorStr" />

        <label for="coverImage">Cover Image</label>
        <input type="file" name="coverImage" accept="image/png, image/jpeg" />

        <label for="handout">Handout:</label>
        <input type="file" name="handout" />
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
      course: {
        coverImage: null,
        description: null,
        handout: null,
        instructors: null,
        name: null,
        offerSem: null,
        offerYear: null,
        summary: null,
      },
      isEdit: true,
    };
  },
  methods: {
		formEnter: function (e) {
      if (e.target.localName !== "textarea") {
        e.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../../styles/include/vars";

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
form {
  padding: 0px;
  margin: 0px;
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
