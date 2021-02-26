<template>
     <v-container>
      <v-row justify="center">
          <v-card rounded="xl">
            <v-card-title class="mt-4 mb-2">
              <p class="text-break">Please input your  4-digit code in your email.</p>
            </v-card-title>
              <form @submit.prevent="submit">
                <v-container>
                  <v-row class="mx-4">
                    <v-col cols="12">
                      <vue-fake-input
                        :length="4"
                        :fontSize="40"
                        inputColor="#012689"
                        fontColor="#2854CB"
                        :allowPaste="false"
                        v-model="otp"
                        />
                    </v-col>
                  </v-row>
                  <v-row class="mx-4">
                    <v-col cols="12">
                      <v-btn type="submit" @click="addNewPassword" color="primary" class="my-4" width="100%">
                        NEXT</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-row class="mx-4">
                    <v-col cols="12">
                      <span @click="otpKnowPassword" color="primary" class="text-link"
                        >Already know password?</span
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </form>
          </v-card>
      </v-row>
    </v-container>
</template>

<script>
import VueFakeInput from 'vue-fake-input';

export default {
 name: 'Send-Otp',
 props: ['otpKnowPassword', 'addNewPassword'],
components: {
    VueFakeInput
  },
  data: () => {
    return {
      dialog: false,
      otp : "",
    };
  },
  methods:
  {
     submit()
     {
        console.log(this.otp);
        this.$store.commit('setOtp', this.otp);
     }
  }
};
</script>

