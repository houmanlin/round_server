import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/account',
    name: 'index',
    meta: { title: '员工设置', icon: 'el-icon-s-custom' },
    children: [
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/account/account_list'),
        meta: { title: '员工管理' }
      },
      {
        path: 'add_account',
        name: 'add_account',
        hidden:true,
        component: () => import('@/views/account/add_account'),
        meta: { title: '添加员工' }
      },
      {
        path: 'account_info',
        name: 'account_info',
        hidden:true,
        component: () => import('@/views/account/account_info'),
        meta: { title: '员工詳情' }
      },
      {
        path: 'edit_account',
        name: 'edit_account',
        hidden:true,
        component: () => import('@/views/account/add_account'),
        meta: { title: '修改员工' }
      },
    ]
  },
  {
    path: '/venue',
    component: Layout,
    redirect: '/venue',
    name: 'venue',
    meta: { title: '场馆设置', icon: 'el-icon-s-custom' },
    children: [
      {
        path: '/venue_list',
        name: 'venue_list',
        component: () => import('@/views/venues/venue_list'),
        meta: { title: '场馆编辑' }
      },
      {
        path: '/add_venue',
        name: 'add_venue',
        component: () => import('@/views/venues/add_venues'),
        meta: { title: '添加场馆' }
      },
    ]
  },


  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
