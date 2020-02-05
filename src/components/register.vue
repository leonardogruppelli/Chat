<template>
  <div>
    <q-form @submit="register">
      <q-input v-model="form.name" class="q-mb-md" label="name">
        <template v-slot:prepend>
          <q-icon name="ti-user" size="xs" color="info" />
        </template>
      </q-input>

      <q-input
        v-model="form.email"
        type="email"
        class="q-mb-md"
        label="e-mail"
      >
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
        label="Register"
        :loading="loading"
        class="full-width q-pa-sm"
      >
        <template v-slot:loading>
          <q-spinner color="white" :thickness="3" />
        </template>
      </q-btn>
    </q-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null
      },
      loading: false
    }
  },
  methods: {
    async register() {
      this.loading = true

      try {
        const { data } = await axios.post(
          `${process.env.HOST}/register`,
          this.form
        )

        if (data) {
          this.form.name = null
          this.form.email = null
          this.form.password = null

          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            message: 'registered successfully, please sign in...',
            position: 'top',
            timeout: 5000
          })

          this.$emit('registered')
        }
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          message: 'an error ocurred while signing up, try again...',
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
