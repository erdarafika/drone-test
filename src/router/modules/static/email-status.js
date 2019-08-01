
import Layout from '@/layout'
export default {
  path: '/email-status',
  component: Layout,
  redirect: '/email-status/index',
  name: 'EmailStatus',
  meta: {
    title: 'emailStatus'
  },
  children: [
    {
      path: 'index',
      name: 'EmailStatusIndex',
      component: () => import('@/views/static/email-status/index'),
      meta: {
        title: 'emailStatus',
        pensionMenu: 'address-type'
      }
    }
  ]
}
