<template>
  <q-page>
    <info>
      <q-toolbar class="text-white q-px-md">
        <q-space />
      
        <q-avatar
          size="50px"
          class="q-mb-xs"
        >
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
      </q-toolbar>

      <div class="row q-gutter-x-md q-my-sm q-px-md">
        <q-card class="col bg-white">
          <q-card-section class="col text-center">
            <q-avatar
              size="60px"
              color="primary"
              text-color="white"
              icon="las la-envelope"
            >
              <q-badge
                color="red"
                floating
              >
                12
              </q-badge>
            </q-avatar>
            <div class="text-overline text-primary q-mt-sm">
              messages
            </div>
          </q-card-section>
        </q-card>

        <q-card class="col bg-white">
          <q-card-section class="col text-center">
            <q-avatar
              size="60px"
              color="warning"
              text-color="white"
              icon="las la-exclamation"
            >
              <q-badge
                color="red"
                floating
              >
                0
              </q-badge>
            </q-avatar>
            <div class="text-overline text-warning q-mt-sm">
              occurrences
            </div>
          </q-card-section>
        </q-card>
      </div>
    </info>

    <recent />
  </q-page>
</template>

<script>
import Info from 'components/info'
import Recent from 'components/recent'
import { mapGetters } from 'vuex'

export default {
	components: {
		Info,
		Recent
	},
	computed: {
		...mapGetters([
			'name'
		])
	}
}
</script>