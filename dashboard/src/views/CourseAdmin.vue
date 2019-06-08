<template>
	<div class="container">
		<h3>Course Administration</h3>
		<Tabs>
			<Tab name="Registered Students">
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
				<a :href="`/admin/courses/students/${course_id}/download`">
					<button class="primary">Download as CSV</button>
				</a>
			</Tab>
			<Tab name="Resources">
				<form method="post" :action="`/admin/courses/resource/add/${course_id}`" enctype="multipart/form-data">
					<input name="name" type="text" placeholder="Name">
					<textarea name="description" placeholder="Description" />
					<label for="topic">Topic: </label>
					<select name="topic">
						<option 
							v-for="(topic,index) in topics" 
							v-bind:key="index"
							:value="topic"
						>
							{{ topic }}
						</option>
					</select>
					<input type="file" name="res"> 
					<button class="primary">Add Resource</button>
				</form>
			</Tab>
			<Tab name="Announcement">
				<label for="textarea">Message</label>
				<textarea />
				<button class="primary">Send</button>
			</Tab>
			<Tab name="Class Schedule">
				
			</Tab>
		</Tabs>
	</div>
</template>

<script>
import axios from 'axios'
import Tabs from '../components/Tabs';
import Tab from '../components/Tab';
// /admin/course/add

export default {
	data() {
		return {
			course_id: this.$route.params.id,
			topics: [],
			registered: []
		}
	},
	mounted () {
		axios.get(`/admin/courses/students/${this.course_id}`)
			.then(({ data }) => {
				this.registered = data;
			})
		axios.get(`/api/courses/${this.course_id}/view/topics`)
			.then( ({ data }) => {
				this.topics = data.topics;
			})
	},
	components: {
		Tabs,
		Tab
	}
}
</script>
