<template>
  <div id="app">
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
    <div :class="{ 'app-loading': isLoading }">
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
import axios from "axios";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Modal from "./components/Dialogs/Modal";
import Loading from "./components/Loading";

import { getters, mutations } from "./utils/store";

export default {
  computed: {
    ...getters,
  },
  components: {
    Loading,
    NavBar,
    Footer,
    Modal,
  },
  methods: {
    ...mutations,
  },
  async mounted() {
    this.setLoading(true);
    const { data: user } = await axios.get("/api/user");
    this.setUser(user);
    this.setLoading(false);
  },
};
</script>

<style lang="scss">
.app-loading {
  filter: blur(5px);
}
</style>
