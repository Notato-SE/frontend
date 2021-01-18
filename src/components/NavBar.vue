<template>
  <nav>
    <v-app-bar
      app
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon @click.prevent="update()"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/">Notato</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    collapseOnScroll: false,
    items: [
      {
        active: true,
        exact: true,
        title: "Calculator",
        icon: "mdi-heart",
        path: "/calculator",
      },
      {
        active: true,
        exact: true,
        title: "Converter",
        icon: "mdi-heart",
        path: "/converter",
      },
      {
        active: true,
        exact: true,
        title: "Randomizer",
        icon: "mdi-heart",
        path: "/randomizer",
      },
    ],
  }),
  methods: {
    update() {
      this.drawer = !this.drawer;
      this.$store.commit("updateDrawer", this.drawer);
      console.log("drawer clicked " + this.drawer);
    },
  },
};
</script>
<style lang="scss">
</style>