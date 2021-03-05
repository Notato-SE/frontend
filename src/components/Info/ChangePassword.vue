<template>
  <div>
    <div class="d-flex justify-center">
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <div style="width: 50%; text-align: start" class="mb-n5">
            <p>Current Password</p>
            <v-text-field
              v-model="form.old_password"
              type="password"
              outlined
              :rules="[rules.required]"
            ></v-text-field>
            <!-- :append-icon="show.old_password ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show.old_password ? 'text' : 'password'"
              @click:append="show.old_password = !show.old_password" -->
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <div style="width: 50%; text-align: start" class="mb-n5">
            <p>New Password</p>
            <v-text-field
              v-model="form.new_password"
              type="password"
              hint="Your password must be longer than 8 characters."
              persistent-hint
              outlined
              :rules="[rules.required]"
            ></v-text-field>
            <!-- :append-icon="show.new_password ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show.new_password ? 'text' : 'password'"
              @click:append="show.new_password = !show.new_password" -->
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <div style="width: 50%; text-align: start" class="mb-n5">
            <p>Confirm New Password</p>
            <v-text-field
              v-model="form.new_password_confirmation"
              type="password"
              outlined
              :rules="[rules.required]"
            ></v-text-field>
            <!-- :append-icon="
                show.new_password_confirmation ? 'mdi-eye' : 'mdi-eye-off'
              "
              :type="show.new_password_confirmation ? 'text' : 'password'"
              @click:append="
                show.new_password_confirmation = !show.new_password_confirmation
              " -->
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn
            @click="save()"
            elevation="2"
            class="mt-2"
            :class="canSave(form) ? '' : 'primary'"
            :disabled="canSave(form)"
          >
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
    form: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    show: {
      old_password: false,
      new_password: false,
      new_password_confirmation: false,
    },
    rules: {
      required: (value) => !!value || "This field is required.",
    },
  }),
  computed: {
    canSave() {
      return (form) => {
        return !(
          form.old_password &&
          form.new_password &&
          form.new_password_confirmation &&
          form.old_password.length &&
          form.new_password.length &&
          form.new_password_confirmation.length
        );
      };
    },
  },
  methods: {
    async save() {
      await this.postAxios("/change-password", this.form, "put");

      this.form = {};
    },
  },
};
</script>