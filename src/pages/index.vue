<template>
  <q-page>
    <info />
    <recent />
  </q-page>
</template>

<script>
import Info from 'components/info'
import Recent from 'components/recent'

export default {
	components: {
		Info,
		Recent
	},
}
</script>