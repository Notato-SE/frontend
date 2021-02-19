<template>
  <div>
    <div class="d-flex justify-center">
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <div style="width: 50%; text-align: start">
            <p>Email</p>
            <v-text-field v-model="form.email" outlined readonly></v-text-field>
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <div style="width: 50%; text-align: start">
            <p>Name</p>
            <v-text-field v-model="form.full_name" outlined></v-text-field>
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn @click="save()" elevation="2" class="mt-2" color="primary">
            Save
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
  }),
  async beforeMount() {
    await this.fetchData();
  },
  methods: {
    async save() {
      await this.postAxios("/update-profile", this.form, "put");

      await this.fetchData();
    },
    async fetchData() {
      this.form = await this.getAxios("/profile");
    },
  },
};
</script>