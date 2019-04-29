import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/business-line/list',
    method: 'get',
    params: query
  })
}

export function fetchBusinessLine(id) {
  return request({
    url: '/business-line/detail',
    method: 'get',
    params: { id }
  })
}

export function createBusinessLine(data) {
  return request({
    url: '/business-line/create',
    method: 'post',
    data
  })
}

export function updateBusinessLine(data) {
  return request({
    url: '/business-line/update',
    method: 'post',
    data
  })
}
