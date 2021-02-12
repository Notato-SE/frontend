import Vue from "vue";
import VueRouter from "vue-router";

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
  },
  {
    path: "/",
    name: "Calculator",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Calculator.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => 
    import("../components/Auth/Signup.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => 
    import("../components/Auth/Login.vue"),
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
    path: "/forgotpassword",
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

export default router;
