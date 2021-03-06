<template>
  <div>
    <div
      style="background-color: #f8f8f8; min-height: 150px"
      class="mt-5 d-flex flex-wrap align-center justify-center"
    >
      <template v-if="random_type === 1">
        <h1 v-if="results" style="word-break: break-all">{{ results[0] }}</h1>
      </template>
      <template v-else-if="random_type === 2">
        <v-row>
          <v-col cols="6" v-for="(result, k) in results" :key="k" class="ma-0">
            <p class="ma-0">Group {{ k + 1 }}</p>
            <div v-for="(each, kk) in result" :key="kk">
              {{ kk + 1 }},
              <span style="font-size: 200%; word-break: break-all" class="mr-4">
                {{ each }}
              </span>
            </div>
          </v-col>
        </v-row>
      </template>
      <template v-else-if="random_type === 3">
        <div v-for="(result, k) in results" :key="k" class="mr-3">
          {{ k + 1 }},
          <span style="font-size: 400%">
            {{ result }}
          </span>
        </div>
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
    results: [Object, Array],
    random_type: Number,
  },
};
</script>