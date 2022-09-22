<template>
  <v-app dark>
    <v-app-bar app color="#bbcccb">
      <v-app-bar-nav-icon class="header" @click="drawer = true"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title mr-10>
        <NuxtLink class="header" to="/">
          Westeros Rising
        </NuxtLink>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <p class="pl-5 pt-7" align-end @click="drawer = false">X</p>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-grey--text text--accent-4">
          <NuxtLink class="nolink" to="/search">
            <v-list-item class="mt-5">
              <v-list-item-icon>
                <v-icon>mdi-magnify</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Search
              </v-list-item-title>
            </v-list-item>
          </NuxtLink>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!--Patri ha tocado el código por aquúi-->
    <v-main>
      <Nuxt />
    </v-main>

    <v-footer :absolute="!fixed" app>
      <v-spacer></v-spacer>
      <span class="text-center"> Westeros Rising Open Source Project &copy; {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      group: null,
      fixed: false,
    }
  },
}
</script>

<style>
@font-face {
  font-family: 'got';
  src: url('../assets/fonts/got.ttf') format('truetype');
}

.navbar {
  background-color: #ffffff !important;
}

.nolink {
  text-decoration: none;
  color: white !important;
  font-family: got !important;
}

.header {
  text-decoration: none;
  color: #867266 !important;
  font-family: got !important;
  font-weight: bolder !important;
}
</style>