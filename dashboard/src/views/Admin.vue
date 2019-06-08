<template>
	<div class="container">
		<h3>Super Admin</h3>
		<Tabs>
			<Tab name="Add Course">
				<form method="post" action="/admin/course/add" enctype="multipart/form-data">
					<!-- <label for="name">Name:</label> -->
					<input type="text" name="name" placeholder="Name">

					<!-- <label for="description">Description:</label> -->
					<textarea name="description" cols="30" rows="10" placeholder="Description"></textarea>
					<input type="number" name="offerYear" placeholder="Year">		
					<input type="number" name="offerSem" placeholder="Semester">	

					<label for="coverImage">Course cover image:</label>
					<input type="file" name="coverImage" accept="image/png, image/jpeg">

					<label for="handout">Course Handout:</label>
					<input type="file" name="handout" accept="image/png, image/jpeg">

					<button class="primary">Add Course</button>
				</form>
			</Tab>
			<Tab name="Access Management">
				<Modal v-if="updateModal" title="Update Access Level">
					<select v-model="accessLevel">
						<option value="student">Student</option>
						<option value="instructor">Instructor</option>
						<option value="admin">Admin</option>
					</select>
					<input type="text" v-if="accessLevel == 'instructor'">
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
							<td><button @click="updateModal=  true" class="primary">Update</button></td>
						</tr>
					</tbody>
				</table>
			</Tab>
		</Tabs>
	</div>
</template>

<script>
import axios from 'axios'
import Tabs from '../components/Tabs';
import Tab from '../components/Tab';
import Modal from '../components/Dialogs/Modal';
// /admin/course/add

export default {
	data() {
		return {
			accessLevel: 'student',
			users: [],
			updateModal: false
		}
	},
	mounted () {
		axios.get('/admin/super/users').then(({ data }) => {
			this.users = data;
		});
	},
	components: {
		Tabs,
		Tab,
		Modal
		// HelloWorld
	}
}
</script>

<style lang="scss">
// ul {
// 	list-style-type: none;
// 	padding: 0;
// 	margin: 0 100px;
// 	li {
// 		background-color: #F2F2F2;
// 		padding: 10px;
// 	}
// }
</style>
