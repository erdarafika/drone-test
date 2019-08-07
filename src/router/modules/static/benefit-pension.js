
import Layout from '@/layout'
export default {
  path: '/benefit-pension',
  component: Layout,
  redirect: '/benefit-pension/index',
  name: 'BenefitPension',
  meta: {
    title: 'benefitPension',
    icon: 'benefit-pension'
  },
  children: [
    {
      path: 'ppukp',
      name: 'BenefitPensionPPUKP',
      component: () => import('@/views/static/benefit-pension/benefit-pension-ppukp/index'),
      meta: {
        title: 'benefitPensionPPUKP',
        pensionMenu: 'address-type'
      }
    },
    {
      path: 'ppip',
      name: 'BenefitPensionPPIP',
      component: () => import('@/views/static/benefit-pension/benefit-pension-ppip/index'),
      meta: {
        title: 'benefitPensionPPIP',
        pensionMenu: 'address-type'
      }
    }
  ]
}
