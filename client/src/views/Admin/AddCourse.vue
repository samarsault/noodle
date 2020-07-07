<template>
  <div class="mainWrapper">
    <div class="content" v-if="true">
      <div class="heading">
        <div class="buttons">
          <button class="primary" @click="submitForm">
            Add
          </button>
          <router-link to="/admin/cmgt" tag="button">Back</router-link>
        </div>
      </div>
    </div>

      <div class="form">
        <label for="name">Name</label>
        <input type="text" name="name" v-model="course.name" />
        <label>Subtitle</label>
        <textarea
          name="subtitle"
          rows="7"
          placeholder="Course subtitle in 50-100 characters"
          minlength="50"
          maxlength="100"
          v-model="course.subtitle"
        />

        <label>Description</label>
        <textarea
          name="description"
          rows="12"
          placeholder="Detailed description in 800-1000 characters."
          minlength="800"
          maxlength="1000"
          v-model="course.description"
        />
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
        <input
          type="text"
          name="coverImage"
          v-model="course.coverImage"
          v-if="false"
        />
        <input
          type="file"
          ref="coverImage"
          accept="image/png, image/jpeg"
          v-on:change="handleCoverUpload()"
        />
        <button @click="submitCoverImage" type="button">Upload Image</button>

        <label for="handout">Handout</label>
        <input
          type="text"
          name="handout"
          v-model="course.handout"
          v-if="false"
        />
        <input type="file" ref="handout" v-on:change="handleHandoutUpload()" />
        <button @click="submitHandout" type="button">Upload Handout</button>
      </div>
    </div>
  </div>
</template>

<script>
import UserInput from "@/components/Input/User";
import axios from "axios";
const emailExtract = /<(.*)>/;

export default {
  components: {
    UserInput,
  },
  computed: {
    instructorStr: function () {
      return this.instructors
        .map((x) => {
          return x.match(emailExtract)[1];
        })
        .join(",");
    },
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
        subtitle: null,
      },
      coverImage: "",
      handout: "",
      instructors: [],
    };
  },
  methods: {
    formEnter: function (e) {
      if (e.target.localName !== "textarea") {
        e.preventDefault();
      }
    },
    async submitForm() {
      const sendCourse = { ...this.course, instructors: this.instructorStr };
      const data = (await axios.post("/admin/super/addCourse", sendCourse))
        .data;
      console.log(data);
    },
    async submitHandout() {
      // Initialize the form data

      let formData = new FormData();

      // Add the form data we need to submit

      formData.append("handout", this.handout);

      // Make the request to the POST /single-file URL

      this.course.handout = (
        await axios.post("/admin/super/upload/handout", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).data;
    },
    handleHandoutUpload() {
      this.handout = this.$refs.handout.files[0];
    },

    async submitCoverImage() {
      // Initialize the form data

      let formData = new FormData();

      // Add the form data we need to submit

      formData.append("coverImage", this.coverImage);

      // Make the request to the POST /single-file URL

      this.course.coverImage = (
        await axios.post("/admin/super/upload/coverImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).data;
    },

    handleCoverUpload() {
      this.coverImage = this.$refs.coverImage.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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
.form {
  // padding: 0px;
  // margin: 0px;
}
.form * {
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

// .no-edit {
//   width: 100%;
//   padding: 0px;
//   color: inherit;
//   margin: 0px;
//   background-color: inherit;
// }

// .edit {
//   width: 100%;
//   padding: 0px;
//   color: inherit;
//   margin: 0px;
// }

label {
  display: block;
  margin: 10px 0;
}
</style>
