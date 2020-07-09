import Vue from "vue";
import Router from "vue-router";
import SignUp from "./views/SignUp";

import admin from "./routes/admin";
import dashboard from "./routes/dashboard";
import custom from "./routes/custom";

import { getters } from "./utils/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    ...admin,
    ...dashboard,
    ...custom,
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
