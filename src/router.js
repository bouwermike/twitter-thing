import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        store.dispatch('enactClearState')
        next()
      }
    },
    {
      path: '/about',
      name: 'about',
      beforeEnter: (to, from, next) => {
        if (store.getters.submit_ready) {
          next()
        } else {
          next({
            path: '/',
            params: {
              nextUrl: to.fullPath
            }
          })
        }
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})