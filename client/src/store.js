import Vue from 'vue'
import Vuex from 'vuex'

import server from './api/server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    onSession: false
  },
  mutations: {
    CHANGE_SESSION(state, session) {
      state.onSession = session
    }
  },
  actions: {
    onSignUp(context, { username, email, password, fullName }) {
      return server.post('signup', {
        username,
        email,
        password,
        fullName
      })
    },
    onSignOut({ commit }) {
      commit('CHANGE_SESSION', false)
      localStorage.clear()
    }
  },
  modules: {}
})
