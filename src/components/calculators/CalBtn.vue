<template>
  <div
    class="input-btn row justify-content-center align-self-center"
    @click="clicked()"
  >
    {{ str }}
  </div>
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
<style lang="scss" scoped>
.input-btn:hover {
  cursor: pointer;
}

.input-btn {
  background-color: darkblue;
  color: white;
}
</style>