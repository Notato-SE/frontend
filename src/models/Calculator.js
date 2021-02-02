/* eslint-disable no-case-declarations */
export default function Calculator() {
  return {
    values: ["0", "0"],
    currVal: "0",
    history: "",
    justReset: true,
    mrcClickedPreviously: false,
    op: "",
    append(appendStr) {
      if (this.currVal.length === 27) return;

      this.resetMrcPreviouslyClicked();

      if (this.justReset) {
        this.reset();
        this.currVal = "0";
      }
      if (appendStr === "." && this.currVal.includes(".")) return;

      if (this.currVal === "0") {
        this.currVal = appendStr === "." ? "0." : appendStr;
      } else {
        if (this.currVal === "-0") this.currVal = "-" + appendStr;
        else this.currVal = this.currVal + appendStr;
      }

      this.checkAndFormatCurrVal();

      this.afterReset();
    },
    setOp(op) {
      this.resetMrcPreviouslyClicked();

      if (this.handleSpecialOp(op)) {
        this.justReset = true;
        return;
      }

      this.afterReset();

      if (this.op === "") {
        this.op = op;
        this.history = this.currVal + " " + op;
        this.currVal = "0";
      }

      console.log(this.op);
      this.checkAndFormatCurrVal();
    },
    checkAndFormatCurrVal() {
      if (this.currVal === "-" || this.currVal === "") this.currVal = "0";
    },
    action(str) {
      if (this.justReset) {
        this.reset();
        this.currVal = "0";
        this.history = "";
      }

      switch (str) {
        case "AC":
          this.reset();
          this.currVal = "0";
          this.afterReset();
          break;
        case "CE":
          this.currVal = "0";
          break;
        case "C":
          if (this.currVal != "0")
            this.currVal = this.currVal.substr(0, this.currVal.length - 1);
          break;
        case "=":
          if (this.op === "") break;
          this.history = this.history + " " + this.currVal;
          this.currVal = this.calculate();
          this.reset();
          break;
        case "+/-":
          this.currVal = this.currVal.startsWith("-")
            ? this.currVal.substr(1)
            : "-" + this.currVal;
          break;
        case "M+":
        case "M-":
          const mem = localStorage.getItem("mem") ?? "0";
          console.log(mem);
          localStorage.setItem(
            "mem",
            str === "M+"
              ? parseFloat(mem) + parseFloat(this.currVal)
              : parseFloat(mem) - parseFloat(this.currVal)
          );
          break;
        case "MRC":
          this.currVal = localStorage.getItem("mem") ?? "0";
          if (this.mrcClickedPreviously) localStorage.removeItem("mem");

          this.mrcClickedPreviously = !this.mrcClickedPreviously;
          break;
        default:
          break;
      }

      if (str !== "MRC") this.resetMrcPreviouslyClicked();
      this.checkAndFormatCurrVal();
    },
    calculate() {
      console.log(this.history);
      if (this.values[0] === "0" && this.currVal === "0" && this.op === "/")
        return "Division by zero";

      this.justReset = true;
      return eval(this.history).toString();
    },
    reset() {
      this.values = ["0", "0"];
      this.op = "";
      this.justReset = true;
    },
    afterReset() {
      if (this.justReset) {
        this.history = "";
        this.justReset = false;
      }
    },
    handleSpecialOp(op) {
      if (this.currVal === "Division by zero") {
        this.reset();
        return true;
      }

      if (op === "√") {
        this.history = "√" + this.currVal;
        this.currVal = Math.sqrt(this.currVal);
        return true;
      } else if (op === "x^2") {
        this.history = this.currVal + " ^ 2";
        this.currVal = Math.pow(this.currVal, 2);
        return true;
      } else if (op === "1/x") {
        this.history = "1 / " + this.currVal;
        this.currVal = 1 / this.currVal;
        return true;
      }

      return false;
    },
    resetMrcPreviouslyClicked() {
      if (this.mrcClickedPreviously) this.mrcClickedPreviously = false;
    },
  };
}
