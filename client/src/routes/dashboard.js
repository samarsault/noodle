//
// Dashboard related routes
//
import Home from "../views/Home.vue";

export default [
  {
    path: "/dashboard",
    name: "home",
    component: Home,
  },
  {
    path: "/dashboard/course/:course_id",
    component: () => import("../views/Course.vue"),
    children: [
      {
        path: "/",
        name: "course",
        component: () => import("../views/Course/Welcome.vue"),
      },
      {
        path: "Article/:page_id",
        component: () => import("../views/Course/Article.vue"),
      },
      {
        path: "registrations",
        component: () => import("../views/Course/Registrations.vue"),
      },
      {
        path: "Quiz/:quiz_id",
        component: () => import("../views/Course/Quiz/Quiz.vue"),
      },
      {
        path: "attempts/:quiz_id",
        component: () => import("../views/Course/Quiz/Attempts.vue"),
      },
      {
        path: "Quizzer/:quiz_id",
        component: () => import("../views/Course/Quiz/Quizzer.vue"),
      },
      {
        path: "questions/:group",
        component: () => import("../views/Course/Quiz/QuestionBank.vue"),
      },
    ],
  },
];
