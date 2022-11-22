<template lang="pug">
section#team
  h1 Team
  p With A Technical Department this big, come big responsibilities, which our team is used to handle.
  .team-cards
    .team-3
      div
        img(src='./assets/team/anchal.jpeg', alt="Anchal Malani")
        h3 Anchal Malani
        p President
        div.social
          a(href='#')Team
            Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn

      div
        img(src='./assets/team/djfinal-min.jpg', alt='Dhruv Johari')
        h3 Dhruv Johari
        p Vice President
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn

      div
        img(src='./assets/team/ishanfinal-min.jpg', alt='Ishan Gupta')
        h3 Ishan Gupta
        p Treasurer
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn

      div
        img(src='./assets/team/Tushankaa_sitepicfinal-min.jpg', alt='Tushankaa Barai')
        h3 Tushankaa Barai
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
        img(src='./assets/team/darshanfinal.jpg', alt='Darshan Khade')
        h3 Darshan Khade
        p Web Dev & Automation Head
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn

      div
        img(src='./assets/team/yashkhannafinal.jpg', alt='Yash Khanna')
        h3 Yash Khanna
        p Events & Initiatives Head
        div.social
          a(href='#')
           Mail
          a(href='#')
            FB
          a(href='#')
            LinkedIn

      div
        img(src='./assets/team/prathamesh.jpg', alt='Prathamesh Killedar')
        h3 Prathamesh Killedar
        p Courses Head
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
