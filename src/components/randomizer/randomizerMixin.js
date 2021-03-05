export default {
  methods: {
    setDialog(dialog) {
      this.dialog = dialog;
    },

    async random() {
      this.form.results = null;
      let data = await this.postAxios("/randomizer", this.form, "post", false);

      this.form.results = data.results;
    },
  },
  props: {
    formData: Object,
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
    formData: {
      immediate: true,
      handler(newValue) {
        if (!newValue) return;

        // this.form = newValue.inputs;
        this.form = { ...this.form, ...newValue };
        this.form.unorganized_inputs = this.form.inputs.inputs.join("\n");
      },
    },
  },
};
