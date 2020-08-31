//
// Admin related routes
//
export default [
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
    children: [
      {
        path: "cmgt",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/Admin/CourseMgmt.vue"
          ),
      },
      {
        path: "cmgt/add",
        component: () =>
          import(/* webpackChunkName: "admin" */ "../views/Admin/AddCourse"),
      },
      {
        path: "cmgt/:course_id",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/Admin/EditCourse.vue"
          ),
      },
      {
        path: "umgt",
        component: () =>
          import(/* webpackChunkName: "admin" */ "../views/Admin/UserMgmt"),
      },
      {
        path: "umgt/:user_id",
        component: () =>
          import(/* webpackChunkName: "admin" */ "../views/Admin/EditUser.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
];
