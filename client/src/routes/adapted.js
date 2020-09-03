//
// Routes adapted from application
//
import { routes } from "noodle-flavour";

export default routes.map((route) => ({
  path: route.path,
  component: route.component,
}));
