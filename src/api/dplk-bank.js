import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/dplk-bank/list',
    method: 'get',
    params: query
  })
}

export function fetchDplkBank(id) {
  return request({
    url: '/dplk-bank/detail',
    method: 'get',
    params: { id }
  })
}

export function createDplkBank(data) {
  return request({
    url: '/dplk-bank/create',
    method: 'post',
    data
  })
}

export function updateDplkBank(data) {
  return request({
    url: '/dplk-bank/update',
    method: 'post',
    data
  })
}
