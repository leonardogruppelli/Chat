<template>
  <div class="background">
    <svg
      viewBox="0 0 600 600"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="none"
        fill="none"
      >
        <circle
          fill="rgba(82, 110, 251, 0.4)"
          cx="350"
          cy="350"
          r="300"
        />
        <circle
          fill="rgba(82, 110, 251, 0.4)"
          cx="350"
          cy="350"
          r="100"
        />
        <circle
          fill="rgba(82, 110, 251, 0.4)"
          cx="350"
          cy="350"
          r="200"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
	mounted () {
		const circles = document.getElementsByTagName('circle')

		for (const circle of circles) {
			circle.style.animationDelay = Math.random() * 10 + 5 + 's'
		}
	},
}
</script>