/* eslint-disable no-case-declarations */
export default function ScientificCalculator(math) {
  return {
    currVal: "0",
    history: "",
    justReset: true,
    deg: true,
    mrcClickedPreviously: false,
    append(appendStr) {
      this.resetMrcPreviouslyClicked();
      console.log({ reset: this.justReset });
      if (this.justReset) {
        this.reset();
        this.currVal = "";
      }

      if (this.currVal === "") {
        if (parseInt(appendStr) !== 0)
          this.currVal = appendStr === "." ? "0." : appendStr;
      } else {
        if (this.currVal === "-0") this.currVal = "-" + appendStr;
        else this.currVal = this.currVal + appendStr;
      }

      this.checkAndFormatCurrVal();

      this.afterReset();
    },
    checkAndFormatCurrVal() {
      if (this.currVal === "-" || this.currVal === "") this.currVal = "";
    },
    setCurrVal(str) {
      this.afterReset();

      this.currVal = this.currVal.startsWith("Invalidformat.")
        ? str.replace("Invalidformat.", "")
        : str;
    },
    action(str) {
      console.log({ reset: this.justReset });

      if (this.justReset) {
        this.reset();
        this.currVal = "";
        this.history = "";
      }

      this.afterReset();

      switch (str) {
        case "AC":
          this.reset();
          this.currVal = "";
          this.afterReset();
          break;
        case "CE":
          this.currVal = "";
          break;
        case "C":
          if (this.currVal != "")
            this.currVal = this.currVal.substr(0, this.currVal.length - 1);
          break;
        case "=":
          this.history = this.currVal;
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
              ? parseFloat(mem) + parseFloat(this.calculate())
              : parseFloat(mem) - parseFloat(this.calculate())
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
      if (this.currVal === "") return "0";

      try {
        console.log({
          currVal: this.currVal,
          dis: this.displayToFormula(
            document.getElementById("mathfield").getValue("ASCIIMath")
          ),
        });
        return math.evaluate(this.displayToFormula(this.currVal)).toString();
      } catch (_) {
        return "Invalid format.";
      }
    },
    reset() {
      this.justReset = true;
    },
    afterReset() {
      if (this.justReset) {
        this.history = "";
        this.justReset = false;
      }
    },
    displayToFormula(val) {
      return val
        .replace("\\", "")
        .replace(" ", "")
        .replace("log(", "log10(")
        .replace("ln(", "log(")
        .replace("%", "/100")
        .replace(/frac\{(.*?)+\}\{(.*?)\}/i, "$1/$2")
        .replace(/sqrt\[\]\{(.*?)\}/i, "sqrt($1)")
        .replace(/sqrt\[(.*?)+\]\{(.*?)\}/i, "nthRoot($2, $1)")
        .replace(/sin\((.*?)\)/i, "sin($1 " + (this.deg ? "deg" : "rad") + ")")
        .replace(
          /sin\^{-1}\((.*?)\)/i,
          this.deg ? "(asin($1) / 2 / pi * 360)" : "asin($1)"
        )
        .replace(/cos\((.*?)\)/i, "cos($1 " + (this.deg ? "deg" : "rad") + ")")
        .replace(
          /cos\^{-1}\((.*?)\)/i,
          this.deg ? "(acos($1) / 2 / pi * 360)" : "acos($1)"
        )
        .replace(/tan\((.*?)\)/i, "tan($1 " + (this.deg ? "deg" : "rad") + ")")
        .replace(
          /tan\^{-1}\((.*?)\)/i,
          this.deg ? "(atan($1) / 2 / pi * 360)" : "atan($1)"
        );
    },
    resetMrcPreviouslyClicked() {
      if (this.mrcClickedPreviously) this.mrcClickedPreviously = false;
    },
  };
}
