<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-grey-2"
    >
      <q-toolbar class="communication__header bg-white q-px-none q-py-sm">
        <q-btn
          v-go-back.single
          round
          flat
          icon="las la-angle-left"
          color="primary"
        />

        <q-toolbar-title class="q-pa-none">
          <q-item class="q-px-sm">
            <q-item-section avatar>
              <q-avatar
                color="primary"
                text-color="white"
              >
                <q-icon name="notifications" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle1 text-primary">
                Notification
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>