<template>
  <div>
    <div
      style="background-color: #d3d3d3; height: 100px"
      class="mt-5 d-flex align-center justify-center"
    >
      <h1>{{ form.results }}</h1>
    </div>
    <div class="d-flex justify-end">
      <v-btn
        @click="dialog = true"
        elevation="2"
        class="mt-2"
        :disabled="!form.results"
      >
        Save
      </v-btn>
      <SaveDialog :form="form" :dialog="dialog" :setDialog="setDialog" />
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
      <v-btn @click="random()" elevation="2" class="mt-2" color="primary">
        Generate
      </v-btn>
    </div>
  </div>
</template>
<script>
import SaveDialog from "@/components/randomizer/SaveDialog.vue";
import randomizerMixin from "@/components/randomizer/randomizerMixin";

export default {
  components: { SaveDialog },
  mixins: [randomizerMixin],
  data: () => ({
    form: {
      random_type: 2,
      group_num: 1,
      results: null,
    },
  }),
};
</script>

