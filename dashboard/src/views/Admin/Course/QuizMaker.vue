<template>
	<div class="container">
		<!-- <QuizQuestion :question="formula" :options="option" /> -->
		<div v-if="quiz">
			<h3>{{ quiz.name }}</h3>
			<div style="display: flex;">
				<button class="outline icon-button" @click="$emit('close')">
					<Back /><span class="icon-left">Back</span>
				</button>
				<button class="primary icon-button" @click="showEditor = true">
					<Plus decorative /><span class="icon-left">Add Question</span>
				</button>
			</div>
			<table v-if="quiz.questions.length > 0">
				<thead>
					<tr>
						<th>Question</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr v-bind:key="index" v-for="(question, index) in quiz.questions">
						<td>{{ question.question }}</td>
						<td>
							<button class="small outline" @click="editQuestion(index)">
								<Edit />
							</button>
							<button
								class="small error"
								@click="deleteQuestion(question, index)"
							>
								<Bin />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<QuestionEditor
			:course_id="course_id"
			:quizId="quizId"
			:preset="preset"
			v-if="showEditor"
			v-on:ok="editQuestionSuccessful"
			v-on:close="showEditor = false"
		/>
	</div>
</template>

<script>
import axios from 'axios';
import Plus from 'vue-material-design-icons/Plus';
import Edit from 'vue-material-design-icons/Pencil';
import Bin from 'vue-material-design-icons/TrashCan';
import Back from 'vue-material-design-icons/ArrowLeft';
import QuestionEditor from '../../../components/Dialogs/QuestionEditor';

export default {
	props: ['course_id', 'quizId'],
	components: {
		QuestionEditor,
		Plus,
		Edit,
		Bin,
		Back,
	},
	data() {
		return {
			showEditor: false,
			quiz: null,
			course: '',
			presetIndex: -1,
			preset: null,
			// quizId: ''
		};
	},
	mounted() {
		this.getQuizData();
	},
	methods: {
		getQuizData() {
			axios
				.get(`/api/courses/${this.course_id}/quiz/${this.quizId}`)
				.then(({ data }) => {
					this.quiz = data;
				});
		},
		editQuestion(index) {
			this.presetIndex = index;
			this.preset = this.quiz.questions[index];
			this.showEditor = true;
		},
		editQuestionSuccessful(question) {
			if (this.presetIndex >= 0 && this.preset) {
				// its an update
				this.quiz.questions[this.presetIndex] = question;

				// reset
				this.presetIndex = -1;
				this.preset = null;
			} else {
				this.quiz.questions.push(question);
			}
			this.showEditor = false;
		},
		deleteQuestion(question, index) {
			axios
				.post(`/admin/courses/${this.course_id}/quiz/update`, {
					type: 'delete',
					quiz_id: this.quizId,
					question_id: question._id,
				})
				.then(({ data }) => {
					if (data.success) {
						alert('Item deleted');
						this.quiz.questions.splice(index, 1);
					} else throw 'err';
				})
				.catch((err) => {
					alert(`Error, couldn't delete.`);
				});
		},
	},
};
</script>

<style lang="scss" scoped>
input[type='file'] {
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
