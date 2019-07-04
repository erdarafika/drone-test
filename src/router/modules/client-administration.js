
import Layout from '@/layout'
export default {
  path: '/client-administration',
  component: Layout,
  redirect: '/client-administration/company',
  name: 'ClientAdministration',
  meta: {
    title: 'clientAdministration',
    icon: 'client-administration',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [
    {
      path: 'company',
      name: 'Company',
      component: () => import('@/views/client-administration/company/index'),
      meta: {
        title: 'company',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'company/:action',
      name: 'CompanyDetail',
      component: () => import('@/views/client-administration/company/detail'),
      meta: {
        title: 'detail',
        noCache: true,
        breadcrumb: false
      },
      hidden: true
    },
    {
      path: 'group-maintenance',
      name: 'GroupMaintenance',
      component: () => import('@/views/client-administration/group/index'),
      meta: {
        title: 'groupMaintenance',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'group-maintenance/:action',
      name: 'GroupMaintenanceDetail',
      component: () => import('@/views/client-administration/group/detail'),
      meta: {
        title: 'detail',
        noCache: true,
        breadcrumb: false
      },
      hidden: true
    }
  ]
}
