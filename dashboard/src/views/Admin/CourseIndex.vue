<template>
	<div class="container">
		<h3>Course Administration</h3>
		<Tabs>
			<Tab name="Registered Students">
          <Students :course_id="course_id" />
      </Tab>
      <Tab name="Resources">
        <div class="form-container">
          <Resources :course_id="course_id" />
        </div>
      </Tab>
      <Tab name="Announcement">
        <div class="form-container">
          <Broadcast :course_id="course_id" />
        </div>
      </Tab>
      <Tab name="Class Schedule">

      </Tab>
    </Tabs>
  </div>
</template>

<script>
import axios from 'axios'
import Tabs from '../../components/Tabs';
import Tab from '../../components/Tab';

// Import Tab Components
import Students from './Course/Students.vue';
import Resources from './Course/Resources.vue';
import Broadcast from './Course/Broadcast.vue';

export default {
  components: {
    Tabs,
    Tab,
    Students,
    Resources,
    Broadcast
  },
  data() {
    return {
     course_id: this.$route.params.id,
   }
 }
}
</script>

