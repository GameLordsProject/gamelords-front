<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <div width="100%">
    <div class="mb-5 ml-0">
      <h2>Who will you save?</h2>
    </div>
    <v-card v-if="gamestarted" :class="{active: isActive}" class="mb-5 got" @click="selected()">
      <div :class="duel.a.house">
        <div v-if="duel.a.image">
          <v-img class="image"
            lazy-src="https://play-lh.googleusercontent.com/RJYi6ttJq2GxcXsqN5k5ElnH26p9g1c6AcA_zKv_zrstaj_heNH1WDh8oYjbBH1Ps3I"
            :src="duel.a.image" />
        </div>
        <div v-else class="pa-5">
          <v-img class="image" :src="imageDefault" />
        </div>
        <v-card-title class="mb-3">
          <h2> {{duel.a.name}}</h2>
        </v-card-title>
        <v-card-subtitle class="mb-4 end">
          <div v-if="doesHouseExist('a')">
            <v-img :src="checkMyHouse(duel.a.house)" width="50px" height="50px" class="absolute" />
          </div>
          <div v-else>
            <v-img
              src="https://play-lh.googleusercontent.com/RJYi6ttJq2GxcXsqN5k5ElnH26p9g1c6AcA_zKv_zrstaj_heNH1WDh8oYjbBH1Ps3I"
              width="50px" height="50px" class="absolute" />
          </div>
          <h3>{{duel.a.house}}</h3>
        </v-card-subtitle>
        <v-card-text>
        </v-card-text>
      </div>
    </v-card>
    <v-card v-if="gamestarted" id="card2" :class="{active2: isActive2}" class="mb-5 got" @click="selected(2)">
      <div :class="duel.b.house">
        <div v-if="duel.b.image">
          <v-img class="image"
            lazy-src="https://play-lh.googleusercontent.com/RJYi6ttJq2GxcXsqN5k5ElnH26p9g1c6AcA_zKv_zrstaj_heNH1WDh8oYjbBH1Ps3I"
            :src="duel.b.image" />
        </div>
        <div v-else class="pa-5">
          <v-img class="image" :src="imageDefault" />
        </div>
        <v-card-title class="mb-3">
          <h2> {{duel.b.name}}</h2>
        </v-card-title>
        <v-card-subtitle class="mb-4 end">
          <div v-if="doesHouseExist('b')">
            <v-img :src="checkMyHouse(duel.b.house)" width="50px" height="50px" class="absolute" />
          </div>
          <div v-else>
            <v-img
              src="https://play-lh.googleusercontent.com/RJYi6ttJq2GxcXsqN5k5ElnH26p9g1c6AcA_zKv_zrstaj_heNH1WDh8oYjbBH1Ps3I"
              width="50px" height="50px" class="absolute" />
          </div>
          <h3>{{duel.b.house}}</h3>
        </v-card-subtitle>
        <v-card-text>
        </v-card-text>
      </div>
    </v-card>
    <div class="text-xs-center">
      <v-btn v-if="!gamestarted" color="success" class="mt-5" @click="startGame()">Start
        Game</v-btn>
      <v-btn v-if="gamestarted && isSelected" color="success" class="mt-5" @click="continueGame()">Continue</v-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import defaultImage from '@/assets/imgs/imgNotFound.png'
export default {
  name: 'GameComponent',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    charactersarray: {
      type: Array
    }
  },
  data() {
    return {
      gamestarted: false,
      housesValidated: ['House Stark', 'House Arryn', 'House Baratheon', 'House Greyjoy', 'House Lannister', 'House Martell', 'House Targaryen', 'House Targaryen[1]', 'House Tully', 'House Tyrell'],
      arrayLength: 0,
      isActive: false,
      isActive2: false,
      isSelected: false,
      arrayPosition: 0,
      arrayPosition2: 0,
      charactersArray: [],
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
  mounted() {
  },
  updated() {
    for (let i = 0; i < this.charactersarray.length; i++) {
      this.$set(this.charactersArray, i, this.charactersarray[i])
    }
    this.arrayLength = this.charactersarray.length

  },
  methods: {
    doesHouseExist(n) {
      if (n === 'a') {
        return this.housesValidated.includes(this.duel.a.house)
      } else {
        return this.housesValidated.includes(this.duel.b.house)
      }
    },
    checkMyHouse(shield) {
      return this.houseImg[shield]
    },
    continueGame() {
      this.updateCharactersVotes(this.upvote, true)
      this.updateCharactersVotes(this.kill, false)
      this.randomizeDuel()
    },
    randomizeDuel() {
      this.gamestarted = true
      this.charactersArray = this.charactersarray
      let pos1 = Math.floor(Math.random() * this.arrayLength)
      let pos2 = Math.floor(Math.random() * this.arrayLength)
      if (pos1 === 0 && pos2 === 0) {
        pos1 = Math.floor(Math.random() * 615)
        pos2 = Math.floor(Math.random() * 615)
      } else if (pos1 > 0 && (pos1 === pos2)) {
        while (pos1 === pos2 && this.arrayLength > 2)
          pos1 = Math.floor(Math.random() * 615)
      }
      this.$set(this.duel, 'a', this.charactersArray[pos1])
      this.$set(this.duel, 'b', this.charactersArray[pos2])
      this.charactersArray.splice(pos1, 1)
      this.charactersArray.splice(pos2, 1)
      this.arrayLength -= 2
      this.isSelected = false
      this.isActive2 = false
      this.isActive1 = false
      this.arrayPosition = pos1
      this.arrayPosition2 = pos2
    },
    selected(n) {
      if (n === 2) {
        this.upvote = this.duel.b
        this.kill = this.duel.a
        this.isActive = false
        this.isActive2 = !this.isActive2
        this.isSelected = true
      } else {
        this.upvote = this.duel.a
        this.kill = this.duel.b
        this.isActive2 = false
        this.isActive = !this.isActive;
        this.isSelected = true
      }
    },
    startGame() {
      this.randomizeDuel()
    },
    updateCharactersVotes(character, liked) { // finish first the api
      let result


      if (liked === true) {
        axios.get(`https://westerosrising-api.herokuapp.com/characters`).then(res => {
          result = res.data.filter(e => e.name === character.name)

          const characterToUpdate = {
            name: result[0].name,
            hates: result[0].hates,
            likes: result[0].likes + 1
          }

          axios.put(`https://westerosrising-api.herokuapp.com/characters/${result[0].id}`, characterToUpdate).then(res => {
            console.log(res)
          });;
        })

      } else {
        axios.get(`https://westerosrising-api.herokuapp.com/characters`).then(res => {
          result = res.data.filter(e => e.name === character.name)
          const characterToUpdate = {
            name: result[0].name,
            likes: result[0].likes,
            hates: result[0].hates + 1
          }

          axios.put(`https://westerosrising-api.herokuapp.com/characters/${result[0].id}`, characterToUpdate).then(res => {
            console.log(res)
          });
        })
      }
    }
  },
}
</script>

<style>
.image {
  border-radius: 4px 4px 0px 0px;
}

p {
  margin-left: 15px;
}

.active {
  transform: scale(1.1)
}



.active2 {
  transform: scale(1.1)
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

.absolute {
  position: absolute !important;
  margin-top: -35px !important;
}

h3,
h2 {
  margin-left: 25% !important;
}
</style>
