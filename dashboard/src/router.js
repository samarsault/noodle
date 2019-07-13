import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Course from './views/Course.vue'
import Admin from './views/Admin/SuperIndex.vue'
import CourseAdmin from './views/Admin/CourseIndex.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	
	{
		path: '/course/:id',
		name: 'course',
		component: Course
	},
	{
		path: '/admin/:id',
		name: 'courseAdmin',
		component: CourseAdmin
	},
	{
		path: '/admin',
		name: 'admin',
		component: Admin
	}

	]
})
