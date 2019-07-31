
import Layout from '@/layout'
export default {
  path: '/finance',
  component: Layout,
  redirect: '/finance/admin-suspense',
  name: 'Finance',
  meta: {
    title: 'finance'
    // icon: 'fund-administration'
  },
  children: [
    {
      path: 'admin-suspense',
      name: 'FinanceAdminSuspense',
      component: () => import('@/views/static/finance/admin-suspense/index'),
      meta: {
        title: 'financeAdminSuspense',
        pensionMenu: 'address-type'
      }
    },
    {
      path: 'refund',
      name: 'FinanceRefund',
      component: () => import('@/views/static/finance/refund/index'),
      meta: {
        title: 'financeRefund',
        pensionMenu: 'address-type'
      }
    },
    {
      path: 'matching-suspense',
      name: 'FinanceMatchingSuspense',
      component: () => import('@/views/static/finance/matching-suspense/index'),
      meta: {
        title: 'financeMatchingSuspense',
        pensionMenu: 'address-type'
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
    //   path: 'billing-ppip-individu',
    //   name: 'ContributionBillingPPIPIndividu',
    //   component: () => import('@/views/static/contribution/billing-ppip-individu/index'),
    //   meta: {
    //     title: 'contributionBillingPPIPIndividu',
    //     pensionMenu: 'address-type'
    //   }
    // },
    // {
    //   path: 'top-up-ad-hoc',
    //   name: 'ContributionPopUpAdHoc',
    //   component: () => import('@/views/static/contribution/top-up-ad-hoc/index'),
    //   meta: {
    //     title: 'contributionPopUpAdHoc',
    //     pensionMenu: 'address-type'
    //   }
    // }
  ]
}
