import Layout from '@/layout'
export default {
  path: '/simulation',
  component: Layout,
  redirect: '/simulation/contribution',
  name: 'Simulation',
  meta: {
    title: 'simulation',
    icon: 'simulation'
  },
  children: [
    {
      path: 'contribution',
      name: 'SimulationContribution',
      component: () => import('@/views/simulation/contribution/index'),
      meta: {
        title: 'contributionSimulator'
      }
    }
  ]
}
