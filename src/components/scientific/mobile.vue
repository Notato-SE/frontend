<template>
  <div>
    <div class="calculator-display">
      <math-field class="display" id="history" key="history">
        {{ cal.history }}
      </math-field>
      <div class="answer d-flex flex-wrap justify-end">
        <math-field
          class="text-right"
          style="
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-all;
            width: 100%;
          "
          id="mathfield"
          >{{ cal.currVal }}</math-field
        >
      </div>
    </div>
    <div>
      <v-carousel
        height="100%"
        class="m-2 p-2 d-flex justify-center"
        :show-arrows="false"
        hide-delimiter-background
        v-model="tab"
      >
        <v-carousel-item key="scientific">
          <v-row>
            <v-col cols="11" class="calculator-3" style="width: 340px">
              <div @click="cal.deg = !cal.deg" class="btn operator">
                <span v-if="cal.deg">Deg</span>
                <span v-else>Rad</span>
              </div>
              <div @click="appendVal('!')" class="btn operator">x!</div>
              <div @click="appendVal('\\frac{1}{}')" class="btn operator">
                1/x
              </div>

              <div @click="appendVal('(')" class="btn operator">(</div>
              <div @click="appendVal(')')" class="btn operator">)</div>
              <div @click="appendVal('%')" class="btn operator">%</div>

              <div @click="appendVal('\\sqrt[]{}')" class="btn operator">
                <sup>y</sup>√<sub>x</sub>
              </div>
              <div @click="appendVal('\\sqrt[2]{')" class="btn operator">√</div>
              <div @click="appendVal('^')" class="btn operator">
                x<sup>y</sup>
              </div>

              <div @click="appendVal('\\pi')" class="btn operator">π</div>
              <div @click="appendVal('e^')" class="btn operator">
                e<sup>x</sup>
              </div>
              <div @click="appendVal('^2')" class="btn operator">
                x<sup>2</sup>
              </div>

              <div
                @click="appendVal(cal.first ? 'sin(' : 'sin^{-1}(')"
                class="btn operator"
              >
                <span v-if="cal.first">sin</span>
                <span v-else>sin<sup>-1</sup></span>
              </div>
              <div
                @click="appendVal(cal.first ? 'cos()' : 'cos^{-1}(')"
                class="btn operator"
              >
                <span v-if="cal.first">cos</span>
                <span v-else>cos<sup>-1</sup></span>
              </div>
              <div
                @click="appendVal(cal.first ? 'tan()' : 'tan^{-1}(')"
                class="btn operator"
              >
                <span v-if="cal.first">tan</span>
                <span v-else>tan<sup>-1</sup></span>
              </div>

              <div @click="cal.first = !cal.first" class="btn operator">
                1st
              </div>
              <div @click="appendVal('\\ln()')" class="btn operator">Ln</div>
              <div @click="appendVal('\\log()')" class="btn operator">Log</div>
            </v-col>
            <v-col cols="1"
              ><div
                style="height: 400px; width: 20px; background-color: #d9efff"
              ></div
            ></v-col>
          </v-row>
        </v-carousel-item>
        <v-carousel-item key="simple">
          <v-row>
            <v-col cols="1" class="align-center">
              <div
                style="height: 100%; width: 20px; background-color: #d9efff"
              ></div>
            </v-col>

            <v-col cols="11" class="calculator align-right">
              <div @click="actionClicked('MRC')" class="btn operator">MRC</div>
              <div @click="actionClicked('M+')" class="btn operator">M+</div>
              <div @click="actionClicked('M-')" class="btn operator">M-</div>
              <div @click="actionClicked('+/-')" class="btn operator">+/-</div>
              <div @click="actionClicked('AC')" class="btn operator">AC</div>
              <div @click="actionClicked('CE')" class="btn operator">CE</div>
              <div @click="actionClicked('C')" class="btn operator">Del</div>
              <div @click="appendVal('/')" class="btn operator">/</div>
              <div @click="appendVal('7')" class="btn">7</div>
              <div @click="appendVal('8')" class="btn">8</div>
              <div @click="appendVal('9')" class="btn">9</div>
              <div @click="appendVal('*')" id="times" class="btn operator">
                x
              </div>
              <div @click="appendVal('4')" class="btn">4</div>
              <div @click="appendVal('5')" class="btn">5</div>
              <div @click="appendVal('6')" class="btn">6</div>
              <div @click="appendVal('-')" id="minus" class="btn operator">
                -
              </div>
              <div @click="appendVal('1')" class="btn">1</div>
              <div @click="appendVal('2')" class="btn">2</div>
              <div @click="appendVal('3')" class="btn">3</div>
              <div @click="appendVal('+')" class="btn operator">+</div>
              <div @click="appendVal('0')" class="zero">0</div>
              <div @click="appendVal('.')" class="btn">.</div>
              <div @click="actionClicked('=')" class="btn operator">=</div>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>
<script>
export default {
  props: ["appendVal", "actionClicked", "cal"],
  data: () => ({
    tab: 1,
  }),
};
</script>

<style scoped>
#mathfield {
  border: 0px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

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
  grid-template-rows: repeat(6, minmax(60px, auto));
  grid-template-columns: repeat(4, 60px);
  grid-gap: 12px;
  font-family: "Helvetica";
  font-weight: 300;
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 10px;
  width: 340px;
}

.calculator-display {
  font-family: "Helvetica";
  font-weight: 300;
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 10px;
  width: 340px;
}

.calculator-3 {
  display: grid;
  grid-template-rows: repeat(6, minmax(60px, auto));
  grid-template-columns: repeat(3, 60px);
  grid-gap: 12px;
  font-family: "Helvetica";
  font-weight: 300;
  font-size: 18px;
  background-color: #ffffff;
  width: 300px;
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

.display-3,
.answer-3 {
  grid-column: 1 / 4;
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