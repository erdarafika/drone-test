
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
        pensionMenu: 'address-type'
      }
    },
    {
      path: 'billing-ppukp',
      name: 'ContributionBillingPPUKP',
      component: () => import('@/views/static/contribution/billing-ppukp/index'),
      meta: {
        title: 'contributionBillingPPUKP',
        pensionMenu: 'address-type'
      }
    },
    {
      path: 'billing-ppip-organization',
      name: 'ContributionBillingPPIPOrganization',
      component: () => import('@/views/static/contribution/billing-ppip-organization/index'),
      meta: {
        title: 'contributionBillingPPIPOrganization',
        pensionMenu: 'address-type'
      }
    },
    {
      path: 'billing-ppip-individu',
      name: 'ContributionBillingPPIPIndividu',
      component: () => import('@/views/static/contribution/billing-ppip-individu/index'),
      meta: {
        title: 'contributionBillingPPIPIndividu',
        pensionMenu: 'address-type'
      }
    },
    {
      path: 'top-up-ad-hoc',
      name: 'ContributionPopUpAdHoc',
      component: () => import('@/views/static/contribution/top-up-ad-hoc/index'),
      meta: {
        title: 'contributionPopUpAdHoc',
        pensionMenu: 'address-type'
      }
    }
  ]
}
