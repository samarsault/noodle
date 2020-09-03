<script>
// For Oauth providers
import userApi from "@/api/user";
import { mutations } from "./utils/store";

export default {
  methods: { ...mutations },
  async mounted() {
    const token = this.$route.query.token;
    if (token) {
      localStorage.setItem("token", token);
      const user = await userApi.get();
      this.setUser(user);
      this.$router.push({
        path: "/dashboard",
      });
    }
  },
};
</script>
