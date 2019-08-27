
import Layout from '@/layout'
export default {
  path: '/client-administration',
  component: Layout,
  redirect: '/client-administration/company',
  name: 'ClientAdministration',
  meta: {
    title: 'clientAdministration',
    icon: 'client-administration'
  },
  children: [
    {
      path: 'company',
      name: 'Company',
      component: () => import('@/views/client-administration/company/index'),
      meta: {
        title: 'company',
        pensionMenu: 'company'
      }
    },
    {
      path: 'company/:action',
      name: 'CompanyDetail',
      component: () => import('@/views/client-administration/company/detail'),
      meta: {
        title: 'detail',
        noCache: true,
        breadcrumb: false,
        pensionMenu: 'company'
      },
      hidden: true
    },
    {
      path: 'group-maintenance',
      name: 'GroupMaintenance',
      component: () => import('@/views/client-administration/group/index'),
      meta: {
        title: 'groupMaintenance',
        pensionMenu: 'group'
      }
    },
    {
      path: 'group-maintenance/:action',
      name: 'GroupMaintenanceDetail',
      component: () => import('@/views/client-administration/group/detail'),
      meta: {
        title: 'detail',
        noCache: true,
        breadcrumb: false,
        pensionMenu: 'group'
      },
      hidden: true
    },
    {
      path: 'member-maintenance',
      name: 'MemberMaintenance',
      component: () => import('@/views/client-administration/member/index'),
      meta: {
        title: 'memberMaintenance',
        pensionMenu: 'member'
      }
    },
    {
      path: 'member-maintenance/:action',
      name: 'MemberMaintenanceDetail',
      component: () => import('@/views/client-administration/member/detail'),
      meta: {
        title: 'detail',
        noCache: true,
        breadcrumb: false,
        pensionMenu: 'member'
      },
      hidden: true
    },
    {
      path: 'member-maintenance/import',
      name: 'MemberMaintenanceImport',
      component: () => import('@/views/client-administration/member/import'),
      meta: {
        title: 'memberMaintenanceImport',
        noCache: true,
        breadcrumb: false,
        pensionMenu: 'member'
      },
      hidden: true
    }
  ]
}
