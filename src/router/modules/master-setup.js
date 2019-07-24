import Layout from '@/layout'
export default {
  path: '/master',
  component: Layout,
  redirect: '/master/address-type',
  name: 'Master',
  meta: {
    title: 'master',
    icon: 'master-setup' // you can set roles in root nav
  },
  children: [
    {
      path: 'address-type',
      name: 'AddressType',
      component: () => import('@/views/master/address-type/index'),
      meta: {
        title: 'addressType',
        pensionMenu: 'address-type'
      }
    },
    {
      path: 'location',
      name: 'Location',
      component: () => import('@/views/master/location/index'),
      redirect: '/master/location/country',
      meta: {
        title: 'location',
        pensionMenu: 'location'
      },
      children: [
        {
          path: 'country',
          name: 'LocationCountry',
          component: () => import('@/views/master/location/Country'),
          meta: {
            title: 'location',
            pensionMenu: 'location'
          },
          hidden: true
        },
        {
          path: 'country/:id/province',
          name: 'LocationProvince',
          component: () => import('@/views/master/location/Province'),
          meta: {
            title: 'location',
            pensionMenu: 'location'
          },
          hidden: true
        },
        {
          path: 'country/:id/province/:provinceId/city',
          name: 'LocationCity',
          component: () => import('@/views/master/location/City'),
          meta: {
            title: 'location',
            pensionMenu: 'location'
          },
          hidden: true
        }
      ]
    },
    {
      path: 'bank',
      name: 'Bank',
      component: () => import('@/views/master/bank/index'),
      meta: {
        title: 'bank',
        pensionMenu: 'bank'
      }
    },
    {
      path: 'business-line',
      name: 'BusinessLine',
      component: () => import('@/views/master/business-line/index'),
      meta: {
        title: 'businessLine',
        pensionMenu: 'business-line'
      }
    },
    {
      path: 'department',
      name: 'Department',
      component: () => import('@/views/master/department/index'),
      meta: {
        title: 'department',
        pensionMenu: 'department'
      }
    },
    {
      path: 'holiday',
      name: 'Holiday',
      component: () => import('@/views/master/holiday/index'),
      meta: {
        title: 'holiday',
        pensionMenu: 'holiday'
      }
    },
    {
      path: 'document',
      name: 'Document',
      component: () => import('@/views/master/document/index'),
      meta: {
        title: 'document',
        pensionMenu: 'document'
      }
    },
    {
      path: 'tolerance',
      name: 'Tolerance',
      component: () => import('@/views/master/tolerance/index'),
      meta: {
        title: 'tolerance',
        pensionMenu: 'tolerance'
      }
    },
    {
      path: 'email-config',
      name: 'EmailConfig',
      component: () => import('@/views/master/email-config/index'),
      meta: {
        title: 'emailConfig',
        pensionMenu: 'email'
      }
    },
    {
      path: 'money-source',
      name: 'MoneySource',
      component: () => import('@/views/master/money-source/index'),
      meta: {
        title: 'moneySource',
        pensionMenu: 'money-source'
      },
      hidden: true
    },
    // {
    //   path: 'role',
    //   component: () => import('@/views/master/role/index'),
    //   name: 'Role',
    //   hidden: false,
    //   meta: {
    //     title: 'role',
    //     pensionMenu: ''
    //   }
    // },
    // {
    //   path: 'position',
    //   component: () => import('@/views/master/position/index'),
    //   name: 'Position',
    //   meta: {
    //     title: 'position',
    //     pensionMenu: ''
    //   }
    // },
    // {
    //   path: 'withdrawal-rule',
    //   component: () => import('@/views/master/withdrawal-rule/index'),
    //   name: 'WithdrawalRule',
    //   meta: {
    //     title: 'withdrawalRule',
    //     pensionMenu: ''
    //   }
    // },
    {
      path: 'fee-type',
      name: 'FeeType',
      component: () => import('@/views/master/fee-type/index'),
      meta: {
        title: 'feeType',
        pensionMenu: 'fee-type'
      }
    },
    {
      path: 'benefit-type',
      name: 'BenefitType',
      component: () => import('@/views/master/benefit-type/index'),
      meta: {
        title: 'benefitType',
        pensionMenu: 'benefit-type'
      }
    },
    {
      path: 'sub-benefit',
      component: () => import('@/views/master/benefit-type/sub-benefit/index'),
      name: 'SubBenefit',
      hidden: true,
      meta: {
        title: 'subBenefit',
        pensionMenu: 'benefit-type'
      }
    },
    // {
    //   path: 'sub-benefit-document',
    //   component: () => import('@/views/master/benefit-type/sub-benefit-document/index'),
    //   name: 'SubBenefitDocument',
    //   hidden: true,
    //   meta: {
    //     title: 'subBenefitDocument',
    //     pensionMenu: ''
    //   }
    // }
    {
      path: 'product-type',
      name: 'ProductType',
      component: () => import('@/views/master/product-type/index'),
      meta: {
        title: 'productType',
        pensionMenu: 'product-type'
      }
    }
    // {
    //   path: 'document-matrix',
    //   component: () => import('@/views/master/document-matrix/index'),
    //   name: 'DocumentMatrix',
    //   hidden: true,
    //   meta: {
    //     title: 'documentMatrix',
    //     pensionMenu: ''
    //   }
    // },
    // {
    //   path: 'dplk-bank',
    //   name: 'DplkBank',
    //   component: () => import('@/views/master/dplk-bank/index'),
    //   meta: {
    //     title: 'dplkBank',
    //     pensionMenu: ''
    //   }
    // },
    // {
    //   path: 'virtual-account',
    //   name: 'VirtualAccount',
    //   hidden: true,
    //   component: () => import('@/views/master/virtual-account/index'),
    //   meta: {
    //     title: 'virtualAccount',
    //     pensionMenu: ''
    //   },
    //   redirect: '/virtual-account/bca',
    //   children: [{
    //     path: 'bca',
    //     name: 'Bca',
    //     component: () => import('@/views/master/virtual-account/index'),
    //     meta: {
    //       title: 'bca',
    //       pensionMenu: ''
    //     }
    //   },
    //   {
    //     path: 'cimb',
    //     name: 'Cimb',
    //     component: () => import('@/views/master/virtual-account/index'),
    //     meta: {
    //       title: 'cimb',
    //       pensionMenu: ''
    //     }
    //   }

  //   ]
  // }
  ]
}
