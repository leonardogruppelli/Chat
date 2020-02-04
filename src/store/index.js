import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
  const Store = new Vuex.Store({
    state: {
      user: [],
      logged: false
    },
    mutations: {
      login(state, user) {
        state.user = user
        state.logged = true
      },
      logout(state) {
        state.user = []
        state.logged = false
      }
    },
    actions: {
      LOGIN({ commit }, user) {
        commit('login', user)
      },
      LOGOUT({ commit }) {
        commit('logout')
      }
    },
    getters: {
      user: state => state.user,
      id: state => state.user._id,
      name: state => state.user.name,
      logged: state => state.logged
    }
  })

  return Store
}
