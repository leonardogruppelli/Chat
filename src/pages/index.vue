<template>
  <q-page>
    <info>
      <q-toolbar class="text-white q-px-md">
        <q-space />
        <q-btn
          flat
          dense
        >
          <q-avatar
            size="50px"
            class="q-my-md"
          >
            <img src="statics/user.png">
          </q-avatar>

          <q-menu>
            <div class="flex q-pa-md text-no-wrap">
              <q-avatar
                size="60px"
                class="q-mt-xs"
              >
                <img src="statics/user.png">
              </q-avatar>
            
              <q-separator
                vertical
                inset
                class="q-mx-lg"
              />

              <div class="column">
                <div class="text-subtitle1 q-mb-none">
                  {{ user.name }}
                </div>
                <div class="text-caption q-mb-md">
                  {{ user.email }}
                </div>

                <div class="flex justify-end">
                  <q-btn
                    @click="logout"
                    color="red"
                    icon="exit_to_app"
                    round
                    push
                    size="sm"
                    class="q-pa-xs"
                    v-close-popup
                  />
                </div>
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </info>

    <communications class="q-mb-md" />

    <q-separator />

    <notifications class="q-mt-lg" />
  </q-page>
</template>

<script>
import Info from 'components/info'
import Communications from 'components/communications'
import Notifications from 'components/notifications'
import { mapGetters } from 'vuex'

export default {
	components: {
		Info,
		Communications,
		Notifications
	},
	computed: {
		...mapGetters([
			'user'
		])
	},
	methods: {
		logout() {
			this.$q.cookies.remove('user')
			this.$q.cookies.remove('token')
      
			// this.$socket.emit('left')
			this.$router.push('/auth')
		}
	}
}
</script>