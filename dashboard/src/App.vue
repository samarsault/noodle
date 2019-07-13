<template>
	<div id="app">
		<NavBar />
		<!-- <div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div> -->
			<router-view/>
		<Footer />
	</div>
</template>

<style lang="scss">
@charset 'utf-8';

@import "vue-select/src/scss/vue-select.scss";
</style>

<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

export default {
	components: {
		NavBar,
		Footer
	}
}
</script>
