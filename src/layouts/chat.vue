<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-pa-sm">
        <q-btn v-go-back.single round flat icon="ti-arrow-left" />

        <q-toolbar-title class="q-pa-none">
          <q-item class="q-px-sm">
            <q-item-section avatar>
              <q-avatar color="accent" text-color="white">
                {{ user.name.charAt(0).toLocaleUpperCase() }}
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle1 text-white">{{
                user.name
              }}</q-item-label>
              <q-item-label caption lines="1" :class="color">{{
                status
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-toolbar-title>

        <q-btn flat round icon="ti-more" />
      </q-toolbar>
    </q-header>

    <q-page-container class="container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: this.$route.params.user,
        name: this.$route.query.name,
        online: this.$route.query.online == 'true'
      }
    }
  },
  computed: {
    status() {
      return this.user.online ? 'online' : 'offline'
    },
    color() {
      return this.user.online ? 'text-info' : 'text-accent'
    }
  },
  created() {
    this.$socket.on('joined', user => {
      if (user == this.user.id) {
        this.user.online = true
      }
    })

    this.$socket.on('left', user => {
      if (user == this.user.id) {
        this.user.online = false
      }
    })
  }
}
</script>
