<template>
  <div>
    <Editor v-model="page" :edit="isEditing" :course_id="course_id" />
    <button class="primary" v-if="isEditing" @click="save">Save</button>
  </div>
</template>

<script>
import Editor from "@/components/Editor.vue";
import axios from "axios";
import { getters } from "@/utils/store";

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
    };
  },
  computed: {
    ...getters,
    isEditing() {
      return this.activePage && this.activePage.isEditing;
    },
  },
  props: {
    isAdmin: Boolean,
    onLoad: Function,
  },
  async mounted() {
    if (this.page_id) {
      const page = (
        await axios.get(`/api/courses/${this.course_id}/pages/${this.page_id}`)
      ).data;
      this.page = page.doc;
      // Tell parent that's its loaded
      this.onLoad({
        _id: page._id,
        parent: page.parent,
        name: page.name,
        type: page.type,
      });
    }
  },
  methods: {
    async save() {
      const docData = this.page;
      const { status } = await axios.put(
        `/admin/courses/${this.course_id}/page/${this.page_id}`,
        {
          type: "Article",
          doc: docData,
        }
      );
      if (status !== 200) alert("Can't save");
      if (this.activePage) this.activePage.isEditing = false;
    },
  },
};
</script>

<style lang="scss"></style>
