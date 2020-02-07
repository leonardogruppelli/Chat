<template>
  <q-dialog v-model="dialog" transition-show="flip-down" @hide="$emit('close')">
    <q-card class="bg-info text-white q-pa-none">
      <q-bar>
        <div class="text-weight-light">register occurrence</div>

        <q-space />

        <q-btn dense flat v-close-popup>
          <q-icon name="ti-close" size="xs" />
        </q-btn>
      </q-bar>

      <q-card-section class="q-pa-none">
        <q-stepper
          v-model="step"
          vertical
          animated
          inactive-color="grey-5"
          active-color="info"
          done-color="positive"
          class="bg-primary text-white no-border-radius no-shadow"
        >
          <q-step
            :name="1"
            title="Read the terms"
            icon="ti-user"
            :done="step > 1"
          >
            For each ad campaign that you create, you can control how much
            you're willing to spend on clicks and conversions, which networks
            and geographical locations you want your ads to show on, and more.

            <q-stepper-navigation>
              <q-btn @click="step = 2" color="info" label="Continue" />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="2"
            title="Inform your condominium"
            icon="ti-home"
            :done="step > 2"
          >
            <q-select
              filled
              v-model="condominium"
              :options="condominiums"
              bg-color="white"
              color="primary"
              label="Condominum"
            />

            <q-stepper-navigation>
              <q-btn @click="step = 3" color="info" label="Continue" />
              <q-btn
                flat
                @click="step = 1"
                color="warning"
                label="Back"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="3"
            title="Describe your occurrence"
            icon="ti-comment"
            :done="step > 3"
          >
            <q-input
              v-model="occurrence"
              bg-color="white"
              color="primary"
              filled
              autogrow
            />

            <q-stepper-navigation>
              <q-btn @click="step = 4" color="info" label="Finish" />
              <q-btn
                flat
                @click="step = 2"
                color="warning"
                label="Back"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>

        <q-btn
          label="Clear"
          push
          color="info"
          text-color="white"
          @click="step = 1"
          class="float-right q-ma-md"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: this.active,
      step: 1,
      condominium: 'Azaleia',
      condominiums: ['Azaleia', 'Alphaville', 'Barra Place', 'Porto Here'],
      occurrence: null
    }
  },
  props: ['active'],
  watch: {
    active() {
      this.dialog = this.active
    }
  }
}
</script>
