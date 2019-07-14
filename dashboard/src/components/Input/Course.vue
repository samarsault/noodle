<template>
  <v-select :options="courseOptions" v-model="selected" />
</template>

<script>
export default {
  props: ['selected'],
  data() {
    return {
      courseOptions: []
    }
  },
  methods: {
    searchCourses(search, loading) {
        loading(true);
        axios.get(`/admin/super/courses/search?q=${search}`)
          .then (({data}) => {
            this.courseOptions = data;
            loading(false);
          })
    }
   }
}
</script>

