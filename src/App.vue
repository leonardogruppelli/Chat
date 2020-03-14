<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	computed: {
		...mapGetters([
			'user_app'
		])
	},
	created () {
		document.addEventListener('deviceready', () => {
			window.plugins.OneSignal.setLogLevel({logLevel: 6, visualLevel: 0})
			
			const onUserInformation = (data) => {
				this.SET_USER_APP(data.userId)
			}
  
			const onNotificationOpened = (data) => {
				if (data.notification.payload.additionalData.route) {
					const route = data.notification.payload.additionalData.route
					this.$router.push(route)
				}
			}
    
			window.plugins.OneSignal.startInit('df24bc31-f78d-4fa0-87ec-ae85b91c7538')
			window.plugins.OneSignal.getIds(onUserInformation)
			window.plugins.OneSignal.handleNotificationOpened(onNotificationOpened)
			window.plugins.OneSignal.endInit()
		}, false)
	},
	methods: mapActions([
		'SET_USER_APP'
	])
}
</script>