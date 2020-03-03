import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
	const Store = new Vuex.Store({
		state: {
			user: []
		},
		mutations: {
			set_user(state, user) {
				state.user = user
			}
		},
		actions: {
			SET_USER({ commit }, user) {
				commit('set_user', user)
			}
		},
		getters: {
			user: state => state.user,
			id: state => state.user.id,
			name: state => state.user.name
		}
	})

	return Store
}
