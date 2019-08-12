import request from '@/utils/request'

export function fetchList() {
  return request({
    url: 'billing',
    method: 'get'
  })
}

export function fetchBillingDetails(id) {
  return request({
    url: `billing/${id}/detail`,
    method: 'get'
  })
}
