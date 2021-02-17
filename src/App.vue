<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main>
      <drawer></drawer>

      <router-view />
    </v-main>
  </v-app>
  <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
</template>

<script>
import Drawer from "./components/Drawer.vue";
import NavBar from "./components/NavBar.vue";
import Vue from "vue";
import axios from "axios";

export default {
  components: {
    NavBar,
    Drawer,
  },
  data: () => ({
    drawer: false,
  }),
};

Vue.mixin({
  data: () => ({
    // api_url: "https://notato.doxxie.live/v1",
    api_url: "https://calculator_api.blah/v1",
  }),
  methods: {
    async getAxios(endpoint) {
      const res = await axios.get(this.api_url + endpoint);
      return res.data;
    },
    async postAxios(endpoint, data) {
      const headers = {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "https://calculator_api.blah",
      };
      const res = await axios.post(this.api_url + endpoint, data, headers);
      return res.data;
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
