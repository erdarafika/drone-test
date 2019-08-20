
import Layout from '@/layout'
export default {
  path: '/finance',
  component: Layout,
  redirect: '/finance/admin-suspense',
  name: 'Finance',
  meta: {
    title: 'finance',
    icon: 'finance'
  },
  children: [
    {
      path: 'admin-suspense',
      name: 'FinanceAdminSuspense',
      component: () => import('@/views/finance/admin-suspense/index'),
      meta: {
        title: 'financeAdminSuspense',
        pensionMenu: 'admin-suspense'
      }
    },
    {
      path: 'match-suspense',
      name: 'FinanceMatchingSuspense',
      component: () => import('@/views/finance/match-suspense/index'),
      meta: {
        title: 'financeMatchingSuspense',
        pensionMenu: 'admin-suspense'
      }
    },
    {
      path: 'refund',
      name: 'FinanceRefund',
      component: () => import('@/views/finance/refund/index'),
      meta: {
        title: 'financeRefund',
        pensionMenu: 'admin-suspense'
      }
    }
  ]
}
