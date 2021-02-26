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
          <simple-calculator
            class="tab"
            v-if="item.key === 'simple'"
            :cal="simple"
            tabindex="0"
            @keydown.native="simpleKeydown"
          ></simple-calculator>
          <scientific-calculator
            v-else
            class="tab"
            :cal="scientific"
            tabindex="1"
          ></scientific-calculator>
          <v-card color="basil" flat> </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script>
import ScientificCalculator from "../components/calculators/ScientificCalculator.vue";
import SimpleCalculator from "../components/calculators/SimpleCalculator.vue";
import Calculator from "../models/Calculator";
import Scientific from "../models/ScientificCalculator";
import { create, all } from "mathjs";

export default {
  components: { SimpleCalculator, ScientificCalculator },
  data: () => ({
    simple: new Calculator(),
    scientific: new Scientific(create(all)),
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
  methods: {
    simpleKeydown(e) {
      // console.log("down");
      if (!isNaN(parseInt(e.key)) || e.key === ".") {
        this.simple.append(e.key);
      } else if (
        ["+", "-", "/", "*", "Escape", "Enter", "Backspace"].includes(e.key)
      ) {
        console.log("op");
        let clicked = e.key;
        if (clicked === "Enter") clicked = "=";
        else if (clicked === "Escape") clicked = "CE";
        else if (clicked === "Backspace") clicked = "C";

        if (["Escape", "Enter", "Backspace"].includes(e.key))
          this.simple.action(clicked);
        else this.simple.setOp(clicked);
      }
    },
    // sciKeydown(e) {
    //   // console.log("sci down " + e.key);
    //   // console.log(this.scientific.currVal);
    //   if (["Alt", "Meta", "Control", "Shift"].includes(e.key)) return;

    //   if (["Escape", "Enter", "Backspace"].includes(e.key)) {
    //     let clicked = e.key;
    //     if (clicked === "Enter") clicked = "=";
    //     else if (clicked === "Escape") clicked = "CE";
    //     else if (clicked === "Backspace") clicked = "C";

    //     this.scientific.action(clicked);
    //     return;
    //   }

    //   // this.scientific.append(e.key);
    //   if (this.scientific.currVal === "0" || this.scientific.currVal === "")
    //     document.getElementById("mathfield").setValue(e.key);
    //   else document.getElementById("mathfield").insert(e.key);

    //   if (this.scientific.history === "")
    //     document.getElementById("history").setValue(this.scientific.history);
    // },
  },
};
</script>
<style lang="scss" scoped>
.tab:focus {
  outline: none;
}
</style>