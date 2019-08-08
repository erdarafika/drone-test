
import Layout from '@/layout'
export default {
  path: '/fund-transfer',
  component: Layout,
  redirect: '/fund-transfer/index',
  name: 'FundTransfer',
  meta: {
    title: 'fundTransfer',
    icon: 'fund-transfer'
  },
  children: [
    {
      path: 'index',
      name: 'FundTransferIndex',
      component: () => import('@/views/static/fund-transfer/index'),
      meta: {
        title: 'fundTransfer',
        pensionMenu: 'fund-tranfer'
      }
    }
  ]
}
