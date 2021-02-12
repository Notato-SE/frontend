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
              <span>Welcome to our world!</span>
            </v-card-title>
            <v-card-body>
              <form @submit.prevent="signup">
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
                      Fullname
                    </label>
                    <v-col cols="12">
                      <v-text-field
                        class="style-field"
                        label="Notato"
                        type="text"
                        single-line
                        outlined
                        persistent-hint
                        hint="How do you want us to call you ?"
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
                        Sign Up</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-row class="mx-4">
                    <v-col cols="12">
                      <span color="primary" class="text-link"
                        >Have an account?</span
                      >
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

