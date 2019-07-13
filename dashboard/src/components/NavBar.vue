<template lang="pug">
header
  nav(role="navigation", aria-label="main navigation")
    .container
      .navbar-brand
        a(href='/').navbar-item
          img(src='/logo.png', width='108', height='48.6')

      .navbar-menu
      .navbar-start
        a.navbar-item(href='/dashboard') My Courses
        a.navbar-item(href='/explore') Catalog
        a.navbar-item(href='/auth/logout') Sign Out
</template>

<script>
import axios from 'axios'

export default {
	name: 'NavBar',
	data () {
		return {
			burgerNavActive: false
		}
	},
	methods: {
		toggleMobileNav () {
			this.burgerNavActive = !this.burgerNavActive;
		}
	}
}
</script>
