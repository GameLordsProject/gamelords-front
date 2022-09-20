<template>
  <v-card class="mb-5">
    <div v-if="character.image">
      <v-img class="image" :src="character.image" />
    </div>
    <div v-else>
      <v-img class="image"
        src="https://play-lh.googleusercontent.com/RJYi6ttJq2GxcXsqN5k5ElnH26p9g1c6AcA_zKv_zrstaj_heNH1WDh8oYjbBH1Ps3I" />
    </div>
    <v-card-title>
      {{character.name}}
    </v-card-title>
    <v-card-subtitle>
      <p>{{character.house}}</p>
    </v-card-subtitle>
    <v-card-text>
      <div v-if=" character.titles">
        <p>Titles:</p>
        <div v-for="(titles, idx) in character.titles" :key="idx">
          <p>{{titles}}</p>
        </div>
      </div>
      <p>Gender: {{character.gender}}</p>
      <div v-if="character.alive">
        <p>State: Alive</p>
      </div>
      <div v-else>
        <p>State: Dead</p>
      </div>
      <div v-if="character.culture">
        <p>Culture: {{character.culture}}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'SearcherComponent',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    character: {
      type: Object
    }
  }
}
</script>

<style>
.image {
  border-radius: 4px;
}
</style>
