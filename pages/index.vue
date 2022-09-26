<!-- eslint-disable vue/first-attribute-linebreak -->
<template>

  <v-card class="px-4 pt-8 bg" height="100%" background-color="primary">
    <div class="padding">

      <v-card-title class="justify-center mx-md-16 text-h5 text-md-h4">
        <span class="nolink">Westeros Rising</span>
      </v-card-title>

      <v-card-subtitle class="mt-8  mt-md-8 mx-md-16 text-h6 text-md-h4">
        <h4>The best site of Game of Thrones, where You can discover westeros and its
          characters</h4>
      </v-card-subtitle>

      <v-card-text>

        <v-text-field v-model="searchedText" class="mx-5 mx-md-16 my-5 " name="name" prepend-icon="mdi-magnify"
          placeholder="Search your desired character" @keyup.enter="search()">
        </v-text-field>

      </v-card-text>


      <v-card-subtitle class="justify-center mx-md-16 text-h6  text-md-h4">
        <h4>Or Play which character would You save with our awesome card selection game</h4>
      </v-card-subtitle>
      <div align="center" justify="center">
        <v-btn color="white" elevation="4" dark center-bottom outlined text x-large class="nolink my-5 bg-color"
          @click="sendMeToPlay()">
          GAME
        </v-btn>
      </div>
    </div>
  </v-card>

</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      searchedText: ''
    }
  },
  methods: {
    search() {
      this.$router.push({ path: '/search', query: { q: this.searchedText } })
    },
    sendMeToPlay() {
      this.$router.push({ path: '/game' })
    }
  }
}


</script>

<style scoped>
@font-face {
  font-family: 'TheanoOldStyle-Regular';
  src: url('../assets/fonts/TheanoOldStyle-Regular.ttf') format('truetype');
}

p {
  font-family: 'TheanoOldStyle-Regular';
}

.bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.726), rgba(255, 255, 255, 0.048)), url('https://media.discordapp.net/attachments/1020282879177146368/1022793604353228810/5737742-game-thrones-wallpapers.jpg?') !important;
  background-position: center;
  background-size: cover;
  /* Resize the background image to cover the entire container */
}

.bg-color {
  background-color: rgb(51, 51, 51);
}

.padding {
  padding-top: 50px;
}

@media (min-width: 800px) {
  .padding {
    padding: 100px 20% 0 20%;
    font-family: 'TheanoOldStyle-Regular';
  }
}
</style>