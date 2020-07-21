<template>
  <div class="content">
    <div class="heading">
      <h2>Add Course</h2>
      <div class="buttons">
        <button class="primary" @click="submitForm" :disabled="!coverRecieved">
          Add
        </button>
        <router-link to="/admin/cmgt" tag="button">Back</router-link>
      </div>
    </div>

    <div class="form">
      <h4>Name</h4>
      <input type="text" name="name" v-model="course.name" />
      <h4>Subtitle</h4>
      <textarea
        name="subtitle"
        rows="7"
        placeholder="Course subtitle in maximum 100 characters"
        maxlength="100"
        v-model="course.subtitle"
      />

      <h4>Description</h4>
      <textarea
        name="description"
        rows="12"
        placeholder="Detailed description in minimum 250 characters."
        minlength="250"
        v-model="course.description"
      />

      <h4>Instructors</h4>

      <UserInput v-model="instructors" />
      <input type="hidden" name="instructors" v-model="instructorStr" />

      <h4 style="margin-bottom: 0;">Cover Image</h4>
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
      <button
        class="secondary"
        @click="submitCoverImage"
        type="button"
        v-if="!coverRecieved"
      >
        Upload
      </button>
      <img
        v-if="coverRecieved"
        :src="awsCover"
        alt="Course Cover Image"
        class="courseImage"
      />
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
  data() {
    return {
      course: {
        coverImage: null,
        description: null,
        instructors: null,
        name: null,
        subtitle: null,
      },
      coverImage: "",
      instructors: [],
      coverRecieved: false,
    };
  },
  computed: {
    instructorStr: function () {
      return this.instructors
        .map((x) => {
          return x.match(emailExtract)[1];
        })
        .join(",");
    },
    awsCover: function () {
      return this.course.coverImage;
    },
  },
  watch: {
    awsCover(val) {
      this.coverRecieved = !!val;
    },
  },
  methods: {
    formEnter: function (e) {
      if (e.target.localName !== "textarea") {
        e.preventDefault();
      }
    },
    async submitForm() {
      const sendCourse = { ...this.course, instructors: this.instructorStr };
      await axios.post("/admin/super/addCourse", sendCourse);
    },
    async submitCoverImage() {
      // Initialize the form data

      let formData = new FormData();

      // Add the form data we need to submit

      formData.append("content", this.coverImage);

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
.form {
  width: 100%;
  h4 {
    margin-bottom: 10px;
  }
  input[type="text"],
  textarea {
    width: 100%;
  }
}

.heading {
  display: flex;
  justify-content: space-around;
  align-items: center;
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

.h1ify {
  font-size: 200%;
  font-weight: 500;
}

.courseImage {
  width: 300px;
  height: auto;
}

label {
  display: block;
  margin: 10px 0;
}
</style>
