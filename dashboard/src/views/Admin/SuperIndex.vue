<template>
  <div>
    <Tabs title="Super Admin">

      <Tab name="Add Course">
        <div class="form-container">
          <AddCourse /> 
        </div>
      </Tab>

      <Tab name="Access Management">
        <Access /> 
      </Tab>

			<Tab name="Registrations">
        <Registrations /> 
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import Tabs from '../../components/Tabs';
import Tab from '../../components/Tab';
import { mutations } from '../../utils/store';

// Super Admin Tabs
import AddCourse from './Super/AddCourse.vue';
import Access from './Super/Access.vue';
import Registrations from './Super/Registrations.vue';

export default {
  components: {
    Tabs,
    Tab,
    AddCourse,
		Access,
		Registrations
	},
	methods: {
		...mutations
	},
	mounted() {
		if (this.$route.query.success) {
			if (this.$route.query.success === '1') 
				this.setAlert('success', 'Operation succesful');
			else if (this.$route.query.success === '0')
				this.setAlert('error', 'Operation was not successful')
		} 
	}
}
</script>
