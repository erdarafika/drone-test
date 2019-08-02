
import Layout from '@/layout'
export default {
  path: '/alteration',
  component: Layout,
  redirect: '/alteration/document',
  name: 'Alteration',
  meta: {
    title: 'alteration'
  },
  children: [
    {
      path: 'document',
      name: 'AlterationDocument',
      component: () => import('@/views/static/alteration/document'),
      meta: {
        title: 'alterationDocument',
        pensionMenu: 'address-type'
      }
    },
    {
      path: 'data',
      name: 'AlterationData',
      component: () => import('@/views/static/alteration/data'),
      meta: {
        title: 'alterationData',
        pensionMenu: 'address-type'
      }
    }
  ]
}
