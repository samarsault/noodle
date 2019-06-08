<template>
	<section id="course-bg" class="hero hero-overlay" :style="`background-image: url('${course.coverImage}')`">
		<div class="container">
		<!-- <img alt="Vue logo" src="./assets/logo.png">
			<HelloWorld msg="Welcome to Your Vue.js App"/> -->
			<h1> {{ course.name }}</h1>

			<CourseTabs>
				<Tab v-for="(topic,i) in course.topics" :name="topic" v-bind:key="i">
					<ul>
						<li v-for="(resource, j) in resources[topic]" v-bind:key="j">
							<p>{{ resource.name }}</p>
							<p>{{ resource.description }}</p>
							<a :href="resource.url">
								<button class="secondary">Download</button>
							</a>
						</li>
					</ul>
				</Tab>
			</CourseTabs>
		</div>
	</section>
</template>

<script>
import axios from 'axios'
import CourseTabs from '../components/CourseTabs';
import Tab from '../components/Tab';

export default {
	data() {
		return {
			course_id: this.$route.params.id,
			course:{},
			students: [],
			resources: [],
			admin: true
		}
	},
	async mounted () {
		try {
			this.course = (await axios.get(`/api/courses/${this.course_id}/view`)).data;
			this.resources = (await axios.get(`/api/courses/${this.course_id}/resources`)).data
		} catch (error) {
			console.error(error);
		}

	},
	components: {
		CourseTabs,
		Tab
	}
}
</script>

<style lang="scss">
#course-bg {
	background-color: rgba(black, 0.5);
	background-size: cover;
	background-repeat: no-repeat;
	background-blend-mode: multiply;
}
.resources {
	ul {
		list-style-type: none;
		margin: 0;
	}
	li {
		background-color: #fff;
		padding: 10px 30px;
		color: #0B2027;
	}
}

</style>
