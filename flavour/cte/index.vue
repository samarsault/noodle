<template lang="pug">
div
  section.hero
    .container
      h1#masthead Fostering Technical Culture
      h4 Since 2012
      p We conduct courses,  workshops, host technical competitions, offer financial assistance to technical clubs and projects and organise academic help sessions
      a(href="/courses")
        button.primary Explore

  section.white
    h2.section-title 
      span What we do
    p.section-desc Center for Technical Education is a technical organisation of BITS Pilani, Goa Campus. Our motive is to enhance the technical culture on campus. We conduct courses and workshops, host technical competitions, offer financial assistance to technical clubs and projects and organize academic help sessions
    .container
      .grid-items
        div 
          h4 Courses
          p Our longest running and most successful venture, courses are a great resource to expand your knowledge. Courses on a very wide array of topics ranging from music theory to robotics are taken by highly skilled and dedicated instructors from BITS Goa who wish to pass on their knowledge and actively participate in the growth of technical culture on campus

        div 
          h4 AAP
          p  A relatively new initiative, the Academic Assistance Programme has been a huge success in helping the students of BITS Goa grasp concepts, cover difficult problems and achieve excellence in academic courses. The initiative empowers students to ask doubts and encounter problems under the guidance of highly motivated student mentors

        div 
          h4 Tech Weekend
          p To promote the technical culture on campus, CTE, in collaboration with other technical clubs on campus, organizes a weekend filled with hackathons and competitions. These events range from fields like finance to aero-space and help students relax while encouraging healthy competition

        div 
          h4 Schooling
          p Breaking boundaries and expectations as we expand beyond the walls of our campus by taking up workshops and educational seminars in nearby schools, providing students with an early insight and piquing their interest in the current scenario of the technical world and its many opportunities 

        div 
          h4 CCE
          p  CTE has extended its reach beyond technical courses as it introduces cultural courses like music and drama to its catalogue. This new initiative has seen wide ranging support and is bound to reach new heights as more and more clubs and departments join the initiative

        div 
          h4 Project Fundings
          p  At CTE, we believe in lending active support to creativity and innovation. CTE funds up to 10 projects with support up to Rs 40,000 to help student teams contribute to the development of technical culture on campus

  section.gray
    h2.section-title
      span Our Team
    p.section-desc With a Technical Department this big, come big responsibilities, which our team is used to handle.
    .centre-flex
      a(href='/team')
        button.primary Meet the Team

  section#facts
    h2 Some Interesting facts about us
    #facts-list
      div 
        h2.num 3000+
        span Students Taught
      div 
        h2.num 40+
        span Projects Funded
      div 
        h2.num 230K
        span Cash prizes rewarded
      div 
        h2.num 110
        span Pizzas Ordered

  section.white
    h2.section-title
      span Why collaborate with us?
    p.section-desc CTE is the premier technical organisation of BITS Goa. We operate with a hard working and motivated team that puts life and soul into any and all initiatives taken up by the organization. We organize many events in collaboration with other organizations and receive both heavy participation and acclaim in such endeavors. We look forward to hearing from you!

  section.gray
    h2.section-title
      span FAQs
    p.section-desc Wanna know how we go around our events? Wanna know how to enroll? Wanna know what else people ask us a lot?
    .centre-flex
      a(href='/faq')
        button.primary Get your answers

</template>
<script>
export default {
  props: ['user']
}
</script>

<style lang="scss" >
// @import '../../styles/include/vars';

section.gray, section.white {
	padding: 50px 0;
}

section.white {
	background-color: #fff;
}

.centre-flex {
	display: flex;
	justify-content: center;
}

.section-title {
	margin-top: .3em ;
	display: flex;
	justify-content: center;
	span:after {
		content: '';
		position: relative;
		display: block;
		border-bottom: 2px solid $green;
		width: 80%;
		left: 10%;
		top: 5px;
	}
}

.section-desc {
	color: $darkGray;
	max-width: 640px;
	margin: auto;
	text-align: center;
	margin-bottom: 20px;
}

.grid-items {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	div {
		flex-basis: 33.33%;
		min-width: 300px;
		padding: 10px;
		p {
			color: $darkGray;
		}
	}
}

.hero {
	h1 {
		margin-bottom: .3em;
	}
	h4 {
		color: #999;
		margin: 0;
	}
}

#facts {
	background-image: url('/images/facts.png');
	background-size: cover;
	background-repeat: no-repeat;

	padding: 60px 0;
	color: #fff;

	h2 { 
		color: #fff;
		text-align: center;
	}
	#facts-list {
		display: flex;
		justify-content: center;
		>div {
			padding: 20px;
			@include fluidType(16px, 18px);
		}
		@media screen and (max-width: 480px){
			flex-wrap: wrap;
		}
	}
}

</style>
