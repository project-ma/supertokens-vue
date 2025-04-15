import { createRouter, createWebHistory } from 'vue-router'
import Session from 'supertokens-web-js/recipe/session'
import HomeView from '../views/HomeView.vue'
import Login from '../components/login.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

// Protecting Frontend Routes with Supertokens Session check
router.beforeEach(async (to, from, next) => {
  if (to.name !== 'login' && !(await Session.doesSessionExist())) next({ name: 'login' })
    else next();
})

export default router
