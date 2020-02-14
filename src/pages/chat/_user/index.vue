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

    <div
      v-else
      class="q-pa-md"
    >
      <div
        v-for="item in messages"
        :key="item._id"
        class="chat__message"
      >
        <q-chat-message
          v-if="sent(item.from)"
          :text="item.message"
          :stamp="item.at"
          sent
          text-sanitize
        />

        <q-chat-message
          v-else
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          :text="item.message"
          :stamp="item.at"
          text-sanitize
        />
      </div>

      <q-chat-message
        v-if="receiving"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        text-sanitize
      >
        <q-spinner-dots />
      </q-chat-message>
    </div>

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
			const time = new Date()

			const hours = time.getHours()
			const minutes = time.getMinutes()

			return `${hours < 10 ? '0' + hours : hours}:${
				minutes < 10 ? '0' + minutes : minutes
			}`
		},
		difference(last, current) {
			const time = {
				one: {
					hours: +last.split(':')[0],
					minutes: +last.split(':')[1]
				},
				two: {
					hours: +current.split(':')[0],
					minutes: +current.split(':')[1]
				}
			}

			const date = {
				one: new Date(0, 0, 0, time.one.hours, time.one.minutes),
				two: new Date(0, 0, 0, time.two.hours, time.two.minutes)
			}

			const difference = (date.one.getTime() - date.two.getTime()) / 1000 / 60

			return Math.abs(Math.round(difference))
		},
		sent(from) {
			return from == this.name
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
	// destroyed() {
	//   console.log('component destroyed')
	//   this.$socket.off('message')
	// }
}
</script>
