
import Layout from '@/layout'
export default {
  path: '/fund-administration',
  component: Layout,
  redirect: '/master/investment-type',
  name: 'FundAdministration',
  meta: {
    title: 'fundAdministration',
    icon: 'fund-administration'
  },
  children: [
    {
      path: 'investment-type',
      name: 'InvestmentType',
      component: () => import('@/views/fund-administration/investment-type/index'),
      meta: {
        title: 'investmentType',
        pensionMenu: 'investment_type'
      }
    },
    {
      path: 'unit-price',
      name: 'UnitPrice',
      component: () => import('@/views/fund-administration/unit-price/index'),
      meta: {
        title: 'unitPrice',
        pensionMenu: 'unit-price'
      }
    }
  ]
}
