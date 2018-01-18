import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/Content'
import ViewDetail from '@/components/ViewDetail'
import Setting from '@/components/Setting'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Content',
      component: Content
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
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
