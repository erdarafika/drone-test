export const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/master',
    component: 'layout/Layout',
    redirect: '/master/address-type',
    name: 'Master',
    meta: {
      title: 'master',
      icon: 'component',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'address-type',
        name: 'addressType',
        component: 'views/master/address-type/index',
        meta: {
          title: 'addressType',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'business-line',
        name: 'businessLine',
        component: 'views/master/business-line/index',
        meta: {
          title: 'businessLine',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'document',
        name: 'document',
        component: 'views/master/document/index',
        meta: {
          title: 'document',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'holiday',
        name: 'holiday',
        component: 'views/master/holiday/index',
        meta: {
          title: 'holiday',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'location',
        name: 'location',
        component: 'views/master/location/index',
        meta: {
          title: 'location',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'tolerance',
        name: 'tolerance',
        component: 'views/master/tolerance/index',
        meta: {
          title: 'tolerance',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'email-config',
        name: 'emailConfig',
        component: 'views/master/email-config/index',
        meta: {
          title: 'emailConfig',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'fee-type',
        name: 'feeType',
        component: 'views/master/fee-type/index',
        meta: {
          title: 'feeType',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'product-type',
        name: 'productType',
        component: 'views/master/product-type/index',
        meta: {
          title: 'productType',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'bank',
        name: 'bank',
        component: 'views/master/bank/index',
        meta: {
          title: 'bank',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'dplk-bank',
        name: 'dplkBank',
        component: 'views/master/dplk-bank/index',
        meta: {
          title: 'dplkBank',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'benefit-type',
        name: 'benefitType',
        component: 'views/master/benefit-type/index',
        meta: {
          title: 'benefitType',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'sub-benefit',
        component: 'views/master/benefit-type/sub-benefit/index',
        name: 'subBenefit',
        meta: {
          title: 'subBenefit',
          roles: ['admin']
        },
        hidden: true
      },
      {
        path: 'sub-benefit-document',
        component: 'views/master/benefit-type/sub-benefit-document/index',
        name: 'subBenefitDocument',
        meta: {
          title: 'subBenefitDocument',
          roles: ['admin']
        },
        hidden: true
      },
      {
        path: 'virtual-account',
        name: 'virtualAccount',
        component: 'views/master/virtual-account/index',
        meta: {
          title: 'virtualAccount',
          roles: ['admin']
        },
        redirect: '/virtual-account/bca',
        children: [
          {
            path: 'bca',
            name: 'bca',
            component: 'views/master/virtual-account/index',
            meta: {
              title: 'bca',
              roles: ['admin'] // or you can only set roles in sub nav
            }
          },
          {
            path: 'cimb',
            name: 'cimb',
            component: 'views/master/virtual-account/index',
            meta: {
              title: 'cimb',
              roles: ['admin'] // or you can only set roles in sub nav
            }
          }
        ]
      },
      {
        path: 'withdrawal-rule',
        component: 'views/master/withdrawal-rule/index',
        name: 'withdrawalRule',
        meta: {
          title: 'withdrawalRule',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/permission',
    component: 'layout/Layout',
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    hidden: true,
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: 'views/permission/page',
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: 'views/permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]