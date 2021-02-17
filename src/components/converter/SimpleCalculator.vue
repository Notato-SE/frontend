

<template>
  <v-container fluid style="margin-top: 132px; padding-bottom: 20px">
    <v-text-field v-if="loading" color="success" loading disabled>
    </v-text-field>
    <v-text-field v-else-if="errored" color="error" loading disabled>
    </v-text-field>

    <v-row v-else justify="center">
      <v-col class="d-flex" cols="12" sm="3">
        <v-select
          v-on:change="setFrom"
          :items="items"
          label="From"
          background-color="primary"
          solo
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="3">
        <v-select
          v-on:change="setTo"
          :items="items"
          label="To"
          background-color="primary"
          solo
        >
        </v-select>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col v-show="from != null" cols="12" sm="6">
        <p class="font-weight-medium text-uppercase">{{ this.from }}</p>
        <v-form>
          <v-row justify="center">
            <v-col>
              <v-text-field
                label="Amount"
                align="center"
                v-model="amount"
                solo
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <v-col v-show="to != null">
          <p class="font-weight-medium text-uppercase">{{ this.to }}</p>
          <p
            v-bind:style="{
              fontSize: 36,
            }"
            class="primary--text font-weight-bold font-size-30"
            v-show="this.converted != null"
            align="center"
            style="margin-bottom: 20px"
          >
            {{ this.converted }}
          </p>
          <v-row justify="end">
            <v-btn v-on:click="onConvert" color="primary"> Convert </v-btn>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: ["type"],
  data() {
    return {
      coreConverterApi: "https://converter.doxxie.live",
      items: [],
      from: null,
      to: null,
      amount: null,
      converted: null,
      loading: false,
      errored: false,
    };
  },
  created() {
    if (this.type != null) {
      this.loading = true;
      axios
        .get(this.coreConverterApi + "/possible/" + this.type)
        .then((response) => {
          this.items = response.data.possibles;
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  },
  methods: {
    setFrom(newFrom) {
      this.from = newFrom;
    },
    setTo(newTo) {
      this.to = newTo;
    },
    onConvert() {
      axios
        .get(
          this.coreConverterApi +
            "/convert?" +
            "from=" +
            this.from +
            "&to=" +
            this.to +
            "&amount=" +
            this.amount
        )
        .then((response) => {
          this.converted = response.data.converted;
        })
        .catch(() => (this.errored = true));
    },
  },
};
</script>

<style scoped>
.toCapitalFirst {
  text-transform: "capitalize";
}
</style>
