export default {
  methods: {
    setDialog(dialog) {
      this.dialog = dialog;
    },

    async random() {
      this.form.results = null;
      let data = await this.postAxios("/randomizer", this.form);

      this.form.results = data.results;
    },
  },
  data: () => ({
    dialog: false,
  }),
  watch: {
    "form.unorganized_inputs": {
      handler(newValue) {
        this.form.inputs = newValue.split("\n");

        this.form.inputs = this.form.inputs.filter((e) => e !== "");
      },
    },
  },
};
