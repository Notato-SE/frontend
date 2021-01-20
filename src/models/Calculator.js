export default function Calculator() {
  return {
    values: ["0", "0"],
    currVal: "0",
    history: "",
    justReset: true,
    op: "",
    append(appendStr) {
      if (this.currVal === "0") {
        this.currVal = appendStr === "." ? "0." : appendStr;
      } else {
        if (this.currVal === "-0") this.currVal = "-" + appendStr;
        else this.currVal = this.currVal + appendStr;
      }

      this.afterReset();
    },
    setOp(op) {
      if (this.handleSpecialOp(op)) {
        this.justReset = true;
        return;
      }

      this.afterReset();

      if (this.op === "" && op !== "=") {
        this.op = op;
        this.history = this.currVal + " " + op;
        this.currVal = "0";
      } else {
        this.history = this.history + " " + this.currVal;
        this.currVal = this.calculate();
        this.reset();
      }

      console.log(this.op);
    },
    calculate() {
      console.log(this.history);
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
      if (op === "C") {
        this.currVal = "0";
        this.afterReset();
        return true;
      } else if (op === "CE") {
        this.reset();
        this.currVal = "0";
        this.history = "";
        return true;
      } else if (op === "+/-") {
        this.currVal = this.currVal.startsWith("-")
          ? this.currVal.substr(1)
          : "-" + this.currVal;

        return true;
      } else if (op === "√") {
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
  };
}
