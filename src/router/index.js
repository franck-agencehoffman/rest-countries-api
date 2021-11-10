import Vue from 'vue'
import Router from 'vue-router'
import Head from 'vue-head'
import Index from '@/views/Index'
import Single from '@/views/Single'

Vue.use(Router)

/* If you don't know about VueHead, please refer to https://github.com/ktquez/vue-head */

Vue.use(Head, {
  complement: process.env.VUE_APP_TITLE
})

/* If you don't know about VueRouter, please refer to https://router.vuejs.org/ */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/countries/:code',
      name: 'single',
      component: Single,
    },
    { path: '*', redirect: '/' }
  ]
})

export default router
