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
      <NavBar :user="user" :doLogOut="logout" />
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";

import { NavBar } from "noodle-adapter";
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
    Modal,
  },
  methods: {
    ...mutations,
    logout() {
      localStorage.clear();
      this.setUser(null);
      this.$router.push({
        path: "/",
      });
    },
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

@import "~noodle-adapter/styles/base.scss";
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
