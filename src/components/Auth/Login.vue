<template>
  <v-container>
    <v-row justify="center">
      <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Open Dialog
            </v-btn>
          </template> -->
      <v-card rounded="xl">
        <Alert />
        <v-card-title class="mt-4 mb-2">
          <p class="text-break">Welcome back, my friend!</p>
        </v-card-title>
        <v-form v-model="isValid" @submit.prevent="submit">
          <v-container>
            <v-row class="mx-4">
              <label class="d-flex justify-content-start text-dark">
                Email
              </label>
              <v-col cols="12">
                <v-text-field
                  class="style-field"
                  label="abc@gmail.com"
                  type="email"
                  single-line
                  outlined
                  v-model="user.email"
                  :rules="emailRules"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="mx-4">
              <label class="d-flex justify-content-start text-dark">
                Password
              </label>
              <v-col cols="12">
                <v-text-field
                  v-model="user.password"
                  class="style-field"
                  label="default-input"
                  type="password"
                  single-line
                  id="hello"
                  outlined
                  persistent-hint
                  hint="Your password must be longer than 8 character."
                  :rules="passwordRules"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="mx-4">
              <v-col cols="12">
                <v-btn
                  type="submit"
                  color="primary"
                  class="my-4"
                  width="100%"
                  :disabled="!isValid"
                  :loading="loading"
                >
                  Login</v-btn
                >
              </v-col>
            </v-row>
            <v-row class="mx-4">
              <v-col cols="12">
                <span
                  @click="forgotClicked"
                  color="primary"
                  class="text-link"
                  style="cursor: pointer"
                >
                  Forgot Password?
                </span>
              </v-col>
            </v-row>
            <v-row class="mx-4">
              <v-col cols="12">
                <h6>OR</h6>
              </v-col>
            </v-row>
            <v-row class="mx-4 mb-4">
              <v-col cols="12">
                <v-btn @click="signupClick" class="login-msg"
                  >Want to be part of us?</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  props: ["forgotClicked", "knowPassword", "signupClick"],
  data: () => {
    return {
      dialog: true,
      user: {
        // email: "",
        // password: "",
        //TODELETE
        email: "schean@paragoniu.edu.kh",
        password: "password",
      },
      loading: false,
      isValid: true,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 5) || "Password must have 5+ characters",
      ],
    };
  },
  methods: {
    ...mapActions(["login"]),
    async submit() {
      this.loading = true;
      var data = await this.postAxios("/login", this.user);
      this.loading = false;

      if (data) {
        this.$store.dispatch("getToken", data.access_token);
        this.dialog = false;
      }
    },
  },
};
</script>
<style>
h6 {
  color: #ebebeb;
  text-align: center;
  position: relative;
  font-weight: 700;
}
h6:before {
  content: "";
  display: block;
  width: 160px;
  height: 2px;
  background: #ebebeb;
  left: 0;
  top: 50%;
  position: absolute;
}
h6:after {
  content: "";
  display: block;
  width: 160px;
  height: 2px;
  background: #ebebeb;
  right: 0;
  top: 50%;
  position: absolute;
}
.login-msg {
  margin-bottom: 40px;
  color: black;
  font-weight: 500;
  display: inline-block;
  box-shadow: 5px 5px 15px -4px #000000;
  padding: 10px;
}
</style>