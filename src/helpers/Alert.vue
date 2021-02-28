<template id="alert">
  <div v-if="show" class="d-flex justify-center mt-5">
    <div style="width: 80%">
      <v-alert
        v-model="show"
        outlined
        border="left"
        text
        dense
        dismissible
        :type="type"
      >
        {{ message }}
      </v-alert>
    </div>
  </div>
</template>;

<script>
import EventBus from "@/helpers/event-bus";

export default {
  template: "#alert",
  data: () => ({
    message: "Testing",
    show: false,
    type: "success",
  }),
  mounted() {
    EventBus.$on("SET_ALERT", (payload) => {
      this.setAlert(payload);
    });
    EventBus.$on("CLEAR_ALERT", () => {
      this.setAlert({
        show: false,
        type: "success",
        message: "message",
      });
    });
  },
  methods: {
    setAlert({ show, type, message }) {
      this.show = show;
      this.type = type;
      this.message = message;
    },
  },
};
</script>