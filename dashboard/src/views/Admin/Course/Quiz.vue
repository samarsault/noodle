<template>
	<QuizMaker 
			v-if="showMaker"
			:course_id="course_id"
			:quizId="selectedQuizId"
			@close="showMaker = false"
	/>
	<div v-else class="container">
		
		<h3>Create New</h3>
		<input type="text" placeholder="Name" v-model="qname">
		<button class="secondary" @click="initQuiz">Make</button>
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(quiz, index) in allQuizes">
					<td>{{ quiz.name }}</td>
					<td>
						<button class="small outline" @click="editQuiz(quiz._id)"><Edit /></button>
						<button class="small error" @click="deleteQuiz(quiz, index)"><Bin /></button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios from 'axios'
import Plus from 'vue-material-design-icons/Plus'
import Edit from 'vue-material-design-icons/Pencil'
import Bin from 'vue-material-design-icons/TrashCan'
import QuizMaker from './QuizMaker'

export default {
  props: [ 'course_id' ],
  components: {
		Edit,
		Bin,
		QuizMaker
  },
	mounted() {
		this.getQuizes()
	},
	data() {
		return {
			allQuizes: [],
			qname: '',
			selectedQuizId: null,
			showMaker: false
		}
	},
	methods: {
		initQuiz() {
			const name = this.qname;
			axios.post(`/admin/courses/${this.course_id}/quiz/init`, {
				name
			})
			.then(({ data }) => {
				if (data.success) {
					this.allQuizes.push(data.quiz)
				}
			})
		},
		editQuiz(id) {
			this.selectedQuizId = id;
			this.showMaker = true;
		},
		deleteQuiz(quiz, index) {
			axios.post(`/admin/courses/${this.course_id}/quiz/destroy`, {
				_id: quiz._id,
				name: quiz.name
			})
				.then( ({ data }) => {
					if (data.success) {
						alert('Deleted successfully')
						this.allQuizes.splice(index, 1);
					}
				})
		},
		getQuizes() {
			axios.get(`/api/courses/${this.course_id}/quiz`)
				.then( ({ data }) => {
					this.allQuizes = data;	
				})
		}
	}
 
}
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
