<template>
  <div>
    <v-row>
      <v-col cols="12" v-for="data in datas" :key="data.id">
        <v-row>
          <v-col cols="5">
            <h1>{{ data.inputs.name }}</h1>
            #{{ data.id }}, {{ data.created_at_display }}
          </v-col>
          <v-col cols="1" class="d-flex align-center justify-center">
            {{ data.random_type_data }}
          </v-col>
          <v-col cols="4" class="d-flex align-center justify-center">
            <v-btn
              v-if="data.random_type !== 1"
              elevation="1"
              :loading="data.loading.downloadExcel"
              @click="downloadExcel(data)"
              >Download Excel</v-btn
            >
          </v-col>
          <v-col cols="2" class="d-flex align-center justify-center">
            <v-btn
              elevation="2"
              color="primary"
              :loading="data.loading.revise"
              @click="revise(data)"
              >Revise</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="700">
      <v-card v-if="dialog">
        <v-card-title class="headline grey lighten-2">
          Result History
        </v-card-title>

        <v-row>
          <v-col
            cols="12"
            class="d-flex justify-center"
            style="text-align: start"
          >
            <p>Inputs:</p>
            <div
              style="background-color: #d3d3d3; height: 100px; width: 70%"
              class="mt-5 d-flex align-center justify-center"
            >
              <h1>{{ curData.inputs.inputs }}</h1>
            </div>
          </v-col>
          <v-col
            cols="12"
            class="d-flex justify-center"
            style="text-align: start"
          >
            <p>Results:</p>
            <div
              style="background-color: #d3d3d3; height: 100px; width: 70%"
              class="mt-5 d-flex align-center justify-center"
            >
              <h1>{{ curData.results }}</h1>
            </div>
          </v-col>
        </v-row>

        <br />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    datas: {},
    dialog: false,
    curData: {},
  }),
  methods: {
    async downloadExcel(data) {
      data.loading.downloadExcel = true;

      axios.get(`/randomizer/export/${data.id}`).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "random.xls");
        document.body.appendChild(fileLink);

        fileLink.click();
      });

      data.loading.downloadExcel = false;
    },
    async revise(data) {
      data.loading.revise = true;
      this.dialog = true;
      this.curData = data;
      data.loading.revise = false;
    },
  },
  async beforeMount() {
    this.datas = (await this.getAxios("/randomizer/me")).data;

    this.datas = this.datas.map((e) => {
      return {
        ...e,
        loading: {
          downloadExcel: false,
          revise: false,
        },
      };
    });
  },
};
</script>