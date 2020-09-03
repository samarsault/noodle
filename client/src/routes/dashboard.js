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
    component: () =>
      import(/* webpackChunkName: "course-content" */ "../views/Course.vue"),
    children: [
      {
        path: "/",
        name: "course",
        component: () =>
          import(
            /* webpackChunkName: "course-content" */ "../views/Course/Welcome.vue"
          ),
      },
      {
        path: "Article/:page_id",
        component: () =>
          import(
            /* webpackChunkName: "course-content" */ "../views/Course/Article.vue"
          ),
      },
      {
        path: "registrations",
        component: () =>
          import(
            /* webpackChunkName: "course-instructor" */ "../views/Course/Registrations.vue"
          ),
      },
      {
        path: "Quiz/:quiz_id",
        component: () =>
          import(
            /* webpackChunkName: "course-content" */ "../views/Course/Quiz/Quiz.vue"
          ),
      },
      {
        path: "attempts/:quiz_id",
        component: () =>
          import(
            /* webpackChunkName: "course-instructor" */ "../views/Course/Quiz/Attempts.vue"
          ),
      },
      {
        path: "review/:attempt_id",
        component: () =>
          import(
            /* webpackPrefetch: true */ /* webpackChunkName: "course-quiz" */ "../views/Course/Quiz/Review.vue"
          ),
      },
      {
        path: "Quizzer/:quiz_id",
        component: () =>
          import(
            /* webpackPrefetch: true */ /* webpackChunkName: "course-quiz" */ "../views/Course/Quiz/Quizzer.vue"
          ),
      },
      {
        path: "questions/:group",
        component: () =>
          import(
            /* webpackChunkName: "course-instructor" */ "../views/Course/Quiz/QuestionBank.vue"
          ),
      },
    ],
  },
];
