<template>
  <div class="recent q-px-md">
    <p class="text-subtitle2 q-mb-sm">
      Communications
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

      <q-list v-else-if="!loading && !communications.length">
        <p class="text-grey">
          no communications found...
        </p>
      </q-list>
      
      <q-list v-else>
        <q-item
          v-for="communication in communications"
          :key="communication.id"
          :to="{
            path: `/communication/${communication.id}`,
            exact: true
          }"
          clickable
          v-ripple
          class="q-px-none"
        >
          <q-item-section>
            <q-item-label class="text-weight-medium">
              {{ communication.title }}
            </q-item-label>

            <q-item-label
              caption
              lines="2"
            >
              {{ communication.description }}
            </q-item-label>
          </q-item-section>

          <q-item-section
            side
            top
          >
            <q-icon
              :name="communication | outlined"
              size="sm"
              :color="communication | readed"
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
			communications: [],
			loading: true
		}
	},
	computed: mapGetters([
		'id' 
	]),
	filters: {
		outlined: (value) => {
			if (value.confirms) {
				return value.users[0].pivot.confirmed ? 'o_notifications' : 'notifications'
			}
      
			return value ? 'o_notifications' : 'notifications'
		},
		readed: (value) => {
			if (value.confirms) {
				return value.users[0].pivot.confirmed ? 'grey' : 'orange'
			}
      
			return value ? 'grey' : 'orange'
		}
	},
	async created () {
		try {
			const { data } = await this.$get('/communications')

			this.communications = data
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
			const { data } = await this.$get('/communications')

			this.communications = data
      
			done()
		}
	}
}
</script>