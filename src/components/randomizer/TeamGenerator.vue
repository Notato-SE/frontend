<template>
  <div>
    <div
      style="background-color: #d3d3d3; height: 100px"
      class="mt-5 d-flex align-center justify-center"
    >
      <h1>{{ results }}</h1>
    </div>
    <div class="d-flex justify-end">
      <v-btn @click="save()" elevation="2" class="mt-2" :disabled="!results">
        Save
      </v-btn>
    </div>
    <div class="d-flex justify-start">
      <v-row>
        <v-col cols="12">
          <div style="width: 50%; text-align: start">
            <p>Item</p>
            <v-textarea
              outlined
              rows="7"
              v-model="form.unorganized_inputs"
            ></v-textarea>
          </div>
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="3" style="text-align: start">
              <p>Teams</p>
              <v-text-field
                v-model="form.group_num"
                outlined
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <div class="d-flex justify-start">
      <v-btn @click="generate()" elevation="2" class="mt-2" color="primary">
        Generate
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    tab: "",
    form: {
      random_type: 2,
      group_num: 1,
    },
    results: undefined,
  }),
  methods: {
    async save() {
      if (this.form.results) {
        await this.postAxios("/randomizer/save", this.form);
      }
    },
    async generate() {
      let data = await this.postAxios("/randomizer", this.form);

      this.results = data.results;
      this.form.results = data.results;
    },
  },
  watch: {
    "form.unorganized_inputs": {
      handler(newValue) {
        this.form.inputs = newValue.split("\n");

        this.form.inputs = this.form.inputs.filter((e) => e !== "");
      },
    },
  },
};
</script>