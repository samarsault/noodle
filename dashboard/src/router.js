import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Course from "./views/Course.vue";
import Admin from "./views/Admin/SuperIndex.vue";
import SignUp from "./views/SignUp";
import Quizzer from "./views/Quizzer.vue";
import Pages from "./views/Pages";
import Registrations from "./views/Students.vue";
import QuestionBank from "./views/Admin/Course/QuestionBank.vue";
import { getters } from "./utils/store";

Vue.use(Router);

const router = new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/course/:course_id",
			name: "course",
			component: Course,
			children: [
				{
					path: "pages/:page_id",
					component: Pages
				},
				{
					path: "registrations",
					component: Registrations
				},
				{
					path: "quiz/:quiz_id",
					component: Quizzer
				},

				{
					path: "questions",
					component: QuestionBank
				}
			]
		},
		{
			path: "/admin",
			name: "admin",
			component: Admin,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/signup",
			name: "signup",
			component: SignUp
		}
	]
});

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		const user = getters.user();
		if (user.role === "student") {
			next({
				name: "home"
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
