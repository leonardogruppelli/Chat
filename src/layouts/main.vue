<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="q-pa-sm">
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
              <q-item-label
                caption
                lines="1"
                class="text-info text-weight-light"
                >MORADOR</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-toolbar-title>

        <q-btn @click="modal = true" flat round icon="ti-alert" />

        <q-btn flat round icon="ti-more">
          <q-menu>
            <q-list>
              <q-item @click="logout" clickable v-close-popup>
                <q-item-section>Log Out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <occurrence :active="modal" @close="modal = false" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Occurrence from '../components/occurrence'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Occurrence
  },
  data() {
    return {
      modal: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['LOGOUT']),
    logout() {
      this.LOGOUT()
      this.$socket.emit('left')
      this.$router.push('/auth')
    }
  }
}
</script>
