<template>
  <div class="d-flex justify-center m-2">
    <v-container
      fluid
      class="d-flex flex-column justify-center my-5 sheet"
      style="width: 540px"
    >
      <v-row class="ml-5 mr-7 my-0 py-0">
        <math-field
          class="display d-flex flex-wrap justify-left"
          id="history"
          key="history"
        >
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
            @input="mathFieldChange"
            :config="{ smartFence: false }"
            >{{ cal.currVal }}</math-field
          >
        </div>
      </v-row>

      <div v-if="windowWidth > 550" class="calculator">
        <div @click="cal.deg = !cal.deg" class="btn operator">
          <span v-if="cal.deg">Deg</span>
          <span v-else>Rad</span>
        </div>
        <div @click="appendVal('!')" class="btn operator">x!</div>
        <div @click="appendVal('$$\\frac{1}{#@}$$')" class="btn operator">
          1/x
        </div>
        <div @click="actionClicked('MRC')" class="btn operator">MRC</div>
        <div @click="actionClicked('M+')" class="btn operator">M+</div>
        <div @click="actionClicked('M-')" class="btn operator">M-</div>
        <div @click="actionClicked('+/-')" class="btn operator">+/-</div>

        <div @click="appendVal('(')" class="btn operator">(</div>
        <div @click="appendVal(')')" class="btn operator">)</div>
        <div @click="appendVal('\\%')" class="btn operator">%</div>
        <div @click="actionClicked('AC')" class="btn operator">AC</div>
        <div @click="actionClicked('CE')" class="btn operator">CE</div>
        <div @click="actionClicked('C')" class="btn operator">Del</div>
        <div @click="appendVal('$$\\frac{#@}{#?}$$')" class="btn operator">
          /
        </div>

        <div @click="appendVal('\\sqrt[#0]{#1}')" class="btn operator">
          <sup>y</sup>√<sub>x</sub>
        </div>
        <div @click="appendVal('\\sqrt[]{#0}')" class="btn operator">√</div>
        <div @click="appendVal('$$#@^{#?}$$')" class="btn operator">
          x<sup>y</sup>
        </div>
        <div @click="appendVal('7')" class="btn">7</div>
        <div @click="appendVal('8')" class="btn">8</div>
        <div @click="appendVal('9')" class="btn">9</div>
        <div @click="appendVal('*')" id="times" class="btn operator">x</div>

        <div @click="appendVal('\\pi')" class="btn operator">π</div>
        <div @click="appendVal('$$e^#@$$')" class="btn operator">
          e<sup>x</sup>
        </div>
        <div @click="appendVal('^2')" class="btn operator">x<sup>2</sup></div>
        <div @click="appendVal('4')" class="btn">4</div>
        <div @click="appendVal('5')" class="btn">5</div>
        <div @click="appendVal('6')" class="btn">6</div>
        <div @click="appendVal('-')" id="minus" class="btn operator">-</div>

        <div
          @click="appendVal(first ? 'sin(#0)' : 'sin^{-1}(#0)')"
          class="btn operator"
        >
          <span v-if="first">sin</span>
          <span v-else>sin<sup>-1</sup></span>
        </div>
        <div
          @click="appendVal(first ? 'cos(#0)' : 'cos^{-1}(#0)')"
          class="btn operator"
        >
          <span v-if="first">cos</span>
          <span v-else>cos<sup>-1</sup></span>
        </div>
        <div
          @click="appendVal(first ? 'tan(#0)' : 'tan^{-1}(#0)')"
          class="btn operator"
        >
          <span v-if="first">tan</span>
          <span v-else>tan<sup>-1</sup></span>
        </div>
        <div @click="appendVal('1')" class="btn">1</div>
        <div @click="appendVal('2')" class="btn">2</div>
        <div @click="appendVal('3')" class="btn">3</div>
        <div @click="appendVal('+')" class="btn operator">+</div>

        <div @click="first = !first" class="btn operator">1st</div>
        <div @click="appendVal('\\ln(#0)')" class="btn operator">Ln</div>
        <div @click="appendVal('\\log(#0)')" class="btn operator">Log</div>
        <div @click="appendVal('0')" class="btn">0</div>
        <div @click="appendVal('00')" class="btn">00</div>
        <div @click="appendVal('.')" class="btn">.</div>
        <div @click="actionClicked('=')" class="btn operator">=</div>
      </div>
      <template v-else>
        <div>
          <v-carousel
            height="100%"
            class="px-3 pb-5 mb-5 d-flex justify-center"
            :show-arrows="false"
            hide-delimiter-background
            v-model="tab"
          >
            <v-carousel-item key="scientific">
              <v-row>
                <v-col cols="11" class="calculator-3 align-left">
                  <div @click="cal.deg = !cal.deg" class="btn operator">
                    <span v-if="cal.deg">Deg</span>
                    <span v-else>Rad</span>
                  </div>
                  <div @click="appendVal('!')" class="btn operator">x!</div>
                  <div
                    @click="appendVal('$$\\frac{1}{#@}$$')"
                    class="btn operator"
                  >
                    1/x
                  </div>

                  <div @click="appendVal('(')" class="btn operator">(</div>
                  <div @click="appendVal(')')" class="btn operator">)</div>
                  <div @click="appendVal('\\%')" class="btn operator">%</div>

                  <div
                    @click="appendVal('\\sqrt[#0]{#1}')"
                    class="btn operator"
                  >
                    <sup>y</sup>√<sub>x</sub>
                  </div>
                  <div @click="appendVal('\\sqrt[]{#0}')" class="btn operator">
                    √
                  </div>
                  <div @click="appendVal('$$#@^{#?}$$')" class="btn operator">
                    x<sup>y</sup>
                  </div>

                  <div @click="appendVal('\\pi')" class="btn operator">π</div>
                  <div @click="appendVal('$$e^#@$$')" class="btn operator">
                    e<sup>x</sup>
                  </div>
                  <div @click="appendVal('^2')" class="btn operator">
                    x<sup>2</sup>
                  </div>

                  <div
                    @click="appendVal(first ? 'sin(#0)' : 'sin^{-1}(#0)')"
                    class="btn operator"
                  >
                    <span v-if="first">sin</span>
                    <span v-else>sin<sup>-1</sup></span>
                  </div>
                  <div
                    @click="appendVal(first ? 'cos(#0)' : 'cos^{-1}(#0)')"
                    class="btn operator"
                  >
                    <span v-if="first">cos</span>
                    <span v-else>cos<sup>-1</sup></span>
                  </div>
                  <div
                    @click="appendVal(first ? 'tan(#0)' : 'tan^{-1}(#0)')"
                    class="btn operator"
                  >
                    <span v-if="first">tan</span>
                    <span v-else>tan<sup>-1</sup></span>
                  </div>

                  <div @click="cal.first = !cal.first" class="btn operator">
                    1st
                  </div>
                  <div @click="appendVal('\\ln()')" class="btn operator">
                    Ln
                  </div>
                  <div @click="appendVal('\\log()')" class="btn operator">
                    Log
                  </div>
                </v-col>
                <v-col cols="1"
                  ><div
                    class="rounded"
                    style="height: 100%; width: 20px; background-color: #d9efff"
                  ></div
                ></v-col>
              </v-row>
            </v-carousel-item>
            <v-carousel-item key="simple">
              <v-row class="pl-5">
                <v-col cols="1"
                  ><div
                    class="rounded"
                    style="height: 100%; width: 20px; background-color: #d9efff"
                  ></div
                ></v-col>

                <v-col cols="11" class="calculator align-right py-0 pl-2">
                  <div @click="actionClicked('MRC')" class="btn operator">
                    MRC
                  </div>
                  <div @click="actionClicked('M+')" class="btn operator">
                    M+
                  </div>
                  <div @click="actionClicked('M-')" class="btn operator">
                    M-
                  </div>
                  <div @click="actionClicked('+/-')" class="btn operator">
                    +/-
                  </div>
                  <div @click="actionClicked('AC')" class="btn operator">
                    AC
                  </div>
                  <div @click="actionClicked('CE')" class="btn operator">
                    CE
                  </div>
                  <div @click="actionClicked('C')" class="btn operator">
                    Del
                  </div>
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
      </template>
    </v-container>
  </div>
