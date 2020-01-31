import io from 'socket.io-client'

export default ({ Vue }) => {
  Vue.prototype.$socket = io('https://d53631ab.ngrok.io')
}
