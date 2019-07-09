import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/master/address-type',
    method: 'get'
  })
}

export function fetchAddressType(id) {
  return request({
    url: '/address-type/detail',
    method: 'get',
    params: { id }
  })
}

export function createAddressType(data) {
  return request({
    url: '/master/address-type',
    method: 'post',
    data
  })
}

export function updateAddressType(data) {
  return request({
    url: `/master/address-type/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteAddressType(data) {
  return request({
    url: `/master/address-type/${data.id}`,
    method: 'delete'
  })
}

export function updateStatusAddressType(data) {
  return request({
    url: `/master/address-type/${data.id}/update-status`,
    method: 'post',
    data
  })
}
