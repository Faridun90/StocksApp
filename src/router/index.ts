import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: () => import('../views/CalculatorView.vue')
    },
    {
      path: '/stocks',
      name: 'stocks',
      component: () => import('../views/BuyStocks.vue')
    },
    {
      path: '/stocks/my-stocks',
      name: 'my-stocks',
      component: () => import('../views/MyStocks.vue')
    }
  ]
})

export default router
