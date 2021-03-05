<template>
  <div class="d-flex justify-center">
    <div style="width: 90%">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item.key">
          {{ item.text }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.key">
          <simple-calculator
            v-bind:type="item.endPoint"
            v-if="item.key"
          ></simple-calculator>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>
<script>
import SimpleCalculator from "../components/converter/ConverterBase.vue";

export default {
  components: { SimpleCalculator },
  data: () => ({
    tab: null,
    items: [
      {
        key: "measurement",
        text: "MEASUREMENT",
        endPoint: "length",
      },
      {
        key: "weight",
        text: "WEIGHT",
        endPoint: "mass",
      },
      {
        key: "volume",
        text: "VOLUME",
        endPoint: "volume",
      },
      {
        key: "dimension",
        text: "DIMENSION",
        endPoint: "area",
      },
      {
        key: "digital",
        text: "DIGITAL DATA",
        endPoint: "digital",
      },
      {
        key: "datetime",
        text: "DATETIME",
        endPoint: "time",
      },
    ],
  }),
};
</script>
<style lang="scss">
</style>