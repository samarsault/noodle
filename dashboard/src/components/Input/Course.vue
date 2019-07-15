<template>
  <v-select 
    :options="courseOptions" 
    @search="searchCourses"
    v-on:input="changed"
  />
</template>

<script>
import vSelect from 'vue-select';

export default {
  props: {
    value: { }
  },
  data() {
    return {
      courseOptions: []
    }
  },
  components: {
    vSelect
  },
  methods: {
    searchCourses(search, loading) {
        loading(true);
        axios.get(`/admin/super/courses/search?q=${search}`)
          .then (({data}) => {
            this.courseOptions = data;
            loading(false);
          })
    },
    changed(value) {
      this.$emit('input', value);
    }
  }
}
</script>

