<template>
  <div>
  	<div class="container" v-if="courses.length > 0">
  		<!-- <img alt="Vue logo" src="./assets/logo.png">
  		<HelloWorld msg="Welcome to Your Vue.js App"/> -->
  		<h2>My Courses</h2>
  		<ul class="user-courses">
  			<li v-for="course in courses" v-bind:key="course._id"> 
  				<div>
  					<img :src="course.coverImage" :alt="course.name">
  					<div>
  						<h3>{{ course.name }}</h3>
  						<p>Instructors: {{  course.instructors.join(', ') }}</p>
  					</div>
  				</div>
  				<div>
  					<router-link :to="'/course/' + course._id">
  						<button class="secondary">View Course</button>
  					</router-link>
  					<router-link v-if="course.isAdmin" :to="`/admin/${course._id}`">
  						<button class="primary">Manage</button>
  					</router-link>
  				</div>
  			</li>
  		</ul>
  	</div>
  	<div class="not-found" v-if="courses.length == 0">
  		<img src='/images/empty.png'>
      <h2>You are missing out!</h2>
      <button class="primary">Explore Courses</button>
  	</div>
  </div>
</template>

<script>
import axios from 'axios'
import event from '../utils/event';

export default {
	name: "Home",
	data() {
		return {
			courses: [ ],
			user: {}
		}
	},
	beforeCreate () {
    event.$emit('loading', true);
		axios.get('/api/dashboard').then( ({ data }) => {
			this.user = data.user;
      this.courses = data.courses;
      event.$emit('loading', false);
		});
	},
	components: {
		// HelloWorld
	}
}
</script>

<style lang="scss">
@import '../../../styles/include/vars';

.user-courses {
	list-style-type: none;
	padding: 0;
	li {
		padding: 20px 30px;
		box-shadow: 0 0 1px 0 rgba(0,0,0,0.35);
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		>div {
			display: flex;
			align-items: center;
		}
		h3 {
			margin: 10px 0;
		}
		p {
			color: $darkGray;
		}
	}

	img {
		display: inline-block;
		width: 140px;
		height: 140px;
		margin-right: 20px;
		border-radius: 100%;
	}
}
</style>
