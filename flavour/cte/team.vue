<template lang="pug">
section#team
  h1 Team
  p With A Technical Department this big, come big responsibilities, which our team is used to handle.
  .team-cards
    .team-3
      div
        img(src='./assets/team/suhrudh.jpg', alt="Suhrudh Sarathy")
        h3 Suhrudh Sarathy
        p President
        div.social
          a(href='mailto:f20190390@goa.bits-pilani.ac.in')
            Mail
          a(href='#')
            FB
          a(href='https://www.linkedin.com/in/suhrudh-sarathy-a55a851a0/')
            LinkedIn

      div
        img(src='./assets/team/manas.jpg', alt='Manas Mhasakar')
        h3 Manas Mhasakar
        p Vice President
        div.social
          a(href='mailto:f20190130@goa.bits-pilani.ac.in')
           Mail
          a(href='#')
            FB
          a(href='https://www.linkedin.com/in/manas-mhasakar-abb123176/')
            LinkedIn

      div
        img(src='./assets/team/shwetabh.jpg', alt='Shwetabh Pandey')
        h3 Shwetabh Pandey
        p Treasurer
        div.social
          a(href='mailto:f20190300@goa.bits-pilani.ac.in')
           Mail
          a(href='#')
            FB
          a(href='https://www.linkedin.com/in/shwetabh-pandey-183803108/')
            LinkedIn

      div
        img(src='./assets/team/milind.jpeg', alt='Milind Gupta')
        h3 Milind Gupta
        p PR Head
        div.social
          a(href='mailto:f20190523@goa.bits-pilani.ac.in')
           Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn

    .team-3
      div
        img(src='./assets/team/samarsault.jpg', alt='Samarjeet Singh')
        h3 Samarjeet Singh
        p Development Head
        div.social
          a(href='mailto:f20180414@goa.bits-pilani.ac.in')
           Mail
          a(href='https://www.facebook.com/samarjeet27')
            FB
          a(href='https://linkedin.com/in/samarsault')
            LinkedIn

      div
        img(src='./assets/team/shuja.jpg', alt='Shuja Jameel Siddiqui')
        h3 Shuja Jameel Siddiqui
        p Events & Initiatives Head
        div.social
          a(href='mailto:f20190948@goa.bits-pilani.ac.in')
           Mail
          a(href='#')
            FB
          a(href='https://www.linkedin.com/in/shuja-jameel-siddiqui/')
            LinkedIn

      div
        img(src='./assets/team/soham.jpg', alt='Soham Yadav')
        h3 Soham Yadav
        p Projects & Research Head
        div.social
          a(href='mailto:f20190139@goa.bits-pilani.ac.in')
           Mail
          a(href='#')
            FB
          a(href='https://www.linkedin.com/in/soham-yadav/')
            LinkedIn
      div
        img(src='./assets/team/tanmaiy.jpg', alt='Tanmaiy Sethia Jain')
        h3 Tanmaiy Sethia Jain
        p Courses Head
        div.social
          a(href='mailto:f20190117@goa.bits-pilani.ac.in')
           Mail
          a(href='#')
            FB
          a(href='https://www.linkedin.com/in/tanmaiysethia0097/')
            LinkedIn

  div.img-wrapper
    h2 2021-22
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
