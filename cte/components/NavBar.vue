<template lang="pug">
header
  nav.main(role="navigation", aria-label="main navigation")
    .container
      .navbar-brand
        a(href='/').navbar-item
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
        a.navbar-item(href='/catalog') Catalog
        router-link.navbar-item(to='/admin', v-if='user && user.role == "admin"') Admin
        a.navbar-item(v-if="user", @click='logout') Sign Out
        a.navbar-item(v-else, href='/SignUp') Sign In
</template>

<script>

export default {
  props: [ "user", "doLogOut" ],
  data() {
    return {
      burgerNavActive: false,
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    toggleMobileNav() {
      this.burgerNavActive = !this.burgerNavActive;
    },
    logout() {
      this.doLogOut();
    }
  },
};
</script>
