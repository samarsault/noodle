<template>
	<div id="app">
		<Modal 
			v-if="alert.show" 
			:title="alert.status" 
			v-on:ok="alert.show = false"
			v-on:close="alert.show = false"
		>
			<template slot="body">
			<p>{{ alert.message }}</p>
			</template>
		</Modal>
    <Loading v-if="loading"/>
    <div :class="{'app-loading': loading }">
		  <NavBar />
			  <router-view />
		  <Footer />
    </div>
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
import Loading from './components/Loading';

import event from './utils/event';

export default {
  data() {
    return {
      loading: false,
      alert: {
				message: '',
				status: '',
        show: false
      }
    }
  },
  created() {
    event.$on('loading', state => {
      this.loading = state;
    });

    event.$on('alert', (state, msg) => {
			this.alert.status = state;
      this.alert.message = msg;
      this.alert.show = true;
		})
  },
	components: {
    Loading,
		NavBar,
		Footer,
		Modal
  },
  methods: {
  }
}
</script>

<style lang="scss">
.app-loading {
  filter: blur(5px);
}
</style>
