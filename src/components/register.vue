<template>
  <div>
    <validation-observer
      ref="observer"
      v-slot="{ passes }"
    >
      <!-- <q-form @submit="register"> -->
      <form @submit="passes(register)">
        <validation-provider
          rules="required"
          v-slot="{ errors, invalid, validated }"
        >
          <q-input
            v-model="form.name"
            label="name"
            :error="invalid && validated"
            :error-message="errors[0]"
          >
            <template v-slot:prepend>
              <q-icon
                name="ti-user"
                size="xs"
                color="info"
              />
            </template>
          </q-input>
        </validation-provider>

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
          rules="required|confirmed:confirmation"
          v-slot="{ errors, invalid, validated }"
        >
          <q-input
            v-model="form.password"
            type="password"
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

        <validation-provider
          name="confirmation"
          rules="required"
          v-slot="{ errors, invalid, validated }"
        >
          <q-input
            v-model="form.confirm"
            type="password"
            class="q-mb-lg"
            label="confirm password"
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
          label="Register"
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
      <!-- </q-form> -->
    </validation-observer>
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
				name: null,
				email: null,
				password: null,
				confirm: null
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
					this.reset()

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
