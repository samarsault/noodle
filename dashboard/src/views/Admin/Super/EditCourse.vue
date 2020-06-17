<template>
  <div class="mainWrapper">
    <div class="content" v-if="true">
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
          <button @click="toggleEdit()" v-if="!isEdit">
            Edit
          </button>
          <div style="padding: 0px; margin: 0px;" v-if="isEdit">
            <button class="primary" form="editForm">
              Save
            </button>
          </div>
          <button class="error" @click="delCourse(course._id)">
            Delete
          </button>
          <router-link to="/admin/cmgt" tag="button">View All</router-link>
        </div>
      </div>

      <img :src="course.coverImage" :alt="course.name" class="courseImage" />
      <form
        id="editForm"
        method="post"
        :action="`/admin/super/courses/update/${this.course._id}`"
        enctype="multipart/form-data"
      >
        <input type="file" name="coverImage" v-if="isEdit" value="Icon" />
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
              Offer Year
            </b>
          </h4>
          <input
            type="number"
            name="offerYear"
            placeholder="Year"
            v-model="course.offerYear"
            :disabled="!isEdit"
            :class="{ 'no-edit': !isEdit, edit: isEdit }"
          />
          <h4>
            <b>
              Offer Sem
            </b>
          </h4>
          <input
            type="number"
            name="offerSem"
            placeholder="Semester"
            v-model="course.offerSem"
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
          <UserInput v-model="instructors" v-if="isEdit" />
          <input type="hidden" name="instructors" v-model="instructorStr" />
          <br />
          <button>
            Handout
          </button>
          <input type="file" name="handout" v-if="isEdit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mutations } from "../../../utils/store";
import UserInput from "../../../components/Input/User";
const emailExtract = /<(.*)>/;

export default {
  components: {
    UserInput,
  },
  data() {
    return {
      course: null,
      isEdit: false,
      instNames: [],
      instructors: [],
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
  },
  async mounted() {
    this.setLoading(true);
    console.log("Wassup!");
    console.log(this.$route.params.course_id);
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
    console.log("instNames", this.instNames);
    console.log(this.course);
    this.setLoading(false);
  },
  methods: {
    ...mutations,
    formEnter: function (e) {
      if (e.target.localName !== "textarea") {
        e.preventDefault();
      }
    },
    toggleEdit() {
      // this.$swal("Hello dss world!!!", {
      //   confirmButtonColor: "#41b882",
      //   cancelButtonColor: "#ff7674",
      // });
      this.isEdit = !this.isEdit;
      console.log(this.course);
    },
    async saveCourse() {
      this.course = (
        await axios.put(`/admin/super/courses/update/${this.course._id}`, {
          course: this.course,
        })
      ).data;
      this.isEdit = !this.isEdit;
    },
    async delCourse() {
      console.log("hittn frontend del");
      const res = (
        await axios.delete(
          `/admin/super/courses/${this.$route.params.course_id}`
        )
      ).data;
      console.log(res);
      this.$router.push({ path: "/admin" });
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

form {
  padding: 0px;
}

label {
  display: block;
  margin: 10px 0;
}
</style>
