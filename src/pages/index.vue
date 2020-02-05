<template>
  <q-page class="flex column bg-secondary">
    <div v-if="loading" class="column col flex-center">
      <q-spinner color="info" size="5em" :thickness="1" />
    </div>

    <q-list v-else class="q-pa-none">
      <q-item
        v-for="user in users"
        :key="user._id"
        :to="{
          path: `/chat/${user._id}?name=${user.name}&online=${user.online}`,
          exact: true
        }"
        class="q-my-sm"
        exact
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0).toLocaleUpperCase() }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-white">{{ user.name }}</q-item-label>
          <q-item-label caption lines="1" class="text-accent">{{
            user.email
          }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon
            name="ti-comment"
            size="xs"
            :color="user.online ? 'info' : 'white'"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      users: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters(['id']),
    online() {
      return this.users.filter(item => item.online)
    },
    offline() {
      return this.users.filter(item => !item.online)
    }
  },
  async created() {
    try {
      const { data } = await axios.post(`${process.env.HOST}/users`, {
        id: this.id
      })

      this.users = data
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }

    this.$socket.on('registered', user => {
      this.users.push(user)
    })

    this.$socket.on('joined', user => {
      console.log('user joined: ', user)
      const index = this.users.findIndex(item => item._id == user)

      if (index >= 0) {
        this.users[index].online = true
      }
    })

    this.$socket.on('left', user => {
      console.log('user left: ', user)
      const index = this.users.findIndex(item => item._id == user)

      if (index >= 0) {
        this.users[index].online = false
      }
    })
  }
}
</script>
