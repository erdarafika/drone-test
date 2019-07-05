
import Layout from '@/layout'
export default {
  path: '/task-management',
  component: Layout,
  redirect: '/task-management/user',
  name: 'UserManagement',
  meta: {
    title: 'taskManagement',
    icon: 'task-management',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [
    {
      path: 'task',
      name: 'Task',
      component: () => import('@/views/task-management/task/index'),
      meta: {
        title: 'taskManagement',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
  ]
}
