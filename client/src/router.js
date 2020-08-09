import Vue from "vue";
import Router from "vue-router";

import admin from "./routes/admin";
import dashboard from "./routes/dashboard";
import adapted from "./routes/adapted";

import { getters } from "./utils/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    ...admin,
    ...dashboard,
    ...adapted,
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/SignUp"),
    },
    {
      path: "/authorized",
      component: () => import("./Authorized.vue"),
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const user = getters.user();
//     if (user.role === "student") {
//       next({
//         name: "home",
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
