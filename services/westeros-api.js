import axios from 'axios'

const API = axios.create({
  baseURL: 'https://westerosrising-api.herokuapp.com/characters',
})

async function getAllCharacters() {
  try {
    const { data } = await API.get(`/`)
    return data
  } catch (err) {
    console.log(err)
  }
}

async function updateVotes(id, characterToUpdate) {
  const idFormated = parseInt(id)
  try {
    await API.put(`/${idFormated}`, characterToUpdate)
  } catch (err) {
    console.log(err)
  }
}

export default {
  getAllCharacters,
  updateVotes,
}
