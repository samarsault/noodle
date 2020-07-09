<template lang="pug">
header
  nav.main(role="navigation", aria-label="main navigation")
    .container
      .navbar-brand
        a(href='/').navbar-item
          img(src='/logo.png', width='108', height='48.6')
        a.navbar-burger(role='button', href='#', data-target='navmain')
          span(aria-hidden="true")
          span(aria-hidden="true")
          span(aria-hidden="true")

      .navbar-menu#navmain
        router-link.navbar-item(v-if='user', to='/dashboard') My Courses
        a.navbar-item(href='/catalog') Catalog
        router-link.navbar-item(to='/admin', v-if='user && user.role == "admin"') Admin
        a.navbar-item(v-if="user", href='/auth/logout') Sign Out
        a.navbar-item(v-else, href='/auth') Sign In
</template>

<script>

export default {
  props: [ "user" ],
  data() {
    return {
      burgerNavActive: false,
    };
  },
  methods: {
    toggleMobileNav() {
      this.burgerNavActive = !this.burgerNavActive;
    },
  },
};

</script>
