import Vue from 'vue'
import Vuex from 'vuex'

import server from './api/server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    onSession: false,
    user: null,
    userArticles: []
  },
  mutations: {
    CHANGE_SESSION(state, session) {
      state.onSession = session
    },
    CHANGE_USER(state, user) {
      state.user = user
    },
    CHANGE_USER_ARTICLES(state, articles) {
      state.userArticles = articles
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
    onSignIn(context, { emailUsername, password }) {
      return server.post('signin', {
        emailUsername,
        password
      })
    },
    onSignOut({ commit }) {
      commit('CHANGE_SESSION', false)
      localStorage.clear()
    },
    fetchUserArticles(context) {
      const access_token = localStorage.getItem('access_token')
      return server
        .get('user/articles', { headers: { access_token } })
        .then(({ data }) => {
          context.commit('CHANGE_USER_ARTICLES', data.data)
        })
    },
    fetchAllPostedArticles() {
      const access_token = localStorage.getItem('access_token')
      return server.get('/articles', { headers: { access_token } })
    },
    onEditorAddImage(context, file) {
      const access_token = localStorage.getItem('access_token')

      const formData = new FormData()
      formData.append('image', file)

      return server({
        method: 'post',
        url: 'articles/image',
        data: formData,
        headers: { access_token }
      })
    },
    onSaveArticle(context, payload) {
      const access_token = localStorage.getItem('access_token')
      if (payload.id)
        return server.put(`articles/${payload.id}`, payload, {
          headers: { access_token }
        })
      else
        return server.post('articles', payload, { headers: { access_token } })
    },
    onDeleteArticle(context, id) {
      const access_token = localStorage.getItem('access_token')
      return server.delete(`articles/${id}`, {
        headers: { access_token }
      })
    },
    getOneArticle(context, id) {
      const access_token = localStorage.getItem('access_token')
      return server.get(`articles/${id}`, { headers: { access_token } })
    },
    onUpdateName(context, fullName) {
      const access_token = localStorage.getItem('access_token')
      return server
        .patch(`user/name`, { fullName }, { headers: { access_token } })
        .then(({ data }) => {
          context.commit('CHANGE_USER', data.data)
        })
    }
  },
  modules: {}
})
