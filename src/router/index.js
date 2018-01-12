import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/Content'
import Home from '@/components/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Content',
      component: Content
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
