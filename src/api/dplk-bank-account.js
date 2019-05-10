import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/dplk-bank-account/list',
    method: 'get',
    params: query
  })
}

export function createDplkBankAccount(data) {
  return request({
    url: '/dplk-bank-account/create',
    method: 'post',
    data
  })
}

export function updateDplkBankAccount(data) {
  return request({
    url: '/dplk-bank-account/update',
    method: 'post',
    data
  })
}
