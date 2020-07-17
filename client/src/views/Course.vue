<template>
  <div class="course-main">
    <div :class="`sidebar ${sidebarHidden ? 'hidden-mobile' : ''}`">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
        "
      >
        <div style="display: flex; align-items: center;">
          <router-link style="color: #ddd; margin-right: 5px;" to="/dashboard">
            <Back style="margin-top: 4px;" />
          </router-link>
          <p style="font-weight: bold;">{{ course.name }}</p>
        </div>
        <Plus v-if="isAdmin" @click="addPage()" style="cursor: pointer;" />
      </div>
      <nav>
        <div v-for="module in modules" :key="module._id">
          <a
            :key="module._id"
            class="icon-centre"
            v-on:click="toggleModule(module)"
          >
            <FolderOpen
              v-if="module._id === activeModule"
              style="margin-right: 10px;"
            />
            <Folder v-else style="margin-right: 10px;" />
            {{ module.name }}
          </a>
          <div class="module-content" v-if="module._id == activeModule">
            <router-link
              v-for="page in modulePages"
              v-bind:key="page.name"
              class="module-item"
              :to="`/dashboard/course/${course_id}/${page.type}/${page._id}`"
            >
              <div>
                {{ page.name }}
              </div>
              <div class="module-panel" v-if="isAdmin">
                <Edit :size="20" />
                <Bin :size="20" />
              </div>
            </router-link>
            <a
              v-if="isAdmin"
              href="#"
              @click="addPage(module._id)"
              class="icon-centre"
            >
              <Plus />
              Add
            </a>
          </div>
        </div>
        <router-link
          v-for="page in content"
          v-bind:key="page.name"
          :to="`/dashboard/course/${course_id}/${page.type}/${page._id}`"
        >
          <li>{{ page.name }}</li>
        </router-link>
      </nav>
      <div v-if="isAdmin">
        <p style="padding-left: 10px; font-weight: bold;">Admin</p>
        <nav>
          <!-- Question bank -->
          <a class="icon-centre" v-on:click="toggleQuestionBank">
            <FolderOpen v-if="isQuestionBankOpen" style="margin-right: 10px;" />
            <Folder v-else style="margin-right: 10px;" />
            Question Bank
          </a>
          <div class="module-content" v-if="isQuestionBankOpen">
            <router-link
              v-for="group in questionGroups"
              v-bind:key="group"
              :to="`/dashboard/course/${course_id}/questions/${group}`"
            >
              {{ group }}
            </router-link>
            <a href="#" @click="addQuestionGroup" class="icon-centre">
              <Plus />
              Add Group
            </a>
          </div>
          <!-- Registrations -->
          <router-link :to="`/dashboard/course/${course_id}/registrations`"
            >Registrations</router-link
          >
        </nav>
      </div>
    </div>
    <div :class="`course-pages ${sidebarHidden ? '' : 'hidden-mobile'}`">
      <router-view :isAdmin="isAdmin" :key="$route.path" />
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
import { mutations, getters } from "../utils/store";
import SelectItem from "../components/SelectItem.vue";

// Icons
import Plus from "vue-material-design-icons/Plus";
import Edit from "vue-material-design-icons/Pencil";
import Bin from "vue-material-design-icons/TrashCan";
import Folder from "vue-material-design-icons/Folder";
import FolderOpen from "vue-material-design-icons/FolderOpen";
import Back from "vue-material-design-icons/ChevronLeft";

export default {
  computed: {
    ...getters,
    sidebarHidden() {
      if (this.$route.name && this.$route.name === "course") {
        // Navigation page
        return false;
      }
      return true;
    },
    modules() {
      return this.pages.filter((x) => x.type === "Module");
    },
    content() {
      return this.pages.filter((x) => x.type !== "Module");
    },
    isAdmin() {
      if (!this.course.instructors) return false;
      return this.course.instructors.indexOf(this.user._id) != -1;
    },
    isQuestionBankOpen() {
      return this.activeModule === "qb";
    },
  },
  data() {
    return {
      course_id: this.$route.params.course_id,
      course: {},
      pages: [],
      modulePages: [],
      addModal: false,
      // Which module is active right now
      activeModule: null,
      addToModule: null,
      questionGroups: [],
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
      this.course = (await axios.get(`/api/courses/${this.course_id}`)).data;
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
    Edit,
    Back,
    Bin,
    SelectItem,
    Folder,
    FolderOpen,
  },
  methods: {
    ...mutations,
    addPage(parent) {
      if (parent) {
        this.addToModule = parent;
      } else {
        this.addToModule = null;
      }
      this.addModal = true;
    },
    async toggleQuestionBank() {
      if (this.activeModule === "qb") {
        this.activeModule = null;
      } else {
        this.activeModule = "qb";
        if (this.questionGroups.length === 0) {
          const { data } = await axios.get(
            `/api/courses/${this.course_id}/questions/groups`
          );
          this.questionGroups = data;
        }
      }
    },
    addQuestionGroup() {
      const name = prompt("Name:");
      this.questionGroups = [...this.questionGroups, name];
    },
    async toggleModule(page) {
      if (this.activeModule === page._id) {
        this.activeModule = null;
      } else {
        const { data } = await axios.get(
          `/api/courses/${this.course_id}/pages/${page._id}`,
          {
            params: {
              parent: page._id,
            },
          }
        );
        this.modulePages = data;
        this.activeModule = page._id;
      }
    },
    async newPage(value) {
      const type = value.name;
      const name = prompt("Name:");
      if (!name) return;
      if (type === "Module" && this.addToModule) return;
      const response = await axios.post(
        `/admin/courses/${this.course_id}/page`,
        {
          name,
          course: this.course_id,
          type,
          parent: this.addToModule ? this.activeModule : null,
        }
      );
      if (this.addToModule) this.modulePages.push(response.data);
      else this.pages.push(response.data);
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: $burgerToggleWidth) {
  .hidden-mobile {
    display: none;
  }
}

.sidebar {
  background-color: #222;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  color: #fff;
  @media screen and (max-width: $burgerToggleWidth) {
    flex-basis: 100%;
    width: 100%;
    &.hidden-mobile {
      display: none;
    }
  }
  flex-basis: 300px;
  min-width: 300px;
  user-select: none;
  h4 {
    color: #fff;
  }
  nav {
    list-style-type: none;
    margin: 0;
    padding: 0;
    .module-content > a {
      background: #222;
      &:not(:last-child) {
        border-bottom: 1px solid #444;
      }
    }
    .module-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #999;
        padding: 0 5px;
      }
    }
    a {
      display: block;
      padding: 15px;
      border-bottom: 1px solid #222;
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
      &.router-link-active {
        border-left-color: $green;
      }
    }
  }
}
.course-main {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}
.course-pages {
  flex-grow: 1;
  position: relative;
  padding: 30px 100px;
  overflow: scroll;
  height: 100%;
  @media screen and (max-width: $burgerToggleWidth) {
    padding: 30px 20px;
    max-width: 600px;
    margin: 0 auto;
  }
}
.icon-centre {
  display: flex !important;
  align-items: center;
}
</style>
