import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'stocks',
      component: () => import('../views/BuyStocks.vue')
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: () => import('../views/CalculatorView.vue')
    },
    {
      path: '/stocks/my-portfolio',
      name: 'my-portfolio',
      component: () => import('../views/MyPortfolio.vue')
    }
  ]
})

export default router
