
import Layout from '@/layout'
export default {
  path: '/user-management',
  component: Layout,
  redirect: '/user-management/user',
  name: 'UserManagement',
  meta: {
    title: 'userManagement',
    icon: 'user-management',
    noCache: true
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/user-management/user/index'),
      meta: {
        title: 'userManagement',
        pensionMenu: 'user-maintenance'
      }
    },
    {
      path: 'user/privileges',
      name: 'userPrivileges',
      component: () => import('@/views/user-management/user/user-privileges'),
      meta: {
        title: 'detail',
        noCache: true,
        breadcrumb: false,
        pensionMenu: 'user-maintenance'
      },
      hidden: true
    }
  ]
}
