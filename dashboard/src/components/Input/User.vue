<template>
  <v-select
    :options="users"
    @search="searchUsers"
    v-on:input="changed"
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
  methods: {
    searchUsers(search, loading) {
      loading(true);
      axios.get(`/admin/super/users/search?q=${search}`).then(({ data }) => {
        this.users = data.map((x) => `${x.name} <${x.email}>`);
        loading(false);
      });
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
