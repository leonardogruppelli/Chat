<template>
  <div id="q-app">
    <keep-alive v-if="id">
      <router-view :key="$route.path" />
    </keep-alive>

    <router-view v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters([
			'id'
		])
	},
}
</script>