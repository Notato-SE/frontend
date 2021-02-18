<template>
  <div>
    <div class="d-flex justify-center">
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <div style="width: 50%; text-align: start">
            <p>Current Password</p>
            <v-text-field
              v-model="form.old_password"
              :append-icon="show.old_password ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show.old_password ? 'text' : 'password'"
              @click:append="show.old_password = !show.old_password"
              outlined
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <div style="width: 50%; text-align: start">
            <p>New Password</p>
            <v-text-field
              v-model="form.new_password"
              :append-icon="show.new_password ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show.new_password ? 'text' : 'password'"
              @click:append="show.new_password = !show.new_password"
              hint="Your password must be longer than 8 characters."
              persistent-hint
              outlined
              counter
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <div style="width: 50%; text-align: start">
            <p>Confirm New Password</p>
            <v-text-field
              v-model="form.new_password_confirmation"
              :append-icon="
                show.new_password_confirmation ? 'mdi-eye' : 'mdi-eye-off'
              "
              :type="show.new_password_confirmation ? 'text' : 'password'"
              @click:append="
                show.new_password_confirmation = !show.new_password_confirmation
              "
              outlined
              counter
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn @click="save()" elevation="2" class="mt-2" color="primary">
            Change Password
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    form: {},
    show: {
      old_password: false,
      new_password: false,
      new_password_confirmation: false,
    },
  }),
  methods: {
    async save() {
      await this.postAxios("/change-password", this.form, "put");

      this.form = {};
    },
  },
};
</script>