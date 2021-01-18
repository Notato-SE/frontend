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

export default {
  components: {
    NavBar,
    Drawer,
  },
  data: () => ({
    drawer: false,
  }),
};
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
