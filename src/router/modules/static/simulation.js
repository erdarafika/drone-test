
import Layout from '@/layout'
export default {
  path: '/simulation',
  component: Layout,
  redirect: '/simulation/index',
  name: 'Simulation',
  meta: {
    title: 'simulation',
    icon: 'simulation'
  },
  children: [
    {
      path: 'index',
      name: 'SimulationIndex',
      component: () => import('@/views/static/simulation/index'),
      meta: {
        title: 'simulation',
        pensionMenu: 'simulation'
      }
    }
  ]
}
