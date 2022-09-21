<template>
  <v-card class="mb-5 got">
    <div :class="character.house">
      <div v-if="character.image">
        <v-img class="image"
          lazy-src="https://play-lh.googleusercontent.com/RJYi6ttJq2GxcXsqN5k5ElnH26p9g1c6AcA_zKv_zrstaj_heNH1WDh8oYjbBH1Ps3I"
          :src="character.image" />
      </div>
      <div v-else class="pa-5">
        <v-img class="image" :src="imageDefault" />
      </div>
      <v-card-title class="mb-3">
        <h2> {{character.name}}</h2>
      </v-card-title>
      <v-card-subtitle class="mb-4 end">
        <div v-if="doesHouseExist()">
          <v-img :src="checkMyHouse()" width="50px" height="50px" class="absolute" />
        </div>
        <div v-else>
          <v-img
            src="https://play-lh.googleusercontent.com/RJYi6ttJq2GxcXsqN5k5ElnH26p9g1c6AcA_zKv_zrstaj_heNH1WDh8oYjbBH1Ps3I"
            width="50px" height="50px" class="absolute" />
        </div>
        <h3>{{character.house}}</h3>
      </v-card-subtitle>
      <v-card-text>
        <div v-if="character.titles">
          <h4>TITLES</h4>
          <div v-for="(titles, idx) in character.titles" :key="idx">
            <p> {{titles}}</p>
          </div>
        </div>
        <div v-if="character.gender == 'male'">
          <h4>GENDER</h4>
          <p>Male</p>
        </div>
        <div v-else>
          <h4>GENDER</h4>
          <p>Female</p>
        </div>
        <div v-if="character.alive">
          <h4>STATE</h4>
          <p> Alive</p>
        </div>
        <div v-else>
          <h4>STATE</h4>
          <p> Dead</p>
        </div>
        <div v-if="character.culture">
          <h4>CULTURE</h4>
          <p>{{character.culture}}</p>
        </div>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>

import defaultImage from '@/assets/imgs/imgNotFound.png'
export default {
  name: 'SearcherComponent',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    character: {
      type: Object
    }
  },
  data() {
    return {
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
        "House Tully": require(`~/assets/shields/House Tully.png`),
        "House Tyrell": require(`~/assets/shields/House Tyrell.png`),
      }
    }
  },
  methods: {
    doesHouseExist() {
      return this.character.house
    },
    checkMyHouse() {
      if (this.houseImg[`${this.character.house}`] || this.character.house !== 'Westeros Rising') {
        console.log(this.character.house)
        return this.houseImg[`${this.character.house}`]
      }
      return this.houseImg.default
    }
  }
}
</script>

<style>
.image {
  border-radius: 4px 4px 0px 0px;
}

p {
  margin-left: 15px;
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
  background-color: #8a0800 !important;
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
