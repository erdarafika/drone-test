
import Layout from '@/layout'
export default {
  path: '/dplk-configuration',
  component: Layout,
  redirect: '/dplk-configuration/dplk-information',
  name: 'DplkConfiguration',
  meta: {
    title: 'dplkConfiguration',
    icon: 'dplk-configuration'
  },
  children: [
    {
      path: 'dplk-information',
      name: 'DplkInformation',
      component: () => import('@/views/dplk-configuration/index'),
      meta: {
        title: 'dplkConfiguration',
        pensionMenu: 'dplk-configuration'
      }
    }
  ]
}
