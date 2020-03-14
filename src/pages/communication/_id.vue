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
      <p class="communication__title text-orange">
        {{ communication.title }}
      </p>
      <p class="communication__description">
        {{ communication.description }}
      </p>
    </div>

    <q-footer
      v-if="communication.confirms && !confirmed"
      class="communication__footer bg-grey-2 q-pa-md"
    >
      <div class="flex justify-end">
        <q-btn
          @click="accept"
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
			communication: [],
			form: {
				confirmed: 1
			},
			loading: false,
			accepting: false
		}
	},
	computed: {
		confirmed() {
			return this.communication.users && !!this.communication.users[0].pivot.confirmed
		}
	},
	async created () {
		this.loading = true
    
		try {
			const { data: communication } = await this.$get(`/communications/${this.id}`)
			const { data: readed } = await this.$put(`/communications/${this.id}`)

			this.communication = communication
		} catch (error) {
			alert(error)
		} finally {
			this.loading = false
		}
	},
	methods: {
		async accept() {
			this.accepting = true

			const { data: confirmed } = await this.$put(`/communications/${this.id}`, this.form)
      
			if (confirmed) {
				this.$router.push('/')
			}

			this.accepting = false
		}
	}
}
</script>