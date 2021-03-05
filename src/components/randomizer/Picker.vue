<template>
  <div>
    <Result :results="form.results" :random_type="form.random_type" />

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
      </v-row>
    </div>
    <div class="d-flex justify-start">
      <v-btn @click="random()" elevation="2" class="mt-2" color="primary">
        Pick
      </v-btn>
    </div>
  </div>
</template>
<script>
import SaveDialog from "@/components/randomizer/SaveDialog.vue";
import Result from "@/components/randomizer/Result.vue";
import randomizerMixin from "@/components/randomizer/randomizerMixin";

export default {
  components: { SaveDialog, Result },
  mixins: [randomizerMixin],
  data: () => ({
    form: {
      random_type: 1,
      results: null,
    },
  }),
};
</script>

