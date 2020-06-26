<template>
  <div>
    <!-- <QuizQuestion :question="formula" :options="option" /> -->
    <div>
      <div style="display: flex; align-items: center;">
        <button
          style="height: fit-content;"
          class="primary icon-button"
          @click="showSelect = true"
          v-if="showAdd"
        >
          <Plus decorative /><span class="icon-left">Add New Question</span>
        </button>
      </div>
      <table v-if="questions && questions.length > 0">
        <thead>
          <tr>
            <th>Question</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key="index" v-for="(question, index) in questions">
            <td v-html="question.question" />
            <td>
              <button class="small outline" @click="editQuestion(index)">
                <Edit />
              </button>
              <button class="small error" @click="deleteQuestion(index)">
                <Bin />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <QuestionEditor
      :preset="preset"
      v-if="showEditor"
      v-on:ok="editQuestionSuccessful"
      v-on:close="showEditor = false"
    />
    <SelectItem
      v-if="showSelect"
      :items="questionTypes"
      title="Choose question type"
      @select="questionTypeSelect"
      @close="showSelect = false"
    />
  </div>
</template>

<script>
import axios from "axios";
import Plus from "vue-material-design-icons/Plus";
import Edit from "vue-material-design-icons/Pencil";
import Bin from "vue-material-design-icons/TrashCan";
import QuestionEditor from "@/components/Dialogs/QuestionEditor";
import SelectItem from "@/components/SelectItem.vue";

export default {
  components: {
    QuestionEditor,
    Plus,
    Edit,
    Bin,
    SelectItem,
  },
  props: {
    questions: Array,
    course_id: String,
    onDelete: Function,
    showAdd: Boolean,
  },
  data() {
    return {
      showEditor: false,
      showSelect: false,
      presetIndex: -1,
      preset: {},
      questionTypes: [
        { name: "MCQ", description: "Multiple choice question" },
        { name: "Numeric", description: "Numeric data type answer" },
      ],
    };
  },
  mounted() {
    this.preset.course = this.course_id;
  },
  methods: {
    questionTypeSelect(item) {
      this.preset = {
        course: this.course_id,
        type: item.name,
      };
      this.showEditor = true;
    },
    editQuestion(index) {
      this.presetIndex = index;
      this.preset = this.questions[index];
      // console.log()
      this.showEditor = true;
    },
    editQuestionSuccessful(question) {
      if (this.presetIndex >= 0 && this.preset) {
        // its an update
        this.$set(this.questions, this.presetIndex, question);

        // reset
        this.presetIndex = -1;
        this.preset = null;
      } else {
        this.questions.push(question);
      }
      this.showEditor = false;
    },

    deleteQuestion(index) {
      const question = this.questions[index];
      if (this.onDelete) {
        if (this.onDelete(question)) this.questions.splice(index, 1);
        else alert("Error removing item.");
      } else {
        axios
          .delete(`/admin/courses/${this.course_id}/questions/${question._id}`)
          .then(({ data }) => {
            if (data.ok) {
              alert("Item deleted");
              this.questions.splice(index, 1);
            }
          })
          .catch((err) => {
            alert(`Error, couldn't delete.`);
            throw err;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="file"] {
  padding: 20px 0;
}
button {
  margin-top: 10px;
  margin-bottom: 10px;
  &.small {
    padding: 10px;
  }
}
</style>
