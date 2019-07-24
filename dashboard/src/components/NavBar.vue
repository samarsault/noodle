<template lang="pug">
extends ../../../views/include/header

block menu
  router-link.navbar-item(to='/') My Courses
  a.navbar-item(href='/explore') Catalog
  router-link.navbar-item(to='/admin', v-if='isAdmin') Admin
  a.navbar-item(href='/auth/logout') Sign Out
</template>

<script>
import axios from 'axios'

export default {
	name: 'NavBar',
	data () {
		return {
      isAdmin: false,
			burgerNavActive: false
		}
	},
	async created() {
		const { data } = await axios.get('/api/user')	
		if (data.role === 'admin')
			this.isAdmin = true;
	},
	methods: {
		toggleMobileNav () {
			this.burgerNavActive = !this.burgerNavActive;
		}
	}
}
</script>
