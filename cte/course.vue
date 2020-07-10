<template lang="pug">
 <h1>{{ item }}</h1> 
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      item: this.$route.params.course_id
    }
  }
}
</script>
