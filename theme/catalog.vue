<template lang="pug">
div.container
  h1 Courses 

  .courses
    .course-card(v-for="course in courses")
      .card
        .card-header
          img(:src="course.coverImage", alt="Thumbnail")
          h2 {{course.name}}
        .card-body
          p {{course.subtitle}}
        .card-footer
          a.regBtn(:href="'/courses/' + course._id + '/view/'")
            button.secondary View
</template>

<script>
export default {
  props: [ 'courses' ]
}
</script>

<style lang="scss">
.catalog {
	position: relative;
	button {
		width: 120px;
		margin-bottom: 15px;
  }
  #heading {
		color: #fff;
		margin-top: 0;
    padding-top: 1.4em;
    margin-bottom: .5em;
	}
	margin-bottom: 50px;
}
.courses {
	display: flex;
	flex-wrap: wrap;
	@media screen and (max-width: 720px) {
		justify-content: center;
	}
	.course-card {
		flex-basis: 33.33%;
		padding: 10px;
		@media screen and (max-width: 1220px) and (min-width: 720px){
			flex-basis: 50%;	
		}
		@media screen and (max-width: 720px) {
			flex-basis: 80%;	
		}
		@media screen and (max-width: 540px){
			flex-basis: 100%;	
		}
		.card {
			width: 100%;
			margin: 0;
		}
	}

  // .card {
  //   transition: transform .3s ease;
  //   &:hover {
  //     transform: scale(1.02);
  //   }
  // }
}

.course-hero {
	display: flex;
	@media screen and (max-width: 920px) {
		flex-direction: column;
	}
	img {
		max-width: 400px;
	}
	.controls {
		padding: 0;
		button {
			margin-right: 10px;
			&:first-child {
				margin-left: 0;
			}
		}
	}
	.info {
		@media screen and (max-width: 920px) {
			margin: 20px 0;
		}
		margin: 0 40px;

		p {
			margin-top: 0;
		}
	}
}

.card {
	background-color: #fff;
	box-shadow: 0 0 2px 0 rgba(0,0,0,0.35);
	width: 375px;
	margin: 20px;
  
	.card-header {
		text-align: center;
		img {
			width: 100%;
			border-bottom: 8px solid $green;
		}
	}
	.card-body, .card-header h2 {
		padding: 0 30px;
	}
	.card-footer {
		padding-bottom: 15px;
		text-align: center;
	}
}

.course-info {
	margin: 20px 0;
}

.course-info .container {
	display: flex;

	@media screen and (max-width: 960px){
		flex-direction: column;		
		.card {
			width: 100%;
			margin-left: 0;
		}
	}

  .card {
		padding: 15px 30px;
		@media screen and (max-width: 1200px) and (min-width: 960px){
			width: 280px;	
		}
	}

	#description {
		width: 100%;
		margin-left: 0;
		height: 110%;
		p {
			white-space: pre-line;
		}
	}

  h3 {
    margin: .5em 0;
	}
	ul {
		padding-inline-start: 35px;
		li {
			padding: 5px 0;
		}
	}
}
</style>
