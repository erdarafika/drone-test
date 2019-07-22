import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/fee/type',
    method: 'get'
  })
}

export function updateStatus(data) {
  return request({
    url: `/fee/type/${data.id}/update-status`,
    method: 'post',
    data
  })
}
