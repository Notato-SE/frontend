<template>
  <div>
    <h4>{{ cal.history }}</h4>
    <h2>{{ cal.currVal }}</h2>
    <!-- <cal-btn str="1" @pressed="appendVal"></cal-btn>
    <cal-btn str="2" @pressed="appendVal"></cal-btn>
    <cal-btn str="3" @pressed="appendVal"></cal-btn> -->
    <v-row v-for="(arr, i) in keys" :key="`arr:` + i">
      <v-col
        :cols="2 * (key.colspan || 1)"
        height="100px"
        v-for="key in arr"
        :key="key.str"
      >
        <cal-btn
          :str="key.str"
          :realStr="key.realStr"
          @pressed="
            key.type === 'input' ? appendVal($event) : operatorClicked($event)
          "
        >
        </cal-btn>
      </v-col>
    </v-row>
    <!-- <cal-btn
      v-for="key in keys"
      :str="key.str"
      @pressed="key.type === 'input' ? appendVal($event) : appendVal($event)"
      :key="key.str"
    ></cal-btn> -->
  </div>
</template>
<script>
import CalBtn from "./CalBtn.vue";
import Calculator from "../../models/Calculator";

export default {
  components: { CalBtn },
  data: () => ({
    cal: new Calculator(),
    keys: [
      [
        {
          str: "CE",
          type: "op",
        },
        {
          str: "C",
          type: "op",
        },
        {
          str: "+/-",
          type: "op",
        },
        {
          str: "÷",
          realOp: "/",
          type: "op",
        },
        {
          str: "%",
          type: "op",
        },
      ],
      [
        {
          str: "7",
          type: "input",
        },
        {
          str: "8",
          type: "input",
        },
        {
          str: "9",
          type: "input",
        },
        {
          str: "*",
          type: "op",
        },
        {
          str: "√",
          type: "op",
        },
      ],
      [
        {
          str: "4",
          type: "input",
        },
        {
          str: "5",
          type: "input",
        },
        {
          str: "6",
          type: "input",
        },
        {
          str: "-",
          type: "op",
        },
        {
          str: "x^2",
          type: "op",
        },
      ],
      [
        {
          str: "1",
          type: "input",
        },
        {
          str: "2",
          type: "input",
        },
        {
          str: "3",
          type: "input",
        },
        {
          str: "+",
          type: "op",
        },
        {
          str: "1/x",
          type: "op",
        },
      ],
      [
        {
          str: "0",
          type: "input",
          colspan: 2,
        },
        {
          str: ".",
          type: "input",
        },
        {
          str: "=",
          type: "op",
          colspan: 2,
        },
      ],
    ],
  }),
  methods: {
    appendVal(appendStr) {
      this.cal.append(appendStr);
      console.log("current val: " + this.cal.currVal);
    },
    operatorClicked(op) {
      this.cal.setOp(op);
    },
  },
  created() {
    window.addEventListener("keydown", (e) => {
      if (!isNaN(parseInt(e.key)) || e.key === ".") {
        this.appendVal(e.key);
      } else {
        console.log("op");
        if (e.key === "Enter") this.operatorClicked("=");
        else this.operatorClicked(e.key);
      }
    });
  },
};
</script>
<style lang="">
</style>