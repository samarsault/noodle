<template>
  <div class="course-main">
    <div class="sidebar">
      <div style="display: flex;align-items:center;justify-content:space-between;padding: 0 10px;">
	<p style="font-weight: bold">{{ course.name }}</p>
	<Plus @click="addPage" style="cursor:pointer"/>
      </div>
      <nav>
        <router-link 
          v-for="page in pages" 
          :to="`/course/${course_id}/pages/${page._id}`" 
          >
	    {{ page.name }}
        </router-link>
      </nav>
      <p style="padding-left: 10px;font-weight: bold">Admin</p>
      <nav>
        <router-link :to="`/course/${course_id}/registrations`">Registrations</router-link>
      </nav>
    </div>
    <div class="course-pages">
      <router-view :key="$route.path"/>
    </div>
    <SelectItem title="Add page" v-if="addModal" @select="itemSelected" @close="addModal = false" :items="itemsToAdd"/>
  </div>
</template>

<script>
import axios from 'axios'
import { mutations } from '../utils/store';
import Modal from '../components/Dialogs/Modal.vue';
import SelectItem from '../components/SelectItem.vue';

// Icons
import FallbackIcon from 'vue-material-design-icons/FileDocumentOutline';
import Plus from 'vue-material-design-icons/Plus';

export default {
  data() {
    return {
      course_id: this.$route.params.course_id,
      course: {},
      admin: true,
      pages: [],
      addModal: false,
      itemsToAdd: [{
        name: 'Page',
        description: 'You can add course content here.'
      }]
    }
  },
  async created () {

    this.setLoading(true);
    try {
      this.course = (await axios.get(`/api/courses/${this.course_id}/view`)).data;
      this.pages = (await axios.get(`/api/courses/${this.course_id}/pages`)).data;

      this.setLoading(false);
    } catch (error) {
      console.error(error);
    }

  },
  components: {
    Plus,
    SelectItem
  },
  methods: {
    ...mutations,
    addPage() {
      this.addModal = true;
    },

    async itemSelected(value) {
      alert('Selected ' + value.name);
      const name = prompt('Name:');
      if (!name)
        return;
      const response = await axios.post(`/admin/courses/${this.course_id}/page/create`, {
	name
      });
      this.pages.push(response.data);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/include/_vars';

.sidebar {
  background-color: #222;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.3);
  color: #fff ;
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
      background-color: #0D0D0D;
      border-left: 3px solid #0D0D0D;
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
	width: 840px;
	margin: auto;
}
</style>
