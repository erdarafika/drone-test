
import Layout from '@/layout'
export default {
  path: '/batch-management',
  component: Layout,
  redirect: '/batch-management/index',
  name: 'BatchManagement',
  meta: {
    title: 'batchManagement'
  },
  children: [
    {
      path: 'index',
      name: 'BatchManagementIndex',
      component: () => import('@/views/static/batch-management/index'),
      meta: {
        title: 'batchManagement',
        pensionMenu: 'address-type'
      }
    }
  ]
}
