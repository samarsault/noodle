<script>
// For Oauth providers
import queryString from "query-string";

export default {
  mounted() {
    const { token } = queryString.parse(window.location.search);
    localStorage.setItem("token", token);
    if (token) {
      this.$router.push({
        path: "/dashboard",
      });
    }
  },
};
</script>
