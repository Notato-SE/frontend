<template>
  <v-navigation-drawer app v-model="$store.state.drawer">
    <v-list-item-group nav>
      <v-list-item-group active-class="deep-purple--text text--accent-4">
        <v-list-item v-for="item in items" :key="item.title" :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list-item-group>
  </v-navigation-drawer>
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
        path: "/",
      },
      {
        active: false,
        exact: true,
        title: "Converter",
        icon: "mdi-heart",
        path: "/converter",
      },
      {
        active: false,
        exact: true,
        title: "Randomizer",
        icon: "mdi-heart",
        path: "/randomizer",
      }
    ],
  }),
  watch: {
    drawer: function (newValue) {
      this.drawer = newValue;
      this.$store.commit("updateDrawer", newValue);
      console.log(newValue);
    },
  },
};
</script>
<style lang="scss">
</style>