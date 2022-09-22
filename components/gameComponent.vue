<template>
  <div>
    <v-card v-if="gamestarted" @click="selected()" v-bind:class="{active: isActive}" class="mb-5 got">
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
            <v-img :src="checkMyHouse()" width="50px" height="50px" class="absolute" />
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
            <v-img :src="checkMyHouse()" width="50px" height="50px" class="absolute" />
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
    <v-btn v-if="!gamestarted" color="success" @click="randomizeDuel()">Start Game</v-btn>
    <v-btn v-if="gamestarted && isSelected" color="success" @click="randomizeDuel()">Continue</v-btn>
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
        return this.duel.a.house
      } else {
        return this.duel.b.house
      }
    },
    checkMyHouse() {
      if (this.houseImg[`${this.duel.a.house}`]) {
        return this.houseImg[`${this.duel.a.house}`]
      } else if (this.houseImg[`${this.duel.b.house}`] || this.duel.b.house !== 'Westeros Rising') {
        return this.houseImg[`${this.duel.b.house}`]
      } else {
        return this.houseImg.default
      }
    },
    continueGame() {

    },
    randomizeDuel() {
      this.gamestarted = true
      this.charactersArray = this.charactersarray
      let pos1 = Math.floor(Math.random() * this.arrayLength)
      let pos2 = Math.floor(Math.random() * this.arrayLength)
      pos1 = Math.floor(Math.random() * this.arrayLength)
      if (pos1 === 0 && pos2 === 0 || pos1 === pos2) {
        pos2 = Math.floor(Math.random() * this.arrayLength)
      }
      this.$set(this.duel, 'a', this.charactersArray[pos1])
      this.$set(this.duel, 'b', this.charactersArray[pos2])
      this.charactersArray.splice(pos1, 1)
      this.charactersArray.splice(pos2, 1)
      this.arrayLength -= 2
      this.isSelected = false
    },
    selected(n) {
      if (n === 2) {
        this.isActive = false
        this.isActive2 = !this.isActive2
        this.isSelected = true
      } else {
        this.isActive2 = false
        this.isActive = !this.isActive;
        this.isSelected = true
      }
    },
    updateCharactersVotes(character, liked) { // finish first the api
      if (liked === true) {
        axios.get(`https://api.got.show/api/general/votes/${character}`).then(res => {
          const characterToUpdate = {
            likes: res.votes + 1
          }
          axios.put(`https://api.got.show/api/general/votes/${character}`, characterToUpdate);
        })

      } else {
        axios.get(`https://api.got.show/api/general/votes/${character}`).then(res => {
          const characterToUpdate = {
            hates: res.hates + 1
          }
          axios.put(`https://api.got.show/api/general/votes/${character}`, characterToUpdate);
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
  background-color: #353535 !important;
  border: 2px solid #808080 !important;

}

.Arryn {
  background-color: #345eb1 !important;
  border: 2px solid #cecece !important;
}

.Tully {
  background-color: #04296f !important;
  border: 2px solid #af2824 !important;
}

.Greyjoy {
  background-color: #1d1d1d !important;
  border: 2px solid rgb(235, 202, 20) !important;
}

.Lannister {
  border: 2px solid #af9710 !important;
}

.Baratheon {
  background-color: #e3c606 !important;
  border: 2px solid #000000 !important;
}

.Tyrell {
  background-color: #4e850d !important;
  border: 2px solid #8d840a !important;
}

.Martell {
  background-color: #de890a !important;
  border: 2px solid #8f2424 !important;
}

.Targaryen {
  background-color: #252525 !important;
  border: 2px solid #770f0f !important;
}

.absolute {
  position: absolute !important;
  margin-top: -35px;
}

h3,
h2 {
  margin-left: 25%;
}
</style>
