<template>
  <div>
	<section id="course-bg" class="hero hero-overlay" :style="`background-image: url('${course.coverImage}')`"/>
	<div class="container">
			<h1 style="color: #fff"> {{ course.name }}</h1>
			<h4 style="color: #fff" v-if="isArchive(course)">Archived</h4>
			<CourseTabs ref="courseTabs" style="margin-bottom: 60px">
				<Tab v-for="(topic,i) in course.topics" :name="topic" v-bind:key="i">
					<ul>
						<li v-if="!resources[topic] || resources[topic].length === 0" class="resource-empty">
							<Empty :size="96"/>
							<div>
								<h3>There's nothing here!</h3>
								<p class="light">Wait for the instructor to upload something</p>
							</div>
						</li>
						<li v-else v-for="(resource, j) in resources[topic]" v-bind:key="j">
							<div class="resource-meta">
								<div class="resource-icon">
									<FallbackIcon :size="72"/>
								</div>
								<div class="resource-meta-text">
									<h3>{{ resource.name }}</h3>
									<p class="light">{{ resource.description }}</p>
								</div>
							</div>
							<a :href="resource.url">
								<button class="secondary">Download</button>
							</a>
						</li>
					</ul>
				</Tab>
				<Tab v-if="quiz.length > 0" name="Quizzes">
					<ul>
						<li v-for="(q, i) in quiz" v-bind:key="i">
							<div class="resource-meta">
								<div class="resource-icon">
									<FallbackIcon :size="72"/>
								</div>
								<div class="resource-meta-text">
									<h3>{{ q.name }}</h3>
									<p></p>
								</div>
							</div>
							<a :href="`/course/${course_id}/quiz/${q._id}`">
								<button class="secondary">Attempt</button>
							</a>
						</li>
					</ul>
				</Tab>
			</CourseTabs>
	</div>
	</div>
</template>

<script>
import axios from 'axios'
import CourseTabs from '../components/CourseTabs';
import Tab from '../components/Tab';
import { mutations } from '../utils/store';

// Icons
import FallbackIcon from 'vue-material-design-icons/FileDocumentOutline';
import Empty from 'vue-material-design-icons/FlaskEmptyOutline';
import calcDate from '../utils/calcDate';

export default {
	data() {
		return {
			course_id: this.$route.params.id,
			course: {},
			resources: [],
			admin: true,
			quiz: [],
			curDate: [ ]
		}
	},
	async created () {
		
		this.setLoading(true);
		try {
			this.course = (await axios.get(`/api/courses/${this.course_id}/view`)).data;
			this.resources = (await axios.get(`/api/courses/${this.course_id}/resources`)).data
			this.quiz = (await axios.get(`/api/courses/${this.course_id}/quiz`)).data
			this.curDate = calcDate(Date.now());
			// select 1st item
			if (this.$refs.courseTabs.tabs.length > 0) {
        this.$refs.courseTabs.tabs[0].isActive = true;
			}
			this.setLoading(false);
		} catch (error) {
			console.error(error);
		}

	},
	components: {
		CourseTabs,
		Tab,
		Empty,
		FallbackIcon
	},
	methods: {
		...mutations,
		isArchive (course) {
			return course.offerYear < this.curDate[0] || (course.offerYear===this.curDate[0] && course.offerSem===1);
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../../styles/include/_vars';

.container {
	margin-top: 50px;
	margin-bottom: 50px;
}

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
		color: #0B2027;
		padding-right: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
		// border: 1px solid #eee;
		box-shadow: 0 0 2px 0 rgba(44, 44, 44, 0.35);

		&.resource-empty {
			flex-direction: column;
			justify-content: center;
			padding: 50px 0 !important;
			> div {
				text-align: center;
			}	
		}
	}
}

.resource-meta {
	display: flex;
	align-items: center;
	.resource-icon {
		padding: 25px;
		background-color: $gray;
	}
	.resource-meta-text {
		margin-left: 20px;
		h3 {
			margin: .4em 0;
		}
		p {
			margin-top: 0;
		}
	}
}
</style>
