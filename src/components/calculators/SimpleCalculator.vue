<template>
  <v-container fluid class="d-flex justify-center my-5">
    <div class="calculator">
      <div class="display">{{ cal.history }}</div>
      <div class="answer d-flex flex-wrap justify-end">
        <p
          class="text-right"
          style="
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-all;
          "
        >
          <span
            v-if="cal.currVal.length < 14 || cal.currVal === 'Division by zero'"
            :class="`color: ${
              cal.currVal === 'Division by zero' ? 'red' : '#146080'
            } !important`"
          >
            <br />
            {{ cal.currVal }}
          </span>
          <span v-else>
            {{ cal.currVal.substr(0, cal.currVal.length - 13) }} <br />
            {{ cal.currVal.substr(cal.currVal.length - 13) }}
          </span>
        </p>
      </div>
      <div @click="actionClicked('MRC')" class="btn operator">MRC</div>
      <div @click="actionClicked('M+')" class="btn operator">M+</div>
      <div @click="actionClicked('M-')" class="btn operator">M-</div>
      <div @click="actionClicked('+/-')" class="btn operator">+/-</div>
      <div @click="actionClicked('AC')" class="btn operator">AC</div>
      <div @click="actionClicked('CE')" class="btn operator">CE</div>
      <div @click="actionClicked('C')" class="btn operator">Del</div>
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
  props: ["cal"],
  data: () => ({
    // cal: new Calculator(),
  }),
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
  font-family: "Helvetica";
  font-weight: 300;
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 80px -30px rgba(13, 81, 134, 1);
  width: 340px;
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

.btn:hover,
.zero:hover {
  background-color: #484848;
  color: #f4faff;
}

.display,
.answer {
  grid-column: 1 / 5;
  display: flex;
  align-items: left;
  /* text-overflow: clip; */
  /* height: 10vh; */
  width: 100%;
}

.display {
  color: #a3a3a3;
  margin: 0;
}

.answer {
  font-weight: 500;
  color: #146080;
  font-size: 38px;
  /* height: 65px; */
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

.operator:hover {
  color: #d9efff;
  background-color: #3fa9fc;
}
</style>