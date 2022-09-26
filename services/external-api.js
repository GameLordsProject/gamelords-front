import axios from 'axios'

const API = axios.create({
  baseURL: 'https://api.got.show/api/general/characters/',
})

async function findSingleCharacter(character) {
  const { data } = await API.get(`${character}`)
  if (data.book) {
    return data.book
  }
}

async function getCharacters() {
  const { data } = await API.get(`/`)

  return data.book
}

export default {
  findSingleCharacter,
  getCharacters,
}
