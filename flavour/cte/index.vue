<template lang="pug">
div
  section.hero
    .container
      .grid-item
        div
          h2#masthead Fostering Technical Culture
          h4 Since 2012
          p We conduct courses,  workshops, host technical competitions, offer financial assistance to technical clubs and projects and organise academic help sessions
          router-link(to="/catalog")
            button.primary Find Courses
        img(src="./assets/hero.svg", style="width:100%")

  section.white(style="padding-top: 0")
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#E5F9E2" fill-opacity="1" d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,128C672,117,768,107,864,85.3C960,64,1056,32,1152,48C1248,64,1344,128,1392,160L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
    div(style="background-color:#E5F9E2")
      h2.section-title#first
        span What we do
      p.section-desc Center for Technical Education is a technical organisation of BITS Pilani, Goa Campus. We strive to enhance the technical culture on campus through our multiple initiatives.
      .container
        .grid-item
          div 
            h3 AAP
            p  A relatively new initiative, the Academic Assistance Programme has been a huge success in helping the students of BITS Goa grasp concepts, cover difficult problems and achieve excellence in academic courses. The initiative empowers students to ask doubts and encounter problems under the guidance of highly motivated student mentors
          img(src="./assets/aap.svg")
        .grid-item
          div 
            h3 Courses
            p Our longest running and most successful venture, courses is a great resource to expand your knowledge. Courses on a very wide array of topics ranging from music theory to robotics are taken by highly skilled and dedicated instructors from BITS goa who wish to pass on their knowledge and actively participate in the growth of campus tech culture
          img(src="./assets/courses.svg")
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style="transform:rotate(180deg)">
      <path fill="#E5F9E2" fill-opacity="1" d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,128C672,117,768,107,864,85.3C960,64,1056,32,1152,48C1248,64,1344,128,1392,160L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
    .container
      .grid-item
        div 
          h3 Tech Weekend
          p To promote the technical culture on campus, CTE, in collaboration with other technical clubs on campus, organizes a weekend filled with hackathons and competitions. These events range from fields like finance to aero-space and help students relax while encouraging healthy competition
        img(src="./assets/techweekend.png", style="width:100%")
      .grid-item
        div 
          h3 Project Fundings
          p  At CTE, we believe in lending active support to creativity and innovation. CTE funds up to 10 projects with support up to Rs 40,000 to help student teams contribute to the development of technical culture on campus
        img(src="./assets/funding.svg")
      
      .grid-item
        div
          h3 TechForums
          p There are communities on campus, interest groups, topics, issues, queries which haven’t quite been able to be centralized. We, at CTE, envisioned an online place, one that can answer all these needs. A place with tags, discussions, user-friendly UI, moderators, timed events, and sessions. A one-stop location for all answers.
        img(src="./assets/techforum.svg")

  section.gray(style="position: relative;display:flex")
    .container(style="width:100%")
      img#bpgc(src="./assets/bpgc.png")
      div(style="position: relative;z-index:1")
        h2(style="font-weight:bold;justify-content:flex-start")
          span Why collaborate with us?
        p.section-desc(style="margin:0;text-align:inherit") CTE is the premier technical organisation of BITS Goa. We organize many events in collaboration with other organizations and receive both heavy participation and acclaim in such endeavors. We look forward to hearing from you!
        #facts-list
          div 
            h2.num 3000+
            span Students Taught
          div 
            h2.num 40+
            span Projects Funded
          div 
            h2.num 250K+
            span Cash prizes rewarded
          div 
            h2.num 110+
            span Pizzas Ordered

  section.white
    h2.section-title
      span Our Team
    p.section-desc With a Technical Department this big, come big responsibilities, which our team is used to handle.
    .centre-flex
      a(href='/team')
        button.primary Meet the Team


</template>
<script>
export default {
  props: ['user'],
}
</script>

