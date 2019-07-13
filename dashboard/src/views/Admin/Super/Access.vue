<template>
  <div>
    <Modal
      v-if="updateModal" 
      title="Update Access Level" 
      v-on:ok="updateAccess"
      v-on:close="updateModal = false"
    >
      <v-select v-model="accessLevel" :options="['student','admin', 'instructor']"/>
      <v-select v-model="instructorFor" placeholder="Course" style="margin-top:15px" v-if="accessLevel == 'instructor'"" :options="courseOptions" @search="searchCourses" />
    </Modal>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Access Level</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in users" v-bind:key="student._id">
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.role }}</td>
          <td><button @click="showUpdateModal(student.role)" class="primary">Update</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from '../../../components/Dialogs/Modal';
import vSelect from 'vue-select'

export default {
  components: {
    Modal,
    vSelect
  },
  
  data() {
    return {
      accessLevel: 'student',
      instructorFor: [],
      users: [],
      updateModal: false,
      courseOptions: []
    }

  },

  mounted () {
    axios.get('/admin/super/users').then(({ data }) => {
      this.users = data;
    });
  },

  methods: {
    searchCourses(search, loading) {
      loading(true);
      axios.get(`/admin/super/courses/search?q=${search}`)
        .then (({data}) => {
          this.courseOptions = data;
          loading(false);
        })
    },
    updateAccess() {
      axios.post('/admin/super/updateAccess', {
        role: this.accessLevel,
        instructor_for: this.instructorFor
      })
    },
    showUpdateModal(role) {
      this.updateModal = true;
      this.accessLevel = role;
    }
  }

}
</script>
