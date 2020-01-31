<template>
  <q-page class="column">
    <q-toolbar class="auth__intro bg-primary">
      <q-tabs
        v-model="tab"
        class="full-width q-mb-lg text-grey-4 text-weight-light"
        align="justify"
        active-color="white"
        indicator-color="transparent"
      >
        <q-tab :ripple="false" name="login" label="Sign in"/>
        <q-tab :ripple="false" name="register" label="Sign up" />
      </q-tabs>
    </q-toolbar>

    <q-tab-panels
      v-model="tab"
      animated
      swipeable
      transition-prev="jump-right"
      transition-next="jump-left"
      class="auth__panel"
    >
      <q-tab-panel name="login" class="q-py-xl q-px-lg">
        <div class="text-h4 text-weight-thin text-uppercase q-mb-lg">Login</div>

        <q-form @submit="signIn">
          <q-input
            v-model="loginForm.email"
            type="email"
            class="q-mb-md"
            label="e-mail"
          >
            <template v-slot:prepend>
              <q-icon name="ti-email" size="xs" color="grey-6" />
            </template>
          </q-input>

          <q-input
            v-model="loginForm.password"
            type="password"
            class="q-mb-xl"
            label="password"
          >
            <template v-slot:prepend>
              <q-icon name="ti-lock" size="xs" color="grey-6" />
            </template>
          </q-input>

          <div class="row justify-end">
            <q-btn type="submit" color="primary" class="q-pa-sm" round>
              <q-spinner v-if="loading" color="white" :thickness="3" />
              <q-icon v-else name="ti-arrow-right" />
            </q-btn>
          </div>
        </q-form>
      </q-tab-panel>

      <q-tab-panel name="register" class="q-py-xl q-px-lg">
        <div class="text-h4 text-weight-thin q-mb-lg">Register</div>

        <q-form @submit="signUp">
          <q-input v-model="register.name" class="q-mb-md" label="name">
            <template v-slot:prepend>
              <q-icon name="ti-user" size="xs" color="grey-6" />
            </template>
          </q-input>

          <q-input
            v-model="register.email"
            type="email"
            class="q-mb-md"
            label="e-mail"
          >
            <template v-slot:prepend>
              <q-icon name="ti-email" size="xs" color="grey-6" />
            </template>
          </q-input>

          <q-input
            v-model="register.password"
            type="password"
            class="q-mb-xl"
            label="password"
          >
            <template v-slot:prepend>
              <q-icon name="ti-lock" size="xs" color="grey-6" />
            </template>
          </q-input>

          <div class="row justify-end">
            <q-btn type="submit" color="primary" class="q-pa-sm" round>
              <q-spinner v-if="loading" color="white" :thickness="3" />
              <q-icon v-else name="ti-arrow-right" />
            </q-btn>
          </div>
        </q-form>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import Vue from 'vue'
import io from 'socket.io-client'
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      tab: 'login',
      loginForm: {
        email: null,
        password: null
      },
      register: {
        name: null,
        email: null,
        password: null
      },
      loading: false
    }
  },
  methods: {
    ...mapActions(['LOGIN']),
    async signIn() {
      this.loading = true

      try {
        const { data } = await axios.post(
          `${process.env.HOST}/login`,
          this.loginForm
        )

        if (data) {
          Vue.prototype.$socket = io(process.env.HOST, {
            reconnection: false
          })
          this.LOGIN(data)
          this.$socket.emit('join', data._id)
          this.$router.push('/')
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loginForm.email = null
        this.loginForm.password = null
        this.loading = false
      }
    },
    async signUp() {
      this.loading = true

      try {
        const { data } = await axios.post(
          `${process.env.HOST}/register`,
          this.register
        )

        console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        this.register.name = null
        this.register.email = null
        this.register.password = null
        this.loading = false
      }
    }
  }
}
</script>
