<template>
  <v-select
    :options="users"
    @search="searchUsers"
    v-on:input="changed"
    :value="value"
    multiple
    taggable
  />
</template>

<script>
import axios from "axios";
import vSelect from "vue-select";

export default {
  props: {
    value: {},
  },

  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    this.users = await this.fetchOptions("");
  },
  methods: {
    async fetchOptions(search) {
      const { data } = await axios.get(`/admin/super/users/search?q=${search}`);
      return data.map((x) => `${x.name} <${x.email}>`);
    },
    async searchUsers(search, loading) {
      if (!search) return;
      loading(true);
      this.users = await this.fetchOptions(search);
      loading(false);
    },
    changed(value) {
      this.$emit("input", value);
    },
  },
  components: {
    vSelect,
  },
};
</script>
