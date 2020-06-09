<template>
  <div>
    <button class="primary" @click="save">Save</button>
		<!-- <div v-html="page" /> -->
    <Editor v-model="page"/>
  </div>
</template>

<script>
import Editor from '../components/Editor.vue';
import axios from 'axios';

// Syntax Highlighting

export default {
  components: {
    Editor
  },
  data() {
    return {
      course_id: this.$route.params.course_id,
      page_id: this.$route.params.page_id,
      page: null
    }
  },
  async mounted() {
    if (this.page_id) {
			const page = (await axios.get(`/api/courses/${this.course_id}/pages/${this.page_id}`)).data;
			this.page = page.doc;
    }
  },
  methods: {
    async save() {
      const docData = this.page;
      const resp = await axios.post(`/admin/courses/${this.course_id}/page/save`, {
        _id: this.page_id,
        doc: docData
      });
      if (resp.success)
        alert('Success!')
    },
  }
}
</script>

<style lang="scss">

</style>
