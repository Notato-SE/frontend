<template>
  <v-container fluid class="pa-0 ma-0">
    <v-btn class="btn btn-primary shadow-sm m-5" x-large @click="clicked()">
      {{ str }}
    </v-btn>
  </v-container>
</template>
<script>
export default {
  props: {
    str: String,
    realStr: String,
    cols: {
      type: Number,
      default: 3,
    },
  },
  methods: {
    clicked() {
      console.log(this.realStr || this.str);
      this.$emit("pressed", this.realStr || this.str);
    },
  },
};
</script>
<style lang="">
</style>