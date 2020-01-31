<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="q-pa-md">
        <q-toolbar-title>Chat</q-toolbar-title>

        <q-btn flat round icon="ti-more" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
