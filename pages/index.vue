<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <v-card height="100%" class="px-9 pt-4">

    <v-card-title class="justify-center text-h4 text-md-h3">
      Westeros Rising
    </v-card-title>

    <v-card-subtitle>
      The best site of Game of Thrones, where You can discover westeros and its
      characters
    </v-card-subtitle>

    <v-card-text>

      <v-text-field v-model="searchedText" class="mx-5" name="name" prepend-icon="mdi-magnify"
        placeholder="Search your desired character" @keyup.enter="search()">

      </v-text-field>
    </v-card-text>
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
    }
  }
}
</script>
