<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <div>
    <div v-if="!gamestarted" class="mb-5 my-md-16 game-p padding ">
      <h1 class="got text-center my-md-8 text-md-h3">Press the above button to play the best game of whole Westeros
      </h1>
    </div>
    <div v-if="gamestarted" class="mb-5 text-h5">
      <h4 class="got text-center text-md-h3 ">Who will you save?</h4>
    </div>
    <div class="desktop--flex">
      <v-card v-if="gamestarted" :class="duel.a.house" class="mb-5 got card">
        <div class="card--desktop" @click="continueGame(duel.a.name)">
          <div v-if="duel.a.image">
            <v-img class="image" cover position="top" :src="duel.a.image" />
          </div>
          <div v-else>
            <v-img cover class="image" position="top" :src="imageDefault" />
          </div>
          <v-card-title class="mb-3">
            <h2 class="ml-md-2 mt-md-4 text-md-center text-md-h3 got" justify-center> {{duel.a.name}}</h2>
          </v-card-title>
          <v-card-text class="mb-4">
            <v-container>
              <v-row>
                <v-col cols="4">
                  <div v-if="doesHouseExist(duel.a.house)">
                    <v-img :src="checkMyHouse(duel.a.house)" width="50px" height="50px" class="abs" />
                  </div>
                  <div v-else>
                    <v-img :src="shieldDefault" width="50px" height="50px" class="abs" />
                  </div>
                </v-col>

                <v-col cols="8">
                  <h3 v-if="duel.a.house" class="text-md-h2 ma-0 got">{{duel.a.house}}</h3>
                  <h3 v-else class="text-md-h2 ma-0 got">House of westeros</h3>
                </v-col>
              </v-row>

            </v-container>
          </v-card-text>
        </div>
      </v-card>
      <v-card v-if="gamestarted" id="card2" :class="duel.b.house" class="mb-5 got card">
        <div class="card--desktop" @click="continueGame(duel.b.name)">
          <div v-if="duel.b.image">
            <v-img class="image" cover position="top" :src="duel.b.image" />
          </div>
          <div v-else>
            <v-img cover class="image" position="top" :src="imageDefault" />
          </div>
          <v-card-title class="mb-3">
            <h2 class=" ml-md-2 mt-md-4  text-md-h3 got" justify-center> {{duel.b.name}}</h2>
          </v-card-title>
          <v-card-text class="mb-4">
            <v-container>
              <v-row>
                <v-col cols="4">
                  <div v-if="doesHouseExist(duel.b.house)">
                    <v-img :src="checkMyHouse(duel.b.house)" width="50px" height="50px" class="abs" />
                  </div>
                  <div v-else>
                    <v-img :src="shieldDefault" width="50px" height="50px" class="abs" />
                  </div>
                </v-col>

                <v-col cols="8">
                  <h3 v-if="duel.b.house" class="text-md-h2 ma-0 got">{{duel.b.house}}</h3>
                  <h3 v-else class="text-md-h2 ma-0 got">House of westeros</h3>
                </v-col>
              </v-row>

            </v-container>
          </v-card-text>
        </div>

      </v-card>
    </div>
    <div align="center" justify="center">
      <!-- islogged -->
      <v-btn v-if="!gamestarted" color="white" elevation="4" dark center-bottom outlined text x-large
        class="nolink my-5 bg-color" @click="startGame()">Start
        Game</v-btn>
      <!-- <v-btn v-else color="white" elevation="4" dark center-bottom outlined text x-large class="nolink my-5 bg-color"
        disabled @click="startGame()">You must to be <NuxtLink to="/login">Logged</NuxtLink> to play</v-btn> -->
    </div>
  </div>
</template>

