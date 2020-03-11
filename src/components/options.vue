<template>
  <div class="options q-px-md">
    <q-list class="q-gutter-y-sm">
      <q-item
        clickable
      >
        <q-item-section avatar>
          <q-avatar
            rounded
            size="50px"
            color="warning"
            text-color="white"
            icon="las la-cog"
          />
        </q-item-section>

        <q-item-section class="text-subtitle1">
          Settings
        </q-item-section>

        <q-item-section side>
          <q-icon name="las la-angle-right" />
        </q-item-section>
      </q-item>

      <q-item
        clickable
      >
        <q-item-section avatar>
          <q-avatar
            rounded
            size="50px"
            color="cyan"
            text-color="white"
            icon="las la-info"
          />
        </q-item-section>

        <q-item-section class="text-subtitle1">
          Help
        </q-item-section>

        <q-item-section side>
          <q-icon name="las la-angle-right" />
        </q-item-section>
      </q-item>

      <q-item
        clickable
      >
        <q-item-section avatar>
          <q-avatar
            rounded
            size="50px"
            color="blue-grey"
            text-color="white"
            icon="las la-ellipsis-h"
          />
        </q-item-section>

        <q-item-section class="text-subtitle1">
          Terms
        </q-item-section>

        <q-item-section side>
          <q-icon name="las la-angle-right" />
        </q-item-section>
      </q-item>

      <q-item
        @click="logout"
        clickable
      >
        <q-item-section avatar>
          <q-avatar
            rounded
            size="50px"
            color="red"
            text-color="white"
            icon="las la-sign-out-alt"
          />
        </q-item-section>

        <q-item-section class="text-subtitle1">
          Logout
        </q-item-section>

        <q-item-section side>
          <q-icon name="las la-angle-right" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
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