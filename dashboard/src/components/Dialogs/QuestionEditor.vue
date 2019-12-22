<template>
    <Modal title="Question" :size="640" @close="$emit('close')">
				<template slot="body">
					<div class="separated-elements" style="padding-bottom:10px;margin-bottom:10px;border-bottom: 1px solid #ccc">
						<span>{{ preview ? 'Preview Mode' : 'Edit Mode' }}</span>
						<a @click="preview = !preview">{{ !preview ? 'Preview' : 'Edit' }}</a>
					</div>
					<div v-if="preview">
						<QuizQuestion :question="question" :options="options" />
					</div>
					<div v-else>
						<label>Question</label>
						<textarea v-model="question" cols="30" rows="3"></textarea>
						<!-- <label>Figure (if applicable)</label>
						<input type="file" name="res"> -->
						<div class="separated-elements">
							<label>Options</label>
							<button class="icon-button"  @click="addOption">
								<Plus decorative/>
								<span class="icon-left">Add</span>
							</button>
						</div>

						<ol type="A">
							<li v-bind:key="index" v-for="(option, index) in options">
								<div class="separated-elements">
								<input style="display: inline-block" type="text" v-model="options[index]" />
								<button class="icon-button" style="margin-left:10px" @click="removeOption(index)">
									<Bin style="color:rgb(221, 39, 39)"/>
								</button>
								</div>
							</li>
						</ol>

						<div v-if="options.length > 0" style="margin-top:10px">
							<label>Correct Option</label>
							<select v-model="answerIndex">
								<option v-bind:key="index" v-for="(option, index) in options" :value="index">
									{{ String.fromCharCode('A'.charCodeAt(0) + index)}}
								</option>
							</select>
						</div>
					</div>
				</template>
        <template slot="footer">
            <button class="primary" @click="save">Save</button>
            <button class="secondary" @click="$emit('close')">Discard</button>
        </template>
    </Modal>
</template>

<script>
import Modal from './Modal';
import axios from 'axios';
import QuizQuestion from '../QuizQuestion'
import Plus from 'vue-material-design-icons/PlusCircleOutline'
import Bin from 'vue-material-design-icons/TrashCan'

export default {
    name: "QuestionEditor",
    components: {
				Modal,
				QuizQuestion,
				Plus,
				Bin
    },
    props: {
				quizId: String,
				course_id: String,
				preset: Object
		},
		data() {
			return {
				preview: false,
				question: '',
				options: [],
				answerIndex: -1
			}
		},
		mounted() {
			if (this.preset) {
				this.question = this.preset.question;
				this.options = this.preset.options;
				this.answerIndex = this.preset.answer;
			}
		},
		methods: {
			addOption() {
				this.options.push(`Option ${this.options.length + 1}`)
			},
			removeOption(index) {
				this.options.splice(index, 1)
			},
			save() {
				const updateObject = {
					quiz_id: this.quizId,
					question_id: this.preset && this.preset._id,
					type: 'update',
					data: {
						question: this.question,
						options: this.options,
						answer: this.answerIndex
					}
				}

				if (!this.preset) {
					// create new
					updateObject.type = 'add'
				}
				axios.post(`/admin/courses/${this.course_id}/quiz/update`, updateObject)
					.then(({ data }) => {
						if (data.success) {
							this.$emit('ok', updateObject.data)
						}
						else {
							throw 'err';
						}
					})
					.catch(err => {
							alert(`Error, couldn't perform ${updateObject.type} operation.`)
					})
			}
		}
}
</script>

<style lang="scss" scoped>
@import '../../../../styles/include/_vars.scss';
.tab-switch {
	color: $green;
	background-color: rgba(#eee, .5);
	padding: 10px 25px;
	border-radius: 10px;
}
textarea, input[type="text"] {
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
}
.icon-button {
	border: 1px solid #ddd;
	padding: 7px 15px;
	margin: 0;
}
ol {
	margin: 0;
}
</style>
