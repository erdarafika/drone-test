
import Layout from '@/layout'
export default {
  path: '/fund-switching',
  component: Layout,
  redirect: '/fund-switching/index',
  name: 'FundSwitching',
  meta: {
    title: 'fundSwitching',
    icon: 'fund-switching'
  },
  children: [
    {
      path: 'index',
      name: 'FundSwitchingIndex',
      component: () => import('@/views/static/fund-switching/index'),
      meta: {
        title: 'fundSwitching',
        pensionMenu: 'address-type'
      }
    }
  ]
}
