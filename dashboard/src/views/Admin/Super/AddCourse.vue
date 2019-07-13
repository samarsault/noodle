<template>
<form method="post" action="/admin/super/addCourse" enctype="multipart/form-data">
     <!-- <label for="name">Name:</label> -->
     <input type="text" name="name" placeholder="Name">

     <!-- <label for="description">Description:</label> -->
     <textarea name="description" cols="30" rows="10" placeholder="Description"></textarea>
     <input type="number" name="offerYear" placeholder="Year">   
     <input type="number" name="offerSem" placeholder="Semester">  

     <InputList heading="Topics" :list="topics" />
     <input type="hidden" name="topics" v-model="topicsString">

     <label for="coverImage">Course cover image:</label>
     <input type="file" name="coverImage" accept="image/png, image/jpeg">

     <label for="handout">Course Handout:</label>
     <input type="file" name="handout" accept="image/png, image/jpeg">

     <button class="primary">Add Course</button>
</form>
</template>

<script>
import vSelect from 'vue-select';
import InputList from '../../../components/InputList.vue';

export default {
  components: {
    vSelect,
    InputList
  },
  computed: {
    topicsString: function() {
      return this.topics.join('\n');
    }
  },
  data() {
    return {
      topics: [ ]
    }
  },
  methods: {
    postForm() {
      
    }
  }
}
</script>
