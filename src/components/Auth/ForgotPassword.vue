<template>
  <v-container>
    <v-row justify="center">
      <v-card rounded="xl">
        <Alert />
        <v-card-title class="mt-4 mb-2">
          <p class="text-break">Please input your new password.</p>
        </v-card-title>
        <v-form v-model="isValid" @submit.prevent="submit">
          <v-container>
            <v-row class="mx-4">
              <label class="d-flex justify-content-start text-dark">
                Password
              </label>
              <v-col cols="12">
                <v-text-field
                  v-model="user.new_password"
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
                >
                  CONFIRM</v-btn
                >
              </v-col>
            </v-row>
            <v-row class="mx-4">
              <v-col cols="12">
                <span @click="backToLogin" color="primary" class="text-link">
                  Already know password?
                </span>
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
  name: "forgot-password",
  props: ["backToLogin"],
  data: () => {
    return {
      isValid: true,
      dialog: true,
      customDialog: false,
      user: {
        new_password: null,
        otp: null,
        email: null,
      },
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must have 5+ characters",
      ],
      success: false,
      error: false,
      message: null,
    };
  },
  methods: {
    ...mapActions(["createForgotPassword"]),
    async submit() {
      try {
        this.user.email = this.$store.getters.stateEmail;
        this.user.otp = this.$store.getters.stateOtp;
        await this.postAxios("/forgot-password", this.user);
        this.createForgotPassword(this.user);
        this.$emit("confirmPassword", true);
      } catch
      {
        this.$emit("confirmPassword", false);
      }
    },
  },
};
</script>

