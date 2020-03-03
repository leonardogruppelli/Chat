<template>
  <div class="recent q-px-md">
    <p class="text-subtitle2 q-mb-sm">
      Recent conversations
    </p>

    <!-- <div
      v-if="loading"
      class="column col flex-center"
    >
      <q-spinner
        color="primary"
        size="5em"
        :thickness="1"
      />
    </div>
    
    <q-list v-else>
      <q-item
        v-for="room in rooms"
        :key="room._id"
        :to="{
          path: `/chat/${room.user._id}?name=${room.user.name}&online=${room.user.online}`,
          exact: true
        }"
        clickable
        v-ripple
        class="q-px-none"
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
            {{ room.user.name }}
          </q-item-label>

          <q-item-label
            v-if="room.user.last"
            caption
            lines="2"
          >
            {{ room.user.last }}
          </q-item-label>

          <q-item-label
            v-else
            caption
            lines="1"
          >
            {{ room.user.email }}
          </q-item-label>
        </q-item-section>

        <q-item-section
          side
        >
          <q-item-label caption>
            {{ room.last }}
          </q-item-label>
            
          <span
            class="user__status"
            :class="color(room.user.online)"
          />
        </q-item-section>
      </q-item>
    </q-list> -->
  </div>
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
			recent: [],
			loading: true
		}
	},
	computed: {
		...mapGetters([
			'id'
		]),
		rooms() {
			const rooms = this.recent

			rooms.forEach(room => {
				room.user = room.users.find(user => user._id != this.id)
			})
      
			return rooms
		}
	},
	methods: {
		color(online) {
			return online ? 'bg-green' : 'bg-grey'
		}
	},
	async created () {
		try {
			const { data } = await axios.post(`${process.env.HOST}/recent`, {
				id: this.id
			})

			this.recent = data
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
	}
}
</script>