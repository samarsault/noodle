<template lang="pug" src="../../../views/include/header.pug"></template>

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
