
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
      component: () => import('@/views/static/contribution/billing/index'),
      meta: {
        title: 'contributionBilling',
        pensionMenu: 'billing'
      }
    },
    {
      path: 'billing-ppukp',
      name: 'ContributionBillingPPUKP',
      component: () => import('@/views/static/contribution/billing-ppukp/index'),
      meta: {
        title: 'contributionBillingPPUKP',
        pensionMenu: 'billing-ppukp'
      }
    },
    {
      path: 'billing-ppip-organization',
      name: 'ContributionBillingPPIPOrganization',
      component: () => import('@/views/static/contribution/billing-ppip-organization/index'),
      meta: {
        title: 'contributionBillingPPIPOrganization',
        pensionMenu: 'billing-ppip'
      }
    },
    {
      path: 'billing-ppip-individu',
      name: 'ContributionBillingPPIPIndividu',
      component: () => import('@/views/static/contribution/billing-ppip-individu/index'),
      meta: {
        title: 'contributionBillingPPIPIndividu',
        pensionMenu: 'billing-ppip-individual'
      }
    },
    {
      path: 'top-up-ad-hoc',
      name: 'ContributionPopUpAdHoc',
      component: () => import('@/views/static/contribution/top-up-ad-hoc/index'),
      meta: {
        title: 'contributionPopUpAdHoc',
        pensionMenu: 'topup-adhoc'
      }
    }
  ]
}
