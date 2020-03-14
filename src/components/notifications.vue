<template>
  <div class="recent q-px-md">
    <p class="text-subtitle2 q-mb-sm">
      Notifications
    </p>

    <q-pull-to-refresh @refresh="refresh">
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

      <q-list v-else-if="!loading && !notifications.length">
        <p class="text-grey">
          no notifications found...
        </p>
      </q-list>
      
      <q-list v-else>
        <q-item
          v-for="notification in notifications"
          :key="notification.id"
          :to="{
            path: `/notification/${notification.id}`,
            exact: true
          }"
          clickable
          v-ripple
          class="q-px-none"
        >
          <q-item-section>
            <q-item-label class="text-weight-medium">
              {{ notification.title }}
            </q-item-label>

            <q-item-label
              caption
              lines="2"
            >
              {{ notification.description }}
            </q-item-label>
          </q-item-section>

          <q-item-section
            side
            top
          >
            <q-icon
              :name="notification.users[0].pivot.confirmed | outlined"
              size="sm"
              :color="notification.users[0].pivot.confirmed | answered"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-pull-to-refresh>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			notifications: [],
			loading: true
		}
	},
	computed: mapGetters([
		'id' 
	]),
	filters: {
		outlined: (value) => {
			return value ? 'o_notifications' : 'notifications'
		},
		answered: (value) => {
			return value ? 'grey' : 'primary'
		}
	},
	async created () {
		try {
			const { data } = await this.$get('/notifications')

			this.notifications = data
		} catch (error) {
			console.log(error)
			this.$q.notify({
				color: 'negative',
				textColor: 'white',
				message: error,
				position: 'top',
				timeout: 5000
			})
		} finally {
			this.loading = false
		}
	},
	methods: {
		async refresh(done) {
			const { data } = await this.$get('/notifications')

			this.notifications = data
      
			done()
		}
	}
}
</script>