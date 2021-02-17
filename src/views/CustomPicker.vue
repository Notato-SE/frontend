<template>
  <div>
    <h1>Custom Picker</h1>

    <div style="width: 70%">
      <v-textarea rows="7" v-model="form.unorganized_inputs"> </v-textarea>

      <v-text-field v-model="form.list_num" type="number"></v-text-field>

      <v-checkbox
        v-model="form.duplicated"
        true-value="1"
        false-value="0"
        label="Duplicated"
      ></v-checkbox>

      <v-btn @click="random()"> Random </v-btn>
    </div>

    <br />
    <br />
    <br />

    <div style="width: 70%">
      <p>Here is the results</p>
      <div>
        {{ results }}
      </div>

      <v-btn @click="save()"> Save </v-btn>
    </div>
  </div>
</template>


<script>
export default {
  mounted() {
    this.random();
  },
  data: () => ({
    form: {
      random_types: 3,
      list_num: 0,
    },
    results: "asd",
  }),
  methods: {
    async random() {
      //convert the inputs to array first
      //submit to api
      this.results = await this.postAxios("/login");
    },
    save() {},
  },
  watch: {
    "form.unorganized_inputs": {
      handler(newValue) {
        this.form.inputs = newValue.split("\n");
      },
    },
  },
};
</script>
 