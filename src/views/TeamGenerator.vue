<template>
  <div>
    <h1>Team Generator</h1>

    <div style="width: 70%">
      <v-textarea rows="7" v-model="form.unorganized_inputs"> </v-textarea>

      <v-text-field v-model="form.group_num" type="number"></v-text-field>

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
  data: () => ({
    form: {
      random_types: 2,
      group_num: 0,
    },
    results: "asd",
  }),
  methods: {
    async random() {
      //convert the inputs to array first
      //submit to api
      this.results = await this.postAxios("/randomizer");
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
 