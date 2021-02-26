<template>
  <div>
    <v-row class="pa-6">
      <v-col
        cols="12"
        v-for="data in datas"
        :key="data.id"
        class="border border-dark ma-1"
      >
        <v-row>
          <v-col cols="5">
            <h2>
              {{
                data.name.length > 10
                  ? data.name.slice(0, 10) + "..."
                  : data.name
              }}
            </h2>
            #{{ data.id }}, {{ data.created_at_display }}
          </v-col>
          <v-col
            cols="1"
            class="d-flex align-center justify-center text-center"
          >
            {{ data.random_type_data }}
          </v-col>
          <v-col cols="4" class="d-flex align-center justify-center">
            <v-btn
              v-if="data.random_type !== 1"
              text
              color="primary"
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
          {{ curData.name }}
        </v-card-title>

        <v-row>
          <v-col
            cols="12"
            style="text-align: start"
            class="d-flex justify-center"
          >
            <div class="d-flex flex-column justify-center" style="width: 70%">
              <p class="mb-n5">Inputs:</p>
              <div
                style="
                  background-color: #d3d3d3;
                  height: 150px;
                  overflow: scroll;
                "
                class="mt-5 d-flex flex-column align-center justify-center"
              >
                <h1
                  v-for="(each, k) in curData.inputs.inputs"
                  :key="k"
                  class="ma-0"
                >
                  {{ each }}
                </h1>
              </div>
            </div>
          </v-col>
          <v-col
            cols="12"
            style="text-align: start"
            class="d-flex justify-center"
          >
            <div class="d-flex flex-column justify-center" style="width: 70%">
              <p class="mb-n5">Results:</p>
              <div>
                <Result
                  :results="curData.results"
                  :random_type="curData.random_type"
                />
              </div>
            </div>
          </v-col>
        </v-row>

        <v-card-actions class="d-flex justify-end mt-2">
          <v-btn
            color="primary"
            @click="$router.push(`randomizer?id=${curData.id}`)"
          >
            Revise
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Result from "@/components/randomizer/Result.vue";

export default {
  components: { Result },
  data: () => ({
    datas: {},
    dialog: false,
    curData: {},
  }),
  methods: {
    async downloadExcel(data) {
      data.loading.downloadExcel = true;

      axios
        .get(`/randomizer/export/${data.id}`, {
          responseType: "blob",
        })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "random.xls");
          document.body.appendChild(fileLink);

          fileLink.click();

          // const url = URL.createObjectURL(
          //   new Blob([response.data], {
          //     type: "application/vnd.ms-excel",
          //   })
          // );
          // const link = document.createElement("a");
          // link.href = url;
          // link.setAttribute("download", fileName);
          // document.body.appendChild(link);
          // link.click();
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
    this.datas = await this.getAxios("/randomizer/me");

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