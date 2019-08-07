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
			<a href="/courses">
	      <button class="primary">Explore Courses</button>
			</a>
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
		margin-bottom: 15px;
		@media screen and (max-width: 800px) {
			padding: 40px 30px;
			flex-direction: column;
			text-align: center;
		}
		button {
			@media screen and (max-width: 800px){
				margin-top: 10px;	
				width: 150px;
			}
		}
		>div {
			display: flex;
			align-items: center;
			@media screen and (max-width: 800px) {
				justify-content: center;
				flex-direction: column;
			}
		}
		h3 {
			margin: 10px 0;
		}
		p {
			color: $darkGray;
			max-width: 600px;
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
