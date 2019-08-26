<template>
  <div>
    <Modal
      v-if="updateModal" 
      title="Update Access Level" 
      v-on:ok="updateAccess"
      v-on:close="updateModal = false"
    >
      <v-select v-model="accessLevel" :options="['student','admin', 'instructor']"/>
      <CourseInput style="margin-top:15px" v-model="instructorFor" v-if="accessLevel === 'instructor'"/>
    </Modal>

		<div class="flex-away">
			<div>
				<p>Total: {{ users.total }} entries</p>
				<p>Showing: Page {{ users.page }} of {{ users.pages }} </p>
			</div>
			<div>
				<button @click="goToPage(parseInt(users.page) - 1)"><PrevIcon/></button>
				<button @click="goToPage(parseInt(users.page) + 1)"><NextIcon/></button>
			</div>
		</div>
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
        <tr v-for="student in users.docs" v-bind:key="student._id">
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.role }}</td>
          <td><button @click="showUpdateModal(student.role, student._id)" class="primary">Update</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from '../../../components/Dialogs/Modal';
import CourseInput from "../../../components/Input/Course";
import NextIcon from 'vue-material-design-icons/ArrowRight';
import PrevIcon from 'vue-material-design-icons/ArrowLeft';
import vSelect from 'vue-select'
import event from '../../../utils/event';

export default {
  components: {
    Modal,
    vSelect,
		CourseInput,
		PrevIcon,
		NextIcon
  },
  
  data() {
    return {
      accessLevel: 'student',
      instructorFor: '',
			updateModal: false,
			users: {
				total: 0,
				page: 0,
				pages: 0,
				docs: []
			},
			selectedUser: ''
    }

  },

  mounted () {
		this.goToPage();
  },

  methods: {
    updateAccess() {
      axios.post('/admin/super/users/updateAccess', {
				user_id: this.selectedUser,
        role: this.accessLevel,
        instructor_for: this.instructorFor
			})
			.then( ({ data }) => {
				this.updateModal = false;
				event.$emit('alert', 'success', `Updated Access to ${this.accessLevel}`);
			});
    },
    showUpdateModal(role, _id) {
      this.updateModal = true;
			this.accessLevel = role;
			this.selectedUser = _id;
		},
		goToPage(page) {
			if (page && (page < 0 || page > this.users.pages))
				return;

			if (!page)
				page = 1;

			axios.get(`/admin/super/users/${page}`).then(({ data }) => {
				this.users = data;
  	  });
		}
  }

}
</script>

<style lang="scss" scoped>
.flex-away {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
