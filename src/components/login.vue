<template>
  <div>
    <validation-observer
      ref="observer"
      v-slot="{ passes }"
    >
      <form @submit="passes(login)">
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
                name="ti-email"
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
                name="ti-lock"
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
import { mapActions } from 'vuex'
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
		...mapActions([
			'LOGIN'
		]),
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

					this.reset()

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
