//
// Admin related routes
//
export default [
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/Admin.vue"),
    children: [
      {
        path: "cmgt",
        component: () => import("../views/Admin/CourseMgmt.vue"),
      },
      { path: "cmgt/add", component: () => import("../views/Admin/AddCourse") },
      {
        path: "cmgt/:course_id",
        component: () => import("../views/Admin/EditCourse.vue"),
      },
      {
        path: "umgt",
        component: () => import("../views/Admin/UserMgmt"),
      },
      {
        path: "umgt/:user_id",
        component: () => import("../views/Admin/EditUser.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
];
