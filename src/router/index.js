import Vue from 'vue'
import Router from 'vue-router'
import FrontEnd from '@/components/FrontEnd'
import RequestInput from '@/components/RequestInput'
Vue.use(Router)

export default new Router({
  
mode:'history',
routes: [
    {
      path: '/admin/',
      name: 'FrontEnd',
      component: FrontEnd
    },
    {
    	path:'/request/',
    	name:'RequestInput',
    	component:RequestInput
    },

  ]
})
