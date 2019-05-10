import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/dplk-address/list',
    method: 'get',
    params: query
  })
}

export function createDplkAddress(data) {
  return request({
    url: '/dplk-address/create',
    method: 'post',
    data
  })
}

export function updateDplkAddress(data) {
  return request({
    url: '/dplk-address/update',
    method: 'post',
    data
  })
}
