<template>
	<div>
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
			<button class="primary icon-button">
				<DownloadIcon decorative /><span class="icon-left"
					>Download as CSV</span
				>
			</button>
		</a>
	</div>
</template>

<script>
import axios from 'axios';
import DownloadIcon from 'vue-material-design-icons/FileDownload';

export default {
	props: ['course_id'],
	data() {
		return {
			registered: [],
		};
	},
	components: {
		DownloadIcon,
	},
	mounted() {
		axios.get(`/admin/courses/${this.course_id}/students`).then(({ data }) => {
			this.registered = data;
		});
	},
};
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
