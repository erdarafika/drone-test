import request from '@/utils/request'

export function fetchList() {
  return request({
    url: 'billing',
    method: 'get'
  })
}

export function createRecord(data) {
  return request({
    url: 'billing',
    method: 'post',
    data
  })
}

export function fetchBillingDetails(id) {
  return request({
    url: `billing/${id}/detail`,
    method: 'get'
  })
}
