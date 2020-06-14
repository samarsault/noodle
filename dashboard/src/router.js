import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Course from "./views/Course.vue";
import Admin from "./views/Admin/SuperIndex.vue";
import SignUp from "./views/SignUp";
import Quizzer from "./views/Course/Quizzer.vue";
import Article from "./views/Course/Article";
import Registrations from "./views/Students.vue";
import QuestionBank from "./views/Course/QuestionBank.vue";
import Quiz from "./views/Course/Quiz.vue";
import Welcome from "./views/Course/Welcome.vue";
import { getters } from "./utils/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/course/:course_id",
      name: "course",
      component: Course,
      children: [
        {
          path: "/",
          component: Welcome,
        },
        {
          path: "Article/:page_id",
          component: Article,
        },
        {
          path: "registrations",
          component: Registrations,
        },
        {
          path: "Quiz/:quiz_id",
          component: Quiz,
        },
        {
          path: "Quizzer/:quiz_id",
          component: Quizzer,
        },
        {
          path: "questions",
          component: QuestionBank,
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = getters.user();
    if (user.role === "student") {
      next({
        name: "home",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
