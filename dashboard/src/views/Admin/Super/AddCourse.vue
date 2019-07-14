<template>
<form method="post" action="/admin/super/addCourse" enctype="multipart/form-data" v-on:keydown.enter.prevent>
    <label for="name">Name</label>
    <input type="text" name="name">

    <label>Summary</label>
    <textarea 
      name="summary" 
      rows="5" 
      placeholder="Course summary in 200-250 characters"
      minlength="200"
      maxlength="250"
    />

    <label>Description</label>
    <textarea 
      name="description" 
      rows="10" 
      placeholder="Detailed description in 800-1000 characters."
      minlength="800"
      maxlength="1000"
    />
    <input type="number" name="offerYear" placeholder="Year">   
    <input type="number" name="offerSem" placeholder="Semester">  

    <label for="topics" style="display: block">Topics</label> 
    <v-select multiple taggable :options="topics" v-model="topics" />
    <input type="hidden" name="topics" v-model="topicsString">

    <label for="instructors">Instructors</label> 
    
    <UserInput :selected="instructors"/>
    <input type="hidden" name="instructors" v-model="instructorStr">

    <label for="coverImage">Cover Image</label>
     <input type="file" name="coverImage" accept="image/png, image/jpeg">

    <label for="handout">Handout:</label>
    <input type="file" name="handout" accept="image/png, image/jpeg">

    <button class="primary">Add Course</button>
</form>
</template>

<script>
import vSelect from 'vue-select';
import UserInput from '../../../components/Input/User';

export default {
  components: {
    vSelect,
    UserInput
  },
  computed: {
    topicsString: function() {
      return this.topics.join('\n');
    },
    instructorStr: function() {
      return this.instructors.map(x=>x.email).join(',');
    }
  },
  data() {
    return {
      topics: [ ],
      instructors: []
    }
  }
}
</script>

<style lang="scss" scoped>
label {
  display: block;
  margin: 10px 0 ;
}
</style>
