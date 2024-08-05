<template lang="pug">
section#team
  h1 Team
  p With A Technical Department this big, come big responsibilities, which our team is used to handle.
  .team-cards
    .team-3
      div
        img(src='./assets/team/Vrishti_ne.jpg', alt="Vrishti Godhwani")
        h3 Vrishti Godhwani
        p President
        div.social
          a(href='#')
            Mail
          a(href='#')
            FB
          a(href='https://www.linkedin.com/in/vrishti-godhwani/')
            LinkedIn

      div
        img(src='./assets/team/Riteesh.jpg', alt='Riteesh Rath')
        h3 Reetish Rath
        p Vice President and Events Head
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='https://www.linkedin.com/in/reetish-rath-95306626a/')
            LinkedIn

      div
        img(src='./assets/team/Adi.jpg', alt='Aditya Chaudhary')
        h3 Aditya Chaudhary
        p Web Development and Sponsorships Head
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='https://www.linkedin.com/in/aditya-chaudhary-34bb95244/')
            LinkedIn

      div
        img(src='./assets/team/Manas.jpg', alt='Manas Jaiswal')
        h3 Manas Jaiswal
        p PR Head
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='https://www.linkedin.com/in/manas-jaiswal-5a15aa210/')
            LinkedIn

    .team-3
      div
        img(src='./assets/team/Jainam.jpg', alt='Jainam Mehta')
        h3 Jainam Mehta
        p Courses Head
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='https://www.linkedin.com/in/jainam-mehta-b538191b8/')
            LinkedIn

      div
        img(src='./assets/team/Pray.jpg', alt='Pray Raskapoorwala')
        h3 Pray Raskapoorwala
        p Finance Head
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='https://www.linkedin.com/in/pray-raskapoorwala-65a84325b/')
            LinkedIn


  div.img-wrapper
    h2 2023-24
    img(src="./assets/team/Team_23.jpeg")
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
