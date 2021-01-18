import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
  },
  mutations: {
    updateDrawer(state, payload) {
      console.log("update store" + payload);
      state.drawer = payload;
    },
  },
  actions: {},
  modules: {},
});
