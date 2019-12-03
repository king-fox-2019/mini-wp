import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

// Axios.defaults.baseURL = 'http://localhost:3000'
const axios = Axios.create({ baseURL: 'http://localhost:3000' })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    onSignUp(context, { username, email, password, fullName }) {
      return axios.post('signup', {
        username,
        email,
        password,
        fullName
      })
    }
  },
  modules: {}
})
