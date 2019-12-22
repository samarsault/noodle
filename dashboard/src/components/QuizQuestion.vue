<template>
		<div>
			<vue-mathjax :formula="question"/>
			<ol type="A">
				<li 
					v-bind:key="index" 
					v-for="(option, index) in validOptions"
				>
						<vue-mathjax :formula="option"/>
				</li>
			</ol>
		</div>
</template>

<script>
import { VueMathjax } from "vue-mathjax"

function addExtScript(url) {
	let extScript = document.createElement('script');
	extScript.setAttribute('src', url)
	document.head.appendChild(extScript)
}

export default {
    name: "QuizQuestion",
    components: {
        VueMathjax
    },
    props: {
        question: String,
        options: Array
		},
		computed: {
			validOptions() {
				// only take values that exist
				return this.options.filter(x => x)
			}
		},
		mounted() {
			// load mathjax if not loaded
			if (!window.MathJax) {
				const mathJax = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML';
				addExtScript(mathJax);
			}
		}
}
</script>

<style lang="scss" scoped>

</style>
