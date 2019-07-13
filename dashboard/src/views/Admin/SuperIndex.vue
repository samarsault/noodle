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

    </Tabs>
  </div>
</template>

<script>
import axios from 'axios'
import Tabs from '../../components/Tabs';
import Tab from '../../components/Tab';

// Super Admin Tabs
import AddCourse from './Super/AddCourse.vue';
import Access from './Super/Access.vue';

export default {
  components: {
    Tabs,
    Tab,
    AddCourse,
    Access
  }
}
</script>
