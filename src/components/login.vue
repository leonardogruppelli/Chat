<template>
  <div>
    <validation-observer
      ref="observer"
      v-slot="{ passes }"
    >
      <form @submit.prevent="passes(login)">
        <validation-provider
          rules="required|email"
          v-slot="{ errors, invalid, validated }"
        >
          <q-input
            v-model="form.email"
            label="e-mail"
            :error="invalid && validated"
            :error-message="errors[0]"
          >
            <template v-slot:prepend>
              <q-icon
                name="las la-at"
                size="xs"
                color="info"
              />
            </template>
          </q-input>
        </validation-provider>

        <validation-provider
          rules="required"
          v-slot="{ errors, invalid, validated }"
        >
          <q-input
            v-model="form.password"
            type="password"
            class="q-mb-md"
            label="password"
            :error="invalid && validated"
            :error-message="errors[0]"
          >
            <template v-slot:prepend>
              <q-icon
                name="las la-key"
                size="xs"
                color="info"
              />
            </template>
          </q-input>
        </validation-provider>

        <q-btn
          type="submit"
          color="info"
          label="Log In"
          :loading="loading"
          class="full-width q-pa-sm"
        >
          <template v-slot:loading>
            <q-spinner
              color="white"
              :thickness="3"
            />
          </template>
        </q-btn>
      </form>
    </validation-observer>

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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import axios from 'axios'

export default {
	components: {
		ValidationObserver,
		ValidationProvider
	},
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
		async login() {
			this.loading = true

			try {
				const { data } = await axios.post(
					`${process.env.HOST}/login`,
					this.form
				)

				if (data) {
					console.log(data)
					this.$q.cookies.set('user', data.user, {
						expires: '1d'
					})
          
					this.$q.cookies.set('token', data.token, {
						expires: '1d'
					})

					this.$socket.emit('join', data.user.id)

					this.$refs.observer.reset()
            
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
					message: error.response,
					position: 'top',
					timeout: 5000
				})
			} finally {
				this.loading = false
			}
		},
		reset() {
			Object.keys(this.form).forEach(key => {
				this.form[key] = null
			})

			requestAnimationFrame(() => {
				this.$refs.observer.reset()
			})
		}
	}
}
</script>
