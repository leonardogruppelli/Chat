import { Cookies } from 'quasar'
import io from 'socket.io-client'

export default ({ Vue }) => {
	const user = Cookies.get('user')

	Vue.prototype.$socket = io(process.env.HOST, {
		reconnection: false
	})
  
	if (user) {
		Vue.prototype.$socket.emit('join', user.id)
	}
}
