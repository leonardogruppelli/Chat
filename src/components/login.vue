<template>
  <div>
    <h4 class="q-my-md">
      Login
    </h4>

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
          color="primary"
          round
          :loading="loading"
          class="q-pa-md float-right"
        >
          <template v-slot>
            <q-icon
              name="arrow_forward"
              size="md"
            />
          </template>

          <template v-slot:loading>
            <q-spinner
              color="white"
              :thickness="3"
            />
          </template>
        </q-btn>
      </form>
    </validation-observer>

    <!-- <q-btn
      flat
      color="accent"
      label="Forgot your password?"
      :ripple="false"
      no-caps
      class="full-width q-ma-md text-weight-light"
    /> -->
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'

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
	computed: mapGetters([
		'user_app'
	]),
	methods: {
		async login() {
			this.loading = true

			try {
				const { data: response } = await this.$post('/login', this.form)
				
				if (response) {
					const token = response.token
					const user = {
						id: response.id,
						name: response.full_name,
						email: response.email,
						identifier: response.identifier
					}
          
					this.$setToken(token)

					const { data: update } = await this.$put(`/user/${user.id}`, {
						user_app: this.user_app
					})
          
					this.$q.cookies.set('token', token, {
						expires: '1d'
					})
          
					this.$q.cookies.set('user', user, {
						expires: '1d'
					})

					// this.$socket.emit('join', data.user.id)

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
					message: 'invalid e-mail or password...',
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
