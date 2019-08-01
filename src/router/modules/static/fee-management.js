
import Layout from '@/layout'
export default {
  path: '/fee-managemeng',
  component: Layout,
  redirect: '/fee-management/summary',
  name: 'FeeManagement',
  meta: {
    title: 'feeManagement'
    // icon: 'fund-administration'
  },
  children: [
    {
      path: 'summary',
      name: 'FeeManagementSummary',
      component: () => import('@/views/static/fee-management/summary/index'),
      meta: {
        title: 'feeManagementSummary',
        pensionMenu: 'address-type'
      }
    },
    {
      path: 'list',
      name: 'FeeManagementList',
      component: () => import('@/views/static/fee-management/list/index'),
      meta: {
        title: 'feeManagementList',
        pensionMenu: 'address-type'
      }
    },
    {
      path: 'to-founder',
      name: 'FeeManagementToFounder',
      component: () => import('@/views/static/fee-management/to-founder/index'),
      meta: {
        title: 'feeManagementToFounder',
        pensionMenu: 'address-type'
      }
    }
  ]
}
