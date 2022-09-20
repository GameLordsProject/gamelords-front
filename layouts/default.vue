<template>
  <v-app dark>
    <v-app-bar app color="#817878">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>Westeros Rising</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>

    <v-footer :absolute="!fixed" app>
      <v-spacer></v-spacer>
      <span class="text-center">&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      fixed: false,
    }
  },
}
</script>

<style>
.navbar {
  background-color: #817878;
}
</style>