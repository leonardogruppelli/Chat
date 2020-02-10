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
              <!-- <q-item-label
                caption
                lines="1"
                class="text-info text-weight-light"
                >MORADOR</q-item-label
              > -->
            </q-item-section>
          </q-item>
        </q-toolbar-title>

        <q-btn @click="modal = true" flat round icon="ti-alert" />

        <q-btn flat round icon="ti-more">
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="items-center">
                <q-avatar size="60px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </q-avatar>
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column">
                <div class="text-subtitle1 text-right q-mb-xs">John Doe</div>

                <q-btn
                  color="white"
                  text-color="accent"
                  label="settings"
                  class="text-weight-light"
                  rounded
                  no-caps
                >
                  <q-icon name="ti-settings" color="accent" size="1em" right />
                </q-btn>

                <div class="row">
                  <q-separator class="q-my-md" />
                </div>

                <q-btn
                  @click="logout"
                  color="white"
                  text-color="negative"
                  label="logout"
                  class="text-weight-light"
                  rounded
                  no-caps
                  v-close-popup
                >
                  <q-icon
                    name="ti-shift-right"
                    color="negative"
                    size="1em"
                    right
                  />
                </q-btn>
              </div>
            </div>
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
import Occurrence from 'components/occurrence'
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
