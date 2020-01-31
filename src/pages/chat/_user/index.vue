<template>
  <q-page ref="page" class="chat bg-secondary">
    <div v-if="loading" class="column col flex-center">
      <q-spinner color="info" size="5em" :thickness="1" />
    </div>

    <div v-else class="q-pa-md justify-end">
      <div v-for="message in messages" :key="message._id" class="chat__message">
        <q-chat-message
          v-if="sent(message.from)"
          :text="message.message"
          :stamp="message.at"
          :sent="true"
          :text-sanitize="true"
        />
        <q-chat-message
          v-else
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          :text="message.message"
          :stamp="message.at"
          :sent="false"
          :text-sanitize="true"
        />
      </div>
    </div>

    <q-footer class="q-pa-md">
      <q-form @submit="send">
        <q-input
          v-model="message"
          placeholder="Type a message..."
          bg-color="primary"
          rounded
          outlined
        >
          <template v-slot:append>
            <q-btn
              @click="send"
              icon="ti-location-arrow"
              color="white"
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
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      room: null,
      user: this.$route.params.user,
      message: null,
      messages: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters(['id', 'name'])
  },
  // watch: {
  //   messages() {
  //     return this.scroll()
  //   }
  // },
  methods: {
    send() {
      if (!this.message) {
        return
      }

      const message = {
        to: this.user,
        from: this.name,
        append: false,
        message: [this.message],
        at: this.time()
      }

      const last = this.messages[this.messages.length - 1]

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
    // scroll() {
    //   // const height = this.$refs.page.$el

    //   console.log(document.body.scrollHeight)

    //   // window.scrollTo(0, height)
    //   window.scrollTo(0, document.body.scrollHeight)
    // },
    sent(from) {
      return from == this.name
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
      console.log(error)
    } finally {
      this.loading = false
    }

    this.$socket.on('message', message => {
      const total = this.messages.length - 1
      const last = this.messages[total]

      if (
        last &&
        message.from == last.from &&
        this.difference(last.at, message.at) <= 1
      ) {
        last.message.push(message.message)
        last.at = message.at
      } else {
        this.messages.push(message)
      }
    })
  }
}
</script>
