<template>
  <div class="container">
    <h3>Super Admin</h3>
    <Tabs>

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
import axios from 'axios'
import Tabs from '../../components/Tabs';
import Tab from '../../components/Tab';
import event from '../../utils/event';

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
	mounted() {
		if (this.$route.query.success) {
			if (this.$route.query.success === '1')
				event.$emit('alert', 'success', 'Operation successful.')
			else if (this.$route.query.success === '0')
				event.$emit('alert', 'error', 'Operation was not successful.')
		} 
	}
}
</script>
