<template>
  <!-- <v-app-bar
    absolute
    color="white"
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
  >
    <v-app-bar-nav-icon @click.prevent="drawer = !drawer"></v-app-bar-nav-icon>

    <v-navigation-drawer app v-model="drawer">
      <p>Hello</p>
    </v-navigation-drawer>

    <v-toolbar-title>Title</v-toolbar-title>

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
  </v-app-bar> -->
  <nav>
    <v-app-bar
      app
      absolute
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon
        @click.prevent="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Notato</v-toolbar-title>
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

    <v-navigation-drawer app v-model="drawer">
      <v-list-item-group nav>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item v-for="item in items" :key="item.title">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list-item-group>
    </v-navigation-drawer>
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
};
</script>
<style lang="scss">
</style>