import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/position/list',
    method: 'get',
    params: query
  })
}

export function fetchPosition(id) {
  return request({
    url: '/position/detail',
    method: 'get',
    params: { id }
  })
}

export function createPosition(data) {
  return request({
    url: '/position/create',
    method: 'post',
    data
  })
}

export function updatePosition(data) {
  return request({
    url: '/position/update',
    method: 'post',
    data
  })
}
