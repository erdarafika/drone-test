import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/bank/list',
    method: 'get',
    params: query
  })
}

export function fetchBranch(query) {
  return request({
    url: '/bank/branch/list',
    method: 'get',
    params: query
  })
}

export function createBranch(data) {
  return request({
    url: '/bank/branch/create',
    method: 'post',
    data
  })
}

export function fetchBank(id) {
  return request({
    url: '/bank/detail',
    method: 'get',
    params: { id }
  })
}

export function createBank(data) {
  return request({
    url: '/bank/create',
    method: 'post',
    data
  })
}

export function updateBank(data) {
  return request({
    url: '/bank/update',
    method: 'post',
    data
  })
}
