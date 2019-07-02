import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/master/dplk/address',
    method: 'get'
  })
}

export function createDplkAddress(data) {
  return request({
    url: 'master/dplk/address',
    method: 'post',
    data
  })
}

export function updateDplkAddress(data) {
  return request({
    url: `/master/dplk/address/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteDplkAddress(data) {
  return request({
    url: `/master/dplk/address/${data.id}`,
    method: 'delete'
  })
}
