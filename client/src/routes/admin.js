//
// Admin related routes
//
import Admin from "../views/Admin/SuperIndex.vue";
import CourseMgmt from "../views/Admin/Super/CourseMgmt.vue";
import UserMgmt from "../views/Admin/Super/UserMgmt.vue";
import EditCourse from "../views/Admin/Super/EditCourse.vue";
import AddCourse from "../views/Admin/Super/AddCourse.vue";
import EditUser from "../views/Admin/Super/EditUser.vue";

export default [
  {
    path: "/admin",
    redirect: "/admin/cmgt",
    name: "admin",
    component: Admin,
    children: [
      {
        path: "cmgt",
        component: CourseMgmt,
      },
      { path: "cmgt/add", component: AddCourse },
      { path: "cmgt/:course_id", component: EditCourse },
      {
        path: "umgt",
        component: UserMgmt,
      },
      { path: "umgt/:user_id", component: EditUser },
    ],
    meta: {
      requiresAuth: true,
    },
  },
];
