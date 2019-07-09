
import Layout from '@/layout'
export default {
  path: '/user-management',
  component: Layout,
  redirect: '/user-management/user',
  name: 'UserManagement',
  meta: {
    title: 'userManagement',
    icon: 'user-management'
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
    }
  ]
}
