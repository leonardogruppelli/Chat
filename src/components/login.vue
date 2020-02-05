<template>
  <div>
    <q-form @submit="login">
      <q-input v-model="form.email" type="email" class="q-mb-md" label="e-mail">
        <template v-slot:prepend>
          <q-icon name="ti-email" size="xs" color="info" />
        </template>
      </q-input>

      <q-input
        v-model="form.password"
        type="password"
        class="q-mb-lg"
        label="password"
      >
        <template v-slot:prepend>
          <q-icon name="ti-lock" size="xs" color="info" />
        </template>
      </q-input>

      <q-btn
        type="submit"
        color="info"
        label="Log In"
        :loading="loading"
        class="full-width q-pa-sm"
      >
        <template v-slot:loading>
          <q-spinner color="white" :thickness="3" />
        </template>
      </q-btn>
    </q-form>

    <q-btn
      flat
      color="accent"
      label="Forgot your password?"
      :ripple="false"
      no-caps
      class="full-width q-ma-md text-weight-light"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      loading: false
    }
  },
  methods: {
    ...mapActions(['LOGIN']),
    async login() {
      this.loading = true

      try {
        const { data } = await axios.post(
          `${process.env.HOST}/login`,
          this.form
        )

        if (data) {
          this.LOGIN(data)

          this.$socket.emit('join', data._id)

          this.form.email = null
          this.form.password = null

          this.$router.push('/')
        } else {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            message: 'invalid e-mail or password...',
            position: 'top',
            timeout: 5000
          })
        }
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          message: 'an error ocurred while logging in, try again...',
          position: 'top',
          timeout: 5000
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
