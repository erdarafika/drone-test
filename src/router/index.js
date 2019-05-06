import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
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
    component: Layout,
    redirect: '/master/address-type',
    name: 'master',
    meta: {
      title: 'master',
      icon: 'component',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'address-type',
        name: 'AddressType',
        component: () => import('@/views/master/address-type/index'),
        meta: {
          title: 'addressType',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'business-line',
        name: 'BusinessLine',
        component: () => import('@/views/master/business-line/index'),
        meta: {
          title: 'businessLine',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'document',
        name: 'Document',
        component: () => import('@/views/master/document/index'),
        meta: {
          title: 'document',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'holiday',
        name: 'Holiday',
        component: () => import('@/views/master/holiday/index'),
        meta: {
          title: 'holiday',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'location',
        name: 'Location',
        component: () => import('@/views/master/location/index'),
        meta: {
          title: 'location',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'tolerance',
        name: 'Tolerance',
        component: () => import('@/views/master/tolerance/index'),
        meta: {
          title: 'tolerance',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'email-config',
        name: 'EmailConfig',
        component: () => import('@/views/master/email-config/index'),
        meta: {
          title: 'emailConfig',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'fee-type',
        name: 'FeeType',
        component: () => import('@/views/master/fee-type/index'),
        meta: {
          title: 'feeType',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'product-type',
        name: 'ProductType',
        component: () => import('@/views/master/product-type/index'),
        meta: {
          title: 'productType',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'bank',
        name: 'Bank',
        component: () => import('@/views/master/bank/index'),
        meta: {
          title: 'bank',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'dplk-bank',
        name: 'DplkBank',
        component: () => import('@/views/master/dplk-bank/index'),
        meta: {
          title: 'dplkBank',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'benefit-type',
        name: 'BenefitType',
        component: () => import('@/views/master/benefit-type/index'),
        meta: {
          title: 'benefitType',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'sub-benefit',
        component: () => import('@/views/master/benefit-type/sub-benefit/index'),
        name: 'SubBenefit',
        meta: {
          title: 'subBenefit',
          roles: ['admin', 'editor']
        },
        hidden: true
      },
      {
        path: 'sub-benefit-document',
        component: () => import('@/views/master/benefit-type/sub-benefit-document/index'),
        name: 'SubBenefitDocument',
        meta: {
          title: 'subBenefitDocument',
          roles: ['admin', 'editor']
        },
        hidden: true
      },
      {
        path: 'virtual-account',
        name: 'VirtualAccount',
        component: () => import('@/views/master/virtual-account/index'),
        meta: {
          title: 'virtualAccount',
          roles: ['admin', 'editor']
        },
        redirect: '/virtual-account/bca',
        children: [
          {
            path: 'bca',
            name: 'Bca',
            component: () => import('@/views/master/virtual-account/index'),
            meta: {
              title: 'bca',
              roles: ['admin', 'editor'] // or you can only set roles in sub nav
            }
          },
          {
            path: 'cimb',
            name: 'Cimb',
            component: () => import('@/views/master/virtual-account/index'),
            meta: {
              title: 'cimb',
              roles: ['admin', 'editor'] // or you can only set roles in sub nav
            }
          }
        ]
      },
      {
        path: 'withdrawal-rule',
        component: () => import('@/views/master/withdrawal-rule/index'),
        name: 'WithdrawalRule',
        meta: {
          title: 'withdrawalRule',
          roles: ['admin', 'editor']
        }
      }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    hidden: true,
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
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

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
