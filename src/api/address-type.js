import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/address-type/list',
    method: 'get',
    params: query
  })
}

export function fetchAddressType(id) {
  return request({
    url: '/address-type/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/address-type/pv',
    method: 'get',
    params: { pv }
  })
}

export function createAddressType(data) {
  return request({
    url: '/address-type/create',
    method: 'post',
    data
  })
}

export function updateAddressType(data) {
  return request({
    url: '/address-type/update',
    method: 'post',
    data
  })
}
