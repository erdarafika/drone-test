
import Layout from '@/layout'
export default {
  path: '/fund-administration',
  component: Layout,
  redirect: '/master/investment-type',
  name: 'FundAdministration',
  meta: {
    title: 'fundAdministration',
    icon: 'fund-administration',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [
    {
      path: 'investment-type',
      name: 'InvestmentType',
      component: () => import('@/views/fund-administration/investment-type/index'),
      meta: {
        title: 'investmentType',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'unit-price',
      name: 'UnitPrice',
      component: () => import('@/views/fund-administration/unit-price/index'),
      meta: {
        title: 'unitPrice',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
  ]
}
