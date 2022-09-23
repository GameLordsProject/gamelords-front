<template>
  <v-app dark>
    <v-app-bar app color="#bbcccb">
      <v-app-bar-nav-icon color="#867266" @click="drawer = true"></v-app-bar-nav-icon>
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
          <NuxtLink class="nolink" to="/game">
            <v-list-item class="mt-5">
              <v-list-item-icon>
                <v-icon>mdi-gamepad-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Game
              </v-list-item-title>
            </v-list-item>
          </NuxtLink>
          <NuxtLink class="nolink" to="/ranking">
            <v-list-item class="mt-5">
              <v-list-item-icon>
                <v-icon>mdi-podium</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Ranking
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

<style >
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
  font-family: got;
}

.header {
  text-decoration: none;
  font-family: got;
  color: #867266 !important;
  font-weight: bolder;
}

html::-webkit-scrollbar {
  width: 15px;
}

html::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

html::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

html::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>