<template>
  <div class="admin-header">
    <h2>Admin Panel</h2>
    <div class="nav">
      <router-link :to="'/admin/cmgt'">
        Course Management
      </router-link>
      <router-link :to="'/admin/umgt'">
        User Management
      </router-link>
      <router-link :to="'superpower'">
        Super Power
      </router-link>
    </div>
    <router-view :key="$route.path" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeComp: "CM",
    };
  },
  methods: {
    setActive(comp) {
      this.activeComp = comp;
      this.$router.push({
        path: "/admin/ec",
      });
    },
  },
  mounted() {
    if (this.$route.query.success) {
      if (this.$route.query.success === "1")
        this.setAlert("success", "Operation succesful");
      else if (this.$route.query.success === "0")
        this.setAlert("error", "Operation was not successful");
    }
  },
};
</script>

<style lang="scss" scoped>
@import "/home/think__tech/Desktop/cte/styles/include/vars";
.nav {
  grid-row: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav div {
  margin: 30px;
  padding-bottom: 10px;
  // border-bottom: 0.1em solid $green;
}
.admin-header h2 {
  display: flex;
  justify-content: center;
}
.nav a {
  text-decoration: none;
  color: inherit;
  margin: 30px;
  padding-bottom: 10px;
}
.router-link-active {
  color: $green;
}
.nav router-link {
  color: red;
  text-decoration: none;
  color: inherit;
  margin: 30px;
  padding-bottom: 10px;
  border-bottom: 0.1em solid $green;
}
.router-link-active {
  color: $green;
  border-bottom: 0.1em solid $green;
}
.is-active {
  border-bottom: 0.1em solid $green;
}
</style>
