<template>
	<div id="app">
		<NavBar />
			<router-view />
		<Footer />
	</div>
</template>

<style lang="scss">
@charset 'utf-8';

@import "vue-select/src/scss/vue-select.scss";
</style>

<script>
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Modal from './components/Dialogs/Modal';

export default {
	components: {
		NavBar,
    Footer
  }
}
</script>
