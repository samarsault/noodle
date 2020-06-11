<template>
	<div>
		<div>
			<label>Correct Answer</label>
			<input type="number" :value="local.answer" @input="update('answer', parseInt($event.target.value))">	
			<label>Allowed Error</label>
			<input type="number" :value="local.error" @input="update('error', parseInt($event.target.value))">	
		</div>
	</div>
</template>

<script>
export default {
    name: "NumericEdit",
		props: ['value'],
		computed: {
			local() {
				if (!this.value) {
					return {
						question: '',
						answer: '',
						error: ''
					}
				}
				return this.value;
			}
		},
		methods: {
			update(key, value) {
				this.$emit('input', { ...this.local, [key]: value })
			}
		}
}
</script>
