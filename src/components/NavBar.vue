<template>
  <nav>
    <v-app-bar
      app
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon @click.prevent="update()"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" style="text-decoration: none"
          ><span style="font-weight: bold; font-size: 28px">NOTATO</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="isLoggedIn">
         <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item class="d-block">
                <v-list-item-title style="padding: 10px;"><router-link class="text-dark text-decoration-none" to='/info'>Profile</router-link></v-list-item-title>
                <v-list-item-title style="padding: 10px;"><span @click="logout">logout</span></v-list-item-title>
           </v-list-item>
        </v-list>
      </v-menu>
 
      </span>
      <span v-else>
        <v-dialog v-model="signup_dialog" max-width="450px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              :class="($vuetify.breakpoint.xsOnly)? 'respon-btn' : 'authenticated-btn'"
              class="signup text-dark"
              @click="signup"
              v-bind="attrs"
              v-on="on"
              :small="$vuetify.breakpoint.xsOnly"
            >
              SignUp
            </v-btn>
          </template>
          <signup :haveAccount="haveAccount"></signup>
        </v-dialog>
        <v-dialog v-model="login_dialog" max-width="450px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :class="($vuetify.breakpoint.xsOnly)? 'respon-btn' : 'authenticated-btn'"
              @click="login"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              :small="$vuetify.breakpoint.xsOnly"
            >
              Login
            </v-btn>
          </template>
          <login :forgotClicked="forgotClicked" :signupClick="signupClick"></login>
        </v-dialog>
        <v-dialog v-model="forgot_dialog" max-width="450px">
          <reset-password
            @validEmail="sendOtp"
            :knowPassword="knowPassword"
          ></reset-password>
        </v-dialog>
        <v-dialog v-model="sent_otp" max-width="450px">
          <send-otp-code
            :otpKnowPassword="otpKnowPassword"
            :addNewPassword="addNewPassword"
          ></send-otp-code
          >>
        </v-dialog>
        <v-dialog v-model="add_new_password" max-width="450px">
          <forgot-password
            :backToLogin="backToLogin"
            @confirmPassword="confirmPassword"
          ></forgot-password>
        </v-dialog>
      </span>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
import Vue from "vue";

import Login from "./Auth/Login.vue";
import ResetPassword from "./Auth/ResetPassword.vue";
import Signup from "./Auth/Signup.vue";
import SendOtpCode from "./Auth/SendOtpCode.vue";
import ForgotPassword from "./Auth/ForgotPassword.vue";

export default {
  components: { Login, Signup, ResetPassword, SendOtpCode, ForgotPassword },
  emits: ["update-dialog"],
  data: () => ({
    drawer: false,
    signup_dialog: false,
    parent_dialog: false,
    login_dialog: false,
    forgot_dialog: false,
    collapseOnScroll: false,
    add_new_password: false,
    sent_otp: false,
    window: {
            width: 0,
            height: 0
        },
    items: [
      {
        active: true,
        exact: true,
        title: "Calculator",
        icon: "mdi-heart",
        path: "/calculator",
      },
      {
        active: true,
        exact: true,
        title: "Converter",
        icon: "mdi-heart",
        path: "/converter",
      },
      {
        active: true,
        exact: true,
        title: "Randomizer",
        icon: "mdi-heart",
        path: "/randomizer",
      },
    ],
  }),
  watch: {
    "$route.query": {
      deep: true,
      handler(newValue, oldValue) {
        if (newValue.login == 1) this.login_dialog = true;
      },
    },
  },
  methods: {
    ...mapActions(["logout"]),
    update() {
      this.drawer = !this.drawer;
      this.$store.commit("updateDrawer", this.drawer);
      console.log("drawer clicked " + this.drawer);
    },
    async logOut() {
      await this.logout();
      this.$router.push(`/?t=${Date.now()}`);
    },
    login() {
      this.login_dialog = true;
    },
    signup() {
      this.signup_dialog = true;
    },
    forgotClicked() {
      this.forgot_dialog = true;
      this.login_dialog= false;
    },
    signupClick()
    {
      this.signup_dialog = true;
      this.login_dialog= false;
    },
    knowPassword() {
      this.forgot_dialog = false;
      this.login_dialog = true;
    },
    backToLogin() {
      this.add_new_password = false;
      this.login_dialog = true;
    },
    haveAccount() {
      this.login_dialog = true;
      this.signup_dialog = false;
    },
    sendOtp(param) {
      console.log(param);
      if (param) {
        this.forgot_dialog = false;
        this.sent_otp = true;
      } else {
        this.forgot_dialog = true;
      }
    },
    otpKnowPassword() {
      this.login_dialog = true;
      this.sent_otp = false;
    },
    addNewPassword() {
      this.sent_otp = false;
      this.add_new_password = true;
    },
    confirmPassword(param) {
      if (param) {
        this.signup_dialog = false;
        this.parent_dialog = false;
        this.login_dialog = false;
        this.forgot_dialog = false;
        this.collapseOnScroll = false;
        this.add_new_password = false;
      } else {
        this.add_new_password = true;
      }
    }
  },
  computed: {
    isLoggedIn: function () {

      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>
<style lang="scss">
.authenticated-btn {
  margin-left: 30px;
  white-space: normal !important;
  word-wrap: break-word;
}
.signup {
  text-decoration: none;
  font-weight: 600;
}
.login {
  text-decoration: none;
  font-weight: 600;
}
.respon-btn
{
  margin: 2px;
}


</style>