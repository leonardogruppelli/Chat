<template>
  <q-page class="auth flex column justify-center bg-secondary">
    <q-tab-panels
      v-model="tab"
      animated
      swipeable
      transition-prev="jump-right"
      transition-next="jump-left"
      class="auth__panel"
    >
      <q-tab-panel name="login" class="q-px-lg bg-secondary">
        <div class="text-center">
          <q-img
            class="auth__logo"
            src="statics/logo.png"
            spinner-color="white"
          />
        </div>
        <login />
      </q-tab-panel>

      <q-tab-panel name="register" class="q-py-xl q-px-lg">
        <div class="text-center">
          <q-img
            class="auth__logo"
            src="statics/logo.png"
            spinner-color="white"
          />
        </div>
        <register @registered="tab = 'login'" />
      </q-tab-panel>
    </q-tab-panels>

    <p
      v-if="tab == 'login'"
      class="auth__tab text-accent text-weight-light self-center"
    >
      Don't have an account?
      <q-btn
        @click="tab = 'register'"
        color="accent"
        label="Create one"
        :ripple="false"
        no-caps
        flat
        class="q-pa-none text-weight-normal"
      />
    </p>

    <p v-else class="auth__tab text-accent text-weight-light self-center">
      Already have an account?
      <q-btn
        @click="tab = 'login'"
        color="accent"
        label="Sign in"
        :ripple="false"
        no-caps
        flat
        class="q-pa-none text-weight-normal"
      />
    </p>
  </q-page>
</template>

<script>
import Login from '../components/login'
import Register from '../components/register'

export default {
  data() {
    return {
      tab: 'login'
    }
  },
  components: {
    Login,
    Register
  }
}
</script>
