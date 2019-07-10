
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
    // {
    //   path: 'dplk-information',
    //   name: 'DplkInformation',
    //   component: () => import('@/views/dplk-configuration/dplk-information/index'),
    //   meta: {
    //     title: 'dplkInformation',
    //     pensionMenu: ''
    //   }
    // },
    // {
    //   path: 'dplk-address',
    //   name: 'DplkAddress',
    //   component: () => import('@/views/dplk-configuration/dplk-address/index'),
    //   meta: {
    //     title: 'dplkAddress',
    //     pensionMenu: ''
    //   }
    // },
    // {
    //   path: 'dplk-bank-account',
    //   name: 'DplkBankAccount',
    //   component: () => import('@/views/dplk-configuration/dplk-bank-account/index'),
    //   meta: {
    //     title: 'dplkBankAccount',
    //     pensionMenu: ''
    //   }
    // },
    // {
    //   path: 'dplk-staff',
    //   name: 'DplkStaff',
    //   component: () => import('@/views/dplk-configuration/dplk-staff/index'),
    //   meta: {
    //     title: 'dplkStaff',
    //     pensionMenu: ''
    //   }
    // }
  ]
}
