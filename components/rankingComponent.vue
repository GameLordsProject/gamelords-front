<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <v-container>
    <v-card class="bg my-4 desktop-ranking-cards">
      <v-card-subtitle primary-title>
        <div v-if="votedcharacter.image">
          <v-img height="300px" :src="votedcharacter.image" />
        </div>
        <div v-else>
          <v-img height="300px" :src="imageDefault" />
        </div>

        <v-card-text class="extra-margin">
          <h4 class="mt-2 ">{{votedcharacter.name}}</h4>
          <h4>Likes: {{votedcharacter.likes}}</h4>
          <h4>Hates: {{votedcharacter. hates}}</h4>
        </v-card-text>
        <v-btn height="30px" width="40px" class="mt-4 ranking-button" @click="search(votedcharacter.name)">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-card-subtitle>

    </v-card>
  </v-container>
</template>

<script>

import defaultImage from '@/assets/imgs/imgNotFound.png'
export default {
  name: 'RankingComponent',
  props: {
    character: {
      type: Object,
      required: true
    },
    votedcharacter: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      switch1: true,
      query: this.$route.query.q,
      imageDefault: defaultImage,
      houseImg: {
        default: defaultImage,
        "House Stark": require(`~/assets/shields/House Stark.png`),
        "House Arryn": require(`~/assets/shields/House Arryn.png`),
        "House Baratheon": require(`~/assets/shields/House Baratheon.png`),
        "House Greyjoy": require(`~/assets/shields/House Greyjoy.png`),
        "House Lannister": require(`~/assets/shields/House Lannister.png`),
        "House Martell": require(`~/assets/shields/House Martell.png`),
        "House Targaryen": require(`~/assets/shields/House Targaryen.png`),
        "House Targaryen[1]": require(`~/assets/shields/House Targaryen.png`),
        "House Tully": require(`~/assets/shields/House Tully.png`),
        "House Tyrell": require(`~/assets/shields/House Tyrell.png`),
      }
    }
  },
  methods: {
    search(param) {

      this.$router.push({ path: "/search", query: { q: param } });
    },
  },
}
</script>

<style scoped>
@font-face {
  font-family: 'TheanoOldStyle-Regular';
  src: url('../assets/fonts/TheanoOldStyle-Regular.ttf') format('truetype');
}

.got {
  text-decoration: none;
  font-family: 'TheanoOldStyle-Regular' !important;
}

.Stark {
  border: 2px solid #808080 !important;

}

.Arryn {
  border: 2px solid #cecece !important;
}

.Tully {
  border: 2px solid #af2824 !important;
}

.Greyjoy {
  border: 2px solid rgb(235, 202, 20) !important;
}

.Lannister {
  border: 2px solid #af9710 !important;
}

.Baratheon {
  border: 2px solid #000000 !important;
}

.Tyrell {
  border: 2px solid #8d840a !important;
}

.Martell {
  border: 2px solid #8f2424 !important;
}

.Targaryen {
  border: 2px solid #770f0f !important;
}

.bg {
  background-color: rgb(46, 46, 46) !important;
}


@media (min-width: 800px) {
  .desktop-ranking-cards {

    margin: auto;
    width: 400px;
    height: auto;
  }

  h4 {
    font-size: 30px;
    line-height: 1.5em;
  }

  .ranking-button {
    width: 120px !important;
    height: 60px !important;
  }

  .extra-margin {
    margin-top: 50px !important;
  }
}
</style>
