import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
	const Store = new Vuex.Store({
		state: {
			user: [],
			user_app: null
		},
		mutations: {
			set_user(state, value) {
				state.user = value
			},
			set_user_app(state, value) {
				state.user_app = value
			}
		},
		actions: {
			SET_USER({ commit }, value) {
				commit('set_user', value)
			},
			SET_USER_APP({ commit }, value) {
				commit('set_user_app', value)
			}
		},
		getters: {
			user: state => state.user,
			id: state => state.user.id,
			name: state => state.user.name,
			user_app: state=> state.user_app
		}
	})

	return Store
}
