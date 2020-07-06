<template>
  <Modal title="Question" :size="640" @close="$emit('close')">
    <template slot="body">
      <div class="separated-elements">
        <span>{{ preview ? "Preview Mode" : "Edit Mode" }}</span>
        <a @click="preview = !preview">{{ !preview ? "Preview" : "Edit" }}</a>
      </div>
      <div v-if="preview">
        <!--<QuizQuestion :question="question" :options="options" />-->
        <QuestionView :question="question" />
      </div>
      <div v-else>
        <label>Question</label>
        <Editor v-model="question.question" :edit="true" />
        <MCQEdit v-if="question.type == 'MCQ'" v-model="question" />
        <NumericEdit v-if="question.type == 'Numeric'" v-model="question" />
      </div>
    </template>
    <template slot="footer">
      <button class="primary" @click="save">Save</button>
      <button class="secondary" @click="$emit('close')">Discard</button>
    </template>
  </Modal>
</template>

<script>
import axios from "axios";
import Modal from "./Modal";
import Editor from "../Editor.vue";
import QuestionView from "../Questions/View.vue";
import MCQEdit from "../Questions/MCQ/Edit";
import NumericEdit from "../Questions/Numeric/Edit";

export default {
  name: "QuestionEditor",
  components: {
    Modal,
    Editor,
    MCQEdit,
    NumericEdit,
    QuestionView,
  },
  props: ["preset"],
  data() {
    return {
      preview: false,
      question: {},
    };
  },
  mounted() {
    this.question = this.preset;
  },
  methods: {
    save() {
      const question = this.question;
      const baseURL = `/admin/courses/${question.course}/questions`;
      const Q = { ...question };
      // Q.question = JSON.stringify(Q.question);
      let req;
      if (Q._id) {
        // Question already exists in database
        // We need only need to update it
        req = axios.put(`${baseURL}/${Q._id}`, Q);
      } else {
        req = axios.post(`${baseURL}`, Q);
      }
      req.then(({ status }) => {
        if (status !== 200) {
          alert("Error saving question");
        }
      });

      this.$emit("ok", question);
    },
  },
};
</script>

<style lang="scss" scoped>
textarea,
input[type="text"] {
  border: 1px solid #ddd;
  width: 100%;
}
select {
  display: block;
  width: 100%;
  margin-top: 10px;
}
.separated-elements {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.icon-button {
  border: 1px solid #ddd;
  padding: 7px 15px;
  margin: 0;
}
</style>
