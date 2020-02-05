<template>
  <div id="q-app">
    <keep-alive>
      <router-view :key="$route.path" />
    </keep-alive>
  </div>
</template>
