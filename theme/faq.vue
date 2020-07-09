<template lang="pug">
div  
  section#faq
    h1 FAQs
    p Browse through the most frequently asked questions.

  section#qa
    .container
      div(v-for="topic in topics")
        h2 {{topic}}
        ul.questions
          li(v-for="qa in faq[topic]", @click="e => e.currentTarget.classList.toggle('open')")
            p.question {{qa.question}}
            p.answer {{qa.answer}}
</template>

<script>
import faqData from './data/faq.json'

export default {
  data() {
    return {
      topics: Object.keys(faqData),
      faq: faqData
    }
  }
}
</script>

<style lang="scss">

section#faq {
	$radius: 17px;
	background-color: #fff;
	padding-top: 30px;
	padding-bottom: 70px;
	text-align: center;
	position: relative;

	h1 {
		margin:  0;
	}

	&::after {
		content: '';
		background-color: #30C41C;
		display: block;
		border-radius: 100%;
		position: absolute;
		z-index: 1;
		width: $radius*2;
		height: $radius*2;
		bottom: -$radius;
		left: calc(50vw - #{$radius});
		box-shadow: 0 1px 2px 1px rgba(0, 0, 0, .1);
	}
}

section#qa {
	margin: 40px 0;
}

.questions {
	list-style-type: none;
  padding-left: 0;
  li.open {
    .answer {
      max-height: 100%;;
    }
  }
}
.question {
	color: #777;
	transition: color .3s;
	user-select: none;
	@include fluidType(16px, 18px);
	&:hover {
		color: #555;
	}
	margin: .7em 0;
	cursor: pointer;
}

.answer {
	max-height: 0;
	margin: 0;
	overflow: hidden;
}
</style>
