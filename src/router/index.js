import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () =>
      import(/* webpackChunkName: "rainFall" */ '@/views/index.vue')
  },
  {
    path: '/rainfall',
    name: 'rainfall',
    component: () =>
      import(/* webpackChunkName: "rainFall" */ '@/views/rainFall.vue')
  },
  {
    path: '/parallax',
    name: 'parallax',
    component: () =>
      import(/* webpackChunkName: "parallax" */ '@/views/parallax.vue')
  },
  {
    path: '/animate',
    name: 'animate',
    component: () =>
      import(/* webpackChunkName: "animate" */ '@/views/animate.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0
  }),
  routes
})
