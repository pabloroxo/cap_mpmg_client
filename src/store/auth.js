import axios from 'axios'

export default ({
  namespaced: true,

  state: {
    token: null,
    user: null
  },

  getters: {
    authenticated (state) {
      return state.token && state.user
    },

    user (state) {
      return state.user
    }
  },

  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },

    SET_USER (state, user) {
      state.user = user
    }
  },

  actions: {
    async login ({ dispatch }, credentials) {
      await axios.post('/api/auth/login', credentials).then(response => {
        dispatch('attempt', response.data.token)
      })
    },

    async attempt ({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token)
      }
      if (!state.token) {
        return
      }
      try {
        await axios.get('/api/user/me').then(response => {
          commit('SET_USER', response.data)
        })
      } catch (e) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }
    },

    logout ({ commit }) {
      return axios.post('/api/auth/logout').then(() => {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      })
    },

    async withdraw ({ commit }, data) {
      let balance
      await axios.post('/api/account/withdraw', data).then(response => {
        balance = response.data
      })
      return balance
    },

    async deposit ({ commit }, data) {
      let balance
      await axios.post('/api/account/deposit', data).then(response => {
        balance = response.data
      })
      return balance
    }
  }
})
