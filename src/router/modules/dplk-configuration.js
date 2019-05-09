
import Layout from '@/layout'
export default {
  path: '/dplk-configuration',
  component: Layout,
  redirect: '/dplk-configuration/dplk=information',
  name: 'DplkConfiguration',
  meta: {
    title: 'dplkConfiguration',
    // icon: 'component',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [
    {
      path: 'dplk=information',
      name: 'DplkInformation',
      component: () => import('@/views/dplk-configuration/dplk-information/index'),
      meta: {
        title: 'dplkInformation',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
  ]
}
