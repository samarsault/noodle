<template>
  <div v-if="course">
    <div class="heading">
      <input
        type="text"
        v-model="course.name"
        :disabled="!isEdit"
        :class="{ 'no-edit': !isEdit, edit: isEdit, h1ify: true }"
        name="name"
        form="editForm"
      />
      <div class="buttons">
        <button @click="archiveCourse(true)" v-if="!course.isArchived">
          Archive
        </button>
        <button @click="archiveCourse(false)" v-if="course.isArchived">
          UnArchive
        </button>
        <button @click="toggleEdit()" v-if="!isEdit">
          Edit
        </button>
        <button @click="toggleEdit()" v-if="isEdit">
          Discard
        </button>
        <button class="primary" @click="submit" v-if="isEdit">
          Save
        </button>
        <button class="error" @click="delCourse(course._id)" v-if="!isEdit">
          Delete
        </button>
        <router-link to="/admin/cmgt" tag="button">Back</router-link>
      </div>
    </div>

    <img
      :src="course.coverImage"
      v-if="!isEdit || !awsCover"
      :alt="course.name"
      class="courseImage"
    />
    <img v-if="awsCover && isEdit" :src="awsCover" class="courseImage" />
    <div class="padless" v-if="isEdit">
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
      <button @click="submitCoverImage" type="button" v-if="!coverRecieved">
        Upload Image
      </button>
    </div>
    <div class="info">
      <h4>
        <b>
          Subtitle
        </b>
      </h4>
      <textarea
        name="subtitle"
        placeholder="Course subtitle in maximum 100 characters"
        :val="course.subtitle"
        maxlength="100"
        v-model="course.subtitle"
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
        rows="6"
        placeholder="Detailed description in minimum 200 characters."
        minlength="200"
        v-model="course.description"
        :disabled="!isEdit"
        :class="{ 'no-edit': !isEdit, edit: isEdit }"
      />
      <h4>
        <b>
          Instructors
        </b>
      </h4>
      <ul v-if="!isEdit">
        <li v-for="inst in instNames" :key="inst">
          {{ inst }}
        </li>
      </ul>
      <UserInput v-model="instructors" v-if="isEdit" :value="instructors" />
      <input type="hidden" name="instructors" v-model="instructorStr" />
      <br />

      <a :href="course.handout" target="_blank" rel="noopener noreferrer">
        <button v-if="!isEdit">
          Handout
        </button>
      </a>

      <div v-if="isEdit" class="padless">
        <label for="handout">Handout</label>
        <input
          type="text"
          name="handout"
          v-model="course.handout"
          v-if="false"
        />
        <input type="file" ref="handout" v-on:change="handleHandoutUpload()" />
        <button @click="submitHandout" type="button" v-if="!handoutRecieved">
          Upload Handout
        </button>
      </div>

      <div class="padless" v-if="!isEdit">
        <h4>
          <b>
            Registered Students
          </b>
        </h4>
        <Registrations />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mutations } from "@/utils/store";
import UserInput from "@/components/Input/User";
import Registrations from "@/views/Course/Registrations";

const emailExtract = /<(.*)>/;

export default {
  components: {
    UserInput,
    Registrations,
  },
  data() {
    return {
      course: null,
      isEdit: false,
      instNames: [],
      instructors: [],
      url: null,
      coverImage: "",
      handout: "",
      coverRecieved: false,
      handoutRecieved: false,
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
    awsHandout: function () {
      return this.course.handout;
    },
  },
  async mounted() {
    this.doMounting();
  },
  methods: {
    ...mutations,
    async doMounting() {
      this.setLoading(true);
      this.course = (
        await axios.get(`/admin/super/courses/${this.$route.params.course_id}`)
      ).data;
      const instructorDelegates = this.course.instructors.map(
        async (instructor_id) => {
          const user = (
            await axios.get(`/admin/super/users/searchById/?q=${instructor_id}`)
          ).data;
          return user.name;
        }
      );
      this.instNames = await Promise.all(instructorDelegates);
      const instructorPromises = this.course.instructors.map(
        async (instructor_id) => {
          const user = (
            await axios.get(`/admin/super/users/searchById/?q=${instructor_id}`)
          ).data;
          return `${user.name} <${user.email}>`;
        }
      );
      this.instructors = await Promise.all(instructorPromises);
      this.setLoading(false);
    },
    async submit() {
      this.course = (
        await axios.put(`/admin/super/courses/update/${this.course._id}`, {
          ...this.course,
          instructors: this.instructorStr,
        })
      ).data;
      this.isEdit = !this.isEdit;
      this.doMounting();
    },
    async archiveCourse(toArchive) {
      this.course = (
        await axios.put(
          `/admin/super/courses/archive/${this.course._id}/${toArchive}`
        )
      ).data;
    },
    async toggleEdit() {
      this.isEdit = !this.isEdit;
      this.course = (
        await axios.get(`/admin/super/courses/${this.$route.params.course_id}`)
      ).data;
    },
    async delCourse() {
      // Use sweetalert2
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "This is a non reversible operation",
          icon: "error",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, keep it",
        })
        .then(async (result) => {
          if (result.value) {
            this.$swal.fire(
              "Deleted!",
              "The course is successfully deleted",
              "success"
            );

            await axios.delete(
              `/admin/super/courses/${this.$route.params.course_id}`
            );

            this.$router.push({ path: "/admin" });
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
          } else if (result.dismiss === this.$swal.DismissReason.cancel) {
            this.$swal.fire(
              "Cancelled",
              "Your imaginary file is safe :)",
              "error"
            );
          }
        });
    },
    async submitHandout() {
      // Initialize the form data

      let formData = new FormData();

      // Add the form data we need to submit

      formData.append("content", this.handout);

      // Make the request to the POST /single-file URL

      this.course.handout = (
        await axios.post("/admin/super/upload/handout", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).data;
      this.handoutRecieved = true;
    },
    handleHandoutUpload() {
      this.handout = this.$refs.handout.files[0];
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
      this.coverRecieved = true;
    },

    handleCoverUpload() {
      this.coverImage = this.$refs.coverImage.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.heading {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0;
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
  width: 300px;
  height: 178px;
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
  border: 0px;
}

.edit {
  width: 100%;
  padding: 0px;
  color: inherit;
  margin: 0px;
}

form {
  padding: 0px;
}

label {
  display: block;
  margin: 10px 0;
}
</style>
