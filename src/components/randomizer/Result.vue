<template>
  <div>
    <div
      style="background-color: #d3d3d3; height: 100px"
      class="mt-5 d-flex align-center justify-center"
    >
      <template v-if="random_type === 1">
        <h1 v-if="results">{{ results[0] }}</h1>
      </template>
      <template v-else-if="random_type === 2">
        <v-row>
          <v-col cols="6" v-for="(result, k) in results" :key="k" class="ma-0">
            <p class="ma-0">Group {{ k + 1 }}</p>
            <table class="mt-0">
              <td v-for="(each, kk) in result" :key="kk">
                {{ kk + 1 }},
                <span style="font-size: 200%" class="mr-4">
                  {{ each }}
                </span>
              </td>
            </table>
          </v-col>
        </v-row>
      </template>
      <template v-else-if="random_type === 3">
        <table>
          <td v-for="(result, k) in results" :key="k" class="mr-3">
            {{ k + 1 }},
            <span style="font-size: 400%">
              {{ result }}
            </span>
          </td>
        </table>
      </template>
      <template v-else>
        <h1>{{ results }}</h1>
      </template>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    results: Object,
    random_type: Number,
  },
};
</script>