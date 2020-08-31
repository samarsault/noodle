<template>
  <div v-if="registered.length > 0">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>ID</th>
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
    <button class="primary icon-button" @click="downloadCSV">
      <DownloadIcon decorative /><span class="icon-left">Download as CSV</span>
    </button>
  </div>
  <div v-else>
    <h4>No student registered.</h4>
  </div>
</template>

<script>
import axios from "axios";
import DownloadIcon from "vue-material-design-icons/FileDownload";
export default {
  data() {
    return {
      registered: [],
      course_id: this.$route.params.course_id,
    };
  },
  props: ["onLoad"],
  components: {
    DownloadIcon,
  },
  mounted() {
    this.onLoad(null);
    axios.get(`/admin/courses/${this.course_id}/students`).then(({ data }) => {
      this.registered = data;
    });
  },
  methods: {
    async downloadCSV() {
      const { data } = await axios.get(
        `/admin/courses/${this.course_id}/students/download`
      );
      var fileURL = window.URL.createObjectURL(new Blob([data]));
      var fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", "registrations.csv");
      document.body.appendChild(fileLink);

      fileLink.click();
      document.body.removeChild(fileLink);
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  max-height: 250px;
  overflow-y: scroll;
}
button {
  margin-top: 20px;
}
</style>
