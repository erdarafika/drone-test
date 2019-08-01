
import Layout from '@/layout'
export default {
  path: '/fund-switching',
  component: Layout,
  redirect: '/fund-switching/index',
  name: 'FundSwitching',
  meta: {
    title: 'fund-switching'
  },
  children: [
    {
      path: 'index',
      name: 'FundSwitchingIndex',
      component: () => import('@/views/static/fund-switching/index'),
      meta: {
        title: 'fund-switching',
        pensionMenu: 'address-type'
      }
    }
  ]
}
