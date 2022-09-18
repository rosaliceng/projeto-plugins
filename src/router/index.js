import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import PublisherView from '../views/PublisherView.vue'
import BookView from '../views/BookView.vue'
import RentView from '../views/RentView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/user',
    name: 'UserView',
    component: UserView
  },
  {
    path: '/publisher',
    name: 'PublisherView',
    component: PublisherView
  },
  {
    path: '/book',
    name: 'BookView',
    component: BookView
  },
  {
    path: '/rent',
    name: 'RentView',
    component: RentView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router