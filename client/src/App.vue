<template>
  <div id="app-container">
    <Modal
      v-if="alert.show"
      :title="alert.status"
      v-on:ok="hideAlert"
      v-on:close="hideAlert"
    >
      <template slot="body">
        <p>{{ alert.message }}</p>
      </template>
    </Modal>
    <Loading v-if="isLoading" />
    <div :class="{ 'app-loading': isLoading }" id="app">
      <NavBar />
      <router-view />
      <Footer v-if="!isAdminOrDashboard" />
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";

import { NavBar, Footer } from "noodle-flavour";
import Modal from "./components/Dialogs/Modal";
import Loading from "./components/Loading";

import { getters, mutations } from "./utils/store";

export default {
  computed: {
    ...getters,
    isAdminOrDashboard() {
      return this.$route.path.match(/(\/dashboard|\/admin)/);
    },
  },
  components: {
    Loading,
    NavBar,
    Modal,
    Footer,
  },
  methods: {
    ...mutations,
  },
  async mounted() {
    this.setLoading(true);
    try {
      const user = await userApi.get();
      this.setUser(user);
    } catch (e) {
      this.setUser(null);
    }
    this.setLoading(false);
  },
};
</script>

<style lang="scss">
@charset 'utf-8';

@import "~noodle-flavour/styles/base.scss";
@import "vue-select/src/scss/vue-select.scss";

.app-loading {
  filter: blur(5px);
}
#app {
  display: flex;
  flex-direction: column;
}
#app-container,
#app {
  height: 100%;
}
</style>
