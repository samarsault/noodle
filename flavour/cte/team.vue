<template lang="pug">
section#team
  h1 Team
  p With A Technical Department this big, come big responsibilities, which our team is used to handle.
  .team-cards
    .team-3
      div
        img(src='./assets/team/Gautam.png', alt="Gautam Sajith")
        h3 Gautam Sajith
        p President
        div.social
          a(href='#')
            Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn

      div
        img(src='./assets/team/Anushka.jpg', alt='Anushka Sethi')
        h3 Anushka Sethi
        p Vice President
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn

      div
        img(src='./assets/team/Soham.jpeg', alt='Soham Shinde')
        h3 Soham Shinde
        p Events and Initiatives Head
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn

      div
        img(src='./assets/team/Aditya.jpg', alt='Aditya Shripad')
        h3 Aditya Shripad
        p PR Head
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn

    .team-3
      div
        img(src='./assets/team/Krish.jpg', alt='Krish Chaplot')
        h3 Krish Chaplot
        p Courses Head
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn

      div
        img(src='./assets/team/Amish.jpg', alt='Amish Sharma')
        h3 Amish Sharma
        p Finance Head
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn


  div.img-wrapper
    h2 2020-21
    img(src="./assets/team/2020.jpg")
</template>
<style lang="scss">
section#team {
	padding: 30px 0;
	text-align: center;
	background-size: cover;
  >h1 {
    margin-bottom: 0;
  }
	>p {
		max-width: 600px;
    margin: 15px auto;
    @media screen and (max-width: 640px) {
      width: 100%;
      padding: 0 20px;
    }
	}

	.img-wrapper {
		position: relative;
		img {
			max-width: 960px;
			width: 90%;
			margin: 50px;
			@media screen and (max-width: 960px) {
				width: 90%;
				margin: auto;
			}
		}
		h2 {
			position: absolute;
			top: 50px;
			left: 30px;
			@media screen and (max-width: 960px) {
				position: relative;
				top: 0;
				left: 0;
			}
		}
	}
}

.team-cards {
	img {
		width: 250px;
	}
	> div {
		display: flex;
		justify-content: center;
		> div {
			padding: 10px;
			margin: 10px;
		}
	}
	.team-3 {
		flex-wrap: wrap;
	}
	.team-2 {
		@media screen and (max-width: 480px){
			flex-wrap: wrap;	
		}
	}
	h3 {
		margin-bottom: 0;
	}
	p {
		margin: 1em 0;
	}
}

.social {
	a {
		padding: 5px;
		color: inherit;
	}
	i {
		font-size: 24px;
	}
}
</style>
<script>
import FB from "vue-material-design-icons/FacebookBox";
import Insta from "vue-material-design-icons/Instagram";
import LinkedIn from "vue-material-design-icons/LinkedinBox";
import Mail from "vue-material-design-icons/Email";

export default {
  components: { FB, Insta, LinkedIn, Mail }
}
</script>
