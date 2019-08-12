
import Layout from '@/layout'
export default {
  path: '/email-status',
  component: Layout,
  redirect: '/email-status/index',
  name: 'EmailStatus',
  meta: {
    title: 'emailStatus',
    icon: 'email-status'
  },
  children: [
    {
      path: 'index',
      name: 'EmailStatusIndex',
      component: () => import('@/views/static/email-status/index'),
      meta: {
        title: 'emailStatus',
        pensionMenu: 'email-status'
      }
    }
  ]
}
