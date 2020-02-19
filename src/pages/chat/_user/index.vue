<template>
  <q-page
    ref="page"
    class="chat flex column justify-end no-wrap bg-grey-2"
  >
    <div
      v-if="loading"
      class="column col flex-center"
    >
      <q-spinner
        color="primary"
        size="5em"
        :thickness="1"
      />
    </div>

    <q-scroll-area v-else>
      <q-list
        class="q-px-md"
      >
        <div
          v-for="item in messages"
          :key="item._id"
          class="chat__message"
        >
          <q-chat-message
            v-if="sent(item.from)"
            :text="item.message"
            :stamp="stamp(item.at)"
            sent
            text-sanitize
          />

          <q-chat-message
            v-else
            avatar="https://cdn.quasar.dev/img/avatar5.jpg"
            :text="item.message"
            :stamp="stamp(item.at)"
            text-sanitize
          />
        </div>

        <q-chat-message
          v-if="receiving"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        >
          <q-spinner-dots />
        </q-chat-message>
      </q-list>
    </q-scroll-area>

    <q-footer class="bg-grey-2 q-pa-md">
      <q-form @submit="send">
        <q-input
          v-model="message"
          placeholder="Type a message..."
          rounded
          outlined
        >
          <template v-slot:append>
            <q-btn
              @click="send"
              icon="las la-paper-plane"
              color="primary"
              round
              flat
            />
          </template>
        </q-input>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script>
import { scroll } from 'quasar'
const { getScrollTarget, getScrollHeight, setScrollPosition } = scroll
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
	data() {
		return {
			room: null,
			user: this.$route.params.user,
			message: null,
			typing: false,
			receiving: false,
			messages: [
			],
			loading: true
		}
	},
	computed: {
		...mapGetters([
			'id',
			'name'
		])
	},
	watch: {
		message() {
			this.typing = !!this.message
		},
		typing() {
			this.$socket.emit('typing', this.user, this.id, this.typing)
		},
		messages: {
			handler(value, old) {
				this.scroll(old)
			},
			deep: true
		}
	},
	methods: {
		send() {
			if (!this.message) {
				return
			}

			const message = {
				to: this.user,
				from: this.name,
				append: false,
				message: [
					this.message
				],
				at: this.time()
			}
      
			console.log(this.time())

			const total = this.messages.length - 1
			const last = this.messages[total]

			if (
				last &&
        message.from == last.from &&
        this.difference(last.at, message.at) <= 1
			) {
				message.append = last._id
			}

			this.$socket.emit('message', this.room, message)
			this.message = null
		},
		time() {
			const date = new Date()

			const day = date.getDate()
			const month = date.getMonth() + 1
			const year = date.getFullYear()
    
			const hours = date.getHours()
			const minutes = date.getMinutes()

			return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
		},
		difference(last, current) {
			const MS = 1000 * 60 * 60 * 24

			last = last.split(' ')
			const last_date = last[0].split('/')
			const last_time = last[1].split(':')

			current = current.split(' ')
			const current_date = current[0].split('/')
			const current_time = current[1].split(':')

			const dates = {
				one: {
					day: +last_date[0],
					month: +last_date[1],
					year: +last_date[2],
					hours: +last_time[0],
					minutes: +last_time[1]
				},
				two: {
					day: +current_date[0],
					month: +current_date[1],
					year: +current_date[2],
					hours: +current_time[0],
					minutes: +current_time[1]
				}
			}

			const date = {
				one: new Date(dates.one.year, dates.one.month, dates.one.day, dates.one.hours, dates.one.minutes),
				two: new Date(dates.two.year, dates.two.month, dates.two.day, dates.two.hours, dates.two.minutes)
			}

			const days = Math.floor((date.two - date.one) / MS)

			if (days >= 1) {
				return days
			}
      
			const difference = (date.one.getTime() - date.two.getTime()) / 1000 / 60

			return Math.abs(Math.round(difference))
		},
		sent(from) {
			return from == this.name
		},
		stamp(date) {
			return date.split(' ')[1]
		},
		scroll(old) {
			const target = getScrollTarget(this.$refs.page.$el)
			const current = getScrollHeight(target)

			this.$nextTick(() => {
				const height = getScrollHeight(target)

				if (!old || !old.length) {
					setScrollPosition(target, height)
					return
				}

				const distance = window.innerHeight + window.pageYOffset + 100

				if (distance >= current) {
					setScrollPosition(target, height)
				}
			})
		}
	},
	async created() {
		try {
			const { data } = await axios.post(`${process.env.HOST}/room`, {
				to: this.id,
				from: this.user
			})

			if (data.inserted) {
				this.room = data.inserted
			} else {
				this.room = data._id
				if (data.messages) {
					this.messages = data.messages
				}
			}
		} catch (error) {
			this.$q.notify({
				color: 'negative',
				textColor: 'white',
				message: error.response,
				position: 'top',
				timeout: 5000
			})
		} finally {
			this.loading = false
		}

		this.$socket.on('typing', (from, typing) => {
			if (from == this.user) {
				this.receiving = typing

				if (typing) {
					this.scroll()
				}
			}
		})

		this.$socket.on('message', (room, message) => {
			if (room == this.room) {
				const total = this.messages.length - 1
				const last = this.messages[total]

				if (
					last &&
          message.from == last.from &&
          this.difference(last.at, message.at) <= 1
				) {
					last.message.push(message.message[0])
					last.at = message.at
				} else {
					this.messages.push(message)
				}
			}
		})
	},
	activated() {
		this.scroll()
	}
}
</script>
