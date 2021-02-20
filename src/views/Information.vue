<template>
  <v-row>
    <v-col cols="12" class="mt-10">
      <h1>Information</h1>
    </v-col>
    <v-col cols="12" class="mt-10">
      <v-btn color="primary" @click="logout">
        Log Out
      </v-btn>
    </v-col>
    <v-col cols="12">
      <h4>{{ form.full_name }}</h4>
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <div style="width: 80%; text-align: start">
        <!-- <v-alert dense outlined text dismissible type="success">asd</v-alert> -->
        <v-tabs v-model="tab" centered>
          <v-tabs-slider></v-tabs-slider>
          <v-tab> Saved List </v-tab>
          <v-tab> Change Info </v-tab>
          <v-tab> Change Password </v-tab>

          <v-tabs-items v-model="tab" class="mt-5">
            <v-tab-item> <SavedList /> </v-tab-item>
            <v-tab-item> <ChangeInfo /> </v-tab-item>
            <v-tab-item> <ChangePassword /> </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>


<script>
import SavedList from "@/components/Info/SavedList.vue";
import ChangeInfo from "@/components/Info/ChangeInfo.vue";
import ChangePassword from "@/components/Info/ChangePassword.vue";

export default {
  components: {
    SavedList,
    ChangeInfo,
    ChangePassword,
  },
  data: () => ({
    tab: "",
    form: {},
  }),
  async beforeMount() {
    this.form = (await this.getAxios("/profile")).data;
  },
};
</script>
 