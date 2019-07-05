
import Layout from '@/layout'
export default {
  path: '/user-management',
  component: Layout,
  redirect: '/user-management/user',
  name: 'UserManagement',
  meta: {
    title: 'userManagement',
    icon: 'user-management',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/user-management/user/index'),
      meta: {
        title: 'userManagement',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
  ]
}
