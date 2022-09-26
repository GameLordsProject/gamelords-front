import axios from 'axios'

const API = axios.create({
  baseURL: 'https://westerosrising-api.herokuapp.com/',
})

function saveToLocalStorage(data) {
  console.log(data)
  localStorage.accessToken = data.accessToken
  localStorage.email = data.user.email
  localStorage.id = data.user.id
}

export default {
  async signup(email, password) {
    const response = await API.post('/register', { email, password })
    saveToLocalStorage(response.data)
    return response.data
  },
  async login(email, password) {
    try {
      const response = await API.post('/login', { email, password })

      saveToLocalStorage(response.data)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  },
}
