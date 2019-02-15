import Vue from 'vue'
import Router from 'vue-router'
import FrontEnd from '@/components/FrontEnd'
import RequestInput from '@/components/RequestInput'
Vue.use(Router)

export default new Router({
  
mode:'history',
routes: [
    {
      path: '/view/',
      name: 'FrontEnd',
      component: FrontEnd
    },
    {
    	path:'/inp/',
    	name:'RequestInput',
    	component:RequestInput
    },

  ]
})
