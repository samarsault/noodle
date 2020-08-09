<template>
  <div class="admin-main">
    <div :class="`sidebar ${isNotAdminBaseRoute ? 'hidden-mobile' : ''}`">
      <p style="font-weight: bold; padding: 0 10px;">Admin</p>
      <nav>
        <router-link :to="'/admin/cmgt'" class="icon-centre">
          <BookOpen style="margin-right: 10px;" />
          Courses
        </router-link>
        <router-link :to="'/admin/umgt'" class="icon-centre">
          <Account style="margin-right: 10px;" />
          Users
        </router-link>
      </nav>
    </div>
    <div :class="`admin-page ${!isNotAdminBaseRoute ? 'hidden-mobile' : ''}`">
      <router-view :key="$route.path" />
    </div>
    <router-link
      v-if="isNotAdminBaseRoute"
      to="/admin"
      id="sidebar-mobile-button"
    >
      <button class="primary"><IconSide :size="32" /></button>
    </router-link>
  </div>
</template>

<script>
import BookOpen from "vue-material-design-icons/BookOpenVariant";
import Account from "vue-material-design-icons/Account";
import IconSide from "vue-material-design-icons/MenuOpen";

export default {
  components: {
    IconSide,
    BookOpen,
    Account,
  },
  computed: {
    isNotAdminBaseRoute() {
      if (this.$route.name && this.$route.name === "admin") {
        // Navigation page
        return false;
      }
      return true;
    },
  },
  mounted() {
    // $burgerToggle
    if (!this.isNotAdminBaseRoute && window.innerWidth > 768) {
      // is /admin
      this.$router.push({
        path: "/admin/cmgt",
      });
    }
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
.icon-centre {
  display: flex !important;
  align-items: center;
}
#sidebar-mobile-button {
  display: none;
  @media screen and (max-width: $burgerToggleWidth) {
    position: fixed;
    bottom: 20px;
    left: 20px;
    display: block;
    z-index: 9;
    button {
      border-radius: 100%;
      cursor: pointer;
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      padding: 5px;
      text-align: center;
    }
    text-align: center;
  }
}
</style>
