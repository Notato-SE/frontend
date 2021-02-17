import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {guest: true}
  },
  {
    path: "/",
    name: "Calculator",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Calculator.vue"),
    meta: {guest: true}
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => 
    import("../components/Auth/Signup.vue"),
    meta: {guest: true}
  },
  {
    path: "/login",
    name: "Login",
    props: {
      prop: {
        type: Boolean,
        default: true 
      }
    },
    component: () => 
    import("../components/Auth/Login.vue"),
    meta: {guest: true}

  },
  {
    path: "/otpcode",
    name: "OtpCode",
    component: () => 
    import("../components/Auth/SendOtpCode.vue"),
  },
  {
    path: "/resetpassword",
    name: "ResetPassword",
    component: () => 
    import("../components/Auth/ResetPassword.vue"),
  },
  {
    path: "/forgot-password",
    name: "OtpCode",
    component: () => 
    import("../components/Auth/ForgotPassword.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
});


export default router;
