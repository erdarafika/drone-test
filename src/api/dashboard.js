import request from '@/utils/request'

export function fetchDashboardPanelData() {
  return request({
    url: '/master/dplk/dashboard',
    method: 'get'
  })
}
