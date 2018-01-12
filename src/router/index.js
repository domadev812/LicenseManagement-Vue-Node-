import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/Content'
import ViewDetail from '@/components/ViewDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Content',
      component: Content
    },
    {
      path: '/viewdetail/:id',
      name: 'ViewDetail',
      component: ViewDetail
    }
    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: Home
    // }
  ]
})
