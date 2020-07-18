<template lang="pug">
section#team
  h1 Team
  p With A Technical Department this big, come big responsibilities, which our team is used to handle.
  .team-cards
    .team-2
      div
        img(src='/images/team/Chinu.jpg')
        h3 Chinmay Gokhale
        p President
        div.social
          a(href='mailto:f20170906@goa.bits-pilani.ac.in')
            i.fa.fa-envelope
          a(href='https://www.facebook.com/profile.php?id=100008150865985')
            i.fa.fa-facebook-official
          a(href='https://www.linkedin.com/in/chinmay-gokhale-673275160/')
            i.fa.fa-linkedin-square(aria-hidden='true')

      div
        img(src='/images/team/Pranav.jpg')
        h3 Pranav Mahajan
        p Vice President
        div.social
          a(href='mailto:f20170277@goa.bits-pilani.ac.in')
            i.fa.fa-envelope
          a(href='https://www.facebook.com/pranavmahajan25')
            i.fa.fa-facebook-official
          a(href='https://www.linkedin.com/in/pranav-mahajan-b92564159/')
            i.fa.fa-linkedin-square(aria-hidden='true')

    .team-3
      div
        img(src='/images/team/Aditya.jpg')
        h3 Aditya Shrivastav
        p PR Head
        div.social
          a(href='mailto:f20180570@goa.bits-pilani.ac.in')
            i.fa.fa-envelope
          a(href='https://www.facebook.com/aditya.shrivastav.5682')
            i.fa.fa-facebook-official
          a(href='#')
            i.fa.fa-linkedin-square(aria-hidden='true')

      div
        img(src='/images/team/Bhavyam.jpeg')
        h3 Bhavyam Kamal
        p PR Head
        div.social
          a(href='mailto:f20180112@goa.bits-pilani.ac.in')
            i.fa.fa-envelope
          a(href='https://www.facebook.com/bhavyam.kamal.5')
            i.fa.fa-facebook-official
          a(href='https://www.linkedin.com/in/bhavyam-k-b8b782166/')
            i.fa.fa-linkedin-square(aria-hidden='true')

      div
        img(src='/images/team/PranavP.jpg')
        h3 Pranav Pateriya
        p Treasurer
        div.social
          a(href='mailto:f20180686@goa.bits-pilani.ac.in')
            i.fa.fa-envelope
          a(href='https://www.facebook.com/pranav.pateriya.3')
            i.fa.fa-facebook-official
          a(href='https://www.linkedin.com/in/pranav-pateriya-8455b1158')
            i.fa.fa-linkedin-square(aria-hidden='true')
      div
        img(src='/images/team/anshuman.jpg')
        h3 Anshuman Singh
        p Tech Head
        div.social
          a(href='mailto:f20180512@goa.bits-pilani.ac.in')
            i.fa.fa-envelope
          a(href='https://www.facebook.com/notAnshuman')
            i.fa.fa-facebook-official
          a(href='https://www.linkedin.com/in/ACoAACu6Zz4BZvAuinneEBHAEc7zSMmE7U3HheQ/')
            i.fa.fa-linkedin-square(aria-hidden='true')

  div.img-wrapper
    h2 2019-20
    img(src="/images/team/2019.jpg")
</template>
<style lang="scss">
section#team {
	padding: 30px 0;
	text-align: center;
	background-size: cover;
	
	>p {
		max-width: 600px;
		margin: auto;
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
