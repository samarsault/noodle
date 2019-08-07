<template>
  <form 
    method="post" 
    :action="`/admin/courses/${course_id}/resource/add/`"
    enctype="multipart/form-data"
    v-on:keydown.enter.prevent
  >
    <input name="name" type="text" placeholder="Name">
    <textarea name="description" placeholder="Description" />
    <label for="topic">Topic: </label>
    <v-select :options="topics" v-model="selectedTopic"/>
    <input name="topic" type="hidden" v-model="selectedTopic"/>
    <input type="text" name="link" placeholder="Link"> 
    <label style="display:block;text-align:center;margin-top: 1em">OR</label>
    <input type="file" name="res">
    <button class="primary icon-button"><Plus decorative/><span class="icon-left">Add Resource</span></button>
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

<style lang="scss" scoped>
input[type="file"] {
	padding: 20px 0;
}
button {
	margin-top: 10px;
	margin-bottom: 10px;
}
</style>
