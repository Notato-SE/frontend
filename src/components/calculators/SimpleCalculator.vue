<template>
  <v-container fluid>
    <div class="calculator">
      <div class="display">{{ cal.history }}</div>
      <div class="answer d-flex justify-end">{{ cal.currVal }}</div>
      <div @click="actionClicked('MRC')" class="btn operator">MRC</div>
      <div @click="actionClicked('M+')" class="btn operator">M+</div>
      <div @click="actionClicked('M-')" class="btn operator">M-</div>
      <div @click="actionClicked('+/-')" class="btn operator">+/-</div>
      <div @click="actionClicked('AC')" class="btn operator">AC</div>
      <div @click="actionClicked('CE')" class="btn operator">CE</div>
      <div @click="actionClicked('C')" class="btn operator">C</div>
      <div @click="operatorClicked('/')" class="btn operator">/</div>
      <div @click="appendVal('7')" class="btn">7</div>
      <div @click="appendVal('8')" class="btn">8</div>
      <div @click="appendVal('9')" class="btn">9</div>
      <div @click="operatorClicked('*')" id="times" class="btn operator">x</div>
      <div @click="appendVal('4')" class="btn">4</div>
      <div @click="appendVal('5')" class="btn">5</div>
      <div @click="appendVal('6')" class="btn">6</div>
      <div @click="operatorClicked('-')" id="minus" class="btn operator">-</div>
      <div @click="appendVal('1')" class="btn">1</div>
      <div @click="appendVal('2')" class="btn">2</div>
      <div @click="appendVal('3')" class="btn">3</div>
      <div @click="operatorClicked('+')" class="btn operator">+</div>
      <div @click="appendVal('0')" class="zero">0</div>
      <div @click="appendVal('.')" class="btn">.</div>
      <div @click="actionClicked('=')" class="btn operator">=</div>
    </div>
  </v-container>
</template>
<script>
// import InputDisplay from "./InputDisplay.vue";
// import CalBtn from "./CalBtn.vue";
import Calculator from "../../models/Calculator";

export default {
  // components: { CalBtn, InputDisplay },
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
    actionClicked(str) {
      this.cal.action(str);
    },
  },
  created() {
    window.addEventListener("keydown", (e) => {
      if (!isNaN(parseInt(e.key)) || e.key === ".") {
        this.appendVal(e.key);
      } else if (
        ["+", "-", "/", "*", "Escape", "Enter", "Backspace"].includes(e.key)
      ) {
        console.log("op");
        let clicked = e.key;
        if (clicked === "Enter") clicked = "=";
        else if (clicked === "Escape") clicked = "CE";
        else if (clicked === "Backspace") clicked = "C";

        if (["Escape", "Enter", "Backspace"].includes(e.key))
          this.actionClicked(clicked);
        else this.operatorClicked(clicked);
      }

      console.log(e.key);
    });
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::selection {
  background: none;
}

body {
  background-color: #3fa9fc;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.calculator {
  display: grid;
  grid-template-rows: repeat(7, minmax(60px, auto));
  grid-template-columns: repeat(4, 60px);
  grid-gap: 12px;
  padding: 35px;
  font-family: "Poppins";
  font-weight: 300;
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 80px -30px rgba(13, 81, 134, 1);
}

.btn,
.zero {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #484848;
  background-color: #f4faff;
  border-radius: 5px;
}

.display,
.answer {
  grid-column: 1 / 5;
  display: flex;
  align-items: center;
}

.display {
  color: #a3a3a3;
  overflow: hidden;
  text-overflow: clip;
  margin: 0;
}

.answer {
  font-weight: 500;
  color: #146080;
  font-size: 55px;
  height: 65px;
  margin: 0;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 15px;
}

.zero {
  grid-column: 1 / 3;
}

.operator {
  background-color: #d9efff;
  color: #3fa9fc;
}
</style>