<template>
  <div>
  <a :href="`/admin/courses/students/${course_id}/download`">
    <button class="primary"><DownloadIcon decorative/> Download as CSV</button>
  </a>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>BITS ID</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="student in registered" v-bind:key="student._id">
        <td>{{ student.name }}</td>
        <td>{{ student.email }}</td>
        <td>{{ student.bits_id }}</td>
        <td>{{ student.phone }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import axios from 'axios';
import DownloadIcon from 'vue-material-design-icons/FileDownload';

export default {
  props: [ 'course_id' ],
  data() {
    return {
      registered: []
    }
  },
  components: {
    DownloadIcon
  },
  mounted() {
    axios.get(`/admin/courses/students/${this.course_id}`)
      .then(({ data }) => {
        this.registered = data;
      })
  }
}
</script>
