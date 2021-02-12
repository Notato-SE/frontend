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
              <p style="float: left;">Please input your  4-digit code in your email.</p>
            </v-card-title>
            <v-card-body>
              <form @submit.prevent="signup">
                <v-container>
                  <v-row class="mx-4">
                    <v-col cols="12">
                      <vue-fake-input
                        :length="4"
                        :fontSize="40"
                        inputColor="#012689"
                        fontColor="#2854CB"
                        :allowPaste="false"
                        v-model="fullValue"
                        />
                    </v-col>
                  </v-row>
                  <v-row class="mx-4">
                    <v-col cols="12">
                      <v-btn color="primary" class="my-4" width="100%">
                        NEXT</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-row class="mx-4">
                    <v-col cols="12">
                      <span color="primary" class="text-link"
                        >Already know password?</span
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
import VueFakeInput from 'vue-fake-input';

export default {
components: {
    VueFakeInput
  },
  data: () => {
    return {
      dialog: false,
    };
  },
};
</script>

