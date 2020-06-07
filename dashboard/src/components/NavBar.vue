<template lang="pug">
extends ../../../views/include/header

block menu
  router-link.navbar-item(to='/') My Courses
  a.navbar-item(href='/courses') Catalog
  router-link.navbar-item(to='/admin', v-if='user.role == "admin"') Admin
  a.navbar-item(href='/auth/logout') Sign Out
</template>

<script>
import { getters } from '../utils/store';

export default {
	name: 'NavBar',
	data() {
		return {
			isAdmin: false,
			burgerNavActive: false,
		};
	},
	computed: {
		...getters,
	},
	methods: {
		toggleMobileNav() {
			this.burgerNavActive = !this.burgerNavActive;
		},
	},
};
</script>
