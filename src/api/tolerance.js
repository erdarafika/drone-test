import request from '@/utils/request'

export function fetchTolerance() {
  return request({
    url: '/master/contribution-tolerance',
    method: 'get'
  })
}

export function updateTolerance(data) {
  return request({
    url: '/master/contribution-tolerance',
    method: 'post',
    data
  })
}
