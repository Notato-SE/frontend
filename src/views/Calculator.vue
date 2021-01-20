<template>
  <div>
    <v-card color="basil">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item.key">
          {{ item.text }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.key">
          <simple-calculator v-if="item.key === 'simple'"></simple-calculator>
          <scientific-calculator v-else></scientific-calculator>
          <v-card color="basil" flat> </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script>
import ScientificCalculator from "../components/calculators/ScientificCalculator.vue";
import SimpleCalculator from "../components/calculators/SimpleCalculator.vue";

export default {
  components: { SimpleCalculator, ScientificCalculator },
  data: () => ({
    tab: null,
    items: [
      {
        key: "simple",
        text: "Simple Calculator",
      },
      {
        key: "scientific",
        text: "Scientific Calculator",
      },
    ],
  }),
};
</script>
<style lang="scss">
</style>