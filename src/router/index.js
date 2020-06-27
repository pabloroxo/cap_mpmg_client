import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Login from '@/components/Login'
import Balance from '@/components/Balance'
import Withdraw from '@/components/Withdraw'
import Deposit from '@/components/Deposit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/balance',
      name: 'balance',
      component: Balance,
      beforeEnter: (to, from, next) => {
        if (!from.name && !store.getters['auth/authenticated']) {
          return next({
            path: '/'
          })
        }
        next()
      }
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: Withdraw,
      beforeEnter: (to, from, next) => {
        if (!from.name && !store.getters['auth/authenticated']) {
          return next({
            path: '/'
          })
        }
        next()
      }
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: Deposit,
      beforeEnter: (to, from, next) => {
        if (!from.name && !store.getters['auth/authenticated']) {
          return next({
            path: '/'
          })
        }
        next()
      }
    }
  ]
})
