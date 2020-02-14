<template>
  <div class="profile">
    <info>
      <q-toolbar class="text-white q-px-md">
        <q-space />

        <q-avatar
          size="40px"
          color="white"
          class="q-mb-sm"
        >
          <q-icon
            name="las la-pen"
            color="primary"
          />
        </q-avatar>
      </q-toolbar>

      <div class="column items-center q-mb-md">
        <q-avatar
          size="80px"
          class="q-mb-md"
        >
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>

        <h6 class="q-ma-none q-mb-sm text-weight-light text-white">
          {{ name }}
        </h6>

        <q-chip
          color="pink"
          text-color="white"
        >
          <q-avatar
            size="md"
            icon="las la-map-marker"
            color="white"
            text-color="pink"
          />
          Alphaville
        </q-chip>

        <q-chip
          color="green"
          text-color="white"
        >
          <q-avatar
            size="md"
            icon="las la-building"
            color="white"
            text-color="green"
          />
          204
        </q-chip>
      </div>
    </info>

    <options />
  </div>
</template>

<script>
import Info from 'components/info'
import Options from 'components/options'
import { mapGetters } from 'vuex'

export default {
	components: {
		Info,
		Options
	},
	computed: {
		...mapGetters([
			'name'
		])
	}
}
</script>