<style lang="scss" scoped>
// @import '../../styles/include/vars';
section.hero {
  h2#masthead {
    font-weight: bold;
    margin-bottom: 10px;
  }
  background-color: #fff;
  img {
    max-width: 540px;
  }
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' viewBox='0 0 192 192'%3E%3Cpath fill='%23dddddd' fill-opacity='0.22' d='M192 15v2a11 11 0 0 0-11 11c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H145v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11 13 13 0 1 1 .02 26 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43a6.1 6.1 0 0 0-3.03 4.87V143h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 181 164a11 11 0 0 0 11 11v2a13 13 0 0 1-13-13 12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84a6.1 6.1 0 0 0-4.87-3.03H145v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 124 181a11 11 0 0 0-11 11h-2a13 13 0 0 1 13-13c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43a6.1 6.1 0 0 0 3.03-4.87V145h-35.02a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 107 124a11 11 0 0 0-22 0c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H49v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11A13 13 0 0 1 81 192h-2a11 11 0 0 0-11-11c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V145H11.98a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 0 1 0 177v-2a11 11 0 0 0 11-11c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H47v-35.02a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 28 109a13 13 0 1 1 0-26c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43A6.1 6.1 0 0 0 47 84.02V49H11.98a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 11 28 11 11 0 0 0 0 17v-2a13 13 0 0 1 13 13c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84A6.1 6.1 0 0 0 11.98 47H47V11.98a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 68 11 11 11 0 0 0 79 0h2a13 13 0 0 1-13 13 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43A6.1 6.1 0 0 0 49 11.98V47h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 85 68a11 11 0 0 0 22 0c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H143V11.98a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 124 13a13 13 0 0 1-13-13h2a11 11 0 0 0 11 11c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V47h35.02a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 179 28a13 13 0 0 1 13-13zM84.02 143a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 83 124a13 13 0 1 1 26 0c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84a6.1 6.1 0 0 0 4.87 3.03H143v-35.02a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 164 107a11 11 0 0 0 0-22c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V49h-35.02a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 1 1 83 68a12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84A6.1 6.1 0 0 0 84.02 49H49v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 28 85a11 11 0 0 0 0 22c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V143h35.02z'%3E%3C/path%3E%3C/svg%3E");
}
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
  margin-top: .3em;
  &#first {
    margin-top: -2.5em;
    @media screen and (max-width: $burgerToggleWidth){
      margin-top: -.3em;
    }
  }
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
	// color: $darkGray;
	max-width: 640px;
	margin: auto;
	text-align: center;
	margin-bottom: 20px;
}
p {
    color: lighten($black, 30%);
    // font-size: 20px;
    @include fluidType(16px, 18px);
    // font-size: 18px;
}
.grid-item {
	display: flex;
	justify-content: center;
  align-items: center;
  padding: 10px 0;
  @media screen and (max-width: $burgerToggleWidth){
    flex-direction: column-reverse; 
  }
  &:nth-child(even) {
    flex-direction: row-reverse;
    @media screen and (max-width: $burgerToggleWidth){
      flex-direction: column-reverse; 
    }
  }
  h3 {
    font-weight: bold;
    @include fluidType(24px, 28px);
    margin-bottom: 0;
  }
  img {
    min-width: 50%;
  }
  div, img {
    padding: 20px;
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
#bpgc {
  position: absolute;
  left: 55vw;
  bottom: 0;
  @media screen and (max-width: $burgerToggleWidth){
    left: 40vw;
    min-width: 130vw;
  }
  @media screen and (max-width: 400px){
    left: 30vw;
    min-width: 150vw;
  }}
#facts-list {
  display: flex;
  flex-wrap: wrap;
  >div {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-right: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    width: 180px;
    @media screen and (max-width: 540px) {
      width: 45%;
    }
    padding: 20px;
    h2 {
      text-align: center;
    }
    span {
      text-align: center;
      width: 100%;
      display: inline-block;
      color: $darkGray;
    }
    @include fluidType(16px, 18px);
  }
  @media screen and (max-width: 480px){
    flex-wrap: wrap;
  }
}

</style>