<script>
import API from '@/services/westeros-api.js'
import defaultImage from '@/assets/imgs/imgNotFound.png'
import defaultShield from '@/assets/imgs/shieldNotFound.png'
export default {
  name: 'GameComponent',
  props: {
    charactersarray: {
      type: Array,
      required: true
    },
    charactersFromOwnApi: {
      type: Array,
      required: true
    },

  },
  data() {
    return {
      gamestarted: false,
      housesValidated: ['House Stark', 'House Arryn', 'House Baratheon', 'House Greyjoy', 'House Lannister', 'House Lannister[1]', 'House Martell', 'House Targaryen', 'House Targaryen[1]', 'House Tully', 'House Tyrell'],
      arrayLength: 0,
      charactersFromAPI: [],
      charactersContainer: [],
      duel: {
        a: {
          image: defaultImage,
          name: `This character doesn't exist`,
          house: 'Westeros Rising',
          gender: 'drake',
        },
        b: {
          image: defaultImage,
          name: `This character doesn't exist`,
          house: 'Westeros Rising',
          gender: 'drake',
        }
      },
      shieldDefault: defaultShield,
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
  updated() {
    for (let i = 0; i < this.charactersarray.length; i++) {
      this.$set(this.charactersContainer, i, this.charactersarray[i])
    }
    for (let i = 0; i < this.charactersFromOwnApi.length; i++) {
      this.$set(this.charactersFromAPI, i, this.charactersFromOwnApi[i])
    }
    this.arrayLength = this.charactersarray.length

  },
  methods: {
    doesHouseExist(house) {
      return this.housesValidated.includes(house)
    },
    checkMyHouse(shield) {
      return this.houseImg[shield]
    },
    continueGame(winner) {
      if (winner === this.duel.a.name) {
        this.updateCharactersVotes(this.duel.a.name, true)
        this.updateCharactersVotes(this.duel.b.name, false)
      } else {
        this.updateCharactersVotes(this.duel.b.name, true)
        this.updateCharactersVotes(this.duel.a.name, false)
      }
      //  let votes = localStorage.getItem('votes')
      this.votes = parseInt(this.votes) + 1
      // localStorage.setItem('votes', votes)
      this.randomizeDuel()
    },
    randomizeDuel() {
      this.gamestarted = true

      this.charactersContainer = this.charactersarray
      let pos1 = Math.floor(Math.random() * this.arrayLength)
      let pos2 = Math.floor(Math.random() * this.arrayLength)
      if (pos1 === 0 && pos2 === 0) {
        pos1 = Math.floor(Math.random() * 615)
        pos2 = Math.floor(Math.random() * 615)
      } else if (pos1 > 0 && (pos1 === pos2)) {
        while (pos1 === pos2 && this.arrayLength > 2)
          pos1 = Math.floor(Math.random() * 615)
      }
      this.$set(this.duel, 'a', this.charactersContainer[pos1])
      this.$set(this.duel, 'b', this.charactersContainer[pos2])
      this.charactersContainer.splice(pos1, 1)
      this.charactersContainer.splice(pos2, 1)
      this.arrayLength -= 2
    },
    startGame() {
      this.randomizeDuel()
    },
    islogged() {

    },
    updateCharactersVotes(character, liked) {
      this.charactersFromAPI = this.charactersFromOwnApi
      let result
      if (liked === true) {
        result = this.charactersFromAPI.filter(e => e.name === character)

        const characterToUpdate = {
          name: result[0].name,
          hates: result[0].hates,
          likes: result[0].likes + 1
        }

        API.updateVotes(result[0].id, characterToUpdate)

      } else {

        result = this.charactersFromAPI.filter(e => e.name === character)
        const characterToUpdate = {
          name: result[0].name,
          hates: result[0].hates + 1,
          likes: result[0].likes
        }

        API.updateVotes(result[0].id, characterToUpdate)

      }
    }
  },
}
</script>

<style scoped>
* {
  word-break: keep-all;
}

.image {
  border-radius: 4px 4px 0px 0px;
  height: 250px;
}

.game-p {
  padding-top: 28vh;
  line-height: 2rem;
  margin: auto
}

.bg-color {
  background-color: rgb(51, 51, 51);
}


.flex-container {
  display: flex;
  flex-direction: row;
}


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
  border: 2px solid #118e92 !important;
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

  border: 2px solid #326323 !important;
}

.Martell {

  border: 2px solid #791c1c !important;
}

.Targaryen {

  border: 2px solid #770f0f !important;
}

.true {
  border: 2px solid #770f0f !important;
}

.false {
  border: 2px solid #770f0f !important;
}

@media (min-width: 960px) {
  .padding {
    padding: 5% 15% 0 15%;
  }

  .desktop--flex {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .card--desktop {
    flex: 50%;
    width: 500px;
    min-height: 700px;
    background-color: rgba(32, 32, 32, 0);
    border-radius: 12px;
  }

  .card:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  .image {
    height: 500px;
  }

  .abs {

    width: 100px !important;
    height: 100px !important;
  }

}
</style>
