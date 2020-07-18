//
// Flavour
//
import NavBarComponent from './components/NavBar.vue'

//
// NavBar
//
export const NavBar = NavBarComponent;

//
// Custom pages
//
export const routes = [{
    path: '/',
    component: () => import('./index.vue'),
  }, {
    path: '/catalog',
    component: () => import('./catalog.vue'),
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
    component: () => import('./course.vue'),
  }
];
