<template>
  <v-container>
     <alert :message="message" :error="error" :success="success"></alert>
      <v-row justify="center">
        <!-- <v-dialog v-model="dialog" max-width="450px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Open Dialog
            </v-btn>
          </template> -->
          <v-card rounded="xl">
            <v-card-title class="mt-4 mb-2">
              <span>Welcome to our world!</span>
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
                    Fullname
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
                    >
                      Sign Up</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row class="mx-4">
                  <v-col cols="12">
                    <span @click="haveAccount" color="primary" class="text-link"
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
  name: 'signup',
  props: ['haveAccount'],
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
        (v) => (v && v.length >= 5) || "Password must have 5+ characters",
      ]
    };
  },
  methods: {
    ...mapActions(["register"]),
    async submit()
    {
      try{
       var resp = await this.register(this.user);
      this.message = resp.data.message;
            this.$notify({
            group: 'foo',
            type: 'success',
            text: 'SignUp Successfully'
          });
      }
      catch
      {
        const err =  this.$store.getters.stateErrors;
        this.message = err.message;
        this.success = false;
        this.error = true;
      }
      this.dialog = false;
     
    },
  },
};
</script>
