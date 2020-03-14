<template>
  <q-page
    ref="page"
    class="communication bg-grey-2 q-pa-md"
  >
    <div
      v-if="loading"
      class="column col flex-center"
    >
      <q-spinner
        color="primary"
        size="5em"
        :thickness="1"
      />
    </div>

    <div
      v-else
      class="communication__content"
    >
      <p class="communication__title text-primary">
        {{ notification.title }}
      </p>
      <p class="communication__description">
        {{ notification.description }}
      </p>
    </div>

    <q-input
      v-if="!loading"
      v-model="form.answer"
      label="answer"
      filled
      rounded
      type="textarea"
      :readonly="answered"
    >
      <template v-slot:prepend>
        <q-icon name="comment" />
      </template>
    </q-input>

    <q-footer
      v-if="!loading && !answered"
      class="communication__footer bg-grey-2 q-pa-md"
    >
      <div class="flex justify-between">
        <q-btn
          @click="respond(0)"
          label="Refuse"
          color="accent"
          :loading="refusing"
        />
        <q-btn
          @click="respond(1)"
          label="Accept"
          color="primary"
          :loading="accepting"
        />
      </div>
    </q-footer>
  </q-page>
</template>

<script>
export default {
	data() {
		return {
			id: this.$route.params.id,
			notification: [],
			form: {
				answer: null,
				aproved: 1
			},
			loading: false,
			accepting: false,
			refusing: false
		}
	},
	computed: {
		answered() {
			return this.notification.users ? !!this.notification.users[0].pivot.confirmed : null
		}
	},
	async created () {
		this.loading = true
    
		try {
			const { data: notification } = await this.$get(`/notifications/${this.id}`)
			const { data: readed } = await this.$put(`/notifications/${this.id}`)

			this.notification = notification
			this.form.answer = notification.users[0].pivot.answer
		} catch (error) {
			alert(error)
			console.log(error)
		} finally {
			this.loading = false
		}
	},
	methods: {
		async respond(value) {
			value ? this.accepting = true : this.refusing = true
			this.form.aproved = value

			this.$nextTick(async () => {
				const { data: answered } = await this.$put(`/notifications/${this.id}`, this.form)
      
				if (answered) {
					this.$router.push('/')
				}

				value ? this.accepting = false : this.refusing = false
			})
		}
	}
}
</script>