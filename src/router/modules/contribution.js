
import Layout from '@/layout'
export default {
  path: '/contribution',
  component: Layout,
  redirect: '/contribution/billing',
  name: 'Contribution',
  meta: {
    title: 'contribution',
    icon: 'contribution'
  },
  children: [
    {
      path: 'billing',
      name: 'ContributionBilling',
      component: () => import('@/views/contribution/billing/index'),
      meta: {
        title: 'contributionBilling',
        pensionMenu: 'billing'
      }
    },
    {
      path: 'billing-ppukp',
      name: 'ContributionBillingPPUKP',
      component: () => import('@/views/contribution/billing-ppukp/index'),
      meta: {
        title: 'contributionBillingPPUKP',
        pensionMenu: 'billing',
        noCache: true,
        breadcrumb: false
      },
      hidden: true
    },
    {
      path: 'topup-adhoc',
      name: 'ContributionPopUpAdHoc',
      component: () => import('@/views/contribution/topup-adhoc/index'),
      meta: {
        title: 'contributionPopUpAdHoc',
        pensionMenu: 'topup-adhoc'
      }
    }
  ]
}
