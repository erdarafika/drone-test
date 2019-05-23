import Layout from '@/layout'
export default {
  path: '/master',
  component: Layout,
  redirect: '/master/address-type',
  name: 'Master',
  meta: {
    title: 'master',
    icon: 'component',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [
  // {
  //   path: 'address-type',
  //   name: 'AddressType',
  //   component: () => import('@/views/master/address-type/index'),
  //   meta: {
  //     title: 'addressType',
  //     roles: ['admin'] // or you can only set roles in sub nav
  //   }
  // },
  // {
  //   path: 'location',
  //   name: 'Location',
  //   component: () => import('@/views/master/location/index'),
  //   meta: {
  //     title: 'location',
  //     roles: ['admin'] // or you can only set roles in sub nav
  //   }
  // },
  // {
  //   path: 'bank',
  //   name: 'Bank',
  //   component: () => import('@/views/master/bank/index'),
  //   meta: {
  //     title: 'bank',
  //     roles: ['admin'] // or you can only set roles in sub nav
  //   }
  // },
  // {
  //   path: 'business-line',
  //   name: 'BusinessLine',
  //   component: () => import('@/views/master/business-line/index'),
  //   meta: {
  //     title: 'businessLine',
  //     roles: ['admin'] // or you can only set roles in sub nav
  //   }
  // },
  // {
  //   path: 'role',
  //   component: () => import('@/views/master/role/index'),
  //   name: 'Role',
  //   hidden: false,
  //   meta: {
  //     title: 'role',
  //     roles: ['admin']
  //   }
  // },
  // {
  //   path: 'position',
  //   component: () => import('@/views/master/position/index'),
  //   name: 'Position',
  //   meta: {
  //     title: 'position',
  //     roles: ['admin']
  //   }
  // },
  // {
  //   path: 'holiday',
  //   name: 'Holiday',
  //   component: () => import('@/views/master/holiday/index'),
  //   meta: {
  //     title: 'holiday',
  //     roles: ['admin'] // or you can only set roles in sub nav
  //   }
  // },
  // {
  //   path: 'document',
  //   name: 'Document',
  //   component: () => import('@/views/master/document/index'),
  //   meta: {
  //     title: 'document',
  //     roles: ['admin'] // or you can only set roles in sub nav
  //   }
  // },
  // {
  //   path: 'tolerance',
  //   name: 'Tolerance',
  //   component: () => import('@/views/master/tolerance/index'),
  //   meta: {
  //     title: 'tolerance',
  //     roles: ['admin'] // or you can only set roles in sub nav
  //   }
  // },
  // {
  //   path: 'withdrawal-rule',
  //   component: () => import('@/views/master/withdrawal-rule/index'),
  //   name: 'WithdrawalRule',
  //   meta: {
  //     title: 'withdrawalRule',
  //     roles: ['admin']
  //   }
  // },
  // {
  //   path: 'email-config',
  //   name: 'EmailConfig',
  //   component: () => import('@/views/master/email-config/index'),
  //   meta: {
  //     title: 'emailConfig',
  //     roles: ['admin'] // or you can only set roles in sub nav
  //   }
  // },
    {
      path: 'fee-type',
      name: 'FeeType',
      component: () => import('@/views/master/fee-type/index'),
      meta: {
        title: 'feeType',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
    // {
    //   path: 'benefit-type',
    //   name: 'BenefitType',
    //   component: () => import('@/views/master/benefit-type/index'),
    //   meta: {
    //     title: 'benefitType',
    //     roles: ['admin'] // or you can only set roles in sub nav
    //   }
    // },
    // {
    //   path: 'product-type',
    //   name: 'ProductType',
    //   component: () => import('@/views/master/product-type/index'),
    //   meta: {
    //     title: 'productType',
    //     roles: ['admin'] // or you can only set roles in sub nav
    //   }
    // },
    // {
    //   path: 'document-matrix',
    //   component: () => import('@/views/master/document-matrix/index'),
    //   name: 'DocumentMatrix',
    //   hidden: true,
    //   meta: {
    //     title: 'documentMatrix',
    //     roles: ['admin']
    //   }
    // },
    // {
    //   path: 'dplk-bank',
    //   name: 'DplkBank',
    //   component: () => import('@/views/master/dplk-bank/index'),
    //   meta: {
    //     title: 'dplkBank',
    //     roles: ['admin'] // or you can only set roles in sub nav
    //   }
    // },
    // {
    //   path: 'sub-benefit',
    //   component: () => import('@/views/master/benefit-type/sub-benefit/index'),
    //   name: 'SubBenefit',
    //   hidden: true,
    //   meta: {
    //     title: 'subBenefit',
    //     roles: ['admin']
    //   }
    // },
    // {
    //   path: 'sub-benefit-document',
    //   component: () => import('@/views/master/benefit-type/sub-benefit-document/index'),
    //   name: 'SubBenefitDocument',
    //   hidden: true,
    //   meta: {
    //     title: 'subBenefitDocument',
    //     roles: ['admin']
    //   }
    // },
    // {
    //   path: 'virtual-account',
    //   name: 'VirtualAccount',
    //   hidden: true,
    //   component: () => import('@/views/master/virtual-account/index'),
    //   meta: {
    //     title: 'virtualAccount',
    //     roles: ['admin']
    //   },
    //   redirect: '/virtual-account/bca',
    //   children: [{
    //     path: 'bca',
    //     name: 'Bca',
    //     component: () => import('@/views/master/virtual-account/index'),
    //     meta: {
    //       title: 'bca',
    //       roles: ['admin'] // or you can only set roles in sub nav
    //     }
    //   },
    //   {
    //     path: 'cimb',
    //     name: 'Cimb',
    //     component: () => import('@/views/master/virtual-account/index'),
    //     meta: {
    //       title: 'cimb',
    //       roles: ['admin'] // or you can only set roles in sub nav
    //     }
    //   }

  //   ]
  // }
  ]
}
