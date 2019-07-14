<template>
  <v-select :options="users" @search="searchUsers" multiple taggable v-model="selected"/>
</template>

<script>
import axios from 'axios';
import vSelect from 'vue-select';

export default {
  props: [ 'selected' ],
  data() {
    return {
      users: []
    }
  },
  methods: {
     searchUsers(search, loading) {
      loading(true);
      axios.get(`/admin/super/users/search?q=${search}`)
        .then (({ data }) => {
          this.users = data.map(x => `${x.name} <${x.email}>`);
          loading(false);
        })
    },
  },
  components: {
    vSelect
  }
}
</script>
