<template>
	<div id="app">
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
      confirm: {
        message: '',
        show: true
      }
    }
  },
  created() {
    event.$on('loading', state => {
      this.loading = state;
    });

    event.$on('confirm', (msg) => {
      this.confirm.message = msg;
      this.confirm.show = true;
    })
  },
	components: {
    Loading,
		NavBar,
    Footer
  },
  methods: {
    sendConfirm() {

    }
  }
}
</script>

<style lang="scss">
.app-loading {
  filter: blur(5px);
}
</style>
