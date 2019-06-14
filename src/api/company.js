import request from '@/utils/request'

export function fetchCompany() {
  return request({
    url: '/company/1',
    method: 'get'
  })
}

export function updateCompany(data) {
  return request({
    url: '/company',
    method: 'post',
    data
  })
}
