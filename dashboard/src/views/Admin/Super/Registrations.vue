<template>
  <div>
	<CourseInput style="margin-top:15px" v-model="courseName" />
	<button class="primary" @click="populateReg">Show</button>
	<div v-if="registered.length > 0">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>BITS ID</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="student in registered" v-bind:key="student._id">
        <td>{{ student.name }}</td>
        <td>{{ student.email }}</td>
        <td>{{ student.bits_id }}</td>
        <td>{{ student.phone }}</td>
      </tr>
    </tbody>
  </table>
  <a :href="`/admin/courses/${course_id}/students/download`">
    <button class="primary icon-button"><DownloadIcon decorative/><span class="icon-left">Download as CSV</span></button>
  </a>
	</div>
	<div v-else>
		<h2 align="center">Nothing to show</h2>
	</div>
</div>
</template>

<script>
import axios from 'axios';
import CourseInput from '../../../components/Input/Course';
import DownloadIcon from 'vue-material-design-icons/FileDownload';

export default {
  data() {
    return {
			registered: [],
			courseName: ''
    }
  },
  components: {
		DownloadIcon,
		CourseInput
  },
	methods: {
		async populateReg() {
			const { data: course_id } = await axios.get(`/api/courseId?name=${this.courseName}`);
			if (course_id) {
					const studentsP = await axios.get(`/admin/courses/${course_id}/students`)
					this.registered = studentsP.data;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
table {
	max-height: 250px;
	overflow-y: scroll;
}
button {
	margin-top: 20px;
}
</style>
