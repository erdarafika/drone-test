import request from '@/utils/request'

export function getRecord(id) {
  return request({
    url: `/fee/type/${id}/`,
    method: 'get'
  })
}

export function fetchList() {
  return request({
    url: '/fee/type',
    method: 'get'
  })
}
