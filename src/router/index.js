import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage'

const routes = [
  {
    path: '/',
    name: 'Главная',
    component: HomePage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
})


export default router
