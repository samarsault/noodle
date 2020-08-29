<template lang="pug">
header
  nav.main(role="navigation", aria-label="main navigation")
    .container
      .navbar-brand
        router-link(to='/').navbar-item
          img(src='/logo.png', width='108', height='48.6')
        a.navbar-burger(
          role='button', 
          href='#', 
          data-target='navmain', 
          @click='toggleMenu', 
          :class="{ 'is-active': menuOpen }"
        )
          span(aria-hidden="true")
          span(aria-hidden="true")
          span(aria-hidden="true")

      .navbar-menu#navmain(:class="{ 'is-active': menuOpen }")
        router-link.navbar-item(v-if='user', to='/dashboard') My Courses
        router-link.navbar-item(to='/catalog') Catalog
        router-link.navbar-item(to='/faq') FAQ
        router-link.navbar-item(to='/admin', v-if='user && user.role == "admin"') Admin
        //- signout/signin
        a.navbar-item(v-if="user", @click.prevent='logout', href="#") Sign Out
        a.navbar-item(v-else, :href='`${server_url}/auth`') Sign In
</template>

<script>
import { getters, mutations } from "@/utils/store";

export default {
  data() {
    return {
      burgerNavActive: false,
      menuOpen: false,
      server_url: process.env.VUE_APP_SERVER_URL
    };
  },
  computed: {
    ...getters,
  },
  methods: {
    ...mutations,
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    toggleMobileNav() {
      this.burgerNavActive = !this.burgerNavActive;
    },
  logout(e) {
      e.stopPropagation();
      localStorage.clear();
      this.$router.push({
        path: "/",
      });
      this.setUser(null);
    },
  },
  watch: {
    '$route'() {
      this.menuOpen = false;
    }
  }
};
</script>
