<template>
  <div class="info">
    <background />

    <slot />
  </div>
</template>

<script>
import Background from 'components/background'

export default {
	components: {
		Background,
	}
}
</script>