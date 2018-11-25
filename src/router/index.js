import Vue from 'vue'
import Router from 'vue-router'
import FrontEnd from '@/components/FrontEnd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FrontEnd',
      component: FrontEnd
    }
  ]
})
