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

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: '报表', icon: 'dashboard' }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/import_business',
    name: 'import_business',
    meta: { title: '进出口业务管理', icon: 'el-icon-box' },
    children: [
      {
        path: 'import_business',
        name: 'import_business',
        component: () => import('@/views/import_business/index'),
        meta: { title: '进出口业务' }
      },
      {
        path: 'add_import_business',
        name: 'add_import_business',
        component: () => import('@/views/import_business/add_import_business'),
        meta: { title: '进出口业务' },
        hidden: true
      },
      {
        path: 'business_billing',
        name: 'business_billing',
        component: () => import('@/views/business_billing/index'),
        meta: { title: '业务统计' },

      },
    ]
  },
  {
    path: '/system_manages',
    component: Layout,
    redirect: '/system_manages/system_log',
    name: 'system_settings',
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'system_log',
        name: 'system_log',
        component: () => import('@/views/system_log/index'),
        meta: { title: '系统日志' }
      },
      {
        path: 'user_manage',
        name: 'user_manage',
        component: () => import('@/views/user_manage/index'),
        meta: { title: '账户管理'},
      },
      {
        path: 'edit_password',
        name: 'edit_password',
        component: () => import('@/views/user_manage/edit_password'),
        meta: { title: '修改密码'},
        hidden: true
      },
      {
        path: 'add_user',
        name: 'add_user',
        component: () => import('@/views/user_manage/add_user'),
        meta: { title: '添加用户' },
        hidden: true
      },
      {
        path: 'add_user',
        name: 'add_user',
        component: () => import('@/views/user_manage/add_user'),
        meta: { title: '添加用户' },
        hidden: true
      },
      {
        path: 'dictionary_config',
        name: 'dictionary_config',
        component: () => import('@/views/dictionary/index'),
        meta: { title: '字典管理'},
      },
      {
        path: 'add_dictionary',
        name: 'add_dictionary',
        component: () => import('@/views/dictionary/add_dictionary'),
        meta: { title: '添加字典' },
        hidden: true
      },
      {
        path: 'client_manage',
        name: 'client_manage',
        component: () => import('@/views/client/index'),
        meta: { title: '客户管理' },
      },
      {
        path: 'add_client',
        name: 'add_client',
        component: () => import('@/views/client/add_client'),
        meta: { title: '添加客户' },
        hidden: true
      },
      // {
      //   path: 'expense',
      //   name: 'expense',
      //   component: () => import('@/views/expense/index'),
      //   meta: { title: '费用配置' },
      //
      // },
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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
