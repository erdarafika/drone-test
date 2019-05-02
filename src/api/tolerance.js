import request from '@/utils/request'

export function fetchTolerance(query) {
  return request({
    url: '/tolerance/detail',
    method: 'get',
    params: query
  })
}

export function updateTolerance(data) {
  return request({
    url: '/tolerance/update',
    method: 'post',
    data
  })
}
