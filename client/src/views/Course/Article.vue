<template>
  <div>
    <div v-if="isAdmin">
      <button class="primary" v-if="editable" @click="save">Save</button>
      <button class="secondary" @click="toggleEdit">
        {{ editable ? "Discard" : "Edit" }}
      </button>
    </div>
    <Editor v-model="page" :edit="editable" :course_id="course_id" />
  </div>
</template>

<script>
import Editor from "@/components/Editor.vue";
import axios from "axios";

// Syntax Highlighting

export default {
  components: {
    Editor,
  },
  data() {
    return {
      course_id: this.$route.params.course_id,
      page_id: this.$route.params.page_id,
      page: null,
      editable: false,
    };
  },
  props: {
    isAdmin: Boolean,
  },
  async mounted() {
    if (this.page_id) {
      const page = (
        await axios.get(`/api/courses/${this.course_id}/pages/${this.page_id}`)
      ).data;
      this.page = page.doc;
    }
  },
  methods: {
    async save() {
      const docData = this.page;
      const resp = await axios.put(
        `/admin/courses/${this.course_id}/page/${this.page_id}`,
        {
          type: "Article",
          doc: docData,
        }
      );
      if (!resp.data.success) alert("Can't save");
    },
    toggleEdit() {
      this.editable = !this.editable;
    },
  },
};
</script>

<style lang="scss"></style>
