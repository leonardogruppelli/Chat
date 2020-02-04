import io from 'socket.io-client'

export default ({ Vue }) => {
  Vue.prototype.$socket = io(process.env.HOST, {
    reconnection: false
  })
}
