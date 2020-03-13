<template>
  <q-page>
    <info>
      <q-toolbar class="text-white q-px-md">
        <q-space />
      
        <q-avatar
          size="50px"
          class="q-my-md"
        >
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
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
			'name'
		])
	}
}
</script>