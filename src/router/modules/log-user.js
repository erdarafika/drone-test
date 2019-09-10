import Layout from '@/layout'
export default {
  path: '/log-user',
  component: Layout,
  redirect: '/log-user',
  name: '',
  meta: {
    icon: 'log-user'
  },
  children: [
    {
      path: '',
      name: 'LogUser',
      component: () => import('@/views/log-user/index'),
      meta: {
        title: 'logUser',
        pensionMenu: 'log-user'
      }
    }
  ]
}
