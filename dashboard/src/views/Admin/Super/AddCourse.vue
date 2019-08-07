<template>
<form method="post" action="/admin/super/addCourse" enctype="multipart/form-data" v-on:keydown.enter="formEnter">
    <label for="name">Name</label>
    <input type="text" name="name">

    <label>Summary</label>
    <textarea 
      name="summary" 
      rows="7" 
      placeholder="Course summary in 200-250 characters"
      minlength="200"
      maxlength="250"
    />

    <label>Description</label>
    <textarea 
      name="description" 
      rows="12" 
      placeholder="Detailed description in 800-1000 characters."
      minlength="800"
      maxlength="1000"
    />
    <input type="number" name="offerYear" placeholder="Year">   
    <input type="number" name="offerSem" placeholder="Semester">  

    <label for="topics">Topics</label> 
    <v-select multiple taggable :options="topics" v-model="topics" />
    <input type="hidden" name="topics" v-model="topicsString">

    <label for="instructors">Instructors</label> 
    
    <UserInput v-model="instructors"/>
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

const emailExtract = /<(.*)>/;
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
      return this.instructors.map(x => {
        return x.match(emailExtract)[1]
      }).join(',');
    }
	},
	methods: {
		formEnter: function (e) {
			if (e.target.localName !== 'textarea') {
				console.log('Preventing');
				e.preventDefault();
			}
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
