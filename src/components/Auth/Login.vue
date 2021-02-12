<template>
  <div class="app">
    <v-app id="inspire">
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="450px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Open Dialog
            </v-btn>
          </template>
          <v-card rounded="xl">
            <v-card-title class="mt-4 mb-2">
              <span>Welcome back, my friend!</span>
            </v-card-title>
            <v-card-body>
              <form @submit.prevent="login">
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
                        label="default-input"
                        type="password"
                        single-line
                        id="hello"
                        outlined
                        persistent-hint
                        hint="Your password must be longer than 8 character."
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mx-4">
                    <v-col cols="12">
                      <v-btn color="primary" class="my-4" width="100%">
                        Login</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-row class="mx-4">
                    <v-col cols="12">
                      <span color="primary" class="text-link"
                        >Forgot Password?</span
                      >
                    </v-col>
                  </v-row>
                  <v-row class="mx-4">
                    <v-col cols="12">
                      <h6>OR</h6>
                    </v-col>
                  </v-row>
                  <v-row class="mx-4 mb-4">
                    <v-col cols="12">
                      <p class="login-msg">Want to be part of us?</p>
                    </v-col>
                  </v-row>
                </v-container>
              </form>
            </v-card-body>
          </v-card>
        </v-dialog>
      </v-row>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      dialog: false,
    };
  },
};
</script>
<style>
       h6{
        color: #EBEBEB;
        text-align: center;
        position: relative;
        font-weight: 700;
      }
      h6:before {
        content: "";
        display: block;
        width: 160px;
        height: 2px;
        background: #EBEBEB;
        left: 0;
        top: 50%;
        position: absolute;
      }
      h6:after {
        content: "";
        display: block;
        width: 160px;
        height: 2px;
        background: #EBEBEB;
        right: 0;
        top: 50%;
        position: absolute;
      }
      .login-msg{
          margin-bottom: 40px;
          color: black;
          font-weight: 500;
          display: inline-block;
          box-shadow: 5px 5px 15px -4px #000000;
          padding: 10px;
      }
</style>