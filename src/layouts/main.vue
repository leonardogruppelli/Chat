<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header>
      <q-toolbar class="q-pa-sm">
        <q-toolbar-title class="q-pa-none">
          <q-item class="q-px-sm">
            <q-item-section>
              <q-item-label
                class="text-subtitle1 text-white"
              >
                Chat
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-toolbar-title>

        <q-btn
          flat
          round
          icon="ti-more"
        >
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <q-avatar size="60px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                </q-avatar>

                <div class="text-subtitle1 text-weight-light q-mt-xs">
                  John Doe
                </div>
              </div>

              <q-separator
                vertical
                inset
                class="q-mx-lg"
              />

              <div class="column">
                <q-btn
                  color="cyan"
                  label="profile"
                  class="text-weight-light q-mb-xs"
                  rounded
                  dense
                  push
                  no-caps
                >
                  <q-icon
                    name="ti-user"
                    size="1em"
                    right
                  />
                </q-btn>

                <q-btn
                  color="accent"
                  label="settings"
                  class="text-weight-light q-mb-xs"
                  rounded
                  dense
                  push
                  no-caps
                >
                  <q-icon
                    name="ti-settings"
                    size="1em"
                    right
                  />
                </q-btn>

                <q-btn
                  color="warning"
                  label="occurrences"
                  class="text-weight-light"
                  rounded
                  dense
                  push
                  no-caps
                >
                  <q-icon
                    name="ti-announcement"
                    size="1em"
                    right
                  />
                </q-btn>

                <div class="row">
                  <q-separator class="q-my-md q-mx-sm" />
                </div>

                <div class="row justify-end">
                  <q-btn
                    @click="logout"
                    color="negative"
                    size="xs"
                    class="q-pa-xs"
                    round
                    push
                    v-close-popup
                  >
                    <q-icon
                      name="ti-shift-right"
                      color="white"
                    />
                  </q-btn>
                </div>
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <occurrence
      :active="modal"
      @close="modal = false"
    /> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <q-tabs
        align="justify"
        active-color="primary"
        indicator-color="transparent"
        class="q-py-sm bg-white text-accent"
      >
        <q-route-tab
          to="/"
          exact
        >
          <q-icon
            name="las la-home"
            size="md"
          />
        </q-route-tab>

        <q-route-tab
          to="/users"
          exact
        >
          <q-icon
            name="las la-list"
            size="md"
          />
        </q-route-tab>

        <q-route-tab
          to="/profile"
          exact
        >
          <q-icon
            name="las la-user"
            size="md"
          />
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			modal: false
		}
	},
	computed: {
		...mapGetters([
			'user'
		])
	}
}
</script>
