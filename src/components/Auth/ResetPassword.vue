<template>
    <v-container>
      <v-row justify="center">
          <v-card rounded="xl">
            <Alert />
            <v-card-title class="mt-4 mb-2">
              <p class="text-break">Please tell us your email address so that we can help you.</p>
            </v-card-title>
              <v-form  v-model="isValid" @submit.prevent="submit">
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
                    <v-col cols="12">
                       <v-btn type="submit" :disabled="!isValid" color="primary" class="my-4" width="100%"  >
                       SEND CODE 
                       </v-btn> 
                    </v-col>
                  </v-row>
                  <v-row class="mx-4">
                    <v-col cols="12">
                      <span @click="knowPassword" color="primary" class="text-link"
                        >Already know password?</span>
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
  name: "reset-password",
  props: ['knowPassword'],
  data: () => {
    return {
      dialog: false,
      success: false,
      user: {
        email: '',
      },
      error: false,
      message: null,
      isValid: true,
      emailRules: [ 
          v => !!v || 'Email is required', 
          v => /.+@.+/.test(v) || 'E-mail must be valid' 
      ],
    };
  },
  methods:
  {
    ...mapActions(['forgotPassword']),
    async submit()
    {
       try{
       await this.getAxios('/forgot-password?email=' + this.user.email);
       this.$store.commit('setEmail', this.user.email);
       this.$emit('validEmail', true);
      }
      catch(e)
      {
        this.$emit('validEmail', false);
      }
      this.dialog = false;
    }
  }
};
</script>

