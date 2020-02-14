import { Cookies } from 'quasar'
import axios from 'axios'

export default ({ router, store }) => {
	router.beforeEach((to, from, next) => {
		to.matched.some(route => {
			const token = Cookies.get('token')
			const user = Cookies.get('user')
      
			axios.defaults.headers.common = {
				'Authorization': `Bearer ${token}`
			}

			store.dispatch('SET_USER', user || [
			])
			
			if (!token && route.path != '/auth') {
				next({
					path: '/auth',
					replace: true
				})

				return
			}
      
			if (token && route.path == '/auth') {
				next({
					path: '/',
					replace: true
				})

				return
			}

			next()
		})
	})
}
