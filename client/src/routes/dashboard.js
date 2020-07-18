//
// Dashboard related routes
//
import Students from "../views/Students.vue";
import Quizzer from "../views/Course/Quiz/Quizzer.vue";
import QuestionBank from "../views/Course/Quiz/QuestionBank.vue";
import Quiz from "../views/Course/Quiz/Quiz.vue";
import QuizAttempts from "../views/Course/Quiz/Attempts.vue";

export default [
  {
    path: "/dashboard",
    name: "home",
    component: () => import("../views/Home.vue"),
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
        component: Students,
      },
      {
        path: "Quiz/:quiz_id",
        component: Quiz,
      },
      {
        path: "attempts/:quiz_id",
        component: QuizAttempts,
      },
      {
        path: "Quizzer/:quiz_id",
        component: Quizzer,
      },
      {
        path: "questions/:group",
        component: QuestionBank,
      },
    ],
  },
];
