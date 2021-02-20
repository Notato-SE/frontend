<template>
  <v-row>
    <!-- <v-col cols="12">
      <h1>Randomizer</h1>
    </v-col> -->
    <v-col cols="12">
      <Alert :alert="alert" />
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <div style="width: 80%; text-align: start">
        <v-tabs v-model="tab" centered>
          <v-tabs-slider></v-tabs-slider>
          <v-tab> Custom List </v-tab>
          <v-tab> Picker </v-tab>
          <v-tab> Team Generator </v-tab>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <CustomList @alert="setAlert" :formData="form[3]" />
            </v-tab-item>
            <v-tab-item>
              <Picker @alert="setAlert" :formData="form[1]" />
            </v-tab-item>
            <v-tab-item>
              <TeamGenerator @alert="setAlert" :formData="form[2]" />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>


<script>
import CustomList from "@/components/randomizer/CustomList.vue";
import Picker from "@/components/randomizer/Picker.vue";
import TeamGenerator from "@/components/randomizer/TeamGenerator.vue";

export default {
  components: {
    CustomList,
    Picker,
    TeamGenerator,
  },
  data: () => ({
    tab: "",
    form: {
      1: null,
      2: null,
      3: null,
    },
    tabMap: {
      1: 1,
      2: 2,
      3: 0,
    },
  }),
  async beforeMount() {
    let id = this.$route.query.id;
    if (id) {
      let data = await this.getAxios(`/randomizer/${id}`);
      this.tab = this.tabMap[data.random_type];

      this.form[data.random_type] = data;
    }
  },
};
</script>
 