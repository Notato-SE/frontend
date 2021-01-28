<template>
  <div>
    <v-text-field style="align-right" v-model="val">{{ val }}</v-text-field>
  </div>
</template>
<script>
export default {
  props: {
    val: String,
  },
};
</script>
<style lang="">
</style>