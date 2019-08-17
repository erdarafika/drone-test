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

export function upload(data) {
  return request({
    url: 'billing/upload',
    method: 'post',
    headers: {
      'X-Import-Process': true,
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export function fetchBillingDetail(id) {
  return request({
    url: `billing/${id}`,
    method: 'get'
  })
}

export function fetchBillingDetails(id) {
  return request({
    url: `billing/${id}/detail`,
    method: 'get'
  })
}
