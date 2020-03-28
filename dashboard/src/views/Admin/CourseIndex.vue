<template>
	<div>
		<Tabs title="Course Admin">
			<Tab name="Registered Students">
          <Students :course_id="course_id" />
      </Tab>
      <Tab name="Resources">
        <div class="form-container">
          <Resources :course_id="course_id" />
        </div>
      </Tab>
			<!-- <Tab name="Quiz Maker">
				<Quiz :course_id="course_id"/>
			</Tab> -->
      <Tab name="Announcement">
        <div class="form-container">
          <Broadcast :course_id="course_id" />
        </div>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import Tabs from '../../components/Tabs';
import Tab from '../../components/Tab';
import { mutations } from "../../utils/store";

// Import Tab Components
import Students from './Course/Students.vue';
import Resources from './Course/Resources.vue';
import Broadcast from './Course/Broadcast.vue';
// import Quiz from './Course/Quiz.vue';

export default {
  components: {
    Tabs,
    Tab,
    Students,
    Resources,
		Broadcast,
		// Quiz
	},
	mounted() {
		if (this.$route.query.success) {
			if (this.$route.query.success === '1') 
				this.setAlert('success', 'Operation succesful');
			else if (this.$route.query.success === '0')
				this.setAlert('error', 'Operation was not successful')
		} 
	},
	methods: {
		...mutations
	},
	data() {
		return {
			course_id: this.$route.params.id,
		}
	}
}
</script>

