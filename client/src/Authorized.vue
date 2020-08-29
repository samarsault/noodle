<script>
// For Oauth providers
import queryString from "query-string";
import userApi from "@/api/user";
import { mutations } from "./utils/store";

export default {
  methods: { ...mutations },
  async mounted() {
    const { token } = queryString.parse(window.location.search);
    if (token) {
      localStorage.setItem("token", token);
      this.$router.push({
        path: "/dashboard",
      });
      const user = await userApi.get();
      this.setUser(user);
    }
  },
};
</script>
