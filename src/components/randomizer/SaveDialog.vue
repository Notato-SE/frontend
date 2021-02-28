<template>
  <div>
    <v-dialog v-model="internal_dialog" width="500" @close="closeDialog()">
      <v-card class="rounded-lg">
        <!-- <v-card-title class="headline grey lighten-2">
          Save the results
        </v-card-title> -->

        <h4 class="pa-5" style="text-align: start">
          Provide a meaningful name so that you can recall it later.
        </h4>

        <div class="d-flex justify-center mt-5" style="text-align: start">
          <div style="width: 70%">
            <p>Name</p>
            <v-text-field
              v-model="internal_form.name"
              outlined
              :rules="[rules.required]"
              placeholder="My student final project team"
            ></v-text-field>
            <div class="pb-5">
              <v-btn
                :class="internal_form.name.length <= 0 ? '' : 'primary'"
                @click="save()"
                :disabled="internal_form.name.length <= 0"
                :loading="loading"
                style="width: 100%"
              >
                SAVE
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    tab: "",
    internal_dialog: false,
    results: undefined,
    internal_form: {
      name: "",
    },
    loading: false,
    rules: {
      required: (value) => !!value || "This field is required.",
    },
  }),
  props: {
    dialog: Boolean,
    form: Object,
    setDialog: Function,
  },
  methods: {
    async save() {
      this.loading = true;
      if (this.form.results) {
        try {
          await this.postAxios("/randomizer/save", this.internal_form);
        } catch (error) {
          console.log();
        }
      }

      this.closeDialog();
      this.loading = false;
    },
    closeDialog() {
      this.setDialog(false);
      this.internal_dialog = false;
    },
  },
  watch: {
    dialog: {
      immediate: true,
      handler(newValue) {
        this.internal_dialog = newValue;
      },
    },
    form: {
      immediate: true,
      handler(newValue) {
        this.internal_form = { ...this.internal_form, newValue };
      },
    },
    internal_dialog: {
      immediate: true,
      handler(newValue) {
        this.setDialog(newValue);
      },
    },
  },
};
</script>