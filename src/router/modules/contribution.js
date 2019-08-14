
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
        pensionMenu: 'billing-ppukp',
        noCache: true,
        breadcrumb: false
      },
      hidden: true
    },
    {
      path: 'billing-ppip-individual',
      name: 'ContributionBillingPPIPIndividual',
      component: () => import('@/views/contribution/billing-ppip-individual/index'),
      meta: {
        title: 'contributionBillingPPIPIndividual',
        pensionMenu: 'billing-ppip-individual',
        noCache: true,
        breadcrumb: false
      },
      hidden: true
    },
    {
      path: 'billing-ppip-organization',
      name: 'ContributionBillingPPIPOrganization',
      component: () => import('@/views/contribution/billing-ppip-organization/index'),
      meta: {
        title: 'contributionBillingPPIPOrganization',
        pensionMenu: 'billing-ppip',
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