</template>
<script>
export default {
  props: ["cal"],
  data: () => ({
    mfe: null,
    key: 1,
    windowWidth: window.innerWidth,
    first: true,
  }),
  watch: {
    "cal.currVal": {
      handler(newVal) {
        const mf = document.getElementById("mathfield");
        console.log(newVal, this.cal.currVal);
        if (mf.getValue() !== this.cal.currVal) {
          mf.setValue(this.cal.currVal === "" ? "0" : this.cal.currVal);
        }
        console.log(["CurrVal Updated", this.cal]);

        this.cal.setCurrVal(newVal);
      },
    },
    "cal.history": {
      handler(newVal) {
        console.log("History Updated");
        this.history = newVal;

        document.getElementById("history").setValue(this.history);
      },
    },
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    mathFieldChange(ev) {
      console.log("math field changed");
      this.cal.currVal = ev.target.getValue();
      // this.cal.setCurrVal(ev.target.getValue());
    },
    appendVal(appendStr) {
      console.log([
        this.cal.history !== "",
        !isNaN(parseInt(appendStr)) || appendStr === ".",
      ]);
      if (
        this.cal.history !== "" &&
        (!isNaN(parseInt(appendStr)) || appendStr === ".")
      )
        this.cal.currVal = "0";

      if (this.cal.currVal === "0" || this.cal.currVal === "")
        document.getElementById("mathfield").setValue(appendStr);
      else document.getElementById("mathfield").insert(appendStr);

      if (this.cal.history === "")
        document.getElementById("history").setValue(this.cal.history);
    },
    actionClicked(str) {
      this.cal.action(str);

      // if (str === "=")
      document.getElementById("history").setValue(this.cal.history);
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
#mathfield {
  border: none;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::selection {
  background: none;
}

.sheet {
  border-radius: 10px;
  box-shadow: 0px 3px 80px -30px rgba(13, 81, 134, 1);
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
  grid-template-columns: repeat(7, 60px);
  grid-gap: 12px;
  padding: 20px;
  padding-top: 10px;
  font-family: "Helvetica";
  font-weight: 300;
  font-size: 18px;
  background-color: #ffffff;
  width: 535px;
}

.display-items {
  display: grid;
  grid-template-rows: repeat(2, minmax(60px, auto));
  grid-template-columns: repeat(1, 535px);
  grid-gap: 12px;
  padding: 20px;
  padding-top: 10px;
  font-family: "Helvetica";
  font-weight: 300;
  font-size: 18px;
  background-color: #ffffff;
  width: 535px;
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

@media screen and (max-width: 535px) {
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
}
</style>