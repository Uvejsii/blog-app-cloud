import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "@/modules/auth/pages/Login.vue";
import Register from "@/modules/auth/pages/Register.vue";
import {useUser} from "@/modules/auth/sdk/user.js";

const { isUserLoggedIn } = useUser()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (!isUserLoggedIn() && to.name !== 'login' && to.name !== 'register') {
    next('/login')
  } else {
    next()
  }
})

export default router
