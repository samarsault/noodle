<template lang="pug">
section#team
  h1 Team
  p With A Technical Department this big, come big responsibilities, which our team is used to handle.
  .team-cards
    .team-3
      div
        img(src='./assets/team/abdullah.jpg', alt="Abdullah Mukaddam")
        h3 Abdullah Mukaddam
        p President
        div.social
          a(href='#')
            Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn

      div
        img(src='./assets/team/PranavP.jpg', alt='Pranav Pateriya')
        h3 Pranav Pateriya
        p Vice President
        div.social
          a(href='mailto:f20180686@goa.bits-pilani.ac.in')
           Mail
          a(href='https://www.facebook.com/pranav.pateriya.3')
            FB
          a(href='https://www.linkedin.com/in/pranav-pateriya-8455b1158')
            LinkedIn

      div
        img(src='./assets/team/saubhagya.jpg', alt='Saubhagya Shukla')
        h3 Saubhagya Shukla
        p Treasurer
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn

      div
        img(src='./assets/team/Bhavyam.jpeg', alt='Bhavyam Kamal')
        h3 Bhavyam Kamal
        p PR Head
        div.social
          a(href='mailto:f20180112@goa.bits-pilani.ac.in')
           Mail
          a(href='https://www.facebook.com/bhavyam.kamal.5')
            FB
          a(href='https://www.linkedin.com/in/bhavyam-k-b8b782166/')
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
        img(src='./assets/team/somesh.jpg', alt='Somesh Singh')
        h3 Somesh Singh
        p Events & Initiatives Head
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn

      div
        img(src='./assets/team/rishikesh.jpg', alt='Rishikesh Trivedi')
        h3 Rishikesh Trivedi
        p Projects & Incubation Head
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn
      div
        img(src='./assets/team/anshuman.jpg', alt='Anshuman Singh')
        h3 Anshuman Singh
        p Courses Head
        div.social
          a(href='mailto:f20180512@goa.bits-pilani.ac.in')
           Mail
          a(href='https://www.facebook.com/notAnshuman')
            FB
          a(href='https://www.linkedin.com/in/ACoAACu6Zz4BZvAuinneEBHAEc7zSMmE7U3HheQ/')
            LinkedIn

  div.img-wrapper
    h2 2019-20
    img(src="/images/team/2019.jpg")
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
