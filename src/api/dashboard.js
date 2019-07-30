import request from '@/utils/request'

export function fetchDashboardPanelData() {
  return request({
    url: '/master/dplk/dashboard',
    method: 'get'
  })
}

export function fetchUnitPriceData(query) {
  return request({
    url: '/fund/investment-type/daily-unit-price',
    method: 'get',
    params: query
  })
}
