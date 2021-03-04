<template>
  <v-container>
    <v-row justify="center">
      <!-- <v-dialog v-model="dialog" max-width="450px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Open Dialog
            </v-btn>
          </template> -->
      <v-card rounded="xl">
        <Alert />
        <v-card-title class="mt-4 mb-2">
          <p class="text-break">Welcome to our world!</p>
        </v-card-title>
        <v-form v-model="isValid" @submit.prevent="submit">
          <v-container>
            <v-row class="mx-4">
              <label class="d-flex justify-content-start text-dark">
                Email
              </label>
              <v-col cols="12">
                <v-text-field
                  v-model="user.email"
                  class="style-field"
                  label="abc@gmail.com"
                  type="email"
                  single-line
                  outlined
                  :rules="emailRules"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="mx-4">
              <label class="d-flex justify-content-start text-dark">
                Full Name
              </label>
              <v-col cols="12">
                <v-text-field
                  class="style-field"
                  v-model="user.full_name"
                  label="Notato"
                  type="text"
                  single-line
                  outlined
                  persistent-hint
                  hint="How do you want us to call you ?"
                  :rules="fullnameRules"
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
                  class="style-field"
                  v-model="user.password"
                  label="Default Input"
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
                >
                  Sign Up</v-btn
                >
              </v-col>
            </v-row>
            <v-row class="mx-4">
              <v-col cols="12">
                <span
                  @click="haveAccount"
                  color="primary"
                  class="text-link"
                  style="cursor: pointer"
                  >Have an account?</span
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      <!-- </v-dialog> -->
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "signup",
  props: ["haveAccount"],
  data: () => {
    return {
      dialog: true,
      user: {
        full_name: "",
        email: "",
        password: "",
      },
      isValid: true,
      fullnameRules: [(v) => !!v || "Fullname is required"],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must have 8+ characters",
      ],
    };
  },
  //TODELETE
  mounted() {
    var str = ""; // String result
    for (var i = 0; i < 7; i++) {
      // Loop `len` times
      var rand = Math.floor(Math.random() * 62); // random: 0..61
      var charCode = (rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48); // Get correct charCode
      str += String.fromCharCode(charCode); // add Character to str
    }

    this.user = {
      full_name: str,
      email: `${str}@gmail.com`,
      password: "password",
    };
  },
  methods: {
    ...mapActions(["register"]),
    async submit() {
      var data = await this.postAxios("/sign-up", this.user);
      this.$store.dispatch("getToken", data.access_token);
      this.dialog = false;
    },
  },
};
</script>
