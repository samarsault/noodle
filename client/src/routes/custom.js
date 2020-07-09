//
// Custom routes
//
import CustomContainer from "../components/CustomContainer.vue";
import { routes } from "../../../theme";

//
// CustomContainer acts as a wrapper to
// simplify customization when using noodle
//
export default routes.map((route) => ({
  path: route.path,
  component: CustomContainer,
  props: { page: route.page, access: route.access },
}));
