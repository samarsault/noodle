//
// Flavour
//
import NavBarComponent from './components/NavBar.vue'
import FooterComponent from './components/Footer.vue'

//
// NavBar
//
export const NavBar = NavBarComponent;
export const Footer = FooterComponent;

//
// Custom pages
//
export const routes = [{
    path: '/',
    component: () => import('./index.vue'),
  }, {
    path: '/catalog',
    component: () => import(/* webpackChunkName: "course-info" */ /* webpackPrefetch: true */ './catalog.vue'),
  }, {
    path: '/team',
    component: () => import('./team.vue')
  },
  {
    path: '/faq',
    component: () => import('./faq.vue')
  },
  {
    path: '/course/:course_id',
    component: () => import(/* webpackChunkName: "course-info" */ /* webpackPrefetch: true */ './course.vue'),
  },
  {
    path: '/details',
    component: () => import('./details.vue'),
  }
];
