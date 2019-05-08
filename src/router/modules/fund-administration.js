
import Layout from '@/layout'
export default {
  path: '/fund-administration',
  component: Layout,
  redirect: '/master/investment-type',
  name: 'FundAdministration',
  meta: {
    title: 'fundAdministration',
    // icon: 'component',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [{
    path: 'investment-type',
    name: 'InvestmentType',
    component: () => import('@/views/fund-administration/investment-type/index'),
    meta: {
      title: 'investmentType',
      roles: ['admin'] // or you can only set roles in sub nav
    }
  }
  ]
}
