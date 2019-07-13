<template>
  <form method="post" :action="`/admin/courses/resource/add/${course_id}`" enctype="multipart/form-data">
    <input name="name" type="text" placeholder="Name">
    <textarea name="description" placeholder="Description" />
    <label for="topic">Topic: </label>
    <select name="topic">
      <option 
      v-for="(topic,index) in topics" 
      v-bind:key="index"
      :value="topic"
      >
      {{ topic }}
    </option>
  </select>
  <input type="file" name="res"> 
  <button class="primary">Add Resource</button>
  </form>
</template>


<script>
import axios from 'axios';

export default {
  props: [ 'course_id' ],
  data() {
    return {
      topics: []
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
