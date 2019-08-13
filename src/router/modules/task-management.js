
import Layout from '@/layout'
export default {
  path: '/task-management',
  component: Layout,
  redirect: '/task-management/user',
  name: 'TaskManagement',
  meta: {
    title: 'taskManagement',
    icon: 'task-management'
    // pensionMenu: '' // you can set roles in root nav
  },
  children: [
    {
      path: 'task',
      name: 'Task',
      component: () => import('@/views/task-management/task/index'),
      meta: {
        title: 'taskManagement',
        pensionMenu: 'task-management'
      }
    },
    {
      path: 'task/:action',
      name: 'TaskDetail',
      hidden: true,
      component: () => import('@/views/task-management/task/Detail'),
      meta: {
        title: 'detail',
        pensionMenu: 'task-management'
      }
    }

  ]
}
