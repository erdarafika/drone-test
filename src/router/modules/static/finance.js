
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
      component: () => import('@/views/static/finance/admin-suspense/index'),
      meta: {
        title: 'financeAdminSuspense',
        pensionMenu: 'admin-suspense'
      }
    },
    {
      path: 'refund',
      name: 'FinanceRefund',
      component: () => import('@/views/static/finance/refund/index'),
      meta: {
        title: 'financeRefund',
        pensionMenu: 'refund'
      }
    },
    {
      path: 'matching-suspense',
      name: 'FinanceMatchingSuspense',
      component: () => import('@/views/static/finance/matching-suspense/index'),
      meta: {
        title: 'financeMatchingSuspense',
        pensionMenu: 'match-suspense'
      }
    }
    // {
    //   path: 'billing-ppukp',
    //   name: 'ContributionBillingPPUKP',
    //   component: () => import('@/views/static/contribution/billing-ppukp/index'),
    //   meta: {
    //     title: 'contributionBillingPPUKP',
    //     pensionMenu: 'address-type'
    //   }
    // },
    // {
    //   path: 'billing-ppip-organization',
    //   name: 'ContributionBillingPPIPOrganization',
    //   component: () => import('@/views/static/contribution/billing-ppip-organization/index'),
    //   meta: {
    //     title: 'contributionBillingPPIPOrganization',
    //     pensionMenu: 'address-type'
    //   }
    // },
    // {
    //   path: 'billing-ppip-individual',
    //   name: 'ContributionBillingPPIPIndividu',
    //   component: () => import('@/views/static/contribution/billing-ppip-individual/index'),
    //   meta: {
    //     title: 'contributionBillingPPIPIndividu',
    //     pensionMenu: 'address-type'
    //   }
    // },
    // {
    //   path: 'topup-adhoc',
    //   name: 'ContributionPopUpAdHoc',
    //   component: () => import('@/views/static/contribution/topup-adhoc/index'),
    //   meta: {
    //     title: 'contributionPopUpAdHoc',
    //     pensionMenu: 'address-type'
    //   }
    // }
  ]
}
