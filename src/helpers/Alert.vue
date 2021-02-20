<template id="alert">
  <div v-if="show" class="d-flex justify-center mt-5">
    <div style="width: 70%">
      <v-alert outlined border="left" text dismissible :type="type">
        {{ message }}
      </v-alert>
    </div>
  </div>
</template>;

<script>
export default {
  template: "#alert",
  data: () => ({
    message: "Testing",
    show: true,
    type: "success",
  }),
  methods: {
    alertSuccess() {
      this.message = "asdasd";
    },
  },
};
</script>