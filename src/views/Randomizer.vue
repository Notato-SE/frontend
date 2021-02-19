<template>
  <v-row>
    <v-col cols="12">
      <h1>Randomizer</h1>
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <div style="width: 80%; text-align: start">
        <v-alert dense outlined text dismissible type="success">asd</v-alert>
        <v-tabs v-model="tab" centered class="mt-10">
          <v-tabs-slider></v-tabs-slider>
          <v-tab> Custom List </v-tab>
          <v-tab> Picker </v-tab>
          <v-tab> Team Generator </v-tab>

          <v-tabs-items v-model="tab">
            <v-tab-item> <CustomList /> </v-tab-item>
            <v-tab-item> <Picker /> </v-tab-item>
            <v-tab-item> <TeamGenerator /> </v-tab-item>
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
  }),
};
</script>
 