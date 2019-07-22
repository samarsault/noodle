<template>
  <form 
    method="post" 
    :action="`/admin/courses/resource/add/${course_id}`"
    enctype="multipart/form-data"
    v-on:keydown.enter.prevent
  >
    <input name="name" type="text" placeholder="Name">
    <textarea name="description" placeholder="Description" />
    <label for="topic">Topic: </label>
    <v-select :options="topics" v-model="selectedTopic"/>
    <input name="topic" type="hidden" v-model="selectedTopic"/>
    <input type="file" name="res">
    <button class="primary"><Plus decorative/>Add Resource</button>
  </form>
</template>


<script>
import axios from 'axios';
import vSelect from 'vue-select';
import Plus from 'vue-material-design-icons/Plus'

export default {
  props: [ 'course_id' ],
  components: {
    vSelect,
    Plus
  },
  data() {
    return {
      topics: [],
      selectedTopic: ''
    }
  },
  mounted() {
    axios.get(`/api/courses/${this.course_id}/view/topics`)
      .then( ({ data }) => {
        this.topics = data.topics;
      })
  }
}
</script>
