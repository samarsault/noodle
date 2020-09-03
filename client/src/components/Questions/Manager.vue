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
        <button
          style="height: fit-content;"
          class="secondary icon-button"
          @click="questionTypeSelect({ name: 'NoBody' })"
          v-if="showAdd"
        >
          <Plus decorative /><span class="icon-left">Add Question Group</span>
        </button>
      </div>
      <div v-if="questions && questions.length > 0">
        <div
          class="manager-question"
          :key="index"
          v-for="(question, index) in questions"
        >
          <div class="manager-question-container">
            <div v-html="question.question" />
            <div>
              <button
                @click="newGroupQuestion(question._id)"
                class="small secondary"
                v-if="question.type === 'NoBody'"
              >
                <Plus />
              </button>
              <button class="small outline" @click="editQuestion(question)">
                <Edit />
              </button>
              <button class="small error" @click="deleteQuestion(question)">
                <Bin />
              </button>
            </div>
          </div>
          <div v-if="question.type === 'NoBody'" class="manager-question-group">
            <div
              v-for="(questionPart, partIndex) in question.questions"
              :key="partIndex"
            >
              <div class="manager-question-container">
                <div v-html="questionPart.question" />
                <div>
                  <button
                    class="small outline"
                    @click="editQuestion(questionPart)"
                  >
                    <Edit />
                  </button>
                  <button
                    class="small error"
                    @click="deleteQuestion(questionPart)"
                  >
                    <Bin />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    group: String,
    onDelete: Function,
    showAdd: Boolean,
  },
  data() {
    return {
      showEditor: false,
      showSelect: false,
      preset: {},
      activeParent: null,
      questionTypes: [
        { name: "MCQ", description: "Multiple choice question" },
        { name: "Numeric", description: "Numeric data type answer" },
      ],
    };
  },
  async mounted() {
    this.preset.course = this.course_id;
  },
  methods: {
    newGroupQuestion(parent_id) {
      this.activeParent = parent_id;
      this.showSelect = true;
    },
    questionTypeSelect(item) {
      this.preset = {
        course: this.course_id,
        type: item.name,
        group: this.group,
        parent: this.activeParent,
      };
      this.activeParent = null;
      this.showEditor = true;
    },
    editQuestion(question) {
      this.preset = question;
      this.showEditor = true;
    },
    editQuestionSuccessful(question) {
      if (question.parent) {
        const parentIndex = this.questions.findIndex(
          (q) => q._id === question.parent
        );
        const parent = this.questions[parentIndex];
        const partIndex = parent.questions.findIndex(
          (x) => x._id === question._id
        );
        if (partIndex !== -1) {
          // update
          this.$set(parent.questions, partIndex, question);
        } else {
          // new item
          parent.questions = [...parent.questions, question];
        }
      } else {
        const index = this.questions.findIndex((q) => q._id === question._id);
        if (index !== -1) {
          // update
          this.$set(this.questions, index, question);
        } else {
          // new item
          this.questions = [...this.questions, question];
        }
      }
      this.showEditor = false;
    },
    removeQuestionFromView(question) {
      if (question.parent) {
        const index = this.questions.findIndex(
          (x) => x._id === question.parent
        );
        const partIndex = this.questions[index].questions.findIndex(
          (x) => x._id === question._id
        );
        this.questions[index].questions.splice(partIndex, 1);
      } else {
        const index = this.questions.findIndex((x) => x._id === question._id);
        this.questions.splice(index, 1);
      }
    },
    deleteQuestion(question) {
      if (this.onDelete) {
        if (this.onDelete(question)) {
          this.removeQuestionFromView(question);
        } else {
          alert("Error removing item.");
        }
      } else {
        axios
          .delete(`/admin/courses/${this.course_id}/questions/${question._id}`)
          .then(({ data }) => {
            if (data.ok) {
              alert("Item deleted");
              this.removeQuestionFromView(question);
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
    padding: 6px;
  }
}
.manager-question {
  margin-bottom: 10px;
  padding: 5px 15px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  &-container {
    display: flex;
    justify-content: space-between;
  }
  &-group {
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    text-indent: 1.6em;
    > div:not(:last-child) {
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
<style lang="scss">
.manager-question {
  img {
    max-width: 200px;
  }
}
</style>
