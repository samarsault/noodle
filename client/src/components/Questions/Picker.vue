<template>
  <Modal title="Add Question" @close="$emit('close')" @ok="$emit('ok')">
    <template slot="body">
      <b>Group</b>
      <GroupInput
        style="margin-top: 10px;"
        :course_id="course_id"
        :onChange="getQuestionsForGroup"
      />
      <div style="min-height: 300px; overflow-y: scroll;">
        <div v-for="question in questions" :key="question._id" class="flexy">
          <div v-html="question.question" />
          <a href="#" @click="onSelect(question)">Add</a>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import axios from "axios";
import Modal from "@/components/Dialogs/Modal";
import GroupInput from "@/components/Input/Group";

export default {
  props: {
    course_id: String,
    // onSelect(question)
    onSelect: Function,
    // Filter list of available questions
    filter: Function,
  },
  data() {
    return {
      questions: [],
    };
  },
  components: {
    GroupInput,
    Modal,
  },
  methods: {
    async getQuestionsForGroup(group) {
      const { data } = await axios.get(
        `/api/courses/${this.course_id}/questions`,
        {
          params: {
            group,
          },
        }
      );
      // Filter available questions to hide questions which
      // have already been added
      if (this.filter) {
        this.questions = data.filter(this.filter);
      } else {
        this.questions = data;
      }
    },
  },
};
</script>
