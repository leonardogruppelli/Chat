<template>
  <q-page class="flex column">
    <div class="chat__header bg-grey-2 q-mb-md">
      <q-toolbar class="q-pt-sm">
        <q-item class="q-px-sm">
          <q-item-section>
            <q-item-label class="text-h6 text-weight-light text-primary">
              messages
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-space />

        <q-btn
          flat
          round
          icon="las la-search"
          color="primary"
        />
      </q-toolbar>

      <q-toolbar class="q-mb-sm">
        <q-toolbar-title>
          <q-item class="q-px-sm">
            <q-item-section
              top
              avatar
            >
              <q-avatar
                size="50px"
              >
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-medium">
                {{ user.name }}
              </q-item-label>
              <q-item-label
                caption
                lines="1"
              >
                {{ user.email }}
              </q-item-label>
              <q-item-label
                caption
                lines="1"
              >
                {{ user.id }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-toolbar-title>
      </q-toolbar>
    </div>

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
      
    <q-scroll-area
      v-else
      style="height: 100%"
    >
      <q-list
        class="q-gutter-y-sm q-px-md"
      >
        <q-item
          v-for="user in users"
          :key="user._id"
          :to="{
            path: `/chat/${user._id}?name=${user.name}&online=${user.online}`,
            exact: true
          }"
          class="q-px-none"
          exact
          clickable
          v-ripple
        >
          <q-item-section
            top
            avatar
          >
            <q-avatar
              size="50px"
              class="overflow-hidden"
            >
              <background />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-medium">
              {{ user.name }}
            </q-item-label>
            <q-item-label
              caption
              lines="2"
            >
              Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
            </q-item-label>
          </q-item-section>

          <q-item-section
            side
            top
          >
            <q-item-label caption>
              5 min ago
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import Background from 'components/background'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
	components: {
		Background,
	},
	data() {
		return {
			users: [
			],
			loading: true
		}
	},
	computed: {
		...mapGetters([
			'id',
			'user'
		]),
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
