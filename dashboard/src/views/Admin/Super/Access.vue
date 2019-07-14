<template>
  <div>
    <Modal
      v-if="updateModal" 
      title="Update Access Level" 
      v-on:ok="updateAccess"
      v-on:close="updateModal = false"
    >
      <v-select v-model="accessLevel" :options="['student','admin', 'instructor']"/>
      <CourseInput :selected="instructorFor" v-if="accessLevel === 'instructor'"/>
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
import CourseInput from "../../../components/Input/Course";
import vSelect from 'vue-select'

export default {
  components: {
    Modal,
    vSelect,
    CourseInput
  },
  
  data() {
    return {
      accessLevel: 'student',
      instructorFor: '',
      users: [],
      updateModal: false,
    }

  },

  mounted () {
    axios.get('/admin/super/users').then(({ data }) => {
      this.users = data;
    });
  },

  methods: {
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
