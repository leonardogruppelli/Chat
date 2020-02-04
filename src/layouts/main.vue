<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="q-pa-md">
        <q-toolbar-title>Chat</q-toolbar-title>

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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['id'])
  },
  methods: {
    ...mapActions(['LOGOUT']),
    logout() {
      this.LOGOUT()
      this.$router.push('/auth')
    }
  }
}
</script>
