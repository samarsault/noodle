<template>
  <div class="course-main">
    <div class="sidebar">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
        "
      >
        <p style="font-weight: bold;">{{ course.name }}</p>
        <Plus @click="addPage" style="cursor: pointer;" />
      </div>
      <nav>
        <router-link
          v-for="page in pages"
          v-bind:key="page.name"
          :to="`/course/${course_id}/${page.type}/${page._id}`"
        >
          {{ page.name }}
        </router-link>
      </nav>
      <p style="padding-left: 10px; font-weight: bold;">Admin</p>
      <nav>
        <router-link :to="`/course/${course_id}/registrations`"
          >Registrations</router-link
        >
        <router-link :to="`/course/${course_id}/questions`"
          >Question Bank</router-link
        >
      </nav>
    </div>
    <div class="course-pages">
      <router-view :key="$route.path" />
    </div>
    <SelectItem
      title="Add page"
      v-if="addModal"
      @select="newPage"
      @close="addModal = false"
      :items="itemsToAdd"
    />
  </div>
</template>

<script>
import axios from "axios";
import { mutations } from "../utils/store";
import SelectItem from "../components/SelectItem.vue";

// Icons
import Plus from "vue-material-design-icons/Plus";

export default {
  data() {
    return {
      course_id: this.$route.params.course_id,
      course: {},
      admin: true,
      pages: [],
      addModal: false,
      itemsToAdd: [
        {
          name: "Article",
          description: "You can add course content here.",
        },
        {
          name: "Quiz",
          description: "Test your students",
        },
        {
          name: "Module",
          description: "Enclose pages & quiz in a single entity",
        },
      ],
    };
  },
  async created() {
    this.setLoading(true);
    try {
      this.course = (
        await axios.get(`/api/courses/${this.course_id}/view`)
      ).data;
      this.pages = (
        await axios.get(`/api/courses/${this.course_id}/pages`)
      ).data;

      this.setLoading(false);
    } catch (error) {
      throw error;
    }
  },
  components: {
    Plus,
    SelectItem,
  },
  methods: {
    ...mutations,
    addPage() {
      this.addModal = true;
    },
    async newQuiz(name) {
      const { data } = axios.post(
        `/admin/courses/${this.course_id}/quiz/init`,
        {
          name,
        }
      );
      if (data.success) {
        this.pages.push(data.quiz.name);
      }
    },
    async newPage(value) {
      const type = value.name;
      const name = prompt("Name:");
      if (!name) return;
      const response = await axios.post(
        `/admin/courses/${this.course_id}/page`,
        {
          name,
          course: this.course_id,
          type,
        }
      );
      this.pages.push(response.data);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles/include/_vars";

.sidebar {
  background-color: #222;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  color: #fff;
  flex-basis: 300px;
  h4 {
    color: #fff;
  }
  nav {
    list-style-type: none;
    margin: 0;
    padding: 0;
    a {
      display: block;
      padding: 15px;
      background-color: #0d0d0d;
      border-left: 3px solid #0d0d0d;
      cursor: pointer;
      color: inherit;
      &:hover {
        text-decoration: none;
      }
      &:focus {
        outline: none;
      }
      &.router-link-exact-active {
        border-left-color: $green;
      }
    }
  }
}
.course-main {
  display: flex;
}
.course-pages {
  flex-grow: 1;
  max-width: 840px;
  margin: auto;
}
</style>
