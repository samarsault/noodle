//
// Routes adapted from application
//
import { routes } from "noodle-adapter";

export default routes.map((route) => ({
  path: route.path,
  component: route.component,
}));
