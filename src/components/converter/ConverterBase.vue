

<template>
  <v-container fluid style="margin-top: 132px; padding-bottom: 20px">
    <v-text-field v-if="loading" color="success" loading disabled>
    </v-text-field>
    <v-text-field v-else-if="errored" color="error" loading disabled>
    </v-text-field>

    <v-row v-else justify="center" align="center">
      <v-col class="d-flex" cols="12" sm="3">
        <v-select
          v-model="select_from"
          :items="items"
          label="From"
          v-on:change="clear"
          dark
          background-color="primary"
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="2" align="center">
        <v-row justify="center">
          <img
            alt="Arrow Logo"
            src="../../assets/arrow.svg"
            width="100px"
            height="50px"
          />
        </v-row>
      </v-col>

      <v-col class="d-flex" cols="12" sm="3">
        <v-select
        dark
          v-model="select_to"
          :items="items"
          v-on:change="clear"
          label="To"
          background-color="primary"
          solo
          hide-details
        >
        </v-select>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
        v-show="this.select_from != null"
        cols="12"
        sm="8"
        style="margin-top: 50px"
      >
        <p
          class="font-weight-bold text-left"
          style="margin-bottom: 15px; font-size: 20px"
        >
          {{ this.select_from }}
        </p>
        <v-form @submit="onConvert">
          <v-text-field
            label="Amount"
            v-model="amount"
            outlined
            single-line
            dense
            @keypress="isNumber($event)"
          ></v-text-field>
        </v-form>

        <v-col
          v-show="this.select_to != null"
          style="margin-top: 25px; padding: 0"
        >
          <p
            class="font-weight-bold text-left"
            v-show="this.converted != null"
            style="font-size: 18px"
          >
            {{ this.select_to }}
          </p>
          <p
            class="primary--text font-weight-bold"
            v-show="this.converted != null"
            align="center"
            style="margin-bottom: 10px; font-size: 32px"
          >
            {{ this.converted }}
          </p>

          <div class="d-flex justify-end">
            <v-btn
              v-on:click="onConvert"
              style="margin-top: 30px"
              color="primary"
            >
              Convert
            </v-btn>
          </div>
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
      select_to: null,
      select_from: null,
      amount: 1,
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
          this.select_to = this.items[0];
          this.select_from = this.items[1];
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  },
  methods: {
    clear() {
      this.amount = 1;
      this.converted = null;
    },
    onConvert(e) {
      e.preventDefault();
      if (this.amount == null) return false;

      axios
        .get(
          this.coreConverterApi +
            "/convert?" +
            "from=" +
            this.select_from +
            "&to=" +
            this.select_to +
            "&amount=" +
            this.amount
        )
        .then((response) => {
          this.converted = response.data.converted;
        })
        .catch(() => (this.errored = true));
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
</style>
