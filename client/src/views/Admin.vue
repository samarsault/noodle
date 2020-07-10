<template>
  <div class="admin-main">
    <div class="sidebar">
      <p style="font-weight: bold; padding: 0 10px;">Admin</p>
      <nav>
        <router-link :to="'/admin/cmgt'">
          Courses
        </router-link>
        <router-link :to="'/admin/umgt'">
          Users
        </router-link>
      </nav>
    </div>
    <div :class="`admin-page ${sidebarHidden ? '' : 'hidden-mobile'}`">
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    sidebarHidden() {
      if (this.$route.name && this.$route.name === "admin") {
        // Navigation page
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: $burgerToggleWidth) {
  .hidden-mobile {
    display: none;
  }
}

.admin-main {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}
.admin-page {
  flex-grow: 1;
  position: relative;
  padding: 30px 60px;
  overflow: scroll;
  height: 100%;
  @media screen and (max-width: $burgerToggleWidth) {
    padding: 30px 20px;
    max-width: 600px;
    margin: 0 auto;
  }
}
.sidebar {
  background-color: #222;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  color: #fff;
  @media screen and (max-width: $burgerToggleWidth) {
    flex-basis: 100%;
    width: 100%;
    &.hidden-mobile {
      display: none;
    }
  }
  flex-basis: 300px;
  min-width: 300px;
  user-select: none;
  h4 {
    color: #fff;
  }
  nav {
    list-style-type: none;
    margin: 0;
    padding: 0;
    .module-content > a {
      background: #222;
      &:not(:last-child) {
        border-bottom: 1px solid #444;
      }
    }
    .module-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #999;
        padding: 0 5px;
      }
    }
    a {
      display: block;
      padding: 15px;
      border-bottom: 1px solid #222;
      background-color: #0d0d0d;
      border-left: 3px solid #0d0d0d;
      cursor: pointer;
      color: inherit;
      &:hover {
        text-decoration: none;
      }
      &:focus {
        outline: none;
      }
      &.router-link-active {
        border-left-color: $green;
      }
    }
  }
}
</style>
