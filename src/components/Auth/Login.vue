<template>
    
    <v-container>
    
       <v-row justify="center">
       
         <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Open Dialog
            </v-btn>
          </template> -->
          <v-card rounded="xl">
             <alert :message="message" :success="success" :error="error"></alert>
            <v-card-title class="mt-4 mb-2">
              <span>Welcome back, my friend!</span>
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
                      <v-btn  type="submit" color="primary" class="my-4" width="100%" :disabled="!isValid">
                        Login</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-row class="mx-4">
                    <v-col cols="12">
                          <span @click="forgotClicked" color="primary" class="text-link"   >
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
                      <p class="login-msg">Want to be part of us?</p>
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
import Alert from '../Alert.vue';

export default {
  components: { Alert },
  name: 'login',
  props: ['forgotClicked', 'knowPassword'],
  data: () => {
    return {
      dialog: true,
      user: {
        email: "",
        password: ""
      },
      isValid: true,
      emailRules: [ 
          v => !!v || 'Email is required', 
          v => /.+@.+/.test(v) || 'E-mail must be valid' 
      ],
      passwordRules: [ 
        v => !!v || 'Password is required', 
        v => (v && v.length >= 5) || 'Password must have 5+ characters' 
      ],
      success: false,
      error: false,
      message: null
    };
  },
  methods: {
    ...mapActions(['login']),
    async submit()
    {
      try{
       await this.login(this.user);
       this.$notify({
            group: 'foo',
            type: 'success',
            text: 'Login Successfully'
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
    }
  }
